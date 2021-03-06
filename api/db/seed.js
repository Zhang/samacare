const File = require('../models/File');
const Configuration = require('../models/Configuration');
const Input = require('../models/Input');

const Sequelize = require('sequelize');
const sequelize = require('../db/config');

(async function syncTables() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    // These relationships seem to make the most sense if set w/ the models themselves
    File.belongsTo(Configuration);
    Input.belongsTo(Configuration);
    Configuration.hasOne(File);
    Configuration.hasMany(Input);

    await File.sync({force: true});
    await Configuration.sync({force: true});
    await Input.sync({force: true});
  } catch (e) {
    console.error('Unable to sync tables', e);
    await sequelize.dropAllTables();
  } finally {
    sequelize.close();
  }
})();
