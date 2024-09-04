module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("existuser", {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
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
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdBy: {
            type: Sequelize.ENUM("self", "admin"),
            allowNull: false
        },
        role: {
            type: Sequelize.ENUM('admin', 'user'),
            allowNull: false
        },
        whenCreate: {
            type: Sequelize.JSON,
            allowNull: false
        }
    }, {
        createdAt: "created_at",
        updatedAt: "updated_at"
    })
    return user
}