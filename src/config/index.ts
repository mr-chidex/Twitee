import 'dotenv/config';

const config = {
  API_VERSION: process.env.API_VERSION!,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV!,
  SECRET_KEY: process.env.SECRET_KEY!,
};

export default config;
