function SetupView() {
  // list of worksets (add, edit, delete)
  // edit the work for each workset

  new PageHeaderWidget('Setup');
  new QuickAddButtonWidget("Add New WorkSet", this, "clickedAddNewWorkset");
  new LineBreakWidget();

  this.renderWorkSets();

}

SetupView.prototype.renderWorkSets = function () {
  console.log('rendering worksets');
  // Metis.load all worksets, later paginate
}

SetupView.prototype.clickedAddNewWorkset = function () {
  console.log('clicked add new workset...');
}