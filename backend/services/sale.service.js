const { query } = require("../conf/db.cofig");

async function createSale(saleData) {
  try {
    const {
      customer_name,
      customer_phone,
      category,
      product,
      quantity, // This comes from frontend as 'quantity'
      price,
    } = saleData;

    // Use quantity_crate in the SQL (matches your table column) and avoid sql injection
    const sql = `INSERT INTO sale (customer_name, customer_phone, category, product, quantity_crate, price)
                 VALUES (?, ?, ?, ?, ?, ?)`;

    const result = await query(sql, [
      customer_name,
      customer_phone,
      category,
      product,
      quantity, // But still pass the quantity value
      price,
    ]);

    if (result && result.insertId) {
      return {
        sale_id: result.insertId,
        ...saleData,
      };
    }
    return false;
  } catch (err) {
    console.log("Error in createSale:", err);
    return false;
  }
}

async function getAllSales() {
  try {
    const sql = `SELECT * FROM sale ORDER BY created_at DESC`;
    const rows = await query(sql);
    return rows;
  } catch (err) {
    console.log("Error in getAllSales:", err);
    return [];
  }
}

async function deleteSale(saleId) {
  try {
    const sql = `DELETE FROM sale WHERE sale_id = ?`;
    const result = await query(sql, [saleId]);
console.log(result)
    // result.affectedRows tells us how many rows were deleted
    return result.affectedRows > 0; // true if deleted, false if not found
    console.log(result);

  } catch (err) {
    console.log("Error in deleteSale:", err);
    console.log(result);

    return false;
  }
}

module.exports = {
  createSale,
  getAllSales,
  deleteSale,
};
