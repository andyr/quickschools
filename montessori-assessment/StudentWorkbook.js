function StudentWorkbook(student) {
  // This view constructs a FullPageDialog
  ClassUtil.mixin(StudentWorkbook, this, Refreshable);
  ClassUtil.mixin(StudentWorkbook, this, Dialogable);

  this.dialog = new FullPageDialog('Student Workbook');

  var panel = new HorizontalPanelWidget("right", false);
  new DemotedButtonWidget("Close", this.dialog, "close");
  panel.finish();
  new LineBreakWidget();
  this.dialog.resetInsertPosition();

  //this.classId = student.classId;

  new StudentNoteView(student);
  new LineBreakWidget();
  new WorkStateView(student);

}



