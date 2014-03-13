function VolunteerModel() {
	this.id;
  this.name;
  this.phone;
  this.address;
  this.archived = false;
}

Metis.define(VolunteerModel, 'Volunteers', 'id', 'name', 'phone', 'address', 'archived');
Metis.defineSortColumn(VolunteerModel, 'name', 'asc');
Metis.createGettersAndSetters(VolunteerModel);

VolunteerModel.prototype.getAll = function (cb) {
  var metisLoader = new MetisLoader('Volunteers');
  Metis.load(metisLoader, this, function () {
    var volunteers = metisLoader.getList();
    console.log('volunteer list: ', volunteers);
    return volunteers;
  });
};

VolunteerModel.prototype.getUnArchived = function () {
  // return a list of all non-archived volunteers
  var metisLoader = new MetisLoader('Volunteers');
  Metis.load(metisLoader, this, function () {
    var volunteers = metisLoader.getList();
    var unarchived = [];
    for(var i=0; i<volunteers.length; i++) {
      if(!volunteers[i].archived) {
        // anything falsy
        unarchived.push(volunteers[i]);
      }
    }
    return unarchived;
  });
};
