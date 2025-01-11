const todoList = [];

// console.log(todoListObject);

renderTodo();

document.querySelector('.js-add-button')
  .addEventListener('click', () => {
    addTodo();
})


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
  let index;

  // for (let i = 0; i < todoList.length; i++) {
  //   const todoObject = todoList[i];
  //   const {name, dueDate} = todoObject;

  
  todoList.forEach(function(todoObject) {

    
    const {name, dueDate} = todoObject;
    const html = 
        `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button
          class="del-todo-button js-delete-button"
        >Delete</button>
        `;
      htmlTodoList += html;

  });
  
  document.querySelector('.js-todo-list')
    .innerHTML = htmlTodoList;
  
  // There are problem here:
  // html generated above only a string and
  // we need to add an event after it is generated 
  // (line 62)

  // console.log(document.querySelectorAll('.js-delete-button'));
  // it has an array like: node list.

  document.querySelectorAll('.js-delete-button')
  // .forEach(() => {})
  // .forEach((value, index) => {})
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodo();
      })
  })
}