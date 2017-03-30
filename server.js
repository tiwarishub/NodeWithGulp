var express = require('express');
var session = require('cookie-session'); // Loads the piece of middleware for sessions
var bodyParser = require('body-parser'); // Loads the piece of middleware for managing the settings
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();


/* Using the sessions */
app.use(session({secret: 'todotopsecret'}))


/* If there is no to do list in the session, 
we create an empty one in the form of an array before continuing */
.use(function(req, res, next){
    if (typeof(req.session.result) == 'undefined') {
        req.session.result = "";
    }
    next();
})

/* The to do list and the form are displayed */
.get('/todo', function(req, res) { 
    res.render('todo.ejs', {result: req.session.result});
})

/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, function(req, res) {
    var numstr = req.body.num;
    if (req.body.num != '') {
        if(numstr % 2 == 0) {
            req.session.result ="even";
        }
        else {
            req.session.result = "odd";
        }
    }
    res.redirect('/todo');
})

.use(express.static('public'))

/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){
    res.redirect('/todo');
})



/listen(process.env.port);