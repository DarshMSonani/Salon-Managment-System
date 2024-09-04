const db = require("../model/index");
const config = require("../config/config");

const User = db.User;
const UserSession = db.UserSession;

const jwt = require("jsonwebtoken");
const RESPONSE = require("../helper/response");

const auth = async (req, res, next) => {
    try {
        // console.log(req.cookies.token);
        const getCookieToken = req.cookies.token

        if (!getCookieToken) {
            return res.redirect("/login")
        }
        const getToken = await UserSession.findOne({
            where: {
                token: getCookieToken
            }
        });

        if (!getToken) {
            return res.redirect("/login")
        }

        let tokenVeryfy;
        try {
            tokenVeryfy = jwt.verify(getToken.token, config.jwt);
        } catch (err) {
            console.log("The err of token ", err);
            return RESPONSE.error(res, 1109)
        }

        const findUser = await User.findOne({
            where: {
                id: tokenVeryfy.id
            }
        });

        if (!findUser) {
            return res.redirect("/register")
        }
        if (findUser.role !== "admin") {
            return res.redirect("/login")
        }
        req.user = findUser

        next();
    } catch (err) {
        console.log("The err in token verification is ", err);
    }
}

module.exports = auth