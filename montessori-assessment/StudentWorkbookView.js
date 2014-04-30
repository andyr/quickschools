function StudentWorkbookView(student) {
  // This view constructs a FullPageDialog
  ClassUtil.mixin(StudentWorkbookView, this, Refreshable);
  ClassUtil.mixin(StudentWorkbookView, this, Dialogable);

  this.dialog = new FullPageDialog('Student Workbook');

  var panel = new HorizontalPanelWidget("right", false);
  new DemotedButtonWidget("Close", this.dialog, "close");
  panel.finish();
  new LineBreakWidget();
  this.dialog.resetInsertPosition();

  new StudentNoteView(student);
  new LineBreakWidget(5);
  new WorkStateView(student);

}



