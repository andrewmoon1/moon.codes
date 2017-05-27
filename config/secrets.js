require('dotenv').config();

export const sessionSecret = process.env.SESSION_SECRET;
export const google = {
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
};
