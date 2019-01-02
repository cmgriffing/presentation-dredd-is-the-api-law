
const winston = require('winston');
const hooks = require('hooks');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'hooks.log' })
  ]
});

// The ID found in the params section of the apib file
const widgetId = '42';
const stash = {};

hooks.after('/widgets > POST', function(transaction) {
  const body = JSON.parse(transaction.real.body);
  stash.widgetId = body._id;
});

hooks.before('/widgets/{widgetId} > GET', function(transaction) {
  transaction.fullPath = transaction.fullPath.replace(widgetId, stash.widgetId);
  transaction.request.uri = transaction.fullPath;
});