const { Team, Player, syncDatabase } = require('./models');

async function seed() {
  try {
    await syncDatabase();
    console.log('🌱 Начинаем заполнение БД...');

    const teams = await Team.bulkCreate([
      { name: 'Natus Vincere', country: 'Ukraine', rating: 1.15 },
      { name: 'Team Spirit', country: 'Russia', rating: 1.12 },
      { name: 'FaZe Clan', country: 'Europe', rating: 1.10 }
    ]);
    console.log(` Добавлено команд: ${teams.length}`);

    const players = await Player.bulkCreate([
      { nickname: 's1mple', realName: 'Oleksandr Kostyliev', role: 'AWPer', teamId: teams[0].id },
      { nickname: 'b1t', realName: 'Valeriy Vakhovskiy', role: 'Rifler', teamId: teams[0].id },
      { nickname: 'jL', realName: 'Justinas Lekavicius', role: 'AWPer', teamId: teams[0].id },
      
      { nickname: 'donk', realName: 'Danil Kryshkovets', role: 'Entry Fragger', teamId: teams[1].id },
      { nickname: 'chopper', realName: 'Leonid Vishnyakov', role: 'IGL', teamId: teams[1].id },
      { nickname: 'sh1ro', realName: 'Dmitry Sokolov', role: 'AWPer', teamId: teams[1].id },

      { nickname: 'karrigan', realName: 'Finn Andersen', role: 'IGL', teamId: teams[2].id },
      { nickname: 'ropz', realName: 'Robin Kool', role: 'Lurker', teamId: teams[2].id },
      { nickname: 'broky', realName: 'Helvijs Saukants', role: 'AWPer', teamId: teams[2].id }
    ]);
    console.log(` Добавлено игроков: ${players.length}`);
    console.log(' База данных успешно заполнена!');
    
  } catch (error) {
    console.error(' Ошибка при заполнении БД:', error);
  }
}

seed();