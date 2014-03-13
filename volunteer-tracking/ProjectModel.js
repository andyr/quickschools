function ProjectModel() {
  this.id;
  this.volunteerId;
  this.name;
  this.description;
  this.datetime;
}

Metis.define(ProjectModel, 'Projects', 'id', 'name', 'description', 'datetime');
Metis.defineSortColumn(ProjectModel, 'datetime', 'desc');
Metis.createGettersAndSetters(ProjectModel);
