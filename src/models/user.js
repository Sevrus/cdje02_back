module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            isEmail: true,
            unique: {
                msg: 'Cet email est déjà pris.'
            }
        },
        password: {
            type: DataTypes.STRING
        }
    }, {
      tableName: 'users'
    });
};