const express = require('express');
const createDatastore = require('nedb-promise');

const Widgets = createDatastore({
  autoload: true
});

const app = express();
const port = 4242;

app.use(express.json());

app.get('/', (req, res) => res.json({
  message: 'Hello'
}));

app.post('/api/widgets', async (req, res) => {

  const sanitized = sanitizeWidget(req.body);
  if(sanitized) {
    const  result = await Widgets.insert(sanitized);
    res.json(result);
  } else {
    res.json(400, { error: 'Malformed Request Body', payload: req.body });
  }
});

app.get('/api/widgets/:widgetId', async (req, res) => {
  const widget = await Widgets.findOne({ _id: req.params.widgetId });

  if(widget) {
    res.json(widget);
  } else {
    res.json(404, {});
  }

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function sanitizeWidget(payload) {

  const keys = [
    'name',
    'size',
    'weight'
  ];

  let valid = true;
  const sanitized = {};

  keys.forEach(key => {
    if(!payload[key]) {
      valid = false;
    }
    sanitized[key] = payload[key];
  });

  if(valid === true) {
    return sanitized;
  } else {
    return false;
  }
}