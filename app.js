const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const insertRouter = require('./routes/insert');
const queryRouter = require('./routes/query');
const updateRouter = require('./routes/update');

const record = require('./middlewares/record').record;
require('./models/initialization');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser("better"));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'better'
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', record);
app.use('/', indexRouter);
app.use('/insert', insertRouter);
app.use('/query', queryRouter);
app.use('/update', updateRouter);

// catch 404
app.use(function (req, res, next) {
    // next(createError(404));
    if (!res.headersSent) {
        res.status(404).render('404', {
            "error": ":{404 Not Found}",
            "info": ""
        });
    }
    next()
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.error(err.message);
    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        "error": err.message,
        "info": ""
    });
    //res.send("error");
    next();
});

module.exports = app;
