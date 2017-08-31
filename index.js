#! /usr/bin/env node

const read = require('./read');
const write = require('./write');
const print = require('./print');
const commander = require('./commander');

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
  const todos = await readFile();
  const printDoneItems = () => print.staticList('DONE:', todos && todos.done);
  const program = commander(printDoneItems);

  const item = program.args.join(' ');

  if (item) {
    todos.todo = program.top ? [item, ...todos.todo] : [...todos.todo, item];
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