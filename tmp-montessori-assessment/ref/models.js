// Outline of all model objects


// Types that already exist?


function Student() {
  this.id;
  this.workbook; // see model below
}

function Teacher() {
  this.id;
  this.subjects;
}

function Subject() {
  this.linkedWorkSet; // null or id
}




// Collection of Notes
function Workbook() { // not a model (view object)
  this.id;
  this.notes;

}

function Note() {
  this.add = function () {}
  this.delete = function () {}
  this.edit = function () {}
}

// =========================
// Curriculum?
function WorkSet() {
  // in-memory collection of work (not a model)
  this.worksets;  // [{}]
}

// (Also called Job)
function Work() {
  this.id;
  this.description; // also has a sort order
  this.workstates = [];
  // what is an unfilled job?  Just somethign that hasn't been started (no workstate?)
}

// not sure yet how to model this
function WorkState() {
  this.state = new Enum('presented', 'practiced', 'mastered'); 
  this.datetime;
  this.comments; // one to one for comment-workstate ???
}

In the reading subject - linked to a workset (with work items)
WorkItem - buildingLego, paintingSomething (assignment)