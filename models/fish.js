module.exports = function (sequelize, DataTypes) {

    return sequelize.define('fished', {
        species: DataTypes.STRING,
        size: DataTypes.INTEGER,
        fly: DataTypes.STRING,
        location: DataTypes.STRING,
        owner: DataTypes.INTEGER,
        photo: DataTypes.STRING
    })
}