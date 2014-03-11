function VolunteerModel() {
	this.id;
  this.name;
  this.phone;
  this.address;
  this.archived;
}

Metis.define(VolunteerModel, 'Volunteers', 'id', 'name', 'phone', 'address', 'archived');
Metis.defineSortColumn(VolunteerModel, 'name', 'asc');
Metis.createGettersAndSetters(VolunteerModel);

VolunteerModel.prototype.getAll = function () {
  
};

VolunteerModel.prototype.getAllNotArchived = function () {
    // return a list of all non-archived volunteers
};
