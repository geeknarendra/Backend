# Event Loop and Async Programming

Imagine we are making a database query that takes 10 seconds to run. In
synchronous programming, our program will wait for 10 seconds for the query to
complete. However in asynchronous programming, the rest of the program will
continue running when the query is made. After 10 seconds, when the query
returns the result, a callback function is called which handles the response.

This is handled by the event loop. JS is inherently single-threaded so
concurrency is essential for good performance.

---

# THA Testing

```
node files.js mkdir test
node files.js write test/a.txt "Hello, World."
node files.js append test/a.txt " Hmm..."
node files.js read test/a.txt
node files.js rename test/a.txt test/b.txt
node files.js rm test/b.txt
node files.js rmdir test
```
