const EventEmitter = require('event-emitters/Events.Emitter');
const registry = {};

module.exports = {
  register(modelInterface){
    registry[modelInterface.name] = {
      modelInterface,
      reactions: []
    };
    return () => registry[modelInterface.name] = null
  },
  connect(selectorFn, ...modelNames){
    
    const reaction = (updatedModelName) => {
      const selectedData = selectorFn(modelNames.reduce((data, modelName) => {
        data[modelName + 'Data'] = registry[modelName] ? registry[modelName].modelInterface.getDataSnapshot() : null;
        return data;
      }, {}));
      EventEmitter.notify(`${updatedModelName}Updated`, selectedData)
    };

    modelNames.forEach(name => {
      registry[name].reactions.push(reaction)
    });

    reaction()
  },
  update(modelName){
    registry[modelName].reactions.forEach(reaction => reaction(modelName))
  }
};
