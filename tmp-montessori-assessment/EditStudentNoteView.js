function EditStudentNoteView(student, note) {
  // @required: student
  // @optional: note
  ClassUtil.mixin(EditStudentNoteView, this, Refreshable);
  ClassUtil.mixin(EditStudentNoteView, this, Dialogable);

  this.dialog = new Dialog('Add/Edit Note');
  this.dialog.setOkCancel(this, 'clickedSave');

  var panel = new QueryPanelWidget(120);
  this.queryFields = new QueryFields(panel, note);
  this.note = note;
  this.panel = panel;

  // fix these in hidden input fields, no label
  //panel.addLabel('Student');
  panel.metadata = {};
  panel.metadata['studentId'] = student.id;
  //this.queryFields.put('studentId', student.id);

  //panel.addLabel('Section');
  panel.metadata['sectionId'] = '651974'; // section.id (from storage?)
  //this.queryFields.put('sectionId', '651974');  // section.id (get JSON obj from Storage)
  
  panel.addLabel('Note');
  this.queryFields.put('note', new TextAreaWidget());

  panel.finish();

  if(note) {
    new DeleteOption('Delete', 'Click to delete this note.', this, function () {
      Metis.remove(note, this, function () {
        this.closeDialogBox();
        this.refreshAction.call();
      });
    });
  }
  this.dialog.reposition();

}

EditStudentNoteView.prototype.clickedSave = function () {
  if(this.note == null) {
    this.note = new StudentNoteModel();
  }
  this.note.setStudentId( this.panel.metadata['studentId'] );
  this.note.setSectionId( this.panel.metadata['sectionId'] );
  this.note.setNote( this.queryFields.getValue('note') );

  Metis.save(this.note, this, function () {
    this.closeDialogBox();
    this.refreshAction.call();
  });
};