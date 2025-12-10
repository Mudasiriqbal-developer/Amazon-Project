let input = document.querySelector('.input');
let addBtn = document.querySelector('.addBtn');
let list = document.querySelector('.list');
let addTodo = document.querySelector('.add-todo-list');
let date = document.querySelector('.due-date');

const todoList = [{
  name:'',
  dueDate: ''
}, {
  name: '',
  dueDate: ''
}];

function renderTodoList() {
  let todoListHTML = '';

  for(let i=0; i<todoList.length; i++) {
    const todoObject = todoList[i];
    const {name, dueDate} = todoObject;
    const html = `
    <p>${name} ${dueDate}
      <button onclick="
        todoList.splice(${i}, 1)
        renderTodoList();
        ">Delete
      </button>
    </p>`;
    todoListHTML += html;
  } 
  addTodo.innerHTML = todoListHTML;
}

addBtn.addEventListener('click', () => {
  let name = input.value;
  const dueDate = date.value;
  todoList.push({
    name: name,
   dueDate: dueDate
});
  
  input.value = '';
  renderTodoList();
});

input.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
    let name = input.value;
    todoList.push(name);
    input.value = '';
    renderTodoList();
  }
})