'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Adicionar coluna trunkId à tabela inbound_routes
      await queryInterface.addColumn('inbound_routes', 'trunkId', {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: 'Trunk ID for specific routing'
      });
      
      console.log('Coluna trunkId adicionada com sucesso à tabela inbound_routes');
    } catch (error) {
      console.error('Erro ao adicionar coluna trunkId:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Remover coluna trunkId
      await queryInterface.removeColumn('inbound_routes', 'trunkId');
      
      console.log('Coluna trunkId removida com sucesso da tabela inbound_routes');
    } catch (error) {
      console.error('Erro ao remover coluna trunkId:', error);
      throw error;
    }
  }
};
