#! /usr/bin/env node

const commander = require('./commander');
const read = require('./read');
const write = require('./write');
const print = require('./print');

const readFile = async () => {
  let readObject = {todo: [], done: []};
  try {
    readObject = await read.fromAppropriateFile();
  } catch (e) {
    console.log("No previous TODO file found.");
  }

  return readObject;
};

(async () => {
  const item = commander.args.join(' ');
  const todos = await readFile();

  if (item) {
    todos.todo = commander.top ? [item, ...todos.todo] : [...todos.todo, item];
    await write.objectToFile(todos);
  } else {
    const response = await print.itemsInObject(todos);
    if (response.items && response.items.length) {
      todos.todo = todos.todo.filter(item => !response.items.some(responseItem => responseItem === item));
      todos.done = [...todos.done, response.items];
      await write.objectToFile(todos);
    }
  }
})();