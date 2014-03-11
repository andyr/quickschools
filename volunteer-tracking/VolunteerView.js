function VolunteerView() {
  ClassUtil.inherit(VolunteerView, this, Widget);
  this._super("VolunteerView");

  // Manipulate HTML located in variable "this.widget" as needed here, before display.
  new PageHeaderWidget("Volunteer Tracking");
  var searchWidget = new SearchWidget();
  
  new QuickAddButtonWidget("Add New Volunteer", this, "clickedAddVolunteer");
  new LineBreakWidget();

  var volunteerTable = new DataTableWidget(this, "volunteerTable");
  searchWidget.setTable(volunteerTable);

  volunteerTable.addHeader("Volunteer", "name", true, 300);
  volunteerTable.addColumn(function(volunteer) {
      return volunteer.getName();
  });

  volunteerTable.renderMetisData(Metis, "VolunteerModel");
  this.volunteerTable = volunteerTable;

  volunteerTable.setClickHandler(this, function (volunteer) {
    console.log("invoke edit volunteer dialog");
    /*
        var dialog = new EditMeal("edit", meal);
        dialog.setRefreshHandler(this, function() {
            this.mealTable.renderMetisData(Metis, "Meals");
        });
    */
  });

  // This attaches the HTML to the current insert location
  this.attach();
}

// Write class methods like this
VolunteerView.prototype.clickedAddVolunteer = function() {

};
