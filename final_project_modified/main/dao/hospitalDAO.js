// dao/hospitalDAO.js
import pool from '../postgres_db_config/db.js';

class HospitalDAO {
  static async getResourcesByHospital(hospitalId) {
    const result = await pool.query(
      'SELECT * FROM hospital_resources WHERE hospital_id = $1',
      [hospitalId]
    );
    return result.rows;
  }

  static async saveOrUpdateResources(hospitalId, resources) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      for (const resource of resources) {
        if (resource.id) {
          await client.query(
            'UPDATE hospital_resources SET resource_name = $1, quantity = $2 WHERE id = $3 AND hospital_id = $4',
            [resource.resourceName, resource.quantity, resource.id, hospitalId]
          );
        } else {
          await client.query(
            'INSERT INTO hospital_resources (hospital_id, resource_name, quantity) VALUES ($1, $2, $3)',
            [hospitalId, resource.resourceName, resource.quantity]
          );
        }
      }

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async deleteResourceById(id) {
    await pool.query('DELETE FROM hospital_resources WHERE id = $1', [id]);
  }

  static async getHospitalById(hospital_id) {
    const result = await pool.query('SELECT name FROM hospitals WHERE hospital_id = $1', [hospital_id]);
    return result.rows[0];
  }
  
}

export default HospitalDAO;
