module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true,
            unique: {
                msg: 'Ce mail est déjà pris.'
            }
        },
        password: {
            type: DataTypes.STRING
        }
    })
}