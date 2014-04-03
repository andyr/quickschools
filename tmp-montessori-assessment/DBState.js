function DBState() {

  function resetAllWorksets() {
    var ml = new MetisLoader('WorkSet');
    var worksets;

    Metis.load(ml, this, function () {
      worksets = ml.getList();
      console.log('Trying to delete ', worksets.length, ' worksets: ', worksets);
      Metis.remove(worksets, this, function () { 
        console.log("deleted: ", arguments);
        var ml = new MetisLoader('Work');
        Metis.load(ml, this, function () {
          work = ml.getList();
          Metis.remove(work, this, function () {
            console.log('deleted: ', arguments);

            console.log('adding workset...');
            addWorkSet('Math', 'math work goes here', ['addition', 'subtraction']);
            addWorkSet('English', 'English work goes here', ['literature', 'syntax']);
          });
        });

      });
    });
  }

  function createWorkSet(name, desc) {
    var workset = new WorkSetModel();
    workset.setName(name);
    workset.setDescription(desc);
    return workset;
  }

  function createWork(desc, sortOrder, wsId) {
    var work = new WorkSet();
    work.setDescription(desc);
    work.setSortOrder(sortOrder);
    work.setWorkSetId(wsId);
    return work;
  }

  function addWorkSet(name, desc, works) {
    var workset = createWorkSet(name, desc);
    Metis.save(workset, this, function () {
      console.log('saving workset with id:', workset.id, workset, arguments);
      
      console.log('addig work...'); // to the 'Work' table
      var workModels = [];
      for(var i=0; i<works.length; i++) {
        var workModel = new WorkModel();
        workModel.setDescription(works[i]);
        workModel.setSortOrder(i+1);
        workModel.setWorkSetId(workset.id);
        workModels.push(workModel);
      }
      Metis.save(workModels, this, function () {
        console.log('saving work to workset...');
      });

    });
  }


  //resetAllWorksets();

  function resetAllNotes() {
    var ml = new MetisLoader('Note');
    Metis.load(ml, this, function () {
      var notes = ml.getList();
      console.log('deleting all notes:', notes);
      Metis.remove(notes, this, function () {});
    });
  }

  resetAllNotes();

}