const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    const tokens = jwt.sign({ id }, process.env.SECURE_TOKEN, { expiresIn: "7d" });
    console.log(tokens);
    return tokens
}

module.exports = generateToken;