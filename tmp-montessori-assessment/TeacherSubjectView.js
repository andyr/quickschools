function TeacherSubjectView() {
  // find the logged in userId
  console.log('Storage: ', Storage, Storage.get('userid'), Storage.get('teacher-subject'));

  new HeaderWidget('Current subject for ' + Storage.get('userid') + ': [selected subject]');
  new LineBreakWidget();
  // if not Storage.get(userId)==teacher-subject:
  //    if loggedInUser can see TeacherDropdown
  this.renderTeacherDropdown();
  //    else
  //      teacherId = userId
  //      this.renderSubjectDropDown(teacherId);
  // listen for changes to either and invoke callbacks
  //    Storage.put(teacher-subject(s?))
  //    update the header widget display

  new StudentAssessmentView();  // student table

}

TeacherSubjectView.prototype.renderTeacherDropdown = function () {
  Rest.get('/sms/v1/teachers', {}, this, this.teacherDropdownCallback);
};

TeacherSubjectView.prototype.teacherDropdownCallback = function (pagedTeachers) {
  this.teachers = pagedTeachers.list;
  this.panel = new QueryPanelWidget(250);

  this.queryFields = new QueryFields(this.panel); // don't use the initDynamicInfo arg, produces error
  this.panel.addLabel('Teachers');
  this.queryFields.put('teacher', new DropDownWidget(this.teachers, 'id', 'fullName')); // prepend title in value

  // assign id or class to the dropdown
  // listen for changes and set the teacher id
  this.renderSubjectDropDown(null); // set the teacherId here

  this.panel.finish();
};

TeacherSubjectView.prototype.renderSubjectDropDown = function (teacherId) {
  if( teacherId == null ) {
    this.teacherId = this.queryFields.getValue('teacher');   // selected teacher
  }
  Rest.get('/sms/v1/sections', {}, this, this.subjectDropdownCallback);
};

TeacherSubjectView.prototype.subjectDropdownCallback = function (subjects) {
  var subjectsForTeacher = [];
  console.log('collecting subjects for selected teacher = ', this.teacherId);

  for(var i=0; i<subjects.length; i++) {
    var teacherIds = $.map(subjects[i]['teachers'], function (teacher) { return teacher.id; });
    if( $.inArray(this.teacherId, teacherIds) ) {
      subjectsForTeacher.push( subjects[i].id );
    }
  }

  this.panel.addLabel('Subjects');
  this.queryFields.put('subject', new DropDownWidget(subjectsForTeacher, 'id', 'values'));

  // Listener for setting up selected teacher-subject
  // Select the DOM and listen for changes
  Storage.put('userid', 'asdf');
  Storage.put('teacher-subject', '');
};