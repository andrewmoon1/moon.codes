require('dotenv').config();

export const db = process.env.MONGOHQ_URL || process.env.MONGODB_URI || `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost/ReactWebpackNode`;

export default {
  db
};
