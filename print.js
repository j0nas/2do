const inquirer = require('inquirer');

const itemsInObject = async items =>
  await inquirer.prompt([{
    type: 'checkbox',
    name: 'items',
    message: 'todo:',
    choices: items.todo,
  }]);

const staticList = (prefix, items) =>
  console.log(prefix + ' ' + (items || []).map(item => "\n - " + item).join('') + "\n");

module.exports = {
  itemsInObject,
  staticList,
};