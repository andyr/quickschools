function EditWorkStateView(student, work, workstate) {
  ClassUtil.mixin(EditWorkStateView, this, Refreshable);
  ClassUtil.mixin(EditWorkStateView, this, Dialogable);

  this.workstate = workstate;
  this.work = work;
  this.student = student;

  var formattedDate = workstate.getFormattedDate();
  this.dialog = new Dialog(workstate.state + ' on ' + formattedDate);
  this.dialog.setOkCancel(this, 'clickedSave');

  var panel = new QueryPanelWidget(120);
  this.queryFields = new QueryFields(panel, workstate);

  panel.addLabel('Date');
  this.queryFields.put('date', new DateWidget(new Date()));

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
  this.workstate.setDate(new Date(this.queryFields.getValue('date')));

  Metis.save(this.workstate, this, function () {
    this.closeDialogBox();
    this.refreshAction.call();
  });
};