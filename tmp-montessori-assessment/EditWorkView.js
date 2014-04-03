function EditWorkView(workSetId, work) {
  // @required: workSetId: metadata passed from the workset view
  // @optional: work: work item being edited; null if adding new
  ClassUtil.mixin(EditWorkView, this, Refreshable);
  ClassUtil.mixin(EditWorkView, this, Dialogable);

  this.dialog = new Dialog('Add/Edit Work');
  this.work = work;
  this.dialog.setOkCancel(this, 'clickedSave');

  var leftWidth = 120;

  var metisLoader = new MetisLoader('Workset');
  Metis.load(metisLoader, this, function () {
    var worksets = metisLoader.getList();
    var panel = new QueryPanelWidget(leftWidth);
    this.queryFields = new QueryFields(panel, this.work);
  
    //  panel.addLabel('WorkSet');
    //  this.queryFields.put('workSetId', new DropDownWidget(worksets, 'id', 'name'));
  
    panel.addLabel('Description');
    this.queryFields.put('description', new InputFieldWidget());
  
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
    //this.work.workSetId = this.queryFields.getValue('workSetId');
  }
  this.work.setWorkSetId( this.work.workSetId );
  this.work.setDescription(this.queryFields.getValue('description'));

  Metis.save(this.work, this, function () {
    this.closeDialogBox();
    this.refreshAction.call();
  });
};