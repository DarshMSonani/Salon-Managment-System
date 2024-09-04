module.exports = (sequelize, Sequelize) => {
    const appoitment = sequelize.define("existappoitment", {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        appoitmentId:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        people: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        time: {
            type: Sequelize.TIME,
            allowNull: false
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        appoitmentType: {
            type: Sequelize.ENUM("hairCut", "hairColor", "hairShave", "hairStraight", "bearedTrim", "bearedShave", "weddingCut", "cleanUp", "massage"),
            allowNull: false
        },
        price: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        totalPrice: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        deletedBy:{
            type:Sequelize.ENUM("user","admin"),
            allowNull:false
        },
        whenCreate:{
            type:Sequelize.JSON,
            allowNull:false
        }
    }, {
        createdAt: "created_at",
        updatedAt: "updated_at"
    })
    return appoitment
}