const path = require("path");
const db = require("../../model/index");
const Validator = require("validatorjs");
const bcrypt = require("bcrypt");
const RESPONSE = require("../../helper/response");
const config = require("../../config/config");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const sendMail = require("../../helper/email/email");
const { where } = require("sequelize");
const { USE } = require("sequelize/lib/index-hints");
const { log } = require("console");

const User = db.User;
const ExistUser = db.ExistUser
const UserSession = db.UserSession;
const Appoitment = db.Appoitment
const Subscriber = db.Subscriber;
const Review = db.Review;
const Employe = db.Employee;
const ExistReview = db.ExistReview


const registerPage = (req, res) => {
    // if (req.user) {
    //     return res.redirect("/home")
    // }
    const filePath = path.join(__dirname, "../../public/html/register.html");
    res.sendFile(filePath);
}

const register = async (req, res) => {
    const validation = new Validator(req.body, {
        name: "required|string",
        email: "required|email",
        password: "required",
        cpassword: "required",
    });
    if (validation.fails()) {
        let firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, 9000, validation.errors.first(firstMessage), 400)
    }
    try {
        const { body: { name, email, password, cpassword } } = req
        const findEmail = await User.findOne({
            where: {
                email: email
            }
        });
        if (findEmail) {
            return RESPONSE.error(res, 1004)
        }
        if (findEmail) {
            return RESPONSE.error(res, 1004)
        }
        if (password !== cpassword) {
            return RESPONSE.error(res, 1005)
        }
        const hashPassword = await bcrypt.hashSync(password, 10);
        console.log(hashPassword);
        const createUser = await User.create({ name, email, password: hashPassword, createdBy: "self", role: "user" })
        if (!createUser) {
            return RESPONSE.error(res, 1006)
        }
        const { id, role } = createUser
        const token = jwt.sign({ id: id }, config.jwt) // { expiresIn: "1m" }

        const createToken = await UserSession.create({
            userId: id,
            token: token,
            role: role
        });

        if (!createToken) {
            return RESPONSE.error(res, 1007)
        }
        res.cookie("token", createToken.token);
        const renderTemplate = await ejs.renderFile("views/register.email.ejs", { data: createUser });
        const emailObj = {
            to: email,
            subject: `Thenk you for registering with ${createUser.name}`,
            html: renderTemplate,
        }
        await sendMail(emailObj);
        res.redirect("/home")
    } catch (err) {
        console.log("The err in register is ", err);
        return RESPONSE.error(res, 1006)
    }
}

const loginPage = (req, res) => {
    // if (req.user) {
    //     return res.redirect("/home")
    // }
    const filePath = path.join(__dirname, "../../public/html/login.html");
    res.sendFile(filePath);
}

const login = async (req, res) => {
    const validation = new Validator(req.body, {
        email: "required|email",
        password: "required",
    });
    if (validation.fails()) {
        let firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, 9000, validation.errors.first(firstMessage), 400)
    }
    try {
        const { body: { email, password } } = req

        const userData = await User.findOne({
            where: {
                email: email
            }
        });
        if (!userData) {
            return RESPONSE.error(res, 1003)
        }

        if (!await bcrypt.compareSync(password, userData.password)) {
            return RESPONSE.error(res, 1008)
        };

        const { id, role } = userData
        const token = jwt.sign({ id: id }, config.jwt) // { expiresIn: "1m" }

        const createToken = await UserSession.create({
            userId: id,
            token: token,
            role: role
        });

        if (!createToken) {
            return RESPONSE.error(res, 1007)
        }
        res.cookie("token", createToken.token);
        if (userData.role == "admin") {
            return res.redirect("/admin")
        }
        const renderTemplate = await ejs.renderFile("views/login.email.ejs", { data: userData });
        const emailObj = {
            to: email,
            subject: `Welcome back ${userData.name}`,
            html: renderTemplate,
        }
        await sendMail(emailObj);

        return res.redirect("/home")

    } catch (err) {
        console.log("The err in  login is ", err);
    }
}

const logOut = async (req, res) => {
    try {
        const findAndDelete = await UserSession.destroy({
            where: {
                userId: req.user.id
            }
        });
        res.clearCookie("token");
        res.redirect("/");
    } catch (err) {
        console.log("The err in log out is ", err);
    }
}

const home = (req, res) => {
    const filePath = path.join(__dirname, "../../public/html/index.html");
    res.sendFile(filePath);
}

const loginHome = (req, res) => {
    if (req.user.role != "user") {
        return res.redirect("/login")
    }
    const filePath = path.join(__dirname, "../../public/html/loginHome.html");
    res.sendFile(filePath);
}

const profile = async (req, res) => {
    try {
        if (req.user.role != "user") {
            return res.redirect("/login")
        }

        const findUSer = await User.findOne({
            where: {
                id: req.user.id
            }
        });
        const userDataArray = [findUSer];
        // console.log(findUSer);
        res.render("profile", { data: userDataArray });
    } catch (error) {

    }
}

const editProfilePage = async (req, res) => {
    try {
        console.log(req.params);
        const findUser = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        const userDataArray = [findUser];
        res.render("updateProfile", { data: userDataArray });
    } catch (err) {
        console.log("The err in edit profile page is ", err);
    }
}

const update = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.params);
        const updateProfile = await User.update({ name: req.body.name }, {
            where: {
                id: req.params.id
            }
        });
        return res.redirect("/profile")
    } catch (err) {
        console.log("The err in update profile is ", err);
    }
}

const about = (req, res) => {
    if (req.cookies.token) {
        const filePath = path.join(__dirname, "../../public/login/about.html");
        return res.sendFile(filePath);
    }
    const filePath = path.join(__dirname, "../../public/html/about.html");
    res.sendFile(filePath);
}

const price = (req, res) => {
    if (req.cookies.token) {
        const filePath = path.join(__dirname, "../../public/login/price.html");
        return res.sendFile(filePath);
    }
    const filePath = path.join(__dirname, "../../public/html/price.html");
    return res.sendFile(filePath);
}

const haircut = (req, res) => {
    if (req.cookies.token) {
        const filePath = path.join(__dirname, "../../public/login/haircut.html");
        return res.sendFile(filePath);
    }
    const filePath = path.join(__dirname, "../../public/html/haircut.html");
    return res.sendFile(filePath);
}

const haircolor = (req, res) => {
    if (req.cookies.token) {
        const filePath = path.join(__dirname, "../../public/login/haircolor.html");
        res.sendFile(filePath);
    }
    const filePath = path.join(__dirname, "../../public/html/haircolor.html");
    return res.sendFile(filePath);
}

const hairshave = (req, res) => {
    if (req.cookies.token) {
        const filePath = path.join(__dirname, "../../public/login/hairshave.html");
        return res.sendFile(filePath);
    }
    const filePath = path.join(__dirname, "../../public/html/hairshave.html");
    return res.sendFile(filePath);
}

const hairstraight = (req, res) => {
    if (req.cookies.token) {
        const filePath = path.join(__dirname, "../../public/login/hairstraight.html");
        return res.sendFile(filePath);
    }

    const filePath = path.join(__dirname, "../../public/html/hairstraight.html");
    return res.sendFile(filePath);
}

const beardtrim = (req, res) => {
    if (req.cookies.token) {
        const filePath = path.join(__dirname, "../../public/login/beardtrim.html");
        return res.sendFile(filePath);
    }
    const filePath = path.join(__dirname, "../../public/html/beardtrim.html");
    return res.sendFile(filePath);
}

const beardshave = (req, res) => {
    if (req.cookies.token) {
        const filePath = path.join(__dirname, "../../public/login/beardshave.html");
        return res.sendFile(filePath);
    }
    const filePath = path.join(__dirname, "../../public/html/beardshave.html");
    return res.sendFile(filePath);
}

