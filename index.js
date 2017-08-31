const commander = require('./commander');
const read = require('./read');
const write = require('./write');
const print = require('./print');

const program = async () => {
  const todo = commander.args.join(' ');

  let readObject;
  try {
    readObject = await read.fromAppropriateFile();
  } catch (e) {
    console.log("No previous TODO file found.");
    readObject = { todo: [], done: [] };
  }

  if (todo) {
    readObject.todo = [...readObject.todo, todo];
    await write.objectToFile(readObject);
    console.log("Added todo.");
  } else {
    print.itemsInObject(readObject);
  }
};

program();