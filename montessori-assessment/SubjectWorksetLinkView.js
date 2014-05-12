function SubjectWorksetLinkView(worksets, subjects, subjectId) {
  ClassUtil.mixin(SubjectWorksetLinkView, this, Refreshable);
  ClassUtil.mixin(SubjectWorksetLinkView, this, Dialogable);

  this.worksets = worksets;
  this.subjectId = subjectId;

  if(worksets.length == 0) {
    new MessageDialog('Please configure worksets first', 
                      'Before you can start tracking progress for a subject, you must first create some worksets.  Please go to the "Setup" submenu on the top to create worksets.');
    return;
  }

  var subjectName = '';
  for(var i=0; i<subjects.length; i++) {
    if(subjectId == subjects[i].id) {
      subjectName = subjects[i].className + ' ' + subjects[i].sectionName;
    }
  }
  this.dialog = new Dialog('Link workset to ' + subjectName);
  this.dialog.setOkCancel(this, 'clickedSave');

  var panel = new QueryPanelWidget(120);
  this.queryFields = new QueryFields(panel);

  panel.addLabel('Workset');
  this.queryFields.put('workSetId', new DropDownWidget(worksets, 'id', 'name'));

  panel.finish();
  this.dialog.reposition();

}

SubjectWorksetLinkView.prototype.clickedSave = function () {
  var selectedWorkSetId = this.queryFields.getValue('workSetId');
  Storage.put('workSetId', selectedWorkSetId);
  
  var workSetModel = null;
  for(var i=0; i<this.worksets.length; i++) {
    if(selectedWorkSetId == this.worksets[i].id) {
      workSetModel = this.worksets[i];
    }
  }
  workSetModel.setSectionId(this.subjectId);
  Metis.save(workSetModel, this, function () {
    console.log('Linked subject to workset: ', workSetModel);
    this.closeDialogBox();
    //this.refreshAction.call();
  });
};