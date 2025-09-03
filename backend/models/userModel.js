const { query } = require('../config/db');

const UserModel = {
  async findByEmail(email) {
    const rows = await query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    return rows[0] || null;
  },

  async findById(id) {
    const rows = await query('SELECT id, full_name, email, is_active, last_login_at FROM users WHERE id = ? LIMIT 1', [id]);
    return rows[0] || null;
  },

  async create({ full_name, email, password_hash }) {
    const sql = `INSERT INTO users (full_name, email, password_hash, is_active, created_at, updated_at)
                 VALUES (?, ?, ?, 1, NOW(), NOW())`;
    const result = await query(sql, [full_name, email, password_hash]);
    return { id: result.insertId, full_name, email, is_active: 1 };
  },

  async ensureRole(name) {
    await query(`INSERT INTO roles (name) VALUES (?) ON DUPLICATE KEY UPDATE name=name`, [name]);
    const rows = await query(`SELECT id FROM roles WHERE name=? LIMIT 1`, [name]);
    return rows[0]?.id;
  },

  async assignRoleByName(user_id, role_name) {
    const role_id = await this.ensureRole(role_name);
    await query(`INSERT IGNORE INTO user_roles (user_id, role_id) VALUES (?, ?)`, [user_id, role_id]);
  },

  async getRoles(user_id) {
    const rows = await query(`
      SELECT r.name FROM user_roles ur
      JOIN roles r ON r.id = ur.role_id
      WHERE ur.user_id = ?`, [user_id]);
    return rows.map(r => r.name);
  },

  async setLastLogin(id) {
    await query(`UPDATE users SET last_login_at = NOW() WHERE id = ?`, [id]);
  }
};

module.exports = UserModel;
