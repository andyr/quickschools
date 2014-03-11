function EditVolunteerView(volunteer) {
  // implements a dialog
  ClassUtil.mixin(EditVolunteerView, this, Refreshable);
  ClassUtil.mixin(EditVolunteerView, this, Dialogable);

  // differentiate between add/edit
  this.dialog = new Dialog("Add Volunteer");
  this.dialog.setOkCancel(this, 'clickedSave'); // no args (might need to pass in add/edit)
  this.volunteer = volunteer;

  var leftWidth = 120;
  var panel = new QueryPanelWidget(leftWidth);
  this.queryFields = new QueryFields(panel, this.volunteer);

  panel.addLabel('Name');
  this.queryFields.put('name', new InputFieldWidget(), ['notEmpty']);

  panel.addLabel('Phone');
  this.queryFields.put('phone', new InputFieldWidget(), ['notEmpty']);

  panel.addLabel('Address');
  this.queryFields.put('address', new InputFieldWidget(), ['notEmpty']);

  panel.finish();

}

EditVolunteerView.prototype.clickedSave = function () {
  if(this.volunteer == null) {
    this.volunteer = new VolunteerModel();
  }
  this.volunteer.setName(this.queryFields.getValue('name'));
  this.volunteer.setPhone(this.queryFields.getValue('phone'));
  this.volunteer.setAddress(this.queryFields.getValue('address'));

  Metis.save(this.volunteer, this, function () {
    this.closeDialogBox();
    this.refreshAction.call();
  });

  return false;
};