const app = require('./app');
const logger = require('./lib/logger');
const db = require('./db');

const port = process.env.PORT || 3001;
const db_host = process.env.DB_HOST;
// TODO: Make sure database is connected then start the server
db.raw('select 1+1 as result')
  .then(() => {
    logger.info(`Database connecting at ${db_host}`);
    app.listen(port, () => {
      logger.info(`Listening at http://localhost:${port}`);
    });
  })
  .catch((err) => logger.error(err));
