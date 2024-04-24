const Sequelize = require("sequelize")
const config = require("../config/config");

const sequelize = new Sequelize(
    config.database.database,
    config.database.username,
    config.database.password,
    {
        host: config.database.host,
        dialect: config.database.dialect,
        logging: false
    }
)

sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established successfully");
    })
    .catch((err) => {
        console.log("The err in db connection is ", err);
    })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user/user.model")(sequelize, Sequelize);
db.ExistUser = require("./user/existUser.model")(sequelize, Sequelize);
db.UserSession = require("./user/user.session.model")(sequelize, Sequelize);
db.Appoitment = require("./appoitment/appoitment.model")(sequelize, Sequelize);
db.AllAppoitment = require("./appoitment/allAppoitment.model")(sequelize, Sequelize);
db.Employee = require("./employe/employe.model")(sequelize, Sequelize);
db.ExistEmployee = require("./employe/exists.employe.model")(sequelize, Sequelize);
db.Review = require("./review/review.model")(sequelize, Sequelize);
db.ExistReview = require("./review/existsReview.model")(sequelize, Sequelize)

db.sequelize.sync()
    .then(() => {
        console.log("Yes");
    })
    .catch((err) => {
        console.log("The Sync Err Is" + err);
    });

module.exports = db