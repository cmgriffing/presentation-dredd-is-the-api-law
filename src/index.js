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
  // UNSANITIZED!!!
  const  result = await Widgets.insert(req.body);
  res.json(result);
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
