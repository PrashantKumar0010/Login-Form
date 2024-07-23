const jwt = require('jsonwebtoken');
const person = require('../models/person');
async function authenticate(req, res, next) {
    try {
        if (req.cookies === undefined) {
           return res.render('login-required',{
                 message: 'please login for access this page. Redirecting to login page in 5 seconds...'
            });
        }
        else {
            const token = req.cookies.token;
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await person.findOne({ _id: decoded._id });
            if (user === null) {
               return res.render('login-required',
                    {
                         message: 'please login for access this page. Redirecting to login page in 5 seconds...'
                    }
                );
            }
            else {
            //     console.log('user found')
            //   return  res.render('course')
            next();
            }
        }
    }
    catch (error) {
        if(error.name === 'JsonWebTokenError', {})
        {
           return res.render('login-required', 
                {
                     message: 'please login for access this page. Redirecting to login page in 5 seconds...'
                }
                
            );
        }else {
            console.error('Authentication error: ', error);
          return  res.render('login-required', {
                 message: 'please login for access this page. Redirecting to login page in 5 seconds...'
            });
        }
    }
}
module.exports = {
    authenticate,
}




// new code

// const jwt = require('jsonwebtoken');
// const person = require('../models/person');

// async function authenticate(req, res, next) {
//     try {
//         if (!req.cookies || !req.cookies.token) {
//             return res.redirect('/login');
//         }

//         const token = req.cookies.token;
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         const user = await person.findOne({ _id: decoded._id });

//         if (!user) {
//             return res.redirect('/login');
//         }

//         req.user = user; // Optionally attach the user to the request object for later use
//         next();
//     } catch (error) {
//         if (error.name === 'JsonWebTokenError') {
//             return res.redirect('/login');
//         } else {
//             console.error('Authentication error:', error);
//             return res.redirect('/login');
//         }
//     }
// }

// module.exports = {
//     authenticate,
// }
