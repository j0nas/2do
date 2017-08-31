const path = require('path');
const dateism = require('dateism')('YYYY-MM-DD');

//const dir = '/Users/jonas/Desktop/node-todo';
const dir = '/Users/jonas/Desktop/n';
const todayFile = path.join(dir, dateism.today() + '.json');
const yesterdayFile = path.join(dir, dateism.yesterday() + '.json');

module.exports = {
  dir,
  todayFile,
  yesterdayFile,
};