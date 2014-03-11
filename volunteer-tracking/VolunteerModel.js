function VolunteerModel() {
	this.id = null;
    this.name = '';
    this.phone = '';
    this.address = '';
    this.archived = false;
}

Metis.define(VolunteerModel, 'Volunteers', 'id', 'name', 'phone');
Metis.defineSortColumn(VolunteerModel, 'name', 'asc');
Metis.createGettersAndSetters(VolunteerModel);

// TODO: this is implicitly created by createGettersAndSetters()
VolunteerModel.prototype.isArchived = function() {

};

VolunteerModel.prototype.getAll = function () {
    
};

VolunteerModel.prototype.getAllNotArchived = function () {
    // return a list of all non-archived volunteers
};
