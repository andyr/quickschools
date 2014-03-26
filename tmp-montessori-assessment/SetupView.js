function SetupView() {
  // list of worksets (add, edit, delete)
  // edit the work for each workset

  console.log("in Setup View...");

  new PageHeaderWidget('Setup');
  new QuickAddButtonWidget("Add New WorkSet", this, "clickedAddWorkset");
  new LineBreakWidget();

  this.renderWorkSets();

}

SetupView.prototype.renderWorkSets = function () {
  console.log('rendering worksets');
  
  // render workset table: [name, description, edit]; link the name
  var worksetTable = new DataTableWidget(this, 'worksetTable');

  worksetTable.addHeader('Name', 'name', true);
  worksetTable.addColumn(function (workset) {
    return workset.getName();
  });

  worksetTable.addHeader('Description', 'description', true);
  worksetTable.addColumn(function (workset) {
    return workset.getDescription();
  });

  worksetTable.addHeader('', 'Actions');
  worksetTable.addColumn(function (workset) {
    new ButtonWidget('Edit', this, 'clickedEditWorkSet', workset);
  });

  worksetTable.renderMetisData(Metis, 'WorkSet');

  // The row invokes FullPageDialog (edit work in this workset)
  worksetTable.setClickHandler(this, function (workset) {
    console.log('Edit work for workset', workset);

    var dialog = new WorkView(workset);
    dialog.setRefreshHandler(this, function () {
      this.worksetTable.renderMetisData(Metis, 'WorkSet')
    });
  });

  this.worksetTable = worksetTable;

};

SetupView.prototype.clickedAddWorkset = function () {
  console.log('clicked add new workset...');
  var dialog = new EditWorkSetView();
  dialog.setRefreshHandler(this, function () {
    this.worksetTable.refreshTable();
  });
};

SetupView.prototype.clickedEditWorkSet = function (workset) {
  console.log('clicked edit new workset...');
  var dialog = new EditWorkSetView(workset);
  dialog.setRefreshHandler(this, function () {
    this.worksetTable.renderMetisData(Metis, 'WorkSet');
  });
};