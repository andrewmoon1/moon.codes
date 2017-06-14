require('dotenv').config();
const fs = require('file-system');

export const db = process.env.MONGOHQ_URL || process.env.MONGODB_URI || `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost/ReactWebpackNode`;

const key = fs.readFileSync(process.env.KEY);
const ca = [fs.readFileSync(process.env.CA)];

export const options = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  server: {
        sslValidate: true,
        sslCA: ca,
        sslKey: key,
        sslCert: key,
        ssl: true
    }
};

export default {
  db
};
