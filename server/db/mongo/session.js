import session from 'express-session';
import connectMongo from 'connect-mongo';
import { db, server } from './constants';

const MongoStore = connectMongo(session);

export default () =>
  new MongoStore(
    {
      url: db,
      autoReconnect: true,
      mongoOptions: server
    }
  );
