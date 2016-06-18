import path from 'path';
import dotenv from 'dotenv';
import popura from '../src';

dotenv.config({
	silent: false,
	path: path.join(__dirname, '../.env'),
});

const instance = popura(
  process.env.MAL_USER,
  process.env.MAL_PASS
);

module.exports = instance;
