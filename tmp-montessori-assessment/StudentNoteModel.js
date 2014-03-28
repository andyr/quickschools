function StudentNoteModel() {
  this.id;
  this.studentId;
  this.sectionId;
  this.note;
}

Metis.define(StudentNoteModel, 'Note', 'id', 'studentId', 'sectionId', 'note');
Metis.createGettersAndSetters(StudentNoteModel);