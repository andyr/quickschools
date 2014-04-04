function WorkStateModel() {
  this.id;
  this.workId;
  this.studentId;
  this.state; // enum
  this.date = new Date();
  this.comment;
}

Metis.define(WorkStateModel, 'WorkState', 'id', 'workId', 'studentId', 'state', 'date', 'comment');
Metis.defineSortColumn(WorkStateModel, 'date', 'desc');
Metis.createGettersAndSetters(WorkStateModel);