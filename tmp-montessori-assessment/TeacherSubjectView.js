function TeacherSubjectView() {
  // find the logged in userId
  this.userId = globalVariables.userObject.getData("id");
  console.log('Storage: ', Storage, this.userId);

  new HeaderWidget('Current subject for ' + Storage.get('userid') + ': [selected subject]');
  // Set up as a component and put these calls in separate containers
  new LineBreakWidget();
  // if not Storage.get(userId)==teacher-subject:
  //    if loggedInUser can see TeacherDropdown
  this.topMarker = new MarkerWidget(); // Mark UI position for rendering
  this.renderTeacherDropdown();
  //    else
  //      teacherId = userId
  //      this.renderSubjectDropDown(teacherId);
  // listen for changes to either and invoke callbacks
  //    Storage.put(teacher-subject(s?))
  //    update the header widget display
}

TeacherSubjectView.prototype.renderTeacherDropdown = function () {
  Rest.get('/sms/v1/teachers', {}, this, this.teacherDropdownCallback);
};

TeacherSubjectView.prototype.teacherDropdownCallback = function (pagedTeachers) {
  this.teachers = pagedTeachers.list;

  this.topMarker.activate();
  this.panel = new QueryPanelWidget(250);

  this.queryFields = new QueryFields(this.panel); // don't use the initDynamicInfo arg, produces error
  this.panel.addLabel('Teachers');

  this.teacherDropdown = new DropDownWidget(this.teachers, 'id', 'fullName')
  this.queryFields.put('teacher', this.teacherDropdown); // prepend title in value
  this.teacherDropdown.widget.on('change', {'scope': this}, this.renderSubjectDropDown);
  this.renderSubjectDropDown();

};

TeacherSubjectView.prototype.renderSubjectDropDown = function (ev) {
  var scope = ev ? ev.data.scope : this;
  scope.teacherId = scope.queryFields.getValue('teacher');
  Rest.get('/sms/v1/sections', {}, scope, scope.subjectDropdownCallback);
};

TeacherSubjectView.prototype.subjectDropdownCallback = function (subjects) {
  var subjectsForTeacher = [];
  this.topMarker.setActive();
  console.log('collecting subjects for selected teacher: ', this.teacherId);

  for(var i=0; i<subjects.length; i++) {
    var subject = subjects[i];
    var teacherIds = $.map(subject['teachers'], function (teacher) { return teacher.id; });
    if( $.inArray(this.teacherId, teacherIds) > -1 ) {
      subjectsForTeacher.push({
        'id': subject.id,
        'name': subject.className + " " + subject.sectionName
      });
    }
  }

  if( $('.queryPanelWidget tr').length > 1 ) { // this is hacky
    $('.queryPanelWidget tr:last').remove();
  }
  this.panel.addLabel('Subjects');
  if(this.subjectDropDown) {
    this.subjectDropDown.widget.html('');
  }
  this.subjectDropDown = new DropDownWidget(subjectsForTeacher, 'id', 'name');
  this.subjectDropDown.widget.on('change', this.changeSubjectCallback);

  this.queryFields.put('subject', this.subjectDropDown);

  this.panel.finish();
};

TeacherSubjectView.prototype.changeSubjectCallback = function () {
  // Listener for setting up selected teacher-subject
  // Select the DOM and listen for changes
  Storage.put('userid', 'asdf');
  Storage.put('teacher-subject', '');
  console.log('changed subject, update the teacher-subject in Storage');
};