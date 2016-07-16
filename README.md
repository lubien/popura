#popura

> NodeJS wrapper for MyAnimeList API

[![Travis CI Build Status](https://travis-ci.org/lubien/popura.svg?branch=master)](https://travis-ci.org/lubien/popura)
[![Coverage Status](https://coveralls.io/repos/github/lubien/popura/badge.svg?branch=master)](https://coveralls.io/github/lubien/popura?branch=master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

<p align="center">
  <a href="http://www.pixiv.net/member.php?id=1722912" title="Popura by yotsu"><img src="http://i.imgur.com/Iarmq6S.png" alt="Popura by yotsu"/></a>
  <p align="center" style="color: #babac4">
    Image by <a href="http://www.pixiv.net/member.php?id=1722912" title="yotsu">yotsu</a>
  </p>
</p>

[Popura](http://myanimelist.net/character/24417/Popura_Taneshima) is a promise-returning wrapper for MAL API.

## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [API](#api)
* [Models](#models)
 * [Anime Model][anime-model]
 * [Manga Model][manga-model]
 * [Myinfo Model][myinfo-model]
* [Development](#development)
* [License](#license)

## Install

```
$ npm install --save popura
```

## Usage

```js
import popura from 'popura';
const client = popura('YourAwesomeUsername', 'YourHackablePassword');

client.getAnimeList()
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

## API

### `.getUser()`

Return the current user's username.

### `.setUser(username, password)`

Change the current user in this client instance.

### `.verifyCredentials()`

Check if this user is valid.

Returns `Promise` => `{id, username}`.

### `.searchAnimes(name)` and `.searchMangas(name)`

Search for an anime or manga title by `name`.

Returns `Promise` => Array of [Anime Models][anime-model] | [Manga Models][manga-model].

### `.getAnimeList(username = this.user)` and `.getMangaList(username = this.user)`

Get the animelist or mangalist from an user. If `username` is empty, returns current user's list.

Returns `Promise` => `{myinfo, list}` where `myinfo` is a [Myinfo Model][myinfo-model] and `list` is an array of animes | mangas.

### `.addAnime(id, values = {})` and `.addManga(id, values = {})`

Inserts an anime or manga with `id` into your list. Optionally you can define `values` from [Anime Models][anime-model] | [Manga Models][manga-model]. Non-valid values will be ignored.

Returns `Promise` => Raw `response.body`.

### `.updateAnime(id, values = {})` and `updateManga(id, values = {})`

Changes `values` from an anime or manga with `id` in your list. Define `values` from [Anime Models][anime-model] | [Manga Models][manga-model]. Non-valid values will be ignored.

Returns `Promise` => Raw `response.body`.

### `.deleteAnime(id)` and `deleteManga(id)`

Removes an anime or manga with `id` from your list.

Returns `Promise` => Raw `response.body`.

## Models

### Anime Model

Property | Type | Note
-------- | ---- | ----
episode | int
status | `int` or `string` | `1` / `watching`, `2` / `completed`, `3` / `onhold`, `4` / `dropped`, `6` / `plantowatch`
score | `int`
storage_type | `int`
storage_value | `float`
times_rewatched | `int`
rewatch_value | `int`
date_start | `date` | `mmddyyyy`
date_finish | `date` | `mmddyyyy`
priority | `int`
enable_discussion | `int` | `1` = enable, `0` = disable
enable_rewatching | `int` | `1` = enable, `0` = disable
comments | `string`
fansub_group | `string`
tags | `array`

### Manga Model

Property | Type | Note
-------- | ---- | ----
chapter | int
volume | int
status | `int` or `string` | `1` / `reading`, `2` / `completed`, `3` / `onhold`, `4` / `dropped`, `6` / `plantoread`
score | `int`
times_reread | `int`
reread_value | `int`
date_start | `date` | `mmddyyyy`
date_finish | `date` | `mmddyyyy`
priority | `int`
enable_discussion | `int` | `1` = enable, `0` = disable
enable_rereading | `int` | `1` = enable, `0` = disable
comments | `string`
scan_group | `string`
tags | `array`
retail_volumes | `int`

### Myinfo Model

Property | Type | Note
-------- | ---- | ----
user_id | `int`
user_name | `string`
user_watching | `int` | Only for anime
user_reading | `int` | Only for manga
user_completed | `int`
user_onhold | `int`
user_dropped | `int`
user_plantowatch | `int` | Only for anime
user_plantoread | `int` | Only for manga
user_days_spent_watching | `float` | Yes, they use 'watching' for manga too

## Development

After clonning this repo, you must copy `.env.sample` to `.env` and put your MAL username and password.

In some tests, it'll add, update and remove one anime and one manga from your lists. You can specify these two at `.env`. Defaults to anime Tachumaru Gekijou (id = 9562) and manga Junshin Miracle 100% (id = 94483), two not so known titles.

## License

[MIT](LICENSE.md)

[myinfo-model]: #myinfo-model
[anime-model]: #anime-model
[manga-model]: #manga-model
