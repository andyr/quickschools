function EditWorkSetView(workset) {
  ClassUtil.mixin(EditWorkSetView, this, Refreshable);
  ClassUtil.mixin(EditWorkSetView, this, Dialogable);

  this.dialog = new Dialog('Add/Edit Work Set');
  this.workset = workset;
  this.dialog.setOkCancel(this, 'clickedSave');

  var leftWidth = 120;
  var panel = new QueryPanelWidget(leftWidth);
  this.queryFields = new QueryFields(panel, this.workset);

  panel.addLabel('Name');
  this.queryFields.put('name', new InputFieldWidget(), ['notEmpty']);

  panel.addLabel('Description');
  this.queryFields.put('description', new InputFieldWidget());

  panel.finish();

  if(workset) {
    new DeleteOption('Delete', 'Click to delete this workset.', this, function () {
      Metis.remove(workset, this, function () {
        this.closeDialogBox();
        this.refreshAction.call();
      });
    });
  }

  this.dialog.reposition();
}

EditWorkSetView.prototype.clickedSave = function () {
  if(this.workset == null) {
    this.workset = new WorkSetModel();
  }
  this.workset.setName(this.queryFields.getValue('name'));
  this.workset.setDescription(this.queryFields.getValue('description'));

  Metis.save(this.workset, this, function () {
    this.closeDialogBox();
    this.refreshAction.call();
  });
};