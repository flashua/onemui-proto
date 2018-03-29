const Observer = require('Observer');

const Dispatcher = new Observer('Dispatcher');

module.exports = {
  dispatch(action){
    Dispatcher.notify(action.type, action.payload)
  },
  register(actionType, callback){
    const token  = Dispatcher.observe(callback, actionType);
    return () => Dispatcher.unObserve(token, actionType)
  }
};