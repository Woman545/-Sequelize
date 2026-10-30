const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Player = sequelize.define('Player', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    realName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'teams',
        key: 'id'
      }
    }
  }, {
    tableName: 'players',
    timestamps: false
  });

  return Player;
};