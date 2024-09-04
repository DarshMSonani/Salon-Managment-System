module.exports = (sequelize, Sequelize) => {
    const userSession = sequelize.define("userSessions", {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        token: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.ENUM("admin", "user", "employee"),
            allowNull: false
        }
    }, {
        createdAt: "created_at",
        updatedAt: "updated_at"
    });
    return userSession
}