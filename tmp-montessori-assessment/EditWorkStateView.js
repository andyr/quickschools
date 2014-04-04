function EditWorkStateView(student, work, workstate) {
  ClassUtil.mixin(EditWorkStateView, this, Refreshable);
  ClassUtil.mixin(EditWorkStateView, this, Dialogable);

  this.workstate = workstate;
  this.work = work;
  this.student = student;

  this.dialog = new Dialog('Add/Edit comment for work ' + workstate.state + 
    ' on ' + workstate.date.getFullYear());
  this.dialog.setOkCancel(this, 'clickedSave');

  var panel = new QueryPanelWidget(120);
  this.queryFields = new QueryFields(panel, workstate);

  panel.addLabel('Comment');
  this.queryFields.put('comment', new TextAreaWidget());

  panel.finish();

  if(workstate.id) {
    new DeleteOption('Delete', 'Click to delete this workstate.', this, function () {
      Metis.remove(workstate, this, function () {
        this.closeDialogBox();
        this.refreshAction.call();
      });
    });
  }
  this.dialog.reposition();
}

EditWorkStateView.prototype.clickedSave = function () {
  this.workstate.setComment(this.queryFields.getValue('comment'));

  Metis.save(this.workstate, this, function () {
    this.closeDialogBox();
    this.refreshAction.call();
  });
};