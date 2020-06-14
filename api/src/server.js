const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes');
const { database_auth } = require('./configs/config.json');

const app = express();

mongoose.connect(`mongodb+srv://${database_auth.user}:${database_auth.password}@${database_auth.uri}/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(3030, () => {
    console.log("Running");
});
