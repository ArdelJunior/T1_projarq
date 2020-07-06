const express = require ('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes'); 
const app = express();

const port = process.env.PORT || 3333;

app.listen(port);

app.use(express.json());
app.use(cors());
app.use(routes);

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
