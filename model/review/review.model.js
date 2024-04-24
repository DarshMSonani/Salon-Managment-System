module.exports = (sequelize, Sequelize) => {
    const review = sequelize.define("review", {
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
        userName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        star:{
            type: Sequelize.ENUM("1","2","3","4","5"),
            allowNull: false,
        },
        review: {
            type: Sequelize.TEXT('long'),
            allowNull: false
        }
    }, {
        createdAt: "created_at",
        updatedAt: "updated_at"
    });
    return review
}