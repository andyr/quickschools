function StudentAssessmentView() {
  // render a data table from /sms/v1/studentenrollments/<sectionId>
  var _this = this;
  new HeaderWithIconWidget('Students');
  new LineBreakWidget();
  this.topMarker = new MarkerWidget();

  var studentTable = new DataTableWidget(this, 'studentTable');
  this.studentTable = studentTable;
  console.log("Before render DataTableWidget:", _this.studentTable.widget);
  this.render();

  $(window).on('updateStudentAssessmentView', function () {
    //console.log("DataTableWidget:", _this.studentTable.widget);
    var sectionId = Storage.get('sectionId');
    _this.studentTable.widget.find('tr:gt(0)').remove();
    if(sectionId) {
      Rest.get('/sms/v1/sectionenrollments/' + sectionId,
        {},
        _this,
        function (sectionEnrollments) {
          this.studentTable.renderList(sectionEnrollments.students);
        });
    } else {
      _this.render();   // handles this error
    }
  });
};

StudentAssessmentView.prototype.createStudentTable = function () {

};

StudentAssessmentView.prototype.destroyStudentTable = function () {

};


StudentAssessmentView.prototype.render = function () {
  var sectionId = Storage.get('sectionId');
  if(sectionId) {

    Rest.get('/sms/v1/sectionenrollments/' + sectionId, 
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

  } else {
    this.topMarker.activate();
    new TextWidget("This teacher has no subjects available."); 
    // TODO: write some table init stuff
    // call that independently -- figure out rendering sequence, etc.
  }
};

