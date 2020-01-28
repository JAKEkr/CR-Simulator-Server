require('dotenv').config();

const express = require('express');
const timetableParser = require('./controllers/timetableParser');
const timetableRouter = require('./routes/timetable');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const userRouter = require('./routes/user');
const regRouter = require('./routes/reg');
const mongoose = require('mongoose');
const http = require('http');
const debug = require('debug')('test:server');

const app = express();

app.use(express.json());
app.use('/timetable', timetableRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/user', userRouter);
app.use('/reg', regRouter);

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_URI)
    .then(console.log('Successfully connected to mongodb'))
    .catch(error => console.error(error));

timetableParser.parse('./res/');

const port = normalizePort(process.env.PORT || '8888');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port))
        return val;

    if (port >= 0)
        return port;

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen')
        throw error;

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
