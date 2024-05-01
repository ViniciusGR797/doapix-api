import { Pool } from 'pg';
import config from '../config';

let pool: Pool;

export async function connectDB() {
  try {
    const uri = config.bdUri;

    pool = new Pool({
      connectionString: uri,
    });

    console.log("Connected to PostgreSQL");
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
  }
}

export async function query(text: string, params?: any[]) {
  try {
    const client = await pool.connect();
    const result = await client.query(text, params);
    client.release();
    return result;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

export async function closeDBConnection() {
  try {
    await pool.end();
    console.log("Closed PostgreSQL connection.");
  } catch (error) {
    console.error("Error closing PostgreSQL connection:", error);
  }
}
