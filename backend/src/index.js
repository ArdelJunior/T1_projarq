const express = require ('express');
const routes = require('./routes'); 
const app = express();


app.listen(3333);

app.use(express.json());
app.use(routes);
