const User = require('../models/user');
const bcrypt = require('bcrypt');

/* check if email already exists
* password hash
* email lowercase rachit@gmail.com / Rachit@gmail.com
* save
*/

const saltRounds = 10;
const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const alreadyExists = await User.findOne({ where: { email }});
        if(alreadyExists) {
            res.status(401).send("Email already exists");
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({ email: email.toLowerCase(), password: hash, fullName: "Rachit" });
        const savedUser = await newUser.save();
        req.session.user = savedUser;
        res.status(201).send(savedUser);
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
}

module.exports = register;