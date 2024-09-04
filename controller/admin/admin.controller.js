const db = require("../../model/index");
const config = require("../../config/config")
const path = require("path");
const Validator = require("validatorjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const sendMail = require("../../helper/email/email");
const ejs = require("ejs");
const { where } = require("sequelize");
const RESPONSE = require("../../helper/response");
const { appoitment } = require("../appoitment/appoitment.controller");
const { email } = require("../../config/config");
const { USE } = require("sequelize/lib/index-hints");
const uploadFile = require("../../middleware/uploadImage/image");
const deleteFile = require("../../helper/deleteFile/delete.file");
const { review } = require("../user/user.controller");
const { log } = require("console");

const User = db.User
const UserSession = db.UserSession
const ExistUser = db.ExistUser
const Appointment = db.Appoitment
const AllAppoitment = db.AllAppoitment
const Employee = db.Employee
const ExistEmployee = db.ExistEmployee
const Review = db.Review
const ExistReview = db.ExistReview

const adminPage = async (req, res) => {
    try {
        if (req.user.role != "admin") {
            return res.redirect("/home")
        }
        const findAll = await Appointment.findAll()
        res.render("admin", { data: findAll })
    } catch (err) {
        console.log("The err in admin is ", err);
    }
}

const getAppoitment = async (req, res) => {
    try {
        if (req.user.role != "admin") {
            return res.redirect("/home")
        }
        console.log(req.params.type);
        const findAll = await Appointment.findAll({
            where: {
                appoitmentType: req.params.type
            }
        })
        // console.log(findAll);
        res.render("adminAppoitment", { data: findAll })
    } catch (err) {
        console.log("The err is get appoitemt is ", err);
    }
}



const addEmployeePage = (req, res) => {
    const filePath = path.join(__dirname, "../../public/html/addEmployee.html");
    res.sendFile(filePath);
}

async function fileValidation(file) {
    let response = {
        success: true
    }
    try {
        const fileTypes = ["image/jpeg", "image/jpg", "image/png"]
        if (file.length > 5) {
            response.success = false;
            response.message = 'You can only upload up to 5'
        };
        for (const obj of file) {
            if (!fileTypes.includes(obj.mimetype)) {
                response.success = false;
                response.message = "File type not supported, please upload image file type like jpeg,jpg,png"
            };
            if (obj.size > 2 * 1024 * 1024) {
                response.success = false;
                response.message = 'Image must be less than 2MB'
            }
        }
    } catch (error) {
        response.success = false;
        response.message = "Somethig went wrong in file validation.", error
    } finally {
        return response;
    }
}


const addEmployee = async (req, res) => {
    try {
        const { user: { id, role }, body: { name, email, phoneNumber, category } } = req
        if (role != "admin") {
            return res.redirect("/home")
        }
        console.log(name, email, phoneNumber, category);
        const gatDate = new Date();
        const file = req.files
        const validationResponse = await fileValidation(file);
        if (!validationResponse.success) {
            return res.status(422).json({
                success: false,
                message: validationResponse.message
            });
        }
        const image = await uploadFile(file, "employeeImage");
        let day = gatDate.getDate();
        let month = gatDate.getMonth() + 1;
        let year = gatDate.getFullYear();
        let joinDate = `${day}/${month}/${year}`;
        console.log(joinDate);
        const createUser = await Employee.create({ name, email, phoneNumber, joinDate: joinDate, category, image })
        const renderTemplate = await ejs.renderFile("views/employee.email.ejs", { data: createUser });
        const emailObj = {
            to: email,
            subject: `Welcom ${createUser.name} To Maruti X Team As ${createUser.category} `,
            html: renderTemplate,
        }
        await sendMail(emailObj);

        res.redirect("/employee");
    } catch (err) {
        console.log("The err in add employee is", err);
    }
}

const getAllEmployee = async (req, res) => {
    const findAll = await Employee.findAll({})
    res.render("employee", { data: findAll });
    // res.send(findAll)
}

const updateEmployeePage = async (req, res) => {
    try {
        const findEmployee = await Employee.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!findEmployee) {
            return RESPONSE.error(res, 1011)
        }
        const employeeDataArray = [findEmployee];
        res.render("editEmployee", { data: employeeDataArray });
    } catch (err) {
        console.log("Then err in update employee page is ", err);
    }
}

const updateEmployee = async (req, res) => {
    try {

        const findEmployee = await Employee.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!findEmployee) {
            return RESPONSE.error(res, 1011)
        }
        if (req.files) {
            const file = req.files
            const validationResponse = await fileValidation(file);
            if (!validationResponse.success) {
                return res.status(422).json({
                    success: false,
                    message: validationResponse.message
                });
            }
            const image = await uploadFile(file, "employeeImage");
            const updateEmployeeImage = await Employee.update({ image }, {
                where: {
                    id: req.params.id
                }
            });
            if (!updateEmployeeImage) {
                return RESPONSE.error(res, 1012)
            }
        }

        const updateEmployee = await Employee.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return res.redirect("/employee")
    } catch (err) {
        console.log("Then err in update employee page is ", err);
    }
}

const deleteEmployeeByAdmin = async (req, res) => {
    try {
        const find = await Employee.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!find) {
            return RESPONSE.error(res, 1011)
        }

        const url = new URL(find.image)
        const filename = path.basename(url.pathname);

        const result = await Employee.destroy({
            where: {
                id: find.id
            }
        });

        const createEmployee = await ExistEmployee.create({ employeeId: find.id, name: find.name, email: find.email, phoneNumber: find.phoneNumber, joinDate: find.joinDate, image: filename, category: find.category, whenCreate: find.created_at, });
        res.redirect("/pastEmployee")
    } catch (err) {
        console.log("The err in delete Appoitment is ", err);
    }
}

const undoEmployee = async (req, res) => {
    try {
        console.log(req.params.id);
        const findExistEmployee = await ExistEmployee.findOne({
            where: {
                employeeId: req.params.id
            }
        });
        if (!findExistEmployee) {
            return RESPONSE.error(res, 1011)
        }
        console.log(findExistEmployee.id);
        const result = await ExistEmployee.destroy({
            where: {
                id: findExistEmployee.id
            }
        });

        const url = new URL(findExistEmployee.image)
        const filename = path.basename(url.pathname);

        const addEmployee = await Employee.create({ name: findExistEmployee.name, email: findExistEmployee.email, phoneNumber: findExistEmployee.phoneNumber, joinDate: findExistEmployee.joinDate, image: filename, category: findExistEmployee.category, });
        res.redirect("/employee")
    } catch (err) {
        console.log("The err in undo Employee is ", err);
    }
}

const deleteAdminAppoitment = async (req, res) => {
    try {
        const find = await Appointment.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!find) {
            return RESPONSE.error(res, 1011)
        }
        const createAllAppoitment = await AllAppoitment.create({ appoitmentId: find.id, userId: find.userId, userName: find.userName, people: find.people, date: find.date, time: find.time, phoneNumber: find.phoneNumber, appoitmentType: find.appoitmentType, price: find.price, totalPrice: find.totalPrice, deletedBy: "admin", whenCreate: find.created_at });

        const result = await Appointment.destroy({
            where: {
                id: find.id
            }
        });

        res.redirect(`/adminAppoitment/${find.appoitmentType}`)
    } catch (err) {
        console.log("The err in delete Appoitment is ", err);
    }
}

const undoAppoitment = async (req, res) => {
    try {
        const find = await AllAppoitment.findOne({
            where: {
                appoitmentId: req.params.id
            }
        });
        if (!find) {
            return RESPONSE.error(res, 1011)
        }

        const destroy = await AllAppoitment.destroy({
            where: {
                id: find.id
            }
        });
        const createAppoitment = await Appointment.create({ userId: find.userId, userName: find.userName, email: find.email, people: find.people, phoneNumber: find.phoneNumber, date: find.date, time: find.time, appoitmentType: find.appoitmentType, price: find.price, totalPrice: find.totalPrice });
        res.redirect(`/adminAppoitment/${find.appoitmentType}`)
    } catch (err) {
        console.log("The err in undo Appoitment is ", err);
    }
}

const pastAppoitment = async (req, res) => {
    try {

        const findAll = await AllAppoitment.findAll({});

        return res.render("pastAppoitment", { data: findAll })

    } catch (err) {
        console.log("The err in get all past appoitment is ", err);
    }
}

const pastEmployee = async (req, res) => {
    try {

        const findAll = await ExistEmployee.findAll({});

        return res.render("pastEmployee", { data: findAll })


    } catch (err) {
        console.log("The err in get all past appoitment is ", err);
    }
}

const adminUser = async (req, res) => {
    try {
        // console.log("AAA");
        const find = await User.findAll({});

        return res.render("adminUser", { data: find });
    } catch (err) {
        console.log("The err in see all user is ", err);
    }
}

const addUserPage = (req, res) => {
    const filePath = path.join(__dirname, "../../public/html/addUser.html");
    res.sendFile(filePath);
}

const addUser = async (req, res) => {
    const validation = new Validator(req.body, {
        name: "required|string",
        email: "required|email",
        password: "required",
    });
    if (validation.fails()) {
        let firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, 9000, validation.errors.first(firstMessage), 400)
    }
    try {
        const { body: { name, email, password } } = req
        const findEmail = await User.findOne({
            where: {
                email: email
            }
        });
        if (findEmail) {
            return RESPONSE.error(res, 1004)
        }
        const hashPassword = await bcrypt.hashSync(password, 10);
        const createUser = await User.create({ name, email, password: hashPassword, createdBy: "admin", role: "user" })
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
        const renderTemplate = await ejs.renderFile("views/user.adminEmail.ejs", { data: createUser });
        const emailObj = {
            to: email,
            subject: `you are registering with ${createUser.name} by Admin`,
            html: renderTemplate,
        }
        await sendMail(emailObj);
        res.redirect("/user")
    } catch (err) {
        console.log("The err in add user by admin is ", err);
        return RESPONSE.error(res, 1006)
    }
}

const deleteUser = async (req, res) => {
    try {
        const find = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!find) {
            return RESPONSE.error(res, 1011)
        }
        console.log(find.password);
        const createUser = await ExistUser.create({ userId: find.id, name: find.name, email: find.email, password: find.password, createdBy: find.createdBy, role: "user", whenCreate: find.created_at });
        console.log(createUser);
        const deleteUser = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.redirect("/user")
    } catch (err) {
        console.log("The err in delete user is ", err);
    }
}

const pastUser = async (req, res) => {
    try {
        const find = await ExistUser.findAll({});

        if (!find) {
            return RESPONSE.error(res, 1011)
        }
        find.created_at = toString();
        return res.render("pastUser", { data: find })
    } catch (err) {
        console.log("The err in past User Is ", err);
    }
}

const undoUser = async (req, res) => {
    try {
        const findExistUser = await ExistUser.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!findExistUser) {
            return RESPONSE.error(res, 1011)
        }
        console.log(findExistUser.id);
        const result = await ExistUser.destroy({
            where: {
                id: findExistUser.id
            }
        });

        const addUser = await User.create({ name: findExistUser.name, email: findExistUser.email, password: findExistUser.password, createdBy: findExistUser.createdBy, role: findExistUser.role });
        const renderTemplate = await ejs.renderFile("views/undo.login.ejs", { data: addUser });
        const emailObj = {
            to: email,
            subject: `Welcome back ${addUser.name}`,
            html: renderTemplate,
        }
        await sendMail(emailObj);
        res.redirect("/user")
    } catch (err) {
        console.log("The err in undo user is ", err);
    }
}

const adminReview = async (req, res) => {
    const findAll = await Review.findAll({});
    if (!findAll) {
        return RESPONSE.error(res, 1011)
    }
    return res.render("adminReview", { data: findAll })
}

const deleteReviewByAdmin = async (req, res) => {
    try {
        const findReview = await Review.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!findReview) {
            return RESPONSE.error(res, 1011)
        }
        const createExistReview = await ExistReview.create({ reviewId: findReview.id, userId: findReview.userId, userName: findReview.userName, email: findReview.email, star: findReview.star, review: findReview.review, deletedBy: "admin", whenCreate: findReview.created_at });
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

        return res.redirect("/adminReview")
    } catch (err) {
        console.log("The err in delete review is ", err);
    }
}

const pastReview = async (req, res) => {
    try {
        const find = await ExistReview.findAll({});

        if (!find) {
            return RESPONSE.error(res, 1011)
        }
        return res.render("pastReview", { data: find });
    } catch (err) {
        console.log("The err in get past review is ", err);
    }
}

const undoReview = async (req, res) => {
    try {
        console.log(req.params.id);
        const findExistReview = await ExistReview.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!findExistReview) {
            return RESPONSE.error(res, 1011)
        }
        console.log(findExistReview.id);
        const result = await ExistReview.destroy({
            where: {
                id: findExistReview.id
            }
        });

        const addReview = await Review.create({ userId: findExistReview.userId, userName: findExistReview.userName, email: findExistReview.email, star: findExistReview.star, review: findExistReview.review });
        res.redirect("/adminReview")
    } catch (err) {
        console.log("The err in undo review is ", err);
    }
}

module.exports = { adminPage, getAppoitment, addEmployeePage, addEmployee, getAllEmployee, updateEmployeePage, updateEmployee, deleteEmployeeByAdmin, deleteAdminAppoitment, pastAppoitment, pastEmployee, adminUser, deleteUser, pastUser, undoUser, undoEmployee, undoAppoitment, adminReview, deleteReviewByAdmin, pastReview, undoReview, addUserPage, addUser }