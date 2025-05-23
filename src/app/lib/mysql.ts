import mysql from 'mysql2/promise';

const pool = await mysql.createPool({
  host: process.env.AWS_MYSQL_HOST,
  user: process.env.AWS_MYSQL_USER,
  password: process.env.AWS_MYSQL_PASS,
  database: process.env.AWS_MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