const weddingcut = (req, res) => {
    if (req.cookies.token) {
        const filePath = path.join(__dirname, "../../public/login/weddingcut.html");
        return res.sendFile(filePath);
    }
    const filePath = path.join(__dirname, "../../public/html/weddingcut.html");
    return res.sendFile(filePath);
}

const cleanUp = (req, res) => {
    if (req.cookies.token) {
        const filePath = path.join(__dirname, "../../public/login/cleanup.html");
        return res.sendFile(filePath);
    }
    const filePath = path.join(__dirname, "../../public/html/cleanup.html");
    return res.sendFile(filePath);
}

const massage = (req, res) => {
    if (req.cookies.token) {
        const filePath = path.join(__dirname, "../../public/login/massage.html");
        return res.sendFile(filePath);
    }
    const filePath = path.join(__dirname, "../../public/html/massage.html");
    res.sendFile(filePath);
}


const team = async (req, res) => {
    try {
        const findAll = await Employe.findAll();
        if (!findAll) {
            return RESPONSE.error(res, 1011)
        }
        if (req.cookies.token) {
            return res.render("loginTeam", { data: findAll });
        }
        res.render("team", { data: findAll, });
    } catch (err) {
        console.log("The err in team is ", err);
    }
}

const review = async (req, res) => {
    try {
        const findAll = await Review.findAll({});
        if (!findAll) {
            return RESPONSE.error(res, 1011)
        }
        if (req.cookies.token) {
            return res.render("loginReview", { data: findAll });
        }

        console.log(findAll);
        return res.render("review", { data: findAll })
    } catch (err) {
        console.log("The err in review is ", err);
    }
}

const addReviewPage = async (req, res) => {
    try {
        const findAll = await Review.findAll({
            where: {
                userId: req.user.id
            }
        });
        res.render("addReview", { data: findAll, });
    } catch (err) {
        console.log("The err in add review page is ", err);
    }
}

const addReview = async (req, res) => {
    try {
        const { user: { id, name, email, role }, body: { review, star } } = req
        console.log(req.body);
        if (role != "user") {
            return RESPONSE.error(res, 1010)
        }
        const createReview = await Review.create({ userId: id, userName: name, email: email, star, review });
        if (!createReview) {
            return RESPONSE.error(res, 1013)
        }
        const renderTemplate = await ejs.renderFile("views/review.email.ejs", { data: createReview });
        const emailObj = {
            to: email,
            subject: `Thak you ${name} for giving feedBack `,
            html: renderTemplate,
        }
        await sendMail(emailObj);
        return res.redirect("/addReview")
    } catch (err) {
        console.log("The err in addReview Is ", err);
    }
}

const deleteReview = async (req, res) => {
    try {
        const findReview = await Review.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!findReview) {
            return RESPONSE.error(res, 1011)
        }
        const createExistReview = await ExistReview.create({ reviewId: findReview.id, userId: findReview.userId, userName: findReview.userName, email: findReview.email, star: findReview.star, review: findReview.review, deletedBy: "user", whenCreate: findReview.created_at });
        if (!createExistReview) {
            return RESPONSE.error(res, 1014)
        }
        const deleteReview = await Review.destroy({
            where: {
                id: findReview.id
            }
        });
        if (!deleteReview) {
            return RESPONSE.error(res, 1015)
        }

        return res.redirect("/addReview")
    } catch (err) {
        console.log("The err in delete review is ", err);
    }
}

module.exports = {
    registerPage,
    register,
    loginPage,
    login,
    logOut,
    editProfilePage,
    update,
    home,
    loginHome,
    profile,
    about,
    price,
    haircut,
    haircolor,
    hairshave,
    hairstraight,
    beardtrim,
    beardshave,
    weddingcut,
    cleanUp,
    massage,
    team,
    review,
    addReviewPage,
    addReview,
    deleteReview
}