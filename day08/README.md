# Express Middleware

NOTE: While adding a route, we can add multiple functions to be called when that
route is requested. In this case the handler can take another paramter which
holds the next handler.

Example:

```js
app.get(
  "/",
  (req, res, next) => {
    console.log("First handler");
    next();
  },
  (req, res) => res.send("Red")
);
```

To use a middleware for all requests, use `app.use(middleware)`. Also this must
be before any routes for it to occur (sequence matters).
