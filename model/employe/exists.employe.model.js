const config = require("../../config/config")

module.exports = (sequelize, Sequelize) => {
    const employee = sequelize.define("existemployee", {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        employeeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        joinDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false,
            get() {
                const rawValue = this.getDataValue('image');
                return rawValue ? `${config.app_base_url}/employeeImage/${rawValue}` : null
            }
        },
        category: {
            type: Sequelize.ENUM("hairCut", "hairColor", "hairShave", "hairStraight", "bearedTrim", "bearedShave", "weddingCut", "cleanUp", "massage", "receptionist"),
            allowNull: false
        },
        whenCreate: {
            type: Sequelize.JSON,
            allowNull: false
        }
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
    return employee
}