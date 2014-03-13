function VolunteerView() {

  // Manipulate HTML located in variable "this.widget" as needed here, before display.
  // refactor
  // - move render into a separate function
  // - setup a loader and filter
  // - call table on filtered dataset

  this.render();

}

VolunteerView.prototype.render = function () {
  // refreshTable() fails if using DataTableWidget with a list, so re-rendering like this.
  //var loader = new InlineLoadingWidget("Loading volunteers...");
  //
  //var metisLoader = new MetisLoader("Volunteers");
  //// Note: platform doesn't support filtering on null values
  //metisLoader.setFilters([new EqFilter('archived', false)]);
//
  //Metis.load(metisLoader, this, function() {
  //    var volunteers = metisLoader.getList();
  //    console.log("all volunteers: ", volunteers);
  //    loader.close();
  //    this.renderTable(volunteers);
  //});
  this.renderTable();
};

VolunteerView.prototype.renderTable = function (volunteers) {
  new PageHeaderWidget("Volunteers");
  var searchWidget = new SearchWidget();
  
  new QuickAddButtonWidget("Add New Volunteer", this, "clickedAddVolunteer");
  new LineBreakWidget();

  var volunteerTable = new DataTableWidget(this, "volunteerTable");
  searchWidget.setTable(volunteerTable);

  volunteerTable.addHeader("Id", "id", true);
  volunteerTable.addColumn(function(volunteer) {
      return volunteer.getId();
  });

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

  //volunteerTable.renderMetisData(Metis, "Volunteers");
  volunteerTable.renderMetisData(Metis, 'Volunteers', new EqFilter('archived', false))
  //volunteerTable.renderList(volunteers);
  this.volunteerTable = volunteerTable;

  volunteerTable.setClickHandler(this, function (volunteer) {
    console.log("invoke edit volunteer dialog");

    var dialog = new EditVolunteerView(volunteer);
    dialog.setRefreshHandler(this, function () {
      //volunteerTable.renderList(volunteers);
      this.volunteerTable.renderMetisData(Metis, 'Volunteers', new EqFilter('archived', false));
    });
  });
};

// Write class methods like this
VolunteerView.prototype.clickedAddVolunteer = function() {
  console.log("clickedAddVolunteer fired!");
  var dialog = new EditVolunteerView();

  dialog.setRefreshHandler(this, function () {
    this.volunteerTable.refreshTable();
    //this.render();
  });
};

VolunteerView.prototype.clickedArchiveVolunteer = function (volunteer) {
  console.log('clicked archive volunteer', volunteer);

  volunteer.setArchived(true);

  Metis.save(volunteer, this, function () {
    console.log('changed archived state; refreshing table...');
    this.volunteerTable.refreshTable();
    //this.render();
  });

  // filter out of the main view
};
