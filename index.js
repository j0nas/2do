const makeDir = require('make-dir');
const promisify = require('pify');
const jsonFile = promisify(require('jsonfile'));
const path = require('path');
const dateism = require('dateism')('YYYY-MM-DD');
const fs = require('fs');

const fsStat = promisify(fs.stat);
const fsReaddir = promisify(fs.readdir);

//const dir = '/Users/jonas/Desktop/node-todo';
const dir = '/Users/jonas/Desktop/n';
const todayFile = path.join(dir, dateism.today() + '.json');
const yesterdayFile = path.join(dir, dateism.yesterday() + '.json');

// xTODO establish common format for serializing/deserialzing
// xTODO save to file
// xTODO read from saved file
// TODO list items as bullet points
// TODO list done items as separate points
// TODO mark item as done

// v1.1
// TODO save entry 'todo <item to be saved>' [-b,--bottom   send items to bottom of list]

// v2
// TODO sync to firebase?



const writeFile = async () => {
  await makeDir(dir);

  const writeObject = {
    todo: ['one', 'two', 'three'],
    done: ['four', 'five', 'six'],
  };

  const error = await jsonFile.writeFile(todayFile, writeObject);
  if (error) {
    console.log("Error writing file: ", error);
    throw Error(error);
  }
};

const getDirFilesByLastModified = async directory => {
  return (await fsReaddir(directory))
    .filter(filename => filename.split('.')[1] === 'json')
    .map(fileName => [fileName, new Date(fileName.replace('.json', ''))])
    .sort((a, b) => a[1] - b[1])
    .map(arr => arr[0]);
};

const readFile = async () => {
  try {
    return await jsonFile.readFile(todayFile);
  } catch (err) {
    try {
      return await jsonFile.readFile(yesterdayFile);
    } catch (err) {
      const filesByDate = await getDirFilesByLastModified(dir);
      if (!filesByDate || !filesByDate.length) {
        throw new Error('No filesByDate found!');
      }

      return await jsonFile.readFile(path.join(dir, filesByDate[0]));
    }
  }
};

const printItems = async () => {
  const items = await readFile();

  console.log('TODO:'  + items.todo.map(item => "\n - " + item).join('') + "\n");
  console.log('DONE:'  + items.todo.map(item => "\n - " + item).join('') + "\n");
};