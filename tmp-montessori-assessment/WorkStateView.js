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
      var field = $('<span class="workstate-field">Loading...</span>');
      field.data('work', work);
      field.data('student', student);
      field.data('state', 'Presented');

      current.append(field);
    });

    workStateTable.addHeader('Practiced');
    workStateTable.addColumn(function (work) {
      var field = $('<span class="workstate-field">Loading...</span>');
      field.data('work', work);
      field.data('student', student);
      field.data('state', 'Practiced');

      current.append(field);
    });

    workStateTable.addHeader('Mastered');
    workStateTable.addColumn(function (work) {
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

WorkStateView.prototype.initWorkStateData = function () {
  var fields = this.workStateTable.widget.find('.workstate-field');
  console.log('initWorkStateData', arguments, fields, this.workStateTable);

  for(var i=0; i<fields.length; i++) {
    var jqfield = $(fields[i]);
    this.setWorkStateField(jqfield, [
      new EqFilter('workId', jqfield.data('work').id),
      new EqFilter('studentId', jqfield.data('student').id),
      new EqFilter('state', jqfield.data('state'))
    ]);
  }
};

WorkStateView.prototype.setWorkStateField = function (jqfield, filters) {
  var loader = new MetisLoader('WorkState');
  loader.setFilters(filters);
  Metis.load(loader, this, function () {
    var workState = loader.getList();

    if(workState.length == 0) {
      var button = new ButtonWidget('Add '+ jqfield.data('state'), 
                                    this, 
                                    'clickedAddWorkState', 
                                    jqfield.data('work'),
                                    jqfield.data('student'),
                                    jqfield.data('state'));
      jqfield.html(button.widget);
    } else {
      // render a linked date which renders EditWorkStateView dialog
      workState = workState[0];
      var formattedDate = workState.getFormattedDate();
      var link = new LinkWidget(formattedDate, this, function () {
        this.clickedEditWorkState(jqfield, workState);
      });
      jqfield.html(link.widget);
    }
  });
};

WorkStateView.prototype.clickedAddWorkState = function (work, student, state) {
  console.log('clickedAddWorkState', arguments);
  var workstate = new WorkStateModel();
  workstate.setState(state);
  workstate.setWorkId(work.id);
  workstate.setStudentId(student.id);
  workstate.setDate(new Date());
  new EditWorkStateView(student, work, workstate);
};

WorkStateView.prototype.clickedEditWorkState = function (jqfield, workState) {
  console.log('clickedEditWorkState', arguments);
  new EditWorkStateView(jqfield.data('student'), jqfield.data('work'), workState);
};