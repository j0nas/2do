const itemsInObject = items => {
  console.log('TODO:'  + items.todo.map(item => "\n - " + item).join('') + "\n");
  console.log('DONE:'  + items.done.map(item => "\n - " + item).join('') + "\n");
};

module.exports = {
  itemsInObject,
};