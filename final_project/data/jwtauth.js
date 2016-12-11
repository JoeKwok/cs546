var UserModel = require('./users');
var jwt = require('jwt-simple');
const jwtTokenSecret = 'LV IS THE NAME OF DATABASE';
exports.myauth = function(req, res, next) {
    
    let token = req.get('Auth-Token');
    
    if (token) {
    try{        
            var decoded = jwt.decode(token, jwtTokenSecret);
            if (decoded.exp <= Date.now()) {
                res.end('Access token has expired', 400);
            }
            console.log(decoded);
            UserModel.getUser( decoded.iss).then( user=>{
                    if(!user) return res.end('token invalid no such user', 400);
                    req.user = user;
                    return next();
            }).catch(err=>{

                return res.end('token invalid '+err, 400);

            });


        } catch (err) {
            return res.end('token invalid '+err, 400);
            
        }
    } else {
        res.end('no token provided', 400);
        
    }
};


exports.genToken = function(userId) {
            var moment = require('moment');
            var jwt = require('jwt-simple');
            var expires = moment().add(7, 'days').valueOf();
            

            var token = jwt.encode({
            iss: userId,
            exp: expires
            }, jwtTokenSecret);

            return token;
        }

module.exports = exports;
            
        