function StudentAssessmentView() {
  
  new SpaceWidget(2);
  new HeaderWidget('Students');
  new LineBreakWidget();
  // List of students
  Rest.get('/sms/v1/students', {}, this, this.studentListingCallback);

}


StudentAssessmentView.prototype.studentListingCallback = function (pagedStudents) {
  var students = pagedStudents.list;
  console.log('students: ', students);

  // render a data table
};