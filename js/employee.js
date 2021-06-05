// tạo object sinh viên
function Employee(
  _account,
  _fullName,
  _email,
  _password,
  _workingDay,
  _salary,
  _position,
  _workingHour
) {
  this.account = _account;
  this.fullName = _fullName;
  this.email = _email;
  this.password = _password;
  this.workingDay = _workingDay;
  this.salary = _salary;
  this.position = _position;
  this.workingHour = _workingHour;
  this.totalSalary = 0;
  this.rank = "";

  this.calTotalSalary = function () {
    if (this.position === "Sếp") {
      this.totalSalary = parseFloat(this.salary) * 3;
    } else if (this.position === "Trưởng phòng") {
      this.totalSalary = parseFloat(this.salary) * 2;
    } else if (this.position === "Nhân viên") {
      this.totalSalary = parseFloat(this.salary);
    }
    return this.totalSalary;
  };

  this.rankEmployee = function () {
    if (parseFloat(this.workingHour) < 160) {
      this.rank = "Trung Bình";
    } else if (parseFloat(this.workingHour) <= 176) {
      this.rank = "Khá";
    } else if (parseFloat(this.workingHour) <= 192) {
      this.rank = "Giỏi";
    } else {
      this.rank = "Xuất Sắc";
    }
  };
}
