function StudentAssessmentView() {
  // render a data table from /sms/v1/studentenrollments/<sectionId>
  var _this = this;
  new HeaderWithIconWidget('Students');
  new LineBreakWidget();
  this.topMarker = new MarkerWidget();

  var studentTable = new DataTableWidget(this, 'studentTable');

  studentTable.addHeader('Name', 'fullName', true);
  studentTable.addColumn(function (student) {
    return student.fullName;
  });

  studentTable.setClickHandler(this, function (student) {
    new StudentWorkbookView(student);
  });

  this.renderTable(studentTable);
  $(window).on('updateStudentAssessmentView', function () {
    _this.renderTable(studentTable);         
  });

};

StudentAssessmentView.prototype.renderTable = function (studentTable) {
  var sectionId = Storage.get('sectionId');

  var msg = 'This teacher has no subjects available.'
  var noStudentsText = $('<span class="no-subjects pre-wrap">'+msg+'</span>');
  this.topMarker.activate();

  if(sectionId) {
    $('section.student-notes .no-subjects').remove();
    studentTable.widget.show();
    Rest.get('/sms/v1/sectionenrollments/' + sectionId,
             {},
             this,
             function (sectionEnrollments) {
      var sortedStudents = sectionEnrollments.students.sort(function(a,b) {
        if(a.fullName > b.fullName) return 1;
        else if(a.fullName == b.fullName) return 0;
        else return -1;
      });
      studentTable.renderList(sortedStudents);
    });
  } else {
    studentTable.widget.hide();
    $('section.student-notes .no-subjects').remove();
    $('section.student-notes').append(noStudentsText);
  }
};


