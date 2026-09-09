'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const adminPassword = await bcrypt.hash('admin123', 10);
    const anaPassword = await bcrypt.hash('ana12345', 10);
    const miguelPassword = await bcrypt.hash('miguel123', 10);

    await queryInterface.bulkInsert('Users', [
      { name: 'Admin User', email: 'admin@itelect2.test', password: adminPassword, role: 'admin',
        createdAt: now, updatedAt: now },
      { name: 'Ana Reyes', email: 'ana.reyes@itelect2.test', password: anaPassword, role: 'member',
        createdAt: now, updatedAt: now },
      { name: 'Miguel Santos', email: 'miguel.santos@itelect2.test', password: miguelPassword, role: 'member',
        createdAt: now, updatedAt: now }
    ]);

    const users = await queryInterface.sequelize.query(
      'SELECT id, name FROM "Users";',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const idOf = (name) => users.find((u) => u.name === name).id;

    await queryInterface.bulkInsert('Tasks', [
      { title: 'Set up project repo', dueDate: new Date('2026-08-20'), completed: true,
        userId: idOf('Ana Reyes'), createdAt: now, updatedAt: now },
      { title: 'Wire up associations', dueDate: new Date('2026-08-24'), completed: false,
        userId: idOf('Miguel Santos'), createdAt: now, updatedAt: now }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};