function WorkView(workset) {
  // full page dialog manager for Work table
  ClassUtil.mixin(WorkView, this, Refreshable);
  ClassUtil.mixin(WorkView, this, Dialogable);

  // render a filtered metis list for this work set id
  this.dialog = new FullPageDialog('Add/Edit Work');

  new PageHeaderWidget(workset.name + " Work Items");
  new QuickAddButtonWidget('Add Work', this, 'clickedAddWork');

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

  // TODO: remove this column when done testing
  workTable.addHeader('workSetId', 'workSetId', true);
  workTable.addColumn(function (work) {
    return work.getWorkSetId();
  });

  workTable.addHeader('Description', 'description', true);
  workTable.addColumn(function (work) {
    return work.getDescription();
  });

  workTable.addHeader('', 'Actions');
  workTable.addColumn(function (work) {
    new ButtonWidget('Edit', this, 'clickedEditWork', work);
  });

  workTable.renderMetisData(Metis, 'Work', new EqFilter('workSetId', worksetId));
  // These rows aren't clickable (consistency)
  //workTable.setClickHandler(this, function (work) {
  //  console.log('Edit work', work);
  //  var dialog = new EditWorkView(work);
  //  dialog.setRefreshHandler(this, function () {
  //    workTable.renderMetisData(Metis, 'Work', new EqFilter('workSetId', worksetId));
  //  });
  //});

  this.workTable = workTable;
};

WorkView.prototype.clickedEditWork = function (work) {
  var dialog = new EditWorkView(work);
  dialog.setRefreshHandler(this, function () {
    this.workTable.renderMetisData(Metis, 'Work', new EqFilter('workSetId', work.workSetId));
  });
};

WorkView.prototype.clickedAddWork = function () {
  console.log('clicked add work...');

  var dialog = new EditWorkView();
  dialog.setRefreshHandler(this, function () {
    this.workTable.refreshTable();
  });
};