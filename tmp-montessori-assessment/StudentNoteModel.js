function StudentNoteModel() {
  this.id;
  this.studentId;
  this.sectionId;   // not specified, but makes sense from the subject selection
  this.note;
  this.createdAt = new Date();
}

Metis.define(StudentNoteModel, 'Note', 'id', 'studentId', 'sectionId', 'note');
Metis.defineSortColumn(StudentNoteModel, 'createdAt', 'desc');
Metis.createGettersAndSetters(StudentNoteModel);