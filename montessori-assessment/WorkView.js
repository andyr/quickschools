function WorkView(workset) {
  // full page dialog manager for Work table
  ClassUtil.mixin(WorkView, this, Refreshable);
  ClassUtil.mixin(WorkView, this, Dialogable);

  this.dialog = new FullPageDialog('Add/Edit Work');

  new RecordHeaderWidget(workset.name + " Work Items");
  new QuickAddButtonWidget('Add Work', this, 'clickedAddWork', workset.id);

  this.workset = workset;
  var panel = new HorizontalPanelWidget("right", false);
  new DemotedButtonWidget("Close", this.dialog, "close");
  panel.finish();
  new LineBreakWidget();

  this.dialog.resetInsertPosition();

  console.log('Rendering work for workset:', workset);
  this.renderTable(workset.id);

}

WorkView.prototype.renderTable = function (worksetId) {
  var workTable = new DataTableWidget(this, 'workTable');

  workTable.addHeader('Description', 'description', true);
  workTable.addColumn(function (work) {
    return work.getDescription();
  });

  workTable.addHeader('', 'Actions');
  workTable.addColumn(function (work) {
    new ButtonWidget('Edit', this, 'clickedEditWork', worksetId, work);
  });

  workTable.renderMetisData(Metis, 'Work', new EqFilter('workSetId', worksetId));
  this.workTable = workTable;
};

WorkView.prototype.clickedEditWork = function (worksetId, work) {
  var dialog = new EditWorkView(work);
  dialog.setRefreshHandler(this, function () {
    this.workTable.renderMetisData(Metis, 'Work', new EqFilter('workSetId', work.workSetId));
  });
};

WorkView.prototype.clickedAddWork = function (worksetId) {
  console.log('clicked add work...');

  var dialog = new EditWorkView();
  dialog.setRefreshHandler(this, function () {
    this.workTable.refreshTable();
  });
};