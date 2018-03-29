const nsKeyMirror = require('nsKeyMirror');
const Dispatcher = require('dispatcher');

const Types = nsKeyMirror([
  'ADD_TODO'
]);

module.exports = {
  Types,
  addTodo(args){
    /* do some checks and transform */

    Dispatcher.dispatch({
      type: Types.ADD_TODO,
      payload: {...args}
    })
  }
};