import path from 'path';
import dotenv from 'dotenv';
import popura from '../src';
import generateAuthToken from '../src/utils/generate-auth-token';

dotenv.config({
	silent: false,
	path: path.join(__dirname, '../.env'),
});

export const instance = popura(
  process.env.MAL_USER,
  process.env.MAL_PASS
);

export const authToken = generateAuthToken(
  process.env.MAL_USER,
  process.env.MAL_PASS
);
