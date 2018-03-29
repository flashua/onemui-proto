const EventEmitter = require('event-emitters/Events.Emitter');
const registry = {};

module.exports = {
  register(modelInterface){
    registry[modelInterface.name] = {
      modelInterface,
      reaction: () => {}
    };
    return () => registry[modelInterface.name] = null
  },
  connect(selectorFn, ...modelNames){
    const reaction = (updatedModelName) => {
      const selectedData = selectorFn(modelNames.reduce((data, name) => {
        data[name] = registry[name] ? registry[name].modelInterface.getDataSnapshot() : null;
        return data;
      }, {}));
      EventEmitter.notify(`${updatedModelName}Updated`, selectedData)
    };

    modelNames.forEach(name => {
      registry[name].reaction = reaction
    });

    reaction()
  },
  update(modelName){
    registry[modelName].reaction(modelName)
  }
};