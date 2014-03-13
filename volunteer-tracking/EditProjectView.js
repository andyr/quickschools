function EditProjectView(project) {
  ClassUtil.mixin(EditProjectView, this, Refreshable);
  ClassUtil.mixin(EditProjectView, this, Dialogable);

  this.dialog = new Dialog('Add Project');
  this.dialog.setOkCancel(this, 'clickedSave');
  this.project = project;

  var volunteerList = [];
  var _this = this;
  var leftWidth = 120;

  var metisLoader = new MetisLoader('Volunteers');
  Metis.load(metisLoader, this, function () {
    volunteerList = metisLoader.getList();

    // setup pane after volunteers are loaded
    var panel = new QueryPanelWidget(leftWidth);
    this.queryFields = new QueryFields(panel, this.project);
  
    function addFieldToPanel(label, column) {
      panel.addLabel(label);
      _this.queryFields.put(column, new InputFieldWidget(), ['notEmpty']);
    }
  
    addFieldToPanel('Name', 'name');
    addFieldToPanel('Description', 'description');

    panel.addLabel('Volunteer');
    this.queryFields.put('volunteerId', 
                        new DropDownWidget(volunteerList, "id", "name"), 
                        ['notEmpty']);
  
    //addFieldToPanel('When', 'datetime');
    panel.addLabel('When');
    this.queryFields.put('datetime',
                        new DateWidget(new Date()),
                        ['notEmpty']);

  
    panel.finish();

    // if project is truthy, we are editing something
    if(project) {
        new DeleteOption("Delete", "Click below to delete this project.", this, function() {
            Metis.remove(project, this, function() {
                this.closeDialogBox();
                this.refreshAction.call();
            });
        });
      }

  });

}

EditProjectView.prototype.clickedSave = function () {
  if(this.project == null) {
    this.project = new ProjectModel();
  }
  this.project.setName(this.queryFields.getValue('name'));
  this.project.setDescription(this.queryFields.getValue('description'));
  this.project.setVolunteerId(this.queryFields.getValue('volunteerId'));
  this.project.setDatetime(new Date(this.queryFields.getValue('datetime')));

  Metis.save(this.project, this, function () {
    this.closeDialogBox();
    this.refreshAction.call();
  });
};