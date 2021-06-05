function EmployeeList() {
  this.list = [];

  this.addEmployee = function (emp) {
    this.list.push(emp);
  };

  this._findAccountIndex = function (account) {
    var index = -1;
    for (i = 0; i < this.list.length; i++) {
      if (this.list[i].account == account) {
        index = i;
        // break;
        return index;
      }
    }
  };

  this._deleteEmployee = function (account) {
    var index = this._findAccountIndex(account);
    // Delelte employee
    if (index !== -1) {
      this.list.splice(index, 1);
    }
  };

  this.getEmployeeInfo = function (account) {
    // Lấy vị trí
    var index = this._findAccountIndex(account);
    if (index !== -1) {
      return this.list[index];
    }
  };

  this.updateEmployee = function (employee) {
    var index = this._findAccountIndex(employee.account);
    if (index != -1) {
      this.list[index] = employee;
    }
  };

  this.searchEmployee = function (keyword) {
    var searchArr = [];
    for (var i = 0; i < this.list.length; i++) {
      if (
        this.list[i].rank.toLowerCase().indexOf(keyword.toLowerCase()) != -1
      ) {
        searchArr.push(this.list[i]);
      }
    }
    return searchArr;
  };
}
