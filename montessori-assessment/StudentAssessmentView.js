function StudentAssessmentView() {
  // render a data table from /sms/v1/students
  var _this = this;
  new HeaderWithIconWidget('Students');
  var searchWidget = new SearchWidget('fullName');
  new LineBreakWidget();
  this.topMarker = new MarkerWidget();

  Rest.get('/sms/v1/sectionenrollments/' + Storage.get('sectionId'), 
          {}, 
          this, 
          function (sectionEnrollments) {
    console.log("sectionEnrollments", sectionEnrollments);

    _this.topMarker.activate();
    var studentTable = new DataTableWidget(this, 'studentTable');
    this.studentTable = studentTable;
    searchWidget.setTable(studentTable);
  
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
  
    studentTable.renderList(sectionEnrollments.students);

  });

};