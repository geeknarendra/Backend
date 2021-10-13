const { emailValidate, passwordValidate } = require("../utils/validate");
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @description
 * * email validate - string
 * password validate
 * password == confirm
 */
const registerInitialCheck = (req, res, next) => {
    console.log('coming here')
    const { email, password, confirmPassword } = req.body;
    if(
        typeof email === 'string' &&
        typeof password === 'string' &&
        typeof confirmPassword === 'string' &&
        email.length > 0 &&
        password.length > 8 &&
        confirmPassword === password &&
        emailValidate(email) &&
        passwordValidate(password)
    ) {
        next();
    } else {
        res.status(401).send("Initial checks fail");
    }
};

module.exports = registerInitialCheck;




