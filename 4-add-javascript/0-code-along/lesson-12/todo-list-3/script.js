const todoList = [];

// console.log(todoListObject);

renderTodo();

function addTodo() {
  const todoElement = document.querySelector('.js-todo-input');
  const dateElement = document.querySelector('.js-date-input');

  const name = todoElement.value;
  const dueDate = dateElement.value;

  todoList.push({
    // name: name,
    // dueDate: dueDate
    name, 
    dueDate
  });

  renderTodo();

  // reset input text after add new Todo
  todoElement.value = '';
  
  // console.log(todoList);
}

function renderTodo() {

  let htmlTodoList = '';

  // for (let i = 0; i < todoList.length; i++) {
  //   const todoObject = todoList[i];
  //   const {name, dueDate} = todoObject;
  
  todoList.forEach(function(todoObject, index) {
    const {name, dueDate} = todoObject;
    const html = 
        `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button 
          onclick="
            todoList.splice(${index},1);
            renderTodo();"
          class="del-todo-button"
          >Delete</button>
        `;
      htmlTodoList += html;

  });
  
  document.querySelector('.js-todo-list')
    .innerHTML = htmlTodoList;
}