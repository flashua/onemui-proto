const Registry = require('connect');
const Dispatcher = require('dispatcher');
const {Types} = require('actions/Todo.Actions');

const TodoService = require('TodoService');

const TodoList = [{
  name: 'test',
  due: 'Myself'
}];

let isLoading = false;

function getTodoList() {
  return [...TodoList]
}

function createTodo(todo) {
  isLoading = true;
  Registry.update(ModelInterface.name);
  return TodoService.create(todo).then(() => {
        TodoList.push(todo);
        Registry.update(ModelInterface.name);
      }
  )
}

module.exports = {
  getTodoList,
  createTodo
};

/* end of well known part */

const ModelInterface = {
  name: 'TodoDomainModel',
  getDataSnapshot(){
    return { todoList: getTodoList(), todoLoading : isLoading}
  }
};

Registry.register(ModelInterface);

Dispatcher.register(Types.ADD_TODO, (action) => {
  createTodo(action.payload)
});
