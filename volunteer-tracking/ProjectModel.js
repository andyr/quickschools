function ProjectModel() {
  this.id;
  this.volunteerId;
  this.name;
  this.description;
  this.datetime = new Date();
}

Metis.define(ProjectModel, 'Projects', 'id', 'volunteerId', 'name', 'description', 'datetime');
Metis.defineSortColumn(ProjectModel, 'datetime', 'desc');
Metis.createGettersAndSetters(ProjectModel);
