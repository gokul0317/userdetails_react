const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const user_details = require('./routes/api/user_details');

const keys = require('./config/keys');
var cors = require('cors')


var app = express();

const db = keys.mongoURI;

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to mongo db
mongoose
    .connect(db, { useNewUrlParser: true, useFindAndModify: true,  useUnifiedTopology: true })
    .then(() => console.log('connected to mongo'))
    .catch(err => console.log(err));
var port = keys.port;

app.use('/api/userdetail', user_details);

app.use('/', (req, res) => {
    res.json({ success: false, error: "No Match Resource Found" });
});

app.listen(port, () => {
    console.log(`Server listening on port - ${port}`)
});
