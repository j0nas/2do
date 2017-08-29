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
// TODO read from saved file

// v1.1
// TODO save entry 'todo <item to be saved>' [-b,--bottom   send items to bottom of list]

// v2
// TODO sync to firebase?



const writeToFile = async () => {
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

const readFile = async () => {
  let object;
  try {
    object = await jsonFile.readFile(todayFile);
  } catch (err) {
    const files = await fsReaddir(dir);
    console.log("files", files);

    object = await jsonFile.readFile(yesterdayFile);
  }
  console.log("object", object);

};

// const filesByLastModified = async file => [file, (await fsStat(path.join(directory, file))).mtimeMs];

const getDirFilesByLastModified = async directory =>
  (await fsReaddir(directory))
    .map(fileName => [fileName, new Date(fileName.replace('.txt', ''))])
    .sort((a, b) => a[1] - b[1])
    .map(arr => arr[0]);

getDirFilesByLastModified(dir).then(res => console.log(res));