function DBState() {

  function deleteAllWorksets() {
    var ml = new MetisLoader('WorkSet');
    var worksets;

    Metis.load(ml, this, function () {
      worksets = ml.getList();
      console.log('Trying to delete ', worksets.length, ' worksets: ', worksets);
      Metis.remove(worksets, this, function () { 
        console.log("deleted: ", arguments); 
      });
    });
  }

  function createWorkSet(name, desc) {
    var workset = new WorksetModel();
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

  function addWorkSet(name, desc) {
    var workset = createWorkSet(name, desc);
    Metis.save(workset, this, function () {
      console.log('saving workset with id:', workset.id, workset, arguments);
      
      //console.log('addig work...'); // to the 'Work' table
      //var work = createWork('addition');
      //var work2 = createWork('subtraction');
      //Metis.save([work1, work2], this, function () {
      //  console.log('saving work to workset...');
      //})

    });
  }

  //(function setupWorkSets() {
    deleteAllWorksets();
    addWorkSet('Math', 'math work goes here');
  //})();

}