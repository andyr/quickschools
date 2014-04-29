function EditWorkView(worksetId, work) {
  ClassUtil.mixin(EditWorkView, this, Refreshable);
  ClassUtil.mixin(EditWorkView, this, Dialogable);

  this.dialog = new Dialog('Add/Edit Work');
  this.work = work;
  this.workSetId = worksetId;
  this.dialog.setOkCancel(this, 'clickedSave');

  var leftWidth = 120;

  var metisLoader = new MetisLoader('Workset');
  Metis.load(metisLoader, this, function () {
    var worksets = metisLoader.getList();
    var panel = new QueryPanelWidget(leftWidth);
    this.queryFields = new QueryFields(panel, this.work);
  
    panel.addLabel('Description');
    this.queryFields.put('description', new TextAreaWidget());
  
    panel.finish();
  
    if(work) {
      new DeleteOption('Delete', 'Click to delete this work.', this, function () {
        Metis.remove(work, this, function () {
          this.closeDialogBox();
          this.refreshAction.call();
        });
      });
    }

  });
}

EditWorkView.prototype.clickedSave = function () {
  if(this.work == null) {
    this.work = new WorkModel();
  }
  this.work.setWorkSetId( this.workSetId );
  this.work.setDescription(this.queryFields.getValue('description'));

  Metis.save(this.work, this, function () {
    this.closeDialogBox();
    this.refreshAction.call();
  });
};