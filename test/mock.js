import path from 'path';
import dotenv from 'dotenv';
import popura from '../src';
import generateAuthToken from '../src/utils/generate-auth-token';

dotenv.config({
	silent: true,
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

export const state = {
	username: process.env.MAL_USER,
	password: process.env.MAL_PASS,
	authToken,
};

// Tachumaru Gekijou
export const TEST_ANIME_ID = process.env.TEST_ANIME_ID || 9562;
// Junshin Miracle 100%
export const TEST_MANGA_ID = process.env.TEST_MANGA_ID || 94483;
