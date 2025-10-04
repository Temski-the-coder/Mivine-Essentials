const express = require("express");
const product = require("../models/products");
const {protect, admin} = require("../middleware/authMiddleware");

const router = express.Router();
// @route GET /api/admin/products
// @desc GET all product (admin only)
// @access Private/Admin

router.get("/", protect, admin, async (req, res) => {
    try {
        products = await product.find({})
        res.json(products)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"})
    }
})

module.exports = router;