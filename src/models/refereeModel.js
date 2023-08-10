module.exports = (sequelize, DataTypes) => {
    const Referee = sequelize.define('Referees', {
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
        clubId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            references: {
                model: 'Clubs',
                key: 'id'
            }
        }
    },
        {
            timestamps: true,
            createdAt: 'created',
            updatedAt: false
        });

    Referee.associate = (models) => {
        Referee.belongsTo(models.Club, { foreignKey: 'clubId' });
    };

    return Referee;
};