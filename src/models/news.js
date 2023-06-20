module.exports = (sequelize, DataTypes) => {
    return sequelize.define('News', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Le titre est requis.' },
                notEmpty: { msg: 'Ce champ ne peut pas être vide.' }
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'L\'auteur est requis.' },
                notEmpty: { msg: 'Ce champ ne peut pas être vide.' }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'La description est requise.' },
                notEmpty: { msg: 'Ce champ ne peut pas être vide.' },
                min: {
                    arg: [10],
                    msg: 'La description doit contenir au moins 10 caractères.'
                }
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: `L'image est requise.` },
                notEmpty: { msg: 'L\'image ne peut pas être vide.' },
            }
        },
        created: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        }
    },
        {
            timestamps: true,
            createdAt: false,
            updatedAt: false
        });
};