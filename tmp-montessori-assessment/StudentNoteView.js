function StudentNoteView(student) {
  // Most recent notest for a student; expanded state shows all (paginate list)

  //this.student = student; // classId = student.classId

  new HeaderWidget('Notes for ' + student.fullName);
  new QuickAddButtonWidget('Add a new note', this, 'clickedAddNote', student);
  new LineBreakWidget();

  var notesTable = new DataTableWidget(this, 'studentNoteTable');

  notesTable.addHeader('Note', 'note', true);
  notesTable.addColumn(function (note) {
    return note.getNote();
  });

  notesTable.addHeader('', 'Actions');
  notesTable.addColumn(function (note) {
    new ButtonWidget('Edit', this, 'clickedEditNote', student, note);
  });

  notesTable.renderMetisData(Metis, 'Note', new EqFilter('studentId', student.id));
  this.notesTable = notesTable;

}

StudentNoteView.prototype.clickedAddNote = function (student) {
  console.log('clicked add note');
  var dialog = new EditStudentNoteView(student);
  dialog.setRefreshHandler(this, function () {
    this.notesTable.renderMetisData(Metis, 'Note', new EqFilter('studentId', student.id));
  });
};

StudentNoteView.prototype.clickedEditNote = function (student, note) {
  console.log('clickedEditNote: ', arguments);
  var dialog = new EditStudentNoteView(student, note);
  dialog.setRefreshHandler(this, function () {
    this.notesTable.renderMetisData(Metis, 'Note', new EqFilter('studentId', student.id));
  });
};