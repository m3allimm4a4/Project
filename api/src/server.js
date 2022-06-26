const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.log('Uncaught Exception', err);
  process.exit(1);
});

dotenv.config({ path: `${__dirname}/environment/config.env` });

const app = require('./app');

const DB = process.env.DB_CONNECTION_STRING.replace('<PASSWORD>', process.env.DB_PASSWORD);

//? Atlas DB Connection
mongoose
  .connect(DB)
  .then(() => {
    console.log(`DB Connected`);
  })
  .catch(error => {
    console.log(`DB Connection Error: ${error.message}`);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('Unhandled Rejection', err);
  server.close(() => process.exit(1));
});
