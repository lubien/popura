import path from 'path';
import dotenv from 'dotenv';
import mal from '../src';

dotenv.config({
	silent: false,
	path: path.join(__dirname, '../.env'),
});

const instance = mal(
  process.env.MAL_USER,
  process.env.MAL_PASS
);

module.exports = instance;
