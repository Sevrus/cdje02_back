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
                notEmpty: {msg: 'Le poste ne peut pas être vide.'},
                len: [3,25]
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: `Le lien de l'image est requis.`},
                notEmpty: {msg: `Le lien de l'image ne peut pas être vide.`}
            }
        },
        alt: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: `L'alt' de l'image est requis.`},
                notEmpty: {msg: `L'alt' de l'image ne peut pas être vide.`}
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Le nom est requis.'},
                notEmpty: {msg: 'Le nom ne peut pas être vide.'},
                len: [3,25]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Le prénom est requis.'},
                notEmpty: {msg: 'Le prénom ne peut pas être vide.'},
                len: [3,25]
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
                notEmpty: {msg: 'Le mail ne peut pas être vide.'},
                len: [6,50]
            }
        },
    })
}