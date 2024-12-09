const { Sequelize } = require('sequelize');

// Database connection configuration
const sequelize = new Sequelize('teleafya_clinics', 'teleafyabackend', 'teleafyabackend', {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');


    }
   catch (error) {
    console.error('Unable to connect to the database or create events:', error);
  }
}

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized successfully');
    // Call the testConnection function after synchronizing the database
    testConnection();
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

// Export the Sequelize instance
module.exports = sequelize;
