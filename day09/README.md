# Sending Static Files

Note: Jade is now deprecated, use pug instead. Either of the above needs to be
installed using `npm i` before use.

---

THA available in `ws/` folder. To use run with `DEBUG=ws:* npm start` and make
a GET request to `localhost:3000/users/files/filename.txt` to access
`filename.txt` in `ws/public/`.

Relevant code:

In `users.js`:

```js
const express = require("express");
const router = express.Router();
const path = require("path");

/* GET users listing. */
router.get("/files/:name", (req, res) => {
  res.sendFile(path.join(__dirname, `../public/${req.params.name}`));
});

module.exports = router;
```
