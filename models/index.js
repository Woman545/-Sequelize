const { Sequelize } = require('sequelize');
const Team = require('./Team');
const Player = require('./Player');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './cs2.db',
  logging: false
});

const teamModel = Team(sequelize);
const playerModel = Player(sequelize);

teamModel.hasMany(playerModel, { foreignKey: 'teamId', as: 'players' });
playerModel.belongsTo(teamModel, { foreignKey: 'teamId', as: 'team' });

const syncDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('Таблицы успешно созданы (sync)');
};

module.exports = {
  sequelize,
  Team: teamModel,
  Player: playerModel,
  syncDatabase
};