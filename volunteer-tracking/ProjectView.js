function ProjectView() {

  // Manipulate HTML located in variable "this.widget" as needed here, before display.
  new PageHeaderWidget("Projects");
  var searchWidget = new SearchWidget();
  
  new QuickAddButtonWidget("Add New Project", this, "clickedAddProject");
  new LineBreakWidget();

  // TODO: 
  // Create project model (name, desc, datetime, volunteer id?)
  // lead volunteer (update table relationship)
  // Bind this view to the model
  // Sort table by date



}

ProjectView.prototype.clickedAddProject = function () {

};