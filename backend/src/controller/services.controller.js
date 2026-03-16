const pool = require("../db/mysql");

const getServices = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM services");

        console.log(rows);
        res.status(200).json({
            success: true,
            data: rows,
            message: "rows added successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: true,
            data: null,
            message: "rows not-added successfully",
        });
    }
};

const addServices = async (req, res) => {
    try {
        console.log(req.body);

        const { branch_id, department_id, user_id, name, description, image } = req.body;

        const [rows] = await pool.query(
            "INSERT INTO services(branch_id, department_id, user_id, name, description, image) VALUES (?,?,?,?,?,?)",
            [branch_id, department_id, user_id, name, description, image]
        );

        res.status(200).json({
            success: true,
            data: req.body,
            message: "services added successfully",
        });
        console.log(rows, fields, result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: true,
            data: null,
            message: "services not-added successfully",
        });
    }
};

const updateServices = () => {
    try {
        console.log("updateServices");
    } catch (error) { }
};

const deleteServices = () => {
    try {
        console.log("deleteServices");
    } catch (error) { }
};

module.exports = {
    getServices,
    addServices,
    updateServices,
    deleteServices,
};
