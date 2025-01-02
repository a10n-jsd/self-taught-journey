const todoListObject = JSON.parse(localStorage.getItem('todoList')) || [];

// console.log(todoListObject);

renderTodo();

function addTodo() {
  const todoElement = document.querySelector('.js-todo-input');
  const dateElement = document.querySelector('.js-date-input');

  const name = todoElement.value;
  const dueDate = dateElement.value;

  todoListObject.push({
    // name: name,
    // dueDate: dueDate
    name, 
    dueDate
  });
  
  // whenever update the todo list, save it to local storage
  saveStorage()

  renderTodo();

  // reset input text after add new Todo
  todoElement.value = '';
  
  // console.log(todoListObject);
}

function renderTodo() {

  let htmlTodoList = '';

  for (let i = 0; i < todoListObject.length; i++) {
    // const name = todoListObject[i].name;
    // const dueDate = todoListObject[i].dueDate;
    const {name, dueDate} = todoListObject[i];
    const html = 
      `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button 
        onclick="
          todoListObject.splice(${i},1);
          
          // whenever update the todo list, save it to local storage
          saveStorage();

          renderTodo();"
        class="del-todo-button"
        >Delete</button>
      `;
    htmlTodoList += html;
  }
  
  document.querySelector('.js-todo-list')
    .innerHTML = htmlTodoList;
}

function saveStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoListObject));
}