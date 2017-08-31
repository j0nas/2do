const commander = require('commander');
const pkg = require('./package.json');

commander
  .version(pkg.version)
  .usage('[options] <to-do item>')
  .option('-t, --top', 'add item to top of list')
  .parse(process.argv);

module.exports = commander;