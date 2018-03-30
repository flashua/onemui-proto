const DataModel = require('./Todo.DataModel');

const cxid = 'Todo';

class TodoView extends BaseView {
  constructor({ parent }) {
    super({ parent, id: cxid });
    this._model = new DataModel();
    this._onUpdateEvent = this._onUpdateEvent.bind(this);
  }

  _onUpdateEvent(reducedData){
    this.render(reducedData)
  }

  createView() {
    super.createView();
  }

  show() {
    this._model.subscribeToUpdates(this._onUpdateEvent);
    this.render();
    super.show();
  }

  pause() {
    this._model.unsubscribeFromUpdates();
  }

  hide() {
    this._model.unsubscribeFromUpdates();
    super.hide();
  }

  render({TodoDomainModelData, OtherTodoDomainModelData}){
    /**
     * render view
     */
  }
}
