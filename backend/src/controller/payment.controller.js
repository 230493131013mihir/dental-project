const crypto = require("crypto");
const pool = require("../db/mysql");

const razorpayRequest = async (path, body) => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    const error = new Error("Razorpay keys are not configured in backend .env");
    error.statusCode = 500;
    throw error;
  }

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch(`https://api.razorpay.com/v1${path}`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data?.error?.description || "Razorpay request failed");
    error.statusCode = response.status;
    throw error;
  }

  return data;
};

const createOrder = async (req, res) => {
  try {
    const { amount, name, phone, purpose = "Medical payment" } = req.body;
    const amountInRupees = Number(amount);

    if (!amountInRupees || amountInRupees <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    const receipt = `dental_${Date.now()}`;
    const order = await razorpayRequest("/orders", {
      amount: Math.round(amountInRupees * 100),
      currency: "INR",
      receipt,
      notes: {
        name: name || "",
        phone: phone || "",
        purpose,
      },
    });

    await pool.query(
      `INSERT INTO payment
        (razorpay_order_id, amount, currency, status, receipt, patient_name, phone, purpose)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        order.id,
        amountInRupees,
        order.currency || "INR",
        "created",
        receipt,
        name || "",
        phone || "",
        purpose,
      ],
    );

    return res.status(200).json({
      success: true,
      data: {
        key_id: process.env.RAZORPAY_KEY_ID,
        order,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification details are required",
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await pool.query(
        "UPDATE payment SET status=? WHERE razorpay_order_id=?",
        ["failed", razorpay_order_id],
      );

      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    await pool.query(
      `UPDATE payment
       SET razorpay_payment_id=?, razorpay_signature=?, status=?
       WHERE razorpay_order_id=?`,
      [razorpay_payment_id, razorpay_signature, "paid", razorpay_order_id],
    );

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: {
        razorpay_order_id,
        razorpay_payment_id,
        status: "paid",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createOfflinePayment = async (req, res) => {
  try {
    const {
      amount,
      name,
      phone,
      purpose = "Medical payment",
      method = "Cash",
    } = req.body;
    const amountInRupees = Number(amount);

    if (!amountInRupees || amountInRupees <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    const receipt = `cash_${Date.now()}`;
    const paymentId = `offline_${Date.now()}`;

    const [result] = await pool.query(
      `INSERT INTO payment
        (razorpay_order_id, razorpay_payment_id, amount, currency, status, receipt, patient_name, phone, purpose)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        receipt,
        paymentId,
        amountInRupees,
        "INR",
        "paid",
        receipt,
        name || "",
        phone || "",
        `${purpose} - ${method}`,
      ],
    );

    return res.status(200).json({
      success: true,
      message: "Payment recorded successfully",
      data: {
        id: result.insertId,
        razorpay_order_id: receipt,
        razorpay_payment_id: paymentId,
        amount: amountInRupees,
        currency: "INR",
        status: "paid",
        receipt,
        patient_name: name || "",
        phone: phone || "",
        purpose,
        method,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPayments = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM payment ORDER BY id DESC");
    return res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  createOfflinePayment,
  getPayments,
};
