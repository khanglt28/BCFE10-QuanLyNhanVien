//Tạo object employee từ employeeList
var empList = new EmployeeList();
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

// lấy data từ localStorage:
getLocalStorage();

getEle("btnThem").addEventListener("click", function () {
  getEle("formInput").reset();
  // getEle("datepicker").value = "";
  getEle("tknv").disabled = false;
  getEle("btnThemNV").style.display = "block";
  getEle("btnCapNhat").style.display = "none";
  getEle("btnReset").style.display = "block";

  displayError("none");
});

function getInputs(isAdd) {
  var _account = getEle("tknv").value;
  var _fullName = getEle("name").value;
  var _email = getEle("email").value;
  var _password = getEle("password").value;
  var _workingDay = getEle("datepicker").value;
  var _salary = getEle("luongCB").value;
  var _position = getEle("chucvu").value;
  var _workingHour = getEle("gioLam").value;

  var isValid = true;
  if (isAdd === true) {
    isValid &=
      validation.kiemTraRong(
        _account,
        "tbTKNV",
        "* Tài khoản không được để trống"
      ) &&
      validation.kiemTraDoDaiKyTu(
        _account,
        "tbTKNV",
        "* Độ dài ký tự từ 4-6",
        4,
        6
      ) &&
      validation.kiemTraKieuSo(
        _account,
        "tbTKNV",
        "* Tài khoản phải là số",
        0,
        999999
      ) &&
      validation.kiemTraAccountTrung(
        _account,
        "tbTKNV",
        "* Account nhân viên đã tồn tại",
        empList.list
      );
  }

  isValid &=
    validation.kiemTraRong(
      _fullName,
      "tbTen",
      "* Tên nhân viên không được để trống"
    ) &&
    validation.kiemTraKyTuChuoi(
      _fullName,
      "tbTen",
      "* Tên nhân viên phải là chữ"
    );

  isValid &=
    validation.kiemTraRong(_email, "tbEmail", "* Email không được để trống") &&
    validation.kiemTraEmail(
      _email,
      "tbEmail",
      "* Email phải đúng định dạng: example@gmail.com"
    );

  isValid &=
    validation.kiemTraRong(
      _password,
      "tbMatKhau",
      "* Mật khẩu không được để trống"
    ) &&
    validation.kiemTraDoDaiKyTu(
      _password,
      "tbMatKhau",
      "*Độ dài mật khẩu từ 6-10 ký tự",
      6,
      10
    ) &&
    validation.kiemTraMatKhau(
      _password,
      "tbMatKhau",
      "* Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    );

  isValid &=
    validation.kiemTraRong(
      _workingDay,
      "tbNgay",
      "* Ngày làm không được để trống"
    ) &&
    validation.kiemTraNgayThang(
      _workingDay,
      "tbNgay",
      "* Phải đúng định dạng mm/dd/yyyy"
    );

  isValid &=
    validation.kiemTraRong(
      _salary,
      "tbLuongCB",
      "* Lương cơ bản không được để trống"
    ) &&
    validation.kiemTraKieuSo(
      _salary,
      "tbLuongCB",
      "* Lương cơ bản từ 1,000,000 đến 20,000,000 và phải là số",
      1000000,
      20000000
    );

  isValid &= validation.kiemTraRong(
    _position,
    "tbChucVu",
    "* Vui lòng chọn chức vụ"
  );

  isValid &=
    validation.kiemTraRong(
      _workingHour,
      "tbGioLam",
      "* Vui lòng nhập số giờ làm"
    ) &&
    validation.kiemTraKieuSo(
      _workingHour,
      "tbGioLam",
      "* Số giờ làm trong tháng phải từ 80 - 200 giờ",
      80,
      200
    );

  //tạo object employee
  if (isValid) {
    var employee = new Employee(
      _account,
      _fullName,
      _email,
      _password,
      _workingDay,
      _salary,
      _position,
      _workingHour
    );
    return employee;
  }
  return null;
}

//callback function
getEle("btnThemNV").addEventListener("click", function (event) {
  // chặn web bị load lại
  event.preventDefault();
  var employee = getInputs(true);
  // check if input isValid => add empoylee

  if (employee) {
    employee.calTotalSalary();
    employee.rankEmployee();
    empList.addEmployee(employee);
    createTable(empList.list);
  }

  // Lưu mảng list xuống localStorage
  setLocalStorage();

  displayError("block");
  // console.log(empList.list);
});

// createTable() function
function createTable(arr) {
  //reset body
  getEle("tableDanhSach").innerHTML = "";
  for (var i = 0; i < arr.length; i++) {
    //create rows (tr)
    var tagTR = document.createElement("tr");

    //create column (td) - columns
    var tagTD_Account = document.createElement("td");
    var tagTD_FullName = document.createElement("td");
    var tagTD_Email = document.createElement("td");
    var tagTD_WorkingDay = document.createElement("td");
    var tagTD_Position = document.createElement("td");
    var tagTD_Salary = document.createElement("td");
    var tagTD_Rank = document.createElement("td");
    var tagTD_Button_Edit = document.createElement("td");
    var tagTD_Button_Delete = document.createElement("td");

    //create 7 columns info
    tagTD_Account.innerHTML = arr[i].account;
    tagTD_FullName.innerHTML = arr[i].fullName;
    tagTD_Email.innerHTML = arr[i].email;
    tagTD_WorkingDay.innerHTML = arr[i].workingDay;
    tagTD_Position.innerHTML = arr[i].position;
    tagTD_Salary.innerHTML = arr[i].totalSalary.toLocaleString();
    tagTD_Rank.innerHTML = arr[i].rank;
    tagTD_Button_Edit.innerHTML =
      '<button id="btnSua" data-toggle="modal" data-target="#myModal" class="btn btn-info" onclick="correctEmployee(\'' +
      arr[i].account +
      "')\">Sửa</button>";
    tagTD_Button_Delete.innerHTML =
      '<button class="btn btn-danger" onclick="deleteEmployee(\'' +
      arr[i].account +
      "')\">Xóa</button>";

    //appendChild columns into rows
    tagTR.appendChild(tagTD_Account);
    tagTR.appendChild(tagTD_FullName);
    tagTR.appendChild(tagTD_Email);
    tagTR.appendChild(tagTD_WorkingDay);
    tagTR.appendChild(tagTD_Position);
    tagTR.appendChild(tagTD_Salary);
    tagTR.appendChild(tagTD_Rank);
    tagTR.appendChild(tagTD_Button_Edit);
    tagTR.appendChild(tagTD_Button_Delete);

    //appendChild dòng vào tbody
    getEle("tableDanhSach").appendChild(tagTR);
    // console.log(account);
  }
}

/**
 * Delete Employee
 */
function deleteEmployee(account) {
  alert("Bạn có chắc chắn muốn xoá ?");
  empList._deleteEmployee(empList.list);
  createTable(empList.list);
  setLocalStorage();
}

/**
 * Rewrite Employee
 */
function correctEmployee(account) {
  var employee = empList.getEmployeeInfo(account);

  getEle("tknv").value = employee.account;
  getEle("tknv").disabled = true;

  getEle("name").value = employee.fullName;
  getEle("email").value = employee.email;
  getEle("password").value = employee.password;
  getEle("datepicker").value = employee.workingDay;
  getEle("luongCB").value = employee.salary;
  getEle("chucvu").value = employee.position;
  getEle("gioLam").value = employee.workingHour;

  getEle("btnReset").style.display = "none";
  getEle("btnCapNhat").style.display = "inline-block";
  getEle("btnThemNV").style.display = "none";

  displayError("none");
}

function displayError(status) {
  var error = document.getElementsByClassName("alert alert-danger");
  for (var i = 0; i < error.length; i++) {
    error[i].style.display = status;
  }
}
/**
 * Update Employee
 */
getEle("btnCapNhat").addEventListener("click", function () {
  //Lấy các thông tin từ users nhập vào thông qua các thẻ input
  var employee = getInputs(false);
  getEle("tknv").value = employee.account;
  getEle("tknv").disabled = true;
  displayError("block");

  employee.calTotalSalary();
  employee.rankEmployee();
  empList.updateEmployee(employee);
  createTable(empList.list);

  // Đồng bộ localStorage
  setLocalStorage();
});

getEle("btnReset").addEventListener("click", function () {
  getEle("formInput").reset();

  displayError("none");
});

/**
 * Search employee by rank
 */
getEle("searchName").addEventListener("keyup", function (keyword) {
  var keyword = getEle("searchName").value;
  var searchArr = empList.searchEmployee(keyword);
  createTable(searchArr);
});

function setLocalStorage() {
  // chuyển kiểu JSON => String (JSON.stringify)
  var arrString = JSON.stringify(empList.list);
  localStorage.setItem("Employee List", arrString);
}

function getLocalStorage() {
  // chuyển từ kiểu String => JSON
  if (localStorage.getItem("Employee List")) {
    var data = localStorage.getItem("Employee List");
    empList.list = JSON.parse(data);
    createTable(empList.list);
  }
}
