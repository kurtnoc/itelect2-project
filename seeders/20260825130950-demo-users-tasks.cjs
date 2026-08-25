'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('Users', [
      { name: 'Ana Reyes', email: 'ana.reyes@itelect2.test', createdAt: now, updatedAt: now },
      { name: 'Miguel Santos', email: 'miguel.santos@itelect2.test', createdAt: now, updatedAt: now },
      { name: 'Liza Cruz', email: 'liza.cruz@itelect2.test', createdAt: now, updatedAt: now }
    ]);

    const users = await queryInterface.sequelize.query(
      'SELECT id, name FROM "Users";',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const idOf = (name) => users.find((u) => u.name === name).id;

    await queryInterface.bulkInsert('Tasks', [
      { title: 'Set up project repo', dueDate: new Date('2026-08-20'), completed: true,
        userId: idOf('Ana Reyes'), createdAt: now, updatedAt: now },
      { title: 'Write GT8 migrations', dueDate: new Date('2026-08-22'), completed: true,
        userId: idOf('Ana Reyes'), createdAt: now, updatedAt: now },
      { title: 'Wire up associations', dueDate: new Date('2026-08-24'), completed: false,
        userId: idOf('Miguel Santos'), createdAt: now, updatedAt: now },
      { title: 'Seed demo data', dueDate: new Date('2026-08-25'), completed: false,
        userId: idOf('Miguel Santos'), createdAt: now, updatedAt: now },
      { title: 'Test all routes in Postman', dueDate: new Date('2026-08-26'), completed: false,
        userId: idOf('Liza Cruz'), createdAt: now, updatedAt: now }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};