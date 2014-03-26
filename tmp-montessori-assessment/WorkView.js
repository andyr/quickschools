function WorkView(workset) {
  // full page dialog manager for Work table
  ClassUtil.mixin(WorkView, this, Refreshable);
  ClassUtil.mixin(WorkView, this, Dialogable);

  // render a filtered metis list for this work set id
  this.dialog = new FullPageDialog('Add/Edit Work');
  new QuickAddButtonWidget('Add Work', this, 'clickedAddWork');

  this.workset = workset;
  var panel = new HorizontalPanelWidget("right", false);
  new DemotedButtonWidget("Close", this.dialog, "close");
  panel.finish();

  this.dialog.resetInsertPosition();

  console.log('Rendering work for workset:', workset);
  this.renderTable(workset.id);

}

WorkView.prototype.renderTable = function (worksetId) {
  var workTable = new DataTableWidget(this, 'workTable');

  workTable.addHeader('workSetId', 'workSetId', true);
  workTable.addColumn(function (work) {
    return work.getWorkSetId();
  });

  workTable.addHeader('Description', 'description', true);
  workTable.addColumn(function (work) {
    return work.getDescription();
  });

  workTable.renderMetisData(Metis, 'Work', new EqFilter('workSetId', worksetId));
  workTable.setClickHandler(this, function (work) {
    console.log('Edit work', work);
    var dialog = new EditWorkView(work);
    dialog.setRefreshHandler(this, function () {
      workTable.renderMetisData(Metis, 'Work', new EqFilter('workSetId', worksetId));
    });
  });

  this.workTable = workTable;
};

WorkView.prototype.clickedAddWork = function () {
  console.log('clicked add work...');
  var dialog = new EditWorkView();

  dialog.setRefreshHandler(this, function () {
    this.workTable.refreshTable();
  });
};