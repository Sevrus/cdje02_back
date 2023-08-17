module.exports = (sequelize, DataTypes) => {
    const Club = sequelize.define('Clubs', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le nom est déjà utilisé.'
            },
            validate: {
                notNull: {msg: 'Le nom est obligatoire.'}, 
                notEmpty: {msg: 'Cette ligne ne peut pas être vide.'},
                min: {
                    args: [2], 
                    msg: 'Le nom doit contenir au moins 2 caractères.'
                },
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'La ville est obligatoire.'}, 
                notEmpty: {msg: 'Cette ligne ne peut pas être vide.'},
            }
        },
        president: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Le président est obligatoire.'}, 
                notEmpty: {msg: 'Cette ligne ne peut pas être vide.'},
            }
        },
        tel: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        site: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        members: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        coordx: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        coordy: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        created: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        }
    },
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    });

    Club.associate = (models) => {
        Club.hasMany(models.Referee, { foreignKey: 'clubId' });
    }

    return Club;
};
