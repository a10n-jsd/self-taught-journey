/*
  Step / Algorithm:
    1. Create array to store todo
    2. When we click 'Add' button, get the text from text box
    3. Add it to array
    4. console.log() the array
    5. clear previous text from text box

    add improvement:
    a. add "enter" key to the input element to submit new todo.
*/
      
const todoList = ['make dinner', 'wash dishes'];

console.log(todoList);

function addTodo() {
  const todoElement = document.querySelector('.js-todo-input');

  todoList.push(todoElement.value);

  // reset input text after add new Todo
  todoElement.value = '';
  
  console.log(todoList);
}

function handleTodoKeydown(event) {
  // console.log(event.key);
  if (event.key === 'Enter') {
    addTodo();
  }
}
