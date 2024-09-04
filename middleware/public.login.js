const db = require("../model/index");
const config = require("../config/config");

const User = db.User;
const UserSession = db.UserSession;

const jwt = require("jsonwebtoken");
const RESPONSE = require("../helper/response");

const loginAuth = async (req, res, next) => {
    try {
        const getCookieToken = req.cookies.token

        // console.log("hello");
        if (getCookieToken) {
            return res.redirect("/home")
        }

        next();
    } catch (err) {
        console.log("The err in token verification is ", err);
    }
}

module.exports = loginAuth;