const server = require('./api/server'); // server.js import ettik

const port = 9000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// START YOUR SERVER HERE
