/*
  Step / Algorithm for this part is the same as todo list part 1,
    but instead of displaying it in the console, display it on the page:
    1. Loop through the array
    2. create some html for each todo 
    3. put the html on the web page
*/

const todoLists = ['make dinner', 'wash dishes'];

renderTodoList();

function addTodo() {
  const inputElement = document.querySelector('.js-todo-input');
  const todoName = inputElement.value;

  todoLists.push(todoName);

  renderTodoList();
  
  // reset input text after add new Todo
   inputElement.value= '';
  
  console.log(todoLists);
}

// This function contains code to generate html
function renderTodoList() {
  // Store the result as a variable is technique called: accumulator pattern
  let todoListsHTML = '';

  for (let i = 0; i < todoLists.length; i++) {
    const todo = todoLists[i];
    const html = `<p>${todo}</p>`;
    todoListsHTML += html;
  }

  document.querySelector('.js-todo-list')
  .innerHTML = todoListsHTML;
}

function handleTodoKeydown(event) {
  // console.log(event.key);
  if (event.key === 'Enter') {
    addTodo();
  }
}
