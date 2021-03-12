const form = document.querySelector('#form');
const input = document.querySelector('#input');
const output = document.querySelector('#output');
const error = document.querySelector('.error');
let todos = [];

const fetchTodos = () => {
  fetch('https://jsonplaceholder.typicode.com/todos/?_limit=10')
    .then(result => result.json())
    .then(data => {
      todos = data;
      listTodos();
    })
}

fetchTodos();

const listTodos = () => {
  output.innerHTML = '';
  todos.forEach(todo => {
   newTodo(todo);
  })
}

const newTodo = (todo) => {
  let todoItem = document.createElement('li');
  todoItem.classList.add('listItem');
  let errorCheck = document.createElement('small');
  errorCheck.classList.add('no-see');
  errorCheck.innerText = 'error text here'
  let liContent = document.createElement('div');
  liContent.classList.add('listContent');
  let title = document.createElement('h3');
  title.innerText = todo.title;
  let flexContainer = document.createElement('div');
  flexContainer.classList.add('flexContainer');
  let deleteButton = document.createElement('button');
  deleteButton.classList.add('buttn', 'buttn-delete');
  deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
  deleteButton.addEventListener('click', function() {
    if(todo.completed) {
      deleteItem(todo.id);
    }
    else { 
      errorCheck.innerText = 'You can\'t delete an item without first marking it as done!'
      errorCheck.classList.remove('no-see');
      setTimeout(() => errorCheck.classList.add('no-see'), 3000);
    }
  })
  let checkButton = document.createElement('button');
  checkButton.classList.add('buttn');
  checkButton.innerHTML = '<i class="far fa-check-square"></i>'; 
  checkButton.addEventListener('click', () => {
    checkToggle(todo.id)
  })
 
  if(todo.completed) {
    liContent.classList.add('completed')
    }
  flexContainer.appendChild(checkButton);
  flexContainer.appendChild(deleteButton);
  liContent.appendChild(title);
  liContent.appendChild(flexContainer);
  todoItem.appendChild(liContent);
  todoItem.appendChild(errorCheck);
  output.appendChild(todoItem);

}

const createTodo = (title) => {
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    
    let newTodo = {
      ...data,
      id: Date.now().toString()
    }
    todos.unshift(newTodo);
    listTodos();
  })
}

const deleteItem = (id) => {
  let index = todos.findIndex(x => x.id === id);
  todos.splice(index,1);
  listTodos();
}

const checkToggle = (id) => {
  let index = todos.findIndex(x => x.id === id);
  todos[index].completed = !todos[index].completed;
  listTodos();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if(input.value === ''){
    error.innerText = 'You can\'t add an empty todo!'
    error.classList.remove('no-see');
    setTimeout(() => error.classList.add('no-see'), 3000);
  } else {
    createTodo(input.value);
    form.reset();
  }

  
})