const express = require("express");

const userController = require("../controller/user/user.controller");

const appoitmentController = require("../controller/appoitment/appoitment.controller");

const adminController = require("../controller/admin/admin.controller")

const auth = require("../middleware/user.auth");
const loginAuth = require("../middleware/login.auth");
const homeAuth = require("../middleware/home.auth");
const adminAuth = require("../middleware/admin.auth");

const router = express.Router();

router.get("/", homeAuth, userController.home);
router.get("/home", auth, userController.loginHome);
router.get("/register", loginAuth, userController.registerPage);
router.post("/register", loginAuth, userController.register);
router.get("/login", loginAuth, userController.loginPage);
router.post("/login", loginAuth, userController.login);
router.get("/logOut", auth, userController.logOut);

// router.get("/home", userController.home);
router.get("/about", userController.about);
router.get("/price", userController.price);
router.get("/review", userController.review);
router.get("/team", userController.team)

router.get("/profile", auth, userController.profile);
router.get("/edit/:id", auth, userController.editProfilePage);
router.post("/udpadteProfile/:id", auth, userController.update);

router.get("/addReview", auth, userController.addReviewPage);
router.post("/addReview", auth, userController.addReview);
router.post("/deleteReview/:id", auth, userController.deleteReview);

// haircut
router.get("/haircut", userController.haircut);
router.post("/haircut", auth, appoitmentController.createAppoitment);

// haircolor
router.get("/haircolor", userController.haircolor);
router.post("/haircolor", auth, appoitmentController.createAppoitment);

// hairshave
router.get("/hairshave", userController.hairshave);
router.post("/hairshave", auth, appoitmentController.createAppoitment);

// hairstraight
router.get("/hairstraight", userController.hairstraight);
router.post("/hairstraight", auth, appoitmentController.createAppoitment);

// beardtrim
router.get("/beardtrim", userController.beardtrim);
router.post("/beardtrim", auth, appoitmentController.createAppoitment);

// beardshave
router.get("/beardshave", userController.beardshave);
router.post("/beardshave", auth, appoitmentController.createAppoitment);

// weddingcut
router.get("/weddingcut", userController.weddingcut);
router.post("/weddingcut", auth, appoitmentController.createAppoitment);

// cleanup
router.get("/cleanup", userController.cleanUp);
router.post("/cleanup", auth, appoitmentController.createAppoitment);

// massage
router.get("/massage", userController.massage);
router.post("/massage", auth, appoitmentController.createAppoitment);

// Team
router.get("/team", userController.team);
router.post("/team", auth, appoitmentController.createAppoitment);

// Contact
// router.get("/contact", userController.contact);
// router.post("/contact", auth, appoitmentController.createAppoitment);

// Review
router.get("/review", userController.review);
router.post("/review", auth, appoitmentController.createAppoitment);

router.get("/appoitment", auth, appoitmentController.appoitment);
router.post("/delete/:id", auth, appoitmentController.deleteAppoitmentByUser);

router.get("/pastAppoitment", adminAuth, adminController.pastAppoitment)

router.get("/admin", adminAuth, adminController.adminPage);


router.get("/user", adminAuth, adminController.adminUser);
router.post("/deleteUser/:id", adminAuth, adminController.deleteUser);

router.get("/pastUser", adminAuth, adminController.pastUser);
router.post("/undoUser/:id", adminAuth, adminController.undoUser);

router.get("/adminAppoitment/:type", adminAuth, adminController.getAppoitment);
router.post("/deleteAdminAppoitment/:id", adminAuth, adminController.deleteAdminAppoitment);
router.post("/undoAppoitment/:id", adminAuth, adminController.undoAppoitment);

router.get("/addUser", adminAuth, adminController.addUserPage);
router.post("/addUser", adminAuth, adminController.addUser);
router.get("/addEmployee", adminAuth, adminController.addEmployeePage);
router.post("/addEmployee", adminAuth, adminController.addEmployee);

router.get("/employee", adminAuth, adminController.getAllEmployee);
router.get("/pastEmployee", adminAuth, adminController.pastEmployee)
router.get("/editEmployee/:id", adminAuth, adminController.updateEmployeePage);
router.post("/udpadteEmployee/:id", adminAuth, adminController.updateEmployee);
router.post("/deleteEmployeeByAdmin/:id", adminAuth, adminController.deleteEmployeeByAdmin);
router.post("/undoEmployee/:id", adminAuth, adminController.undoEmployee);

router.get("/adminReview", adminAuth, adminController.adminReview);
router.post("/deleteReviewByAdmin/:id", adminAuth, adminController.deleteReviewByAdmin);
router.get("/adminPastReview", adminAuth, adminController.pastReview)
router.post("/undoReview/:id", adminAuth, adminController.undoReview)
module.exports = router; 