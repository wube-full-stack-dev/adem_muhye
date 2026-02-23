const {
  createSale,
  getAllSales,
  deleteSale,
} = require("../services/sale.service");

// Add sale - anyone can add (staff and admin)
async function addSale(req, res) {
  try {
    const saleData = req.body;

    if (
      !saleData.customer_name ||
      !saleData.customer_phone ||
      !saleData.quantity ||
      !saleData.price
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const result = await createSale(saleData);

    if (result) {
      res.status(201).json({
        success: true,
        message: "Sale created successfully",
        sale: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to create sale",
      });
    }
  } catch (err) {
    console.error("Error in addSale:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// Get all sales - anyone can view (staff and admin)
async function getSales(req, res) {
  try {
    const sales = await getAllSales();
    res.status(200).json({
      success: true,
      data: sales,
    });
  } catch (err) {
    console.error("Error in getSales:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// ✅ Delete sale - ONLY ADMIN can delete!
async function removeSale(req, res) {
  try {
    // Check role from middleware
    // if (req.user.role !== "admin")
    // {
    //   console.log("i am role seer from cont ur role is", req.user.role);
    //   return res.status(403).json({
    //     success: false,
    //     message: "Only admins can delete sales",
    //   });
    // }

    const { id } = req.params;
    const deleted = await deleteSale(id);

    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Sale deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Sale not found",
      });
    }
  } catch (err) {
    console.error("Error in removeSale:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

module.exports = {
  addSale,
  getSales,
  removeSale,
};
