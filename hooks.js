
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

const stash = {};

// After creating a widget, add the id from the response to the stash for future use
hooks.after('/api/v1/widgets > POST', function(transaction) {
  const body = JSON.parse(transaction.real.body);
  stash.widgetId = body._id;
});

// The ID found in the params section of the apib file
const widgetId = '42';

// Use the widgetId from before and parse out the one hardcoded in the docs.
hooks.before('/api/v1/widgets/{widgetId} > GET', function(transaction) {
  transaction.fullPath = transaction.fullPath.replace(widgetId, stash.widgetId);
  transaction.request.uri = transaction.fullPath;
});