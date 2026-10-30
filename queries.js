const { Team, Player, syncDatabase } = require('./models');

async function runQueries() {
  try {
    await syncDatabase(); 
    
    const teamCount = await Team.count();
    if (teamCount === 0) {
      console.log(' База пуста, запускаем seed...');
      await require('./seed')(); 
    }

    console.log('\n--- ЗАПРОС 1: findAll() — Все команды ---');
    const allTeams = await Team.findAll();
    console.log(allTeams.map(t => `${t.name} (${t.country})`));

    console.log('\n--- ЗАПРОС 2: findByPk() — Найти игрока по id = 1 ---');
    const playerById = await Player.findByPk(1);
    console.log(playerById ? `${playerById.nickname} (${playerById.realName})` : 'Не найден');

    console.log('\n--- ЗАПРОС 3: findAll({ where: {...} }) — Игроки с ролью "AWPer" ---');
    const awpers = await Player.findAll({
      where: { role: 'AWPer' },
      attributes: ['nickname', 'role']
    });
    console.log(awpers.map(p => `${p.nickname} - ${p.role}`));

    console.log('\n--- ЗАПРОС 4: findAll({ include: ... }) — Команда "Team Spirit" со всеми игроками ---');
    const spiritTeam = await Team.findOne({
      where: { name: 'Team Spirit' },
      include: [{
        model: Player,
        as: 'players',
        attributes: ['nickname', 'role']
      }]
    });
    console.log(`Команда: ${spiritTeam.name}`);
    console.log('Игроки:', spiritTeam.players.map(p => p.nickname));

    console.log('\n--- ЗАПРОС 5: create() — Добавить нового игрока в Natus Vincere ---');
    const navi = await Team.findOne({ where: { name: 'Natus Vincere' } });
    const newPlayer = await Player.create({
      nickname: 'w0nderful',
      realName: 'Ihor Zhdanov',
      role: 'Rifler',
      teamId: navi.id
    });
    console.log(` Создан новый игрок: ${newPlayer.nickname} (ID: ${newPlayer.id})`);

    const updatedNavi = await Team.findOne({
      where: { name: 'Natus Vincere' },
      include: [{ model: Player, as: 'players', attributes: ['nickname'] }]
    });
    console.log('Обновленный состав NaVi:', updatedNavi.players.map(p => p.nickname));

  } catch (error) {
    console.error(' Ошибка при выполнении запросов:', error);
  }
}

runQueries();