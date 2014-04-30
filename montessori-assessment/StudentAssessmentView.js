function StudentAssessmentView() {
  // render a data table from /sms/v1/studentenrollments/<sectionId>
  var _this = this;
  new HeaderWithIconWidget('Students');
  new LineBreakWidget();
  this.topMarker = new MarkerWidget();

  var studentTable = new DataTableWidget(this, 'studentTable');
  this.studentTable = studentTable;
  console.log("Before render  DataTableWidget:", _this.studentTable.widget);
  this.render();

  $(window).on('updateStudentAssessmentView', function () {
    //console.log("DataTableWidget:", _this.studentTable.widget);
    _this.studentTable.widget.find('tr:gt(0)').remove();
    Rest.get('/sms/v1/sectionenrollments/' + Storage.get('sectionId'),
      {},
      _this,
      function (sectionEnrollments) {
        this.studentTable.renderList(sectionEnrollments.students);
      });
  });
};

StudentAssessmentView.prototype.render = function () {
  Rest.get('/sms/v1/sectionenrollments/' + Storage.get('sectionId'), 
          {}, 
          this, 
          function (sectionEnrollments) {
    console.log("sectionEnrollments", sectionEnrollments);

    this.topMarker.activate();
  
    this.studentTable.addHeader('Name', 'fullName', true);
    this.studentTable.addColumn(function (student) {
      return student.fullName;
    });
  
    this.studentTable.setClickHandler(this, function (student) {
      console.log('Clicked a student: ', student);
  
      var dialog = new StudentWorkbookView(student);
      dialog.setRefreshHandler(this, function () {
        this.studentTable.refreshTable();
      });
    });
  
    this.studentTable.renderList(sectionEnrollments.students);
  });
};