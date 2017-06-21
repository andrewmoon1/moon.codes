require('dotenv').config();
const fs = require('file-system');

// export const db = process.env.MONGOHQ_URL || process.env.MONGODB_URI || `mongodb://localhost/ReactWebpackNode`;
export const db = process.env.MONGOHQ_URL || process.env.MONGODB_URI || `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost/ReactWebpackNode`;

const key = process.env.KEY ? fs.readFileSync(process.env.KEY) : '';
const ca = process.env.CA ? [fs.readFileSync(process.env.CA)] : '';
export const options = process.env.CA ?
  {
      ssl: true,
      sslValidate: true,
      sslCA: ca,
      sslKey: key,
      sslCert: key,
      socketOptions: { keepAlive: 1 }
  } :
  {};

export const serverOptions = process.env.CA ?
  {
    server: options
  } :
  {};

export default {
  db,
  options
};
