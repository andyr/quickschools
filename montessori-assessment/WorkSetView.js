function WorkSetView() {
  console.log('rendering worksets');
  
  new QuickAddButtonWidget("Add New WorkSet", this, "clickedAddWorkset");
  new LineBreakWidget();

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

WorkSetView.prototype.clickedAddWorkset = function () {
  console.log('clicked add new workset...');
  var dialog = new EditWorkSetView();
  dialog.setRefreshHandler(this, function () {
    this.worksetTable.refreshTable();
  });
};

WorkSetView.prototype.clickedEditWorkSet = function (workset) {
  console.log('clicked edit new workset...');
  var dialog = new EditWorkSetView(workset);
  dialog.setRefreshHandler(this, function () {
    this.worksetTable.renderMetisData(Metis, 'WorkSet');
  });
};