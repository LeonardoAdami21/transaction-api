import * as dotenv from 'dotenv';
dotenv.config();

export const appPort = process.env.APP_PORT || 3000;
export const nodeEnv = process.env.NODE_ENV || 'development';
