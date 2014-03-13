function VolunteerModel() {
	this.id;
  this.name;
  this.phone;
  this.address;
  this.archived;
  this.tableName = 'Volunteers';
}

Metis.define(VolunteerModel, 'Volunteers', 'id', 'name', 'phone', 'address', 'archived');
Metis.defineSortColumn(VolunteerModel, 'name', 'asc');
Metis.createGettersAndSetters(VolunteerModel);

VolunteerModel.prototype.getAll = function (cb) {
  var metisLoader = new MetisLoader(this.tableName);
  Metis.load(metisLoader, this, function () {
    var volunteers = metisLoader.getList();
    console.log('volunteer list: ', volunteers);
    return volunteers;
  });
};

VolunteerModel.prototype.getAllNotArchived = function () {
    // return a list of all non-archived volunteers
};
