const express = require('express');
const app = express();
app.get('/zlockchain', function (req, res) { });
app.post('/transaction', function (req, res) { });
app.get('/mine', function (req, res) { });
app.listen(3000, function () {
    console.log('listening on port 3000...');
});