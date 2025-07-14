const Person = require('../models/Person');
var jwt = require('jsonwebtoken');
const isloggedin = async (req,res,next) => {
    try {
        if(!req.cookies.token){     //req.cookies.token -> requires cookie-parser
            return res.json({"msg":"Not logged in!! ❌"})
        }
        jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY,async function(err, decoded) {
            // console.log(decoded) //Remove Afterwards
            const user = await Person.findOne({email : decoded.email})
            if(!user){
                return res.json({"msg":"Not logged in!! ❌"});
            }
            req.person = user;
            next()
        });
    } catch (error) {
        console.log("Error in isLoggedIn ❌ : ",error)
    }
}
module.exports.isloggedin = isloggedin;