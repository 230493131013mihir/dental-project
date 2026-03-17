const pool = require("../db/mysql");

const getInsfrastructure = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM insfrastructure");

        console.log(rows);
        res.status(200).json({
            success: true,
            data: rows,
            message: "insfrastructure fetched successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: true,
            data: null,
            message: "insfrastructure not-fetched successfully",
        });
    }
};

const addInsfrastructure = async (req, res) => {
    try {
        console.log(req.body);

        const { branch_id, department_id, type_id, vendor_id, description, name, price } = req.body;

        const [rows, fields, result] = await pool.query(
            "INSERT INTO insfrastructure(branch_id, department_id, type_id, vendor_id, description, name, price) VALUES(?,?,?,?,?,?,?)",
            [branch_id, department_id, type_id, vendor_id, description, name, price]
        );
        res.status(200).json({
            success: true,
            data: req.body,
            message: "insfrastructure added successfully",
        });
        console.log(rows, fields, result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: true,
            data: null,
            message: "insfrastructure not-added successfully",
        });
    }
};

const updateInsfrastructure = () => {
    try {
        console.log("updateInsfrastructure");
    } catch (error) { }
};

const deleteInsfrastructure = () => {
    try {
        console.log("deleteInsfrastructure");
    } catch (error) { }
};

module.exports = {
    getInsfrastructure,
    addInsfrastructure,
    updateInsfrastructure,
    deleteInsfrastructure,
};
