/**
 * Level-1
 * email validate
 * password validate
 * pass === confirm pass
 */
const emailValidate = require("../utils/emailValidate");
const passValidate = require("../utils/passValidate");

const checkLevel1 = (req, res, next) => {
  const { email, password, confirmpassword } = req.body;
  if (
    typeof email === "string" &&
    typeof password === "string" &&
    typeof confirmpassword === "string" &&
    email.length > 0 &&
    password.length > 8 &&
    emailValidate(email) &&
    passValidate(password, confirmpassword)
  ) {
    next();
  } else {
    res.status(401).send("Input Error");
  }
};
console.log(module);
module.exports = checkLevel1;
