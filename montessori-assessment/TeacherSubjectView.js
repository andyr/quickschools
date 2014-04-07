function TeacherSubjectView() {
  // find the logged in userId
  this.userId = globalVariables.userObject.getData("id");
  console.log('Storage: ', Storage, this.userId);

  new HeaderWidget('Current subject for ' + Storage.get('userid') + ': [selected subject]');
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
  this.subjects = subjects;
  this.topMarker.setActive();
  console.log('collecting subjects for selected teacher: ', this.teacherId);

  var subjectsForTeacher = [];
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
  this.subjectDropDown.widget.on('change', {'scope': this}, this.changeSubjectCallback);

  this.queryFields.put('subject', this.subjectDropDown);

  this.panel.finish();

  console.log('init subject callback...');
  this.changeSubjectCallback();
};

TeacherSubjectView.prototype.changeSubjectCallback = function (ev) {
  var scope = ev ? ev.data.scope : this;
  var teacherid = scope.queryFields.getValue('teacher');
  var subjectid = scope.queryFields.getValue('subject');

  Storage.put('userId', scope.userId);
  Storage.put('teacherId', teacherid);
  Storage.put('sectionId', subjectid);
  console.log('Storage: ', Storage);

  // link subject and workset
  var metisLoader = new MetisLoader('WorkSet');
  Metis.load(metisLoader, scope, function () {
    var worksets = metisLoader.getList();
    var foundSubjectWorksetLink = false;
    for(var i=0; i<worksets.length; i++) { // if this subjectId isn't in worksets
      if(worksets[i].sectionId == subjectid) {
        foundSubjectWorksetLink = true;
        Storage.put('workSetId', worksets[i].id);  // TODO: use this to get list of work
      }
    }
    if(!foundSubjectWorksetLink) {
      // pick a workset
      new SubjectWorksetLinkView(worksets, scope.subjects, subjectid);
    }
  });
};