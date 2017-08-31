const ask = async () => {
 // const items = await readFile();

  const question = {
    type: 'list',
    name: 'items',
    message: 'TOOD:',
    choices: items.todo,
  };

  const answer = await prompt(question);
  console.log("answer", answer);
};
