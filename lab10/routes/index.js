const xss = require('xss');
const User = require('../data/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log(username, password, done);
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(function (username, done) {
    User.getUserByUsername(username, function (err, user) {
        done(err, user);
    });
});
const constructorMethod = (app) => {
    app.get("/", (req, res) => {
        if(req.isAuthenticated()){
            res.redirect('/private');
        }
        res.render("index");
    })

    app.get("/private", ensureAuthenticated,(req, res) => {
        console.log(res.locals.user);
        res.render("private");
    })


    app.post("/login", passport.authenticate('local', {
        successRedirect: '/private',
        failureRedirect: '/',
        failureFlash: true
    }));

    app.get("/favicon.ico", (req, res) => {
        res.send('favicon.ico is not set');
    });

    app.get('/logout', function (req, res) {
        req.logout();
        req.flash('success_msg', 'You are logged out');
        res.redirect('/');
    });

    app.use("*", (req, res) => {
        res.send("page not found");
    })
};


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/');
	}
}
module.exports = constructorMethod;
