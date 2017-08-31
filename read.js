const fs = require('fs');
const path = require('path');
const promisify = require('pify');
const fsReaddir = promisify(fs.readdir);
const jsonFile = promisify(require('jsonfile'));
const constants = require('./constants');

const getDirFilesByLastModified = async directory => {
  return (await fsReaddir(directory))
    .filter(filename => filename.split('.')[1] === 'json')
    .map(fileName => [fileName, new Date(fileName.replace('.json', ''))])
    .sort((a, b) => a[1] - b[1])
    .map(arr => arr[0]);

};

const fromAppropriateFile = async () => {
  try {
    return await jsonFile.readFile(constants.todayFile);
  } catch (err) {
    try {
      return await jsonFile.readFile(constants.yesterdayFile);
    } catch (err) {
      const filesByDate = await getDirFilesByLastModified(constants.dir);
      if (!filesByDate || !filesByDate.length) {
        throw new Error('No filesByDate found!');
      }

      return await jsonFile.readFile(path.join(constants.dir, filesByDate[0]));
    }
  }
};


module.exports = {
  fromAppropriateFile,
};