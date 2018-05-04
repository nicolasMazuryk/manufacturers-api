import dotenv from 'dotenv-safe';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

dotenv.load({ allowEmptyValues: isDev });

export default {
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    options: {
      algorithm: 'HS256',
    },
  },
  mainUrl: process.env.BASE_URL,
  mail: {
    transport: 'SMTP',
    smtp: '', // todo
    from: '',
    transport_options: {
      service: 'Gmail',
      auth: {
        user: '',
        pass: '',
      },
    },
  },
  postgres: {
    database: process.env.TEST_MODE ? 'test' : process.env.SQL_DB,
    username: process.env.SQL_USER,
    password: process.env.SQL_PASS || '',
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    schema: process.env.SQL_SCHEMA,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 50,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
