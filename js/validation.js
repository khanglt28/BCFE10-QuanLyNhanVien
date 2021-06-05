function Validation() {
  this.kiemTraRong = function (input, id, mess) {
    if (input.trim() === "") {
      getEle(id).innerHTML = mess;
      getEle(id).className =
        "alert alert-danger p-1 w-100 text-danger bg-gradient-danger";
      //   getEle(id).style = "color: black; background-color: red; display: block;";
      return false;
    } else {
      getEle(id).innerHTML = "";
      getEle(id).className = "";
      return true;
    }
  };

  this.kiemTraDoDaiKyTu = function (input, id, mess, min, max) {
    if (input.length >= min && input.length <= max) {
      getEle(id).innerHTML = "";
      getEle(id).className = "";
      return true;
    }
    getEle(id).innerHTML = mess;
    getEle(id).className =
      "alert alert-danger p-1 w-100 text-danger bg-gradient-danger";
    return false;
  };

  this.kiemTraKyTuChuoi = function (input, id, mess) {
    var regex =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (input.match(regex)) {
      getEle(id).innerHTML = "";
      getEle(id).className = "";
      return true;
    }
    getEle(id).innerHTML = mess;
    getEle(id).className =
      "alert alert-danger p-1 w-100 text-danger bg-gradient-danger";
    return false;
  };

  this.kiemTraEmail = function (input, id, mess) {
    var regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.toLowerCase().match(regex)) {
      getEle(id).innerHTML = "";
      getEle(id).className = "";
      return true;
    }
    getEle(id).innerHTML = mess;
    getEle(id).className =
      "alert alert-danger p-1 w-100 text-danger bg-gradient-danger";
    return false;
  };

  this.kiemTraMatKhau = function (input, id, mess) {
    var regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,10}$/;
    if (input.match(regex)) {
      getEle(id).innerHTML = "";
      getEle(id).className = "";
      return true;
    }
    getEle(id).innerHTML = mess;
    getEle(id).className =
      "alert alert-danger p-1 w-100 text-danger bg-gradient-danger";
    return false;
  };

  this.kiemTraNgayThang = function (input, id, mess) {
    var regex = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/;
    if (input.match(regex)) {
      getEle(id).innerHTML = "";
      getEle(id).className = "";
      return true;
    }
    getEle(id).innerHTML = mess;
    getEle(id).className =
      "alert alert-danger p-1 w-100 text-danger bg-gradient-danger";
    return false;
  };

  this.kiemTraKieuSo = function (input, id, mess, min, max) {
    //kiẻm tra kiểu số
    var regex = /^[0-9]+$/;
    if (input.match(regex) && input >= min && input <= max) {
      getEle(id).innerHTML = "";
      getEle(id).className = "";
      return true;
    }
    getEle(id).innerHTML = mess;
    getEle(id).className =
      "alert alert-danger p-1 w-100 text-danger bg-gradient-danger";
    return false;
  };

  this.kiemTraAccountTrung = function (input, id, mess, arr) {
    var status = true;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].account === input) {
        status = false;
        break;
      }
    }
    if (status) {
      getEle(id).innerHTML = "";
      getEle(id).className = "";
      return true;
    }
    getEle(id).innerHTML = mess;
    getEle(id).className =
      "alert alert-danger p-1 w-100 text-danger bg-gradient-danger";
    return false;
  };
}
