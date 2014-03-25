function AssessmentView() {
  console.log("in Assessment View...");

  new PageHeaderWidget('Assessment');
  new LineBreakWidget();

  this.renderTeacherStudents();
}

AssessmentView.prototype.renderTeacherStudents = function () {

  // showTeachers(): if user has more privlege, show all teachers

  // showSubjects(): if user is a teacher, show their subjects

  // Storage.put(teacher-subject(s?))

};