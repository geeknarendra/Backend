# Express and MVC

## NPM

NPM packages can only be installed in folders with `package.json`. This can be
created by running `npm init` in a folder, and answering the questions it asks.
The `package.json` file indicates that the current folder is a node app.

Version - Uses [Semantic Versioning](https://semver.org/).\
Format: `MAJOR.MINOR.PATCH`

- When breaking changes occur, increment `MAJOR`.
- When new features are added in backwards compatible manner, increment `MINOR`.
- When fixing bugs in previous release, increment `PATCH`.

NOTE: NPM does not require `--save` anymore.
(`npm install --save xx` is equal to `npm install xx`).
Also commands can be abbreviated: `install` to `i`.

`npm i express` installs `express` so we can use it in our scripts, and adds it
to `package.json`. When a user want to use our package, `npm` will also install
`express`.

`npm i --save-dev nodemon`: Adds `nodemon` as a development dependency. These
are installed only if you are working on the package, but other users will not
need to install them. Also not installed when deploying you app to production.

`nodemon` reloads script on save. To use run `npx nodemon index.js` instead of
`node index.js`. You can use `nodemon index.js` if you install `nodemon`
globally but I don't recommend it.

---

## Using Express

```js
const express = require("express");
const app = express(); // Create express application

app.listen(5000); // Run server on port 5000
// Open localhost:5000 (will show only 404 page as no routes are defined)
```

---

## Creating routes:

Equivalent HTTP methods for CRUD operations:

Create - `PUT`\
Read - `GET`\
Update - `PATCH`\
Delete - `DELETE`

Routes are the paths in the URL. We can run different code depending on which
URL is loaded. Example: `localhost:5000/path` is handled by the route `/path`.
Default route (`localhost:5000` without anything at the end) is handled by `/`.

To create a route:

```js
app.get("/", (req, res) => {
  res.send("Hello, world!");
});
```

We can replace `get` with `put`/`patch`/`delete`. The second argument is a
function taking 2 parameters `res` and `req`. You can call them whatever you
want but these names are conventional and heavily recommended.

---

## Postman

Browser can make GET requests easily, but to make our lives easier we can use a
dedicated tool for making HTTP requests. There are several popular options:

- Postman - Closed source, popular, GUI.
- Insomnia - Open source, faster alternative to Postman.
- [Hoppscotch](https://hoppscotch.io) - Works in the browser, but needs a
  browser extension to work properly.
- HTTPie - Command line client.

---

## Response

`res.send(val)` can take any type of value. We can use `res.json(jsonData)` to
send data as JSON. `res.sendStatus(code)` sends the correct status code and its
string representation as plain text. `res.status(code)` sets the status code but
sends no data.

You can also chain calls to `res`:

```js
res.status(418).send("I'm a Teapot");
```

### Response codes

| Range | Meaning       | Category      |
| ----- | ------------- | ------------- |
| 1xx   | Hold on       | Informational |
| 2xx   | Here you go   | Success       |
| 3xx   | Go away       | Redirection   |
| 4xx   | You messed up | Client error  |
| 5xx   | I messed up   | Server error  |

For successful GET and PUT, `200 - OK` and `201 - Created` are used.\
For successful PATCH and DELETE, `204 - No Content` is used (indicates that the
request was successful, but the client does not need to go to a different page).

---

## Request

To pass parameters with a GET request, we use a `?` after the path and add
`key=value` pairs separated with `&`. These can be accessed using `req.query`.
All characters that are not allowed in URLs (like spaces) are encoded using
[Percent encoding](https://en.wikipedia.org/wiki/Percent-encoding).

Example: `https://localhost:5000/products?limit=50&sort=price-asc`

Note: We can use `encodeURIComponent` to escape such characters.

---

## Path and Path Patterns

The first argument of `app.get()` can be a simple path, a path pattern, a
regular expression or an array of any of the previous.

Path pattern syntax:

- `/abc?d` - Matches `/abcd` or `/abd`
- `/ab+cd` - Matches `/abcd`, `/abbcd`, `/abbbbbcd`
- `/ab*cd` - Matches `/abcd`, `/abxcd`, `/abFOOcd`, `/abbArcd`
- `/a(bc)?d` - Matches `/ad` or `/abcd`

Basically,

- `?` means previous character/bracketed group of characters can appear 0 or 1
  times.
- `+` means previous character/bracketed group of characters can appear 0 or
  more times.
- `*` means any characters including no characters can appear.

## Route parameters

Route parameters are named URL segments that are used to capture the values
specified at their position in the URL. The captured values are populated in the
`req.params` object, with the name of the route parameter specified in the path
as their respective keys.

```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

To define routes with route parameters, simply specify the route parameters in
the path of the route as shown below.

```js
app.get("/users/:userId/books/:bookId", function (req, res) {
  res.send(req.params);
});
```

The name of route parameters must be made up of “word characters”
(\[A-Za-z0-9\_\]).

Since the hyphen (-) and the dot (.) are interpreted literally, they can be used
along with route parameters for useful purposes.

```
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }

Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
```

To have more control over the exact string that can be matched by a route
parameter, you can append a regular expression in parentheses (`()`):

```
Route path: /user/:userId(\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}
```
