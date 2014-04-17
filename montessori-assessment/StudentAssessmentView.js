function StudentAssessmentView() {
  // render a data table from /sms/v1/students
  new HeaderWithIconWidget('Students');
  new LineBreakWidget();

  var studentTable = new DataTableWidget(this, 'studentTable');
  this.studentTable = studentTable;

  studentTable.addHeader('Id', 'id', true);
  studentTable.addColumn(function (student) {
    return student.id;
  });

  studentTable.addHeader('Name', 'fullName', true);
  studentTable.addColumn(function (student) {
    return student.fullName;
  });

  studentTable.setClickHandler(this, function (student) {
    console.log('Clicked a student: ', student);

    var dialog = new StudentWorkbookView(student);
    dialog.setRefreshHandler(this, function () {
      this.studentTable.refreshTable();
    });
  });

  studentTable.setRestLoader(function (settings, callback) {
    console.log("in setRestLoader... ", settings, callback)
    Rest.get('/sms/v1/students', settings, callback);
  });
  studentTable.render();

};