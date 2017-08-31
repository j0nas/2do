const os = require('os');
const path = require('path');
const dateism = require('dateism')('YYYY-MM-DD');

const dir = path.join(os.homedir(), '2do');
const todayFile = path.join(dir, dateism.today() + '.json');
const yesterdayFile = path.join(dir, dateism.yesterday() + '.json');

module.exports = {
  dir,
  todayFile,
  yesterdayFile,
};