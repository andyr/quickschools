function WorkStateModel() {
  this.id;
  this.workId;
  this.studentId;
  this.state; // enum
  this.date = new Date();
  this.comment;
}

Metis.define(WorkStateModel, 'WorkState', 'id', 'workId', 'studentId', 'state', 'date', 'comment');
Metis.defineSortColumn(WorkStateModel, 'date', 'desc');
Metis.createGettersAndSetters(WorkStateModel);

WorkStateModel.prototype.getFormattedDate = function (format) {
  var _this = this;
  format = '%m/%d/%Y';
  dateFormatMap = {
    '%m': 'getMonth',
    '%d': 'getDate',
    '%Y': 'getFullYear'
  };
  return $.map(format.split('/'), function (token) {
    return _this.date[dateFormatMap[token]]();
  }).join('/');
};