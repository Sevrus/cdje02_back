module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Referees', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le nom est déjà pris.'
            },
            validate: {
                notNull: { msg: 'Le nom est requis.' },
                notEmpty: { msg: 'Le nom ne peut pas être vide.' },
                len: [3, 25]
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: `Le type de l'arbitre est requis.` },
                notEmpty: { msg: `Le type de l'arbitre ne peut pas être vide.` },
                len: [3, 25]
            }
        },
        validity: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: `La date de validité de l'arbitre est requise.` },
                notEmpty: { msg: `La date de validité de l'arbitre ne peut pas être vide.` },
                len: [4, 8]
            }
        },
        club: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: `Le nom du club est requis.` },
                notEmpty: { msg: `Le nom du club ne peut pas être vide.` },
                len: [3, 50]
            }
        }
    },
        // {
        //     sequelize, modelName: 'club'
        // },
        {
            timestamps: true,
            createdAt: 'created',
            updatedAt: false
        });
}