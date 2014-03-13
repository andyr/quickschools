function VolunteerView() {

  // Manipulate HTML located in variable "this.widget" as needed here, before display.
  new PageHeaderWidget("Volunteer Tracking");
  var searchWidget = new SearchWidget();
  
  new QuickAddButtonWidget("Add New Volunteer", this, "clickedAddVolunteer");
  new LineBreakWidget();

  var volunteerTable = new DataTableWidget(this, "volunteerTable");
  searchWidget.setTable(volunteerTable);

  volunteerTable.addHeader("Volunteer", "name", true, true, 300);
  volunteerTable.addColumn(function(volunteer) {
      return volunteer.getName();
  });

  volunteerTable.addHeader("Phone", "phone", true);
  volunteerTable.addColumn(function(volunteer) {
      return volunteer.getPhone();
  });

  volunteerTable.addHeader("Address", "address", true);
  volunteerTable.addColumn(function(volunteer) {
      return volunteer.getAddress();
  });

  volunteerTable.addHeader('', 'Actions');
  volunteerTable.addColumn(function (volunteer) {
    new ButtonWidget('Archive', this, 'clickedArchiveVolunteer', volunteer);
  });

  volunteerTable.renderMetisData(Metis, "Volunteers");
  this.volunteerTable = volunteerTable;

  volunteerTable.setClickHandler(this, function (volunteer) {
    console.log("invoke edit volunteer dialog");

    var dialog = new EditVolunteerView(volunteer);
    dialog.setRefreshHandler(this, function () {
      this.volunteerTable.renderMetisData(Metis, 'Volunteers');
    });
  });

}

// Write class methods like this
VolunteerView.prototype.clickedAddVolunteer = function() {
  console.log("clickedAddVolunteer fired!");
  var dialog = new EditVolunteerView();

  dialog.setRefreshHandler(this, function () {
    this.volunteerTable.refreshTable();
  });
};

VolunteerView.prototype.clickedArchiveVolunteer = function (volunteer) {
  console.log('clicked archive volunteer');
  // set the archived flag to true
  // filter out of the main view
};
