function SetupView() {
  // list of worksets (add, edit, delete)
  // edit the work for each workset

  new PageHeaderWidget('Setup');
  new QuickAddButtonWidget("Add New WorkSet", this, "clickedAddWorkset");
  new LineBreakWidget();
  new WorkSetView();

}

