const sequelize = require("../db");

// module.exports = (sequelize, DataTypes) => {
//     const logModel = sequelize.define('fished', {
//         species: {
//             type: DataTypes.INTEGER,
//             allowNull: true
//         },
//         size: {
//             type: DataTypes.STRING,
//             allowNull: true
//         },
//         fly: {
//             type: DataTypes.STRING,
//             allowNull: true
//         },
//         location: {
//             type: DataTypes.STRING,
//             allowNull: true
//         },
//         owner: {
//             type: DataTypes.STRING,
//             allowNull: true
//         },
//         photo: {
//             type: DataTypes.INTEGER,
//             allowNull: true
//         },
//     })
//     return logModel;
// };

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

//test