const { get } = require("mongoose")
const config = require("../../config/config")
module.exports = (sequelize, Sequelize) => {
    const employee = sequelize.define("employee", {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
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
            get() {
                const rawValue = this.getDataValue('image');
                return rawValue ? `${config.app_base_url}/employeeImage/${rawValue}` : null
            }
        },
        category: {
            type: Sequelize.ENUM("hairCut", "hairColor", "hairShave", "hairStraight", "bearedTrim", "bearedShave", "weddingCut", "cleanUp", "massage", "receptionist"),
            allowNull: false
        }
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
    return employee
}