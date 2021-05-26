//Seletores
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);

//Funções
function addTodo(event) {

    //Previne o form de dar submit, o que resultaria no refresh da página
    event.preventDefault();

    //Criar DIV com a classe .todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Criar LIs com a classe .todo-item
    const newTodo = document.createElement('li');
    //Será criado o li com o texto digitado no input
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    //Append (por dentro) da div .todo
    todoDiv.appendChild(newTodo);

    //Adicionar todo no localStorage
    saveLocalTodos(todoInput.value);

    //Botão de tarefa cumprida
    const completedButton = document.createElement('button');
    //Adiciona pelo innerHTML a tag i com o ícone
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    //Append (por dentro) da div .todo
    todoDiv.appendChild(completedButton); 

    //Botão para exlcluir a fazeres
    const trashButton = document.createElement('button');
    //Adiciona pelo innerHTML a tag i com o ícone
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    //Append (por dentro) da div .todo
    todoDiv.appendChild(trashButton);

    //Append (por dentro) da .todo-list
    todoList.appendChild(todoDiv);

    //Limpar valor do .todo-input
    todoInput.value = '';

};

function deleteCheck(event) {

    event.preventDefault();

    const item = event.target;

    //Deletar a fazeres
    //Se onde eu clicar tiver a classe trash-btn entao é feito o If
    if(item.classList[0] === 'trash-btn') {
        //Cria-se uma const que pega o elemento parente do .item, que no caso é onde eu clicar pelo event.target
        const todo = item.parentElement;
        //Criar classe para fazer a animação de caída do a fazer deletado
        todo.classList.add('fall');
        //Remove todos do array dentro do local storage
        removeLocalTodos(todo);
        //Após a animação é completada, é removido o .todo
        todo.addEventListener('transitionend', () =>{
            todo.remove();
        });
    };

    //Botão check para marcar com completo
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        //Quando clicado o botão .complete-btn, é feito o toggle para adicionar ou remover a classe .completed
        todo.classList.toggle('completed');
    };

};

function filterTodo(e) {

    const todos = todoList.childNodes;

    todos.forEach(todo => {
        switch(e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                };
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                };
                break;
        };
    }); 

};

function saveLocalTodos(todo) {

    let todos;

    //Checar pra ver se já existe todos no localStorage
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    };

    //Adicionar novo todo para o localStorage
    todos.push(todo);

    //Criando o novo item no array e usando JSON para converter em string novamente
    localStorage.setItem('todos', JSON.stringify(todos));

};

function getTodos() {

    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    };

    todos.forEach(todo => {

        //Criar DIV com a classe .todo
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Criar LIs com a classe .todo-item
        const newTodo = document.createElement('li');
        //Será criado o li com o texto digitado no input
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        //Append (por dentro) da div .todo
        todoDiv.appendChild(newTodo);

        //Botão de tarefa cumprida
        const completedButton = document.createElement('button');
        //Adiciona pelo innerHTML a tag i com o ícone
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        //Append (por dentro) da div .todo
        todoDiv.appendChild(completedButton); 

        //Botão para exlcluir a fazeres
        const trashButton = document.createElement('button');
        //Adiciona pelo innerHTML a tag i com o ícone
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        //Append (por dentro) da div .todo
        todoDiv.appendChild(trashButton);

        //Append (por dentro) da .todo-list
        todoList.appendChild(todoDiv);

    }); 

};

function removeLocalTodos(todo) {

    //Função para remover do array do localStorage os as fazeres salvos
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    };

    //Pegando o texto e o número de index dentro do array "todo"
    const indexTodo = todo.children[0].innerText;
    
    //Excluindo do array
    todos.splice(todos.indexOf(indexTodo), 1);

    localStorage.setItem('todos', JSON.stringify(todos));

};