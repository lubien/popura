#popura

> NodeJS wrapper for MyAnimeList API

[![npm version](https://badge.fury.io/js/popura.svg)](https://badge.fury.io/js/popura)
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
 * [Anime List Item Model][anime-list-item-model]
 * [Manga List Item Model][manga-list-item-model]
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

### `.verifyAuth()`

Check if this user is valid.

Returns `Promise` => `{id, username}`.

### `.searchAnimes(name)` and `.searchMangas(name)`

Search for an anime or manga title by `name`.

Returns `Promise` => Array of [Anime Models][anime-model] | [Manga Models][manga-model].

### `.getAnimeList(username = this.user)` and `.getMangaList(username = this.user)`

Get the animelist or mangalist from an user. If `username` is empty, returns current user's list.

Returns `Promise` => `{myinfo, list}` where `myinfo` is a [Myinfo Model][myinfo-model] and `list` is an array of [Anime List Item Models][anime-list-item-model] | [Manga List Item Models][manga-list-item-model].

### `.addAnime(id, values = {})` and `.addManga(id, values = {})`

Inserts an anime or manga with `id` into your list. Optionally you can define `values` from [Anime Models][anime-model] | [Manga Models][manga-model].

Returns `Promise` => Raw `response.body`.

### `.updateAnime(id, values = {})` and `updateManga(id, values = {})`

Changes `values` from an anime or manga with `id` in your list. Define `values` from [Anime Models][anime-model] | [Manga Models][manga-model].

Returns `Promise` => Raw `response.body`.

### `.deleteAnime(id)` and `deleteManga(id)`

Removes an anime or manga with `id` from your list.

Returns `Promise` => Raw `response.body`.

## Models

### Anime Model

Model used to add/update animes

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

Model used to add/update mangas

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

### Anime List Item Model

Model you receive from API when requesting anime list

Property | Type | Note
-------- | ---- | ----
series_animedb_id | `int`
series_title | `string`
series_synonyms | `array`
series_type | `int` | TODO: figure out the meaning of these `int`s
series_episodes | `int`
series_status | `int` | TODO: figure out the meaning of these `int`s
series_start | `date` | `mmddyyyy`
series_end | `date` | `mmddyyyy`
my_id | `int`
my_watched_episodes | `int`
my_start_date | `date` | `mmddyyyy`
my_finish_date | `date` | `mmddyyyy`
my_score | `int`
my_status | `int` | `1` = `watching`, `2` = `completed`, `3` = `onhold`, `4` = `dropped`, `6` = `plantowatch`
my_rewatching | `int`
my_rewatching_ep | `int`
my_last_updated | `date` | `mmddyyyy`
my_tags | `array`

### Manga List Item Model

Model you receive from API when requesting anime list

Property | Type | Note
-------- | ---- | ----
series_mangadb_id | `int`
series_title | `string`
series_synonyms | `array`
series_type | `int` | TODO: figure out the meaning of these `int`s
series_chapters | `int`
series_volumes | `int`
series_status | `int` | TODO: figure out the meaning of these `int`s
series_start | `date` | `mmddyyyy`
series_end | `date` | `mmddyyyy`
my_id | `int`
my_read_chapters | `int`
my_read_volumes | `int`
my_start_date | `date` | `mmddyyyy`
my_finish_date | `date` | `mmddyyyy`
my_score | `int`
my_status | `int` | `1` = `reading`, `2` = `completed`, `3` = `onhold`, `4` = `dropped`, `6` = `plantoread`
my_rereading | `int`
my_rereading_chap | `int`
my_last_updated | `date` | `mmddyyyy`
my_tags | `array`

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
[anime-list-item-model]: #anime-list-item-model
[manga-list-item-model]: #manga-list-item-model
