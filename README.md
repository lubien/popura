#popura

> MyAnimeList client for API and scrapping

[![Travis CI Build Status](https://travis-ci.org/lubien/popura.svg?branch=master)](https://travis-ci.org/lubien/popura)
[![Coverage Status](https://coveralls.io/repos/github/lubien/popura/badge.svg?branch=master)](https://coveralls.io/github/lubien/popura?branch=master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Popura is a promise-returning wrapper for MAL API and scrapper (W.I.P.) for features you don't have in the API.

## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [API](#api)
 * [Authenticable](#authenticable)
 * [Searchable](#searchable)
 * [Listable](#listable)
* [Models](#models)
 * [Anime Model][anime-model]
 * [Manga Model][manga-model]
 * [Myinfo Model][myinfo-model]
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
  .then(res => console.log(data))
  .then(err => console.log(err));
```

## API

### Authenticable

#### `.getUser()`

Return the current user's username.

#### `.setUser(username, password)`

Change the current user in this client instance.

#### `.verifyCredentials()`

Check if this user is valid.

Returns `Promise` => `{id, username}`.

### Searchable

#### `.searchAnimes(name)` and `.searchMangas(name)`

Search for an anime or manga title by `name`.

Returns `Promise` => Array of [Anime Models][anime-model] | [Manga Models][manga-model].

### Listable

#### `.getAnimeList(username = this.user)` and `.getMangaList(username = this.user)`

Get the animelist or mangalist from an user. If `username` is empty, returns current user's list.

Returns `Promise` => `{myinfo, list}` where `myinfo` is a [Myinfo Model][myinfo-model] and `list` is an array of [Anime Models][anime-model] | [Manga Models][manga-model].

#### `.addAnime(id, values = {})` and `.addManga(id, values = {})`

Inserts an anime or manga with `id` into your list. Optionally you can define `values` from [Anime Models][anime-model] | [Manga Models][manga-model]. Non-valid values will be ignored.

Returns `Promise` => Raw `response.body`.

#### `.updateAnime(id, values = {})` and `updateManga(id, values = {})`

Changes `values` from an anime or manga with `id` in your list. Define `values` from [Anime Models][anime-model] | [Manga Models][manga-model]. Non-valid values will be ignored.

Returns `Promise` => Raw `response.body`.

#### `.deleteAnime(id)` and `deleteManga(id)`

Removes an anime or manga with `id` from your list.

Returns `Promise` => Raw `response.body`.

## Models

### Anime Model

```js
{
  episode,
  status,
  score,
  storage_type,
  storage_value,
  times_rewatched,
  rewatch_value,
  date_start,
  date_finish,
  priority,
  enable_discussion,
  enable_rewatching,
  comments,
  fansub_group,
  tags,
}
```

##### Parameters

`episode` => `int`

`status` => `int` or `string` (1/watching, 2/completed, 3/onhold, 4/dropped, 6/plantowatch)

`score` => `int`

`storage_type` => `int`

`storage_value` => `float`

`times_rewatched` => `int`

`rewatch_value` => `int`

`date_start` => `date` (`mmddyyyy`)

`date_finish` => `date` (`mmddyyyy`)

`priority` => `int`

`enable_discussion` => `int` (1 = `enable`, 0 = `disable`)

`enable_rewatching` => `int` (1 = `enable`, 0 = `disable`)

`comments` => `string`

`fansub_group` => `string`

`tags` => `string` (tags separated by commas)

### Manga Model

```js
{
  chapter,
  volume,
  status,
  score,
  times_reread,
  reread_value,
  date_start,
  date_finish,
  priority,
  enable_discussion,
  enable_rereading,
  comments,
  scan_group,
  tags,
  retail_volumes,
}
```

##### Parameters

`chapter` => `int`

`volume` => `int`

`status` => `int` or `string` (1/reading, 2/completed, 3/onhold, 4/dropped, 6/plantoread)

`score` => `int`

`times_reread` => `int`

`reread_value` => `int`

`date_start` => `date` (`mmddyyyy`)

`date_finish` => `date` (`mmddyyyy`)

`priority` => `int`

`enable_discussion` => `int` (1 = `enable`, 0 = `disable`)

`enable_rereading` => `int` (1 = `enable`, 0 = `disable`)

`comments` => `string`

`scan_group` => `string`

`tags` => `string` (tags separated by commas)

`retail_volumes` => `int`

### Myinfo Model
```js
{
  user_id,
  user_name,
  [user_watching | user_reading], // [for anime | for manga]
  user_completed,
  user_onhold,
  user_dropped,
  [user_plantowatch | user_plantoread],
  user_days_spent_watching, // Yes, they use 'watching' for manga too
}
```

##### Parameters

`user_name` => `string`

`user_days_spent_watching` => `float`

Others => `int`

## License

[MIT](LICENSE.md)

[myinfo-model]: #myinfo-model
[anime-model]: #anime-model
[manga-model]: #manga-model
