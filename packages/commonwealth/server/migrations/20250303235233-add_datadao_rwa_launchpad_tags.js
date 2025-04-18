'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(
        `
          INSERT INTO public."Tags" 
          (name, created_at, updated_at) 
          values 
          ('DataDAO', now(), now()),
          ('RWA', now(), now()),
          ('Launchpad', now(), now())
        `,
        { transaction },
      );
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(
        `
          DELETE FROM public."Tags" 
          WHERE name IN 
          ('DataDAO', 'RWA', 'Launchpad')
        `,
        { transaction },
      );
    });
  },
};
