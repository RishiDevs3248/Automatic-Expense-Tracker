var jwt = require('jsonwebtoken');

module.exports = function CreateJwtToken(email){
    try {
        var token = jwt.sign({ email:email }, process.env.JWT_SECRET_KEY);
        return token;
    } catch (error) {
        console.log("error occured during Create Jwt Token : " , error)
        return "error";
    }
}
