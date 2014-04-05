function WorkSetModel() {
  this.id;
  this.sectionId; // this is null when this workset is unlinked to a subject/section
  this.name = '';
  this.description = '';
}

Metis.define(WorkSetModel, 'WorkSet', 'id', 'sectionId', 'name', 'description');
Metis.defineSortColumn(WorkSetModel, 'name', 'asc');
Metis.createGettersAndSetters(WorkSetModel);