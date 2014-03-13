function EditProjectView(project) {
  ClassUtil.mixin(EditProjectView, this, Refreshable);
  ClassUtil.mixin(EditProjectView, this, Dialogable);

  this.dialog = new Dialog('Add Project');
  this.dialog.setOkCancel(this, 'clickedSave');
  this.project = project;

  var _this = this;
  var leftWidth = 120;
  var panel = new QueryPanelWidget(leftWidth);
  this.queryFields = new QueryFields(panel, this.project);

  function addFieldToPanel(label, column) {
    panel.addLabel(label);
    _this.queryFields.put(column, new InputFieldWidget(), ['notEmpty']);
  }

  addFieldToPanel('Name', 'name');
  addFieldToPanel('Description', 'description');
  addFieldToPanel('Project Lead', 'volunteerId'); // add by id?
  addFieldToPanel('When', 'datetime');

  panel.finish();

}

EditProjectView.prototype.clickedSave = function () {
  if(this.project == null) {
    this.project = new ProjectModel();
  }
  this.project.setName(this.queryFields.getValue('name'));
  this.project.setDescription(this.queryFields.getValue('description'));
  this.project.setVolunteerId(this.queryFields.getValue('volunteerId'));
  this.project.setDatetime((new Date()).toDateString()); // Not sure if this will sort properly

  Metis.save(this.project, this, function () {
    this.closeDialogBox();
    this.refreshAction.call();
  });
};