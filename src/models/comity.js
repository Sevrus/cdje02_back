module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Comity', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Le poste est requis.'},
                notEmpty: {msg: 'Le poste ne peut pas être vide.'}
            }
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Le prénom est requis.'},
                notEmpty: {msg: 'Le prénom ne peut pas être vide.'}
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Le nom est requis.'},
                notEmpty: {msg: 'Le nom ne peut pas être vide.'}
            }
        },
        
        
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Ce mail est déjà pris.'
            },
            validate: {
                notNull: {msg: 'Le mail est requis.'},
                notEmpty: {msg: 'Le mail ne peut pas être vide.'}
            }
        },
    })
}