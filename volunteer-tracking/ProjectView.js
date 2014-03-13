function ProjectView() {

  // Manipulate HTML located in variable "this.widget" as needed here, before display.
  new PageHeaderWidget("Projects");
  var searchWidget = new SearchWidget();
  
  new QuickAddButtonWidget("Add New Project", this, "clickedAddProject");
  new LineBreakWidget();

  var projectTable = new DataTableWidget(this, 'projectTable');
  searchWidget.setTable(projectTable);

  projectTable.addHeader('Projects', 'name', true, 300);
  projectTable.addColumn(function (project) {
    return project.getName();
  });

  // TODO: not sure how to retrieve this during table rendering, render the table first, 
  // figure out which projects were rendered, then load the volunteers, 
  // then insert the volunteer names (which appear slightly delayed).
  // MarkerWidget and DataTableWidget.setPostRender might be useful here
  projectTable.addHeader('Project Lead', 'volunteerId');
  projectTable.addColumn(function (project) {
    return project.getVolunteerId();
  });

  projectTable.addHeader('When', 'datetime', true, 300);
  projectTable.addColumn(function (project) {
    return project.getDatetime();
  });

  projectTable.renderMetisData(Metis, 'Projects');
  this.projectTable = projectTable;

  projectTable.setClickHandler(this, function (project) {
    console.log('edit project dialog');

    var dialog = new EditProjectView(project);
    dialog.setRefreshHandler(this, function () {
      this.projectTable.renderMetisData(Metis, 'Projects');
    });
  });

  // TODO: add edit handler (updating project lead)

  // TODO: lead volunteer (update table relationship)
  // Test: Sort table by date
  // Test: edit project lead

}

ProjectView.prototype.clickedAddProject = function () {
  console.log('clickedAddProject fired');
  var dialog = new EditProjectView();

  dialog.setRefreshHandler(this, function () {
    this.projectTable.refreshTable();
  });
};