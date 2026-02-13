require('dotenv').config();
const app = require('./src');
const { sequelize, appConfig } = require('./src/db/config');

const startServer = async () => {
  try {
    console.log('✓ Database connection established');

    const PORT = appConfig.server.port;

    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('✗ Failed to start server:', err.message);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n✗ Shutting down gracefully...');
  await sequelize.close();
  process.exit(0);
});

startServer();
