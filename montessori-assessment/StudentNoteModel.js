function StudentNoteModel() {
  this.id;
  this.studentId;
  this.sectionId; // Each note pertains to a student + section (subject)
  this.note;
  this.createdAt = new Date();
}

Metis.define(StudentNoteModel, 'Note', 'id', 'studentId', 'sectionId', 'note', 'createdAt');
Metis.defineSortColumn(StudentNoteModel, 'createdAt', 'desc');
Metis.createGettersAndSetters(StudentNoteModel);

StudentNoteModel.prototype.getFormattedDate = function (format) {
  return this.createdAt.toDateString().split(' ').slice(1).join(' ');
};