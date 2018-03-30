const Registry = require('connect');

class TodoDataModel extends BaseDataModel{
  constructor(){
    super();
    this._data = {};
    Registry.connect(this.selector.bind(this), 'TodoDomainModel', 'OtherTodoDomainModel');
  }

  selector({TodoDomainModel, OtherTodoDomainModel}) {
    /**
     * all data from linked models goes here in Data arg
     */
    this._data = {TodoDomainModel, OtherTodoDomainModel};
    return data;
  }

  getUpdateEvents(){
    return [ 'TodoDomainModelUpdated', 'OtherTodoDomainModelUpdated' ]
  }
}
