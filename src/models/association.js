const associateModels = (models) => {
    const { Referee, Club } = models;

    Club.associate = () => {
        Club.hasMany(Referee, { foreignKey: 'clubId' });
    };

    Referee.associate = () => {
        Referee.belongsTo(Club, { foreignKey: 'clubId' });
    };

    return models;
};

module.exports = { associateModels };
