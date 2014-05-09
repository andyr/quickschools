function TeacherSubjectView() {
  // find the logged in userId
  this.userId = globalVariables.userObject.getData("id");
  console.log('Storage: ', Storage, this.userId);

  this.headerWidget = new HeaderWidget('');
  this.headerWidget.widget.addClass('teacher-subject-header');

  new LineBreakWidget();
  this.topMarker = new MarkerWidget(); // Mark UI position for rendering

  this.detectTeacher = Metis.hasAccess('montessori-teacher');
  console.log('Metis.hasAccess montessori-teacher', this.detectTeacher);
  this.renderTeacherDropdown();
}

TeacherSubjectView.prototype.renderTeacherDropdown = function () {
  Rest.get('/sms/v1/teachers', {}, this, this.teacherDropdownCallback);
};

TeacherSubjectView.prototype.teacherDropdownCallback = function (pagedTeachers) {
  this.teachers = pagedTeachers.list;

  // if role==teacher: this.teachers = [only logged in teacherid]
  if(this.detectTeacher) { 
    var updatedTeacherList = [];
    var fullName = globalVariables.userObject.firstName;
    var lname = globalVariables.userObject.lastName;
    if(lname) {
      fullName += " " + lname;
    }

    for(var i=0; i<this.teachers.length; i++) {
      if(this.teachers[i].fullName == fullName) {
        updatedTeacherList = [this.teachers[i]];
      }
    }
    this.teachers = updatedTeacherList;
  }

  this.topMarker.activate();
  this.panel = new QueryPanelWidget(250);

  this.queryFields = new QueryFields(this.panel); // don't use the initDynamicInfo arg, produces error
  this.panel.addLabel('Teacher');

  this.teacherDropdown = new DropDownWidget(this.teachers, 'id', 'fullName')
  this.queryFields.put('teacher', this.teacherDropdown); // prepend title in value
  this.teacherDropdown.widget.on('change', 
                                  {'scope': this, 'teacherchanged': true}, 
                                  this.renderSubjectDropDown);
  this.renderSubjectDropDown();

};

TeacherSubjectView.prototype.renderSubjectDropDown = function (ev) {
  var scope = ev ? ev.data.scope : this;
  scope.teacherId = scope.queryFields.getValue('teacher');
  scope.teacherchanged = ev ? true : false;
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
  this.panel.addLabel('Subject');
  if(this.subjectDropDown) {
    this.subjectDropDown.widget.html('');
  }
  this.subjectDropDown = new DropDownWidget(subjectsForTeacher, 'id', 'name');
  this.subjectDropDown.widget.on('change', {'scope': this}, this.changeSubjectCallback);

  this.queryFields.put('subject', this.subjectDropDown);
  this.panel.finish();

  // Check Storage for saved teacher-subject
  var teacherId = Storage.get('teacherId') || '';
  var subjectId = Storage.get('sectionId') || '';
  if(!this.teacherchanged) {
    this.queryFields.setValue('teacher', teacherId);
    //this.queryFields.getWidget('teacher').widget.val(teacherId).change();

    this.queryFields.setValue('subject', subjectId);
    //this.queryFields.getWidget('subject').widget.val(subjectId).change();
  }

  this.changeSubjectCallback();
};

TeacherSubjectView.prototype.changeSubjectCallback = function (ev) {
  var scope = ev ? ev.data.scope : this;
  var teacherid = scope.queryFields.getValue('teacher');
  var subjectid = scope.queryFields.getValue('subject') || ''; // null and undefined turn into "null" and "undefined" in Storage

  var teacherWidget = scope.queryFields.getWidget('teacher');
  var subjectWidget = scope.queryFields.getWidget('subject');

  console.log(teacherWidget.widget, subjectWidget);
  $('.teacher-subject-header').html(
    teacherWidget.widget.find('option:selected').text() + ' - ' +
    subjectWidget.widget.find('option:selected').text()
  );

  Storage.put('userId', scope.userId);
  Storage.put('teacherId', teacherid);
  Storage.put('sectionId', subjectid);
  console.log('Storage: ', Storage);
  $(window).trigger('updateStudentAssessmentView');

  // link subject and workset
  if(subjectid) {
    var metisLoader = new MetisLoader('WorkSet');
    Metis.load(metisLoader, scope, function () {
      var worksets = metisLoader.getList();
      var foundSubjectWorksetLink = false;
      for(var i=0; i<worksets.length; i++) { // if this subjectid is in worksets
        if(worksets[i].sectionId == subjectid) {
          foundSubjectWorksetLink = true;
          Storage.put('workSetId', worksets[i].id);
        }
      }
      if(!foundSubjectWorksetLink) {
        // pick a workset
        new SubjectWorksetLinkView(worksets, scope.subjects, subjectid);
      }
    });
  }
};
