function WorkStateView(student) {

  var workSetId = Storage.get('workSetId');
  if(!workSetId) {
    console.log('NO workSetId specified, cannot get list of work!!!');
  }

  var worksetLoader = new MetisLoader('WorkSet', workSetId);
  Metis.load(worksetLoader, this, function () {
    var workset = worksetLoader.getList();
    this.workset = workset[0];

    new HeaderWithIconWidget('Work list for ' + this.workset.name);
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
    var workStates = loader.getList();
    var button = new ButtonWidget(jqfield.data('state'), 
                                  this, 
                                  'clickedAddWorkState', 
                                  jqfield,
                                  jqfield.data('state'));
    jqfield.html(button.widget);
    
    for(var i=0; i<workStates.length; i++) {
      workState = workStates[i];
      var formattedDate = workState.getFormattedDate();
      var link = new LinkWidget(formattedDate, this, function () {
        this.clickedEditWorkState(jqfield, workState);
      });
      jqfield.append('<br/>').append(link.widget);
    }
  });
};

WorkStateView.prototype.clickedAddWorkState = function (jqfield, state) {
  console.log('clickedAddWorkState', arguments);
  var workstate = new WorkStateModel(),
      work = jqfield.data('work'),
      student = jqfield.data('student');
  workstate.setState(state);
  workstate.setWorkId(work.id);
  workstate.setStudentId(student.id);
  workstate.setDate(new Date());
  new EditWorkStateView(jqfield, workstate, this);
};

WorkStateView.prototype.clickedEditWorkState = function (jqfield, workState) {
  console.log('clickedEditWorkState', arguments);
  new EditWorkStateView(jqfield, workState, this);
};