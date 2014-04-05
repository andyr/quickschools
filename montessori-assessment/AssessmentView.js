function AssessmentView() {
  // This View extends Widget
  ClassUtil.inherit(AssessmentView, this, Widget);
  this._super('AssessmentView');

  new PageHeaderWidget('Assessment');
  new LineBreakWidget();

  current = this.widget.find('section.teacher-subject');
  new TeacherSubjectView(); // delegate view

  current = this.widget.find('section.student-notes');
  new StudentAssessmentView();  // student table

  this.attach();
}
