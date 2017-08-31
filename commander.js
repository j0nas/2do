const commander = require('commander');
const pkg = require('./package.json');

module.exports = showDoneItemsCb => {
  commander
    .version(pkg.version)
    .usage('[options] <to-do item>')
    .option('-t, --top', 'add item to top of list');

  commander
    .command('done')
    .description('show today\'s done items')
    .action(showDoneItemsCb);

  commander
    .parse(process.argv);

  return commander;
};