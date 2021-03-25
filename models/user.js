module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        newEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

    })
    return User;
}







// module.exports = function (sequelize, DataTypes) {
//     return sequelize.define('user', {

//         username: DataTypes.STRING,
//         newEmail: DataTypes.STRING,
//         passwordhash: DataTypes.STRING
//     })
// }