function ProjectView() {

  // Manipulate HTML located in variable "this.widget" as needed here, before display.
  new PageHeaderWidget("Projects");
  var searchWidget = new SearchWidget();
  
  new QuickAddButtonWidget("Add New Project", this, "clickedAddProject");
  new LineBreakWidget();

  var projectTable = new DataTableWidget(this, 'projectTable');
  searchWidget.setTable(projectTable);

  var volunteers = [];
  var volunteerList = [];
  var metisLoader = new MetisLoader('Volunteers');

  Metis.load(metisLoader, this, function () {
    volunteerList = metisLoader.getList();
    for(var i=0; i<volunteerList.length; i++) {
      volunteers[volunteerList[i].id] = volunteerList[i].name;
    }
    console.log('volunteer list: ', volunteers);

    // render the table
    projectTable.addHeader('Projects', 'name', true);
    projectTable.addColumn(function (project) {
      return project.getName();
    });
  
    // MarkerWidget and DataTableWidget.setPostRender might be useful here
    projectTable.addHeader('Volunteer', 'volunteerId', true);
    projectTable.addColumn(function (project) {
      //new EasySelectorWidget(volunteers, "id", "name");
  
      //return project.getVolunteerId(); // TODO: display the name
      return volunteers[project.getVolunteerId()];
    });
  
    projectTable.addHeader('Description', 'description', true);
    projectTable.addColumn(function (project) {
      return project.getDescription();
    });
  
    projectTable.addHeader('When', 'datetime', true, true, 300);
    projectTable.addColumn(function (project) {
      return project.getDatetime();
    });

  });

  projectTable.renderMetisData(Metis, 'Projects');
  this.projectTable = projectTable;

  this.projectTable.setClickHandler(this, function (project) {
    console.log('edit project dialog');

    var dialog = new EditProjectView(project);
    dialog.setRefreshHandler(this, function () {
      this.projectTable.renderMetisData(Metis, 'Projects');
    });
  });

  //this.projectTable.setPostRender(this, 'mapVolunteers');

}

ProjectView.prototype.clickedAddProject = function () {
  console.log('clickedAddProject fired');
  var dialog = new EditProjectView();

  dialog.setRefreshHandler(this, function () {
    this.projectTable.refreshTable();
  });
};

ProjectView.prototype.mapVolunteers = function () {

};