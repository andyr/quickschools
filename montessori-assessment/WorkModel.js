function WorkModel() {
  this.id;
  this.workSetId; // key back to a workset
  this.sortOrder = 0;
  this.description = '';
  // this.workstate = new MapClass(); // dates for presented, practiced, mastered
}

Metis.define(WorkModel, 'Work', 'id', 'workSetId', 'description', 'sortOrder');
Metis.defineSortColumn(WorkModel, 'sortOrder', 'asc');
Metis.createGettersAndSetters(WorkModel);