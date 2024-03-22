const pool = require("../database/");

/**
 * Register new account
 */
const registerAccount = async (
  account_firstname,
  account_lastname,
  account_email,
  account_password
) => {
  try {
    const sql = `INSERT INTO account 
            (account_firstname, 
            account_lastname, 
            account_email, 
            account_password, 
            account_type) V
            ALUES ($1, $2, $3, $4, 'Client') RETURNING *`;
    return await pool.query(sql, [
      account_firstname,
      account_lastname,
      account_email,
      account_password,
    ]);
  } catch (error) {
    return error.message;
  }
};

/**
 * Check for existing email
 */
const checkExistingEmail = async (account_email) => {
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1";
    const email = await pool.query(sql, [account_email]);
    return email.rowCount;
  } catch (error) {
    return error.message;
  }
};

module.exports = { registerAccount, checkExistingEmail };
