module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Club', {
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
        }
    },
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
};

// Club.Referees = Club.hasMany(Referee);