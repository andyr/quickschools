function WorkStateView(student) {

  var workSetId = Storage.get('workSetId');
  if(!workSetId) {
    console.log('NO workSetId specified, cannot get list of work!!!');
  }

  var worksetLoader = new MetisLoader('WorkSet', workSetId);
  Metis.load(worksetLoader, this, function () {
    var workset = worksetLoader.getList();
    this.workset = workset[0];

    new HeaderWidget('Work list for ' + this.workset.name);
    var workStateTable = new DataTableWidget(this, 'workStateTable');
    this.workStateTable = workStateTable;

    workStateTable.addHeader('Description', 'description', true);
    workStateTable.addColumn(function (work) {
      return work.getDescription();
    });

    workStateTable.addHeader('Presented');
    workStateTable.addColumn(function (work) {
      // TODO: initial empty state, replace with date and edit button
      new ButtonWidget('Add Presented', this, 'clickedAddPresented', work, student);
    });

    workStateTable.addHeader('Practiced');
    workStateTable.addColumn(function (work) {
      new ButtonWidget('Add Practiced', this, 'clickedAddPracticed', this);  // testing passing event to capture dom
    });

    workStateTable.addHeader('Mastered');
    workStateTable.addColumn(function (work) {
      //new ButtonWidget('Add Mastered', this, 'clickedAddMastered', work);
      var field = $('<span class="workstate-field">Loading...</span>');
      field.data('work', work);
      field.data('student', student);
      field.data('state', 'Mastered');

      current.append(field);
    });

    workStateTable.renderMetisData(Metis, 'Work', new EqFilter('workSetId', workSetId));
    workStateTable.setPostRender(this, 'initWorkStateData');

  });

}

WorkStateView.prototype.clickedAddPresented = function (work, student) {
  console.log('clickedAddPresented', arguments);
  var workstate = new WorkStateModel();
  workstate.setState('Presented');
  workstate.setWorkId(work.id);
  workstate.setStudentId(student.id);
  workstate.setDate(new Date());
  new EditWorkStateView(student, work, workstate);
};

WorkStateView.prototype.clickedEditPresented = function (workstate) {
  // workstate has already been fetched for clicked work row
  // load the dialog
};

WorkStateView.prototype.clickedAddPracticed = function () {
  console.log('clickedAddPracticed', arguments);
};

WorkStateView.prototype.clickedAddMastered = function (work) {

};

WorkStateView.prototype.initWorkStateData = function () {
  
  var fields = this.workStateTable.widget.find('.workstate-field');
  console.log('initWorkStateData', arguments, fields, this.workStateTable);
  

  for(var i=0; i<fields.length; i++) {
    var jqfield = $(fields[i]);
    var filters = [
      new EqFilter('workId', jqfield.data('work').id),
      new EqFilter('studentId', jqfield.data('student').id),
      new EqFilter('state', jqfield.data('state'))
    ];
    // setup a loader with the filters, fetch the data and replace the jqfield
    console.log(
      'Fetch data for: ',
      jqfield, 
      'workId=', 
      jqfield.data('work').id, 
      'studentId=', 
      jqfield.data('student').id,
      'state',
      jqfield.data('state')
    );

    var workStateLoader = new MetisLoader('WorkState');
    workStateLoader.setFilters(filters);
    Metis.load(workStateLoader, this, function () {
      var workState = workStateLoader.getList();
      if(workState.length == 0) {
        // not set, render the button
        jqfield.html('n/a');
      } else {
        // render a linked date which renders EditWorkStateView dialog
        workState = workState[0];
      }
    });
  }
};

