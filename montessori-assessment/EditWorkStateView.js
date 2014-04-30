function EditWorkStateView(jqfield, workstate, parentView) {
  ClassUtil.mixin(EditWorkStateView, this, Refreshable);
  ClassUtil.mixin(EditWorkStateView, this, Dialogable);

  this.jqfield = jqfield;
  this.workstate = workstate;
  this.parentView = parentView;

  var formattedDate = workstate.getFormattedDate();
  this.dialog = new Dialog(workstate.state + ' on ' + formattedDate);
  this.dialog.setOkCancel(this, 'clickedSave');

  var panel = new QueryPanelWidget(120);
  this.queryFields = new QueryFields(panel, workstate);

  panel.addLabel('Date');
  this.queryFields.put('date', new DateWidget(workstate.getDate()));

  panel.addLabel('Comment');
  this.queryFields.put('comment', new TextAreaWidget());

  panel.finish();

  if(workstate.id) {
    new DeleteOption('Delete', 'Click to delete this item.', this, function () {
      Metis.remove(workstate, this, function () {
        this.closeDialogBox();
        this.updateParentView();
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
    this.updateParentView();
  });
};

EditWorkStateView.prototype.updateParentView = function () {
  this.parentView.setWorkStateField(this.jqfield, [
    new EqFilter('workId', this.jqfield.data('work').id),
    new EqFilter('studentId', this.jqfield.data('student').smsStudentStubId),
    new EqFilter('state', this.jqfield.data('state'))
  ]);
};