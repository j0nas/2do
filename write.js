const makeDir = require('make-dir');
const promisify = require('pify');
const jsonFile = promisify(require('jsonfile'));
const constants = require('./constants');

const objectToFile = async object => {
  await makeDir(constants.dir);

  const error = await jsonFile.writeFile(constants.todayFile, object);
  if (error) {
    console.error("Error writing file: ", error);
    throw Error(error);
  }
};

module.exports = {
  objectToFile,
};