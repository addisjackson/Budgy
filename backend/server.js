// server.js

const app = require('./app');

const PORT = process.env.PORT || 7070;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
