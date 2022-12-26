let express = require('express');
const createError = require('http-errors');
path = require('path');
mongoose = require('mongoose');
cors = require('cors');
bodyParser = require('body-parser');
dbConfig = require('./db/database.js');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
        console.log('Database connected')
    },
    error => {
        console.log('Database could not be connected : ' + error)
    }
)



//set up express for data to be passed into json
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());

const userRoute = require('./routes/player.routes')

app.use('/admin', userRoute);   //this is our endpoint for facilitating data movement

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log('Port connected to: ' + port)
})

app.use((req, res, next) => {
    next(createError(404));
});


//to ensure user enters a valid endpoint
app.get('/', (req, res) => {
    res.send('invalid admin');
 });
 

app.use(function (err, req, res, next) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})

