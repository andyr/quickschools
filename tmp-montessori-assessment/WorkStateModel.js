function WorkStateModel() {
  this.id;
  this.workId;
  this.state; // enum
  this.date = new Date();
  this.comment;
}

Metis.define(WorkStateModel, 'WorkState', 'id', 'workId', 'state', 'date', 'comment');
Metis.defineSortColumn(WorkStateModel, 'date', 'desc');
Metis.createGettersAndSetters(WorkStateModel);