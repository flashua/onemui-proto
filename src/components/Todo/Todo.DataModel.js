const Registry = require('connect');

class TodoDataModel extends BaseDataModel{
  constructor(){
    super();
    this._data = {};
    Registry.connect(this.reducer.bind(this), 'TodoDomainModel', 'OtherTodoDomainModel');
  }

  reducer(data) {
    /**
     * all data from linked models goes here in Data arg
     */
    this._data = {...data};
    return data;
  }

  getUpdateEvents(){
    return [ 'TodoDomainModelUpdated', 'OtherTodoDomainModelUpdated' ]
  }
}