# NodeJS

Commands in node REPL (interactive mode/read-evaluate-print loop). Run REPL
using `node`.

```js
const fs = require("fs");
fs.mkdirSync("foldername");
// Final argument is unnecessary if you do not want to handle errors
// Most functions accept a callback which is called in case of errors
fs.writeFileSync("name", "content", (e) => console.log(e));
fs.appendFileSync("name", "content");
fs.readFileSync("name"); // Returns Buffer<>
fs.readFileSync("name", "encoding"); // Decodes buffer into string (use "utf-8")
fs.renameSync("old", "new");
fs.unlinkSync("filename"); // Delete (can also use rmSync)
fs.rmdirSync("foldername"); // Delete folder
// .exit to exit repl
```

---

To run a file:

```
node index.js
```

---

# Creating our own modules that work with `require`:

```js
// require_test.js
class Test {
  print() {
    console.log("inside require_test.js");
  }
}

class TestPrivate {
  print() {
    console.log("not exported to other files");
  }
}

module.exports = Test;
```

```js
// index.js
const Test = require("./require_test.js");
const object = new Test();
object.print(); // inside require_test.js
```

---

## THA

Study how to handle arguments and implement all above commands.

Reference: [How to parse command line arguments](https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/)
