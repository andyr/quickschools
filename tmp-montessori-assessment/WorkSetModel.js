function WorkSetModel() {
  this.id;
  this.name = '';
  this.description = '';
}

Metis.define(WorkSetModel, 'WorkSet', 'id', 'name', 'description');
Metis.defineSortColumn(WorkSetModel, 'name', 'asc');
Metis.createGettersAndSetters(WorkSetModel);