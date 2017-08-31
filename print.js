const inquirer = require('inquirer');

const itemsInObject = async items =>
  await inquirer.prompt([{
    type: 'checkbox',
    name: 'items',
    message: 'todo:',
    choices: items.todo,
  }]);

module.exports = {
  itemsInObject,
};