module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Tournament', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Le titre est requis.'},
                notEmpty: {msg: 'Le titre ne peut pas être vide.'}
            }
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Ce lien est déjà utilisé.'
            },
            validate: {
                notNull: {msg: 'Le lien est requis.'},
                notEmpty: {msg: 'Le lien ne peut pas être vide.'}
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    });
};