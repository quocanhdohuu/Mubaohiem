// Fixed menu
window.addEventListener("scroll", function () {
  const menu = document.querySelector("#header-menu");
  const topBanner = document.querySelector("#header-top");
  const scrollPosition = window.scrollY;
  const topBannerHeight = topBanner.offsetHeight;

  if (scrollPosition > topBannerHeight) {
    menu.classList.add("fixed");
    topBanner.style.transform = "translateY(-100%)";
  } else {
    menu.classList.remove("fixed");
    topBanner.style.transform = "translateY(0)";
  }
});

// click btn Tìm kiếm và danh mục
document.addEventListener("DOMContentLoaded", function () {
  //Btn Tìm kiếm click
  const searchBtn = document.getElementById("header-menu-search");
  const searchBox = document.getElementById("header-menu-search-timkiem");
  // Mở ô tìm kiếm khi click vào icon kính lúp
  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation(); // Ngăn sự kiện click lan ra document
    searchBox.style.display =
      searchBox.style.display === "block" ? "none" : "block";
  });
  // Đóng ô tìm kiếm khi click ra bất kỳ đâu ngoài ô tìm kiếm
  document.addEventListener("click", function (e) {
    if (!searchBox.contains(e.target) && e.target !== searchBtn) {
      searchBox.style.display = "none";
    }
  });
  // Đóng ô tìm kiếm khi cuộn trang
  window.addEventListener("scroll", function () {
    searchBox.style.display = "none";
  });
  // Đóng khi xoay ngang màn hình (mobile)
  window.addEventListener("orientationchange", function () {
    searchBox.style.display = "none";
  });
  // (Optional) Đóng khi phóng to/thu nhỏ trình duyệt (resize)
  window.addEventListener("resize", function () {
    searchBox.style.display = "none";
  });

  //Btn danh mục click
  const danhmucBtn = document.getElementById("header-menu-danhmuc");
  const danhmucBox = document.getElementById("click-danhmuc");
  // Mở ô danh mục khi click vào
  danhmucBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation(); // Ngăn sự kiện click lan ra document
    danhmucBox.style.display =
      danhmucBox.style.display === "block" ? "none" : "block";
  });
  // Đóng ô danh mục khi click ra bất kỳ đâu ngoài ô danh mục
  document.addEventListener("click", function (e) {
    if (!danhmucBox.contains(e.target) && e.target !== danhmucBtn) {
      danhmucBox.style.display = "none";
    }
  });

  // Đóng ô tìm kiếm khi cuộn trang
  window.addEventListener("scroll", function () {
    danhmucBox.style.display = "none";
  });
  // Đóng khi xoay ngang màn hình (mobile)
  window.addEventListener("orientationchange", function () {
    danhmucBox.style.display = "none";
  });
  // (Optional) Đóng khi phóng to/thu nhỏ trình duyệt (resize)
  window.addEventListener("resize", function () {
    danhmucBox.style.display = "none";
  });
});

//cập nhật số lượng trong giỏ hàng
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector("#soluonggiohang").textContent = totalQuantity;
}

// Gọi hàm updateCartCount khi trang được tải để đảm bảo số lượng hiển thị đúng
document.addEventListener("DOMContentLoaded", updateCartCount);

//xử lý đăng ký đăng nhập
document.addEventListener("DOMContentLoaded", function () {
  // Hàm xác thực
  function isValidPhone(phone) {
    return /^\d{10}$/.test(phone); // Kiểm tra số điện thoại 10 chữ số
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Kiểm tra định dạng email
  }

  function isValidPassword(password) {
    return password.length >= 6; // Mật khẩu tối thiểu 6 ký tự
  }

  // Xử lý nút đăng ký
  document.getElementById("registerBtn").addEventListener("click", function () {
    const phone = document.getElementById("registerPhone").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;

    // Xác thực
    if (!isValidPhone(phone)) {
      alert("Vui lòng nhập số điện thoại hợp lệ (10 số).");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Vui lòng nhập email hợp lệ.");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    // Lấy danh sách tài khoản hoặc tạo mảng mới
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Kiểm tra xem số điện thoại hoặc email đã tồn tại chưa
    if (
      accounts.some(
        (account) => account.phone === phone || account.email === email
      )
    ) {
      alert("Số điện thoại hoặc email đã được đăng ký.");
      return;
    }

    // Thêm tài khoản mới
    accounts.push({ phone, email, password });
    localStorage.setItem("accounts", JSON.stringify(accounts));

    alert("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");

    // Xóa form
    document.getElementById("registerPhone").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
  });

  // Xử lý nút đăng nhập
  document.getElementById("loginBtn").addEventListener("click", function () {
    const loginInput = document
      .getElementById("loginEmailOrPhone")
      .value.trim();
    const password = document.getElementById("loginPassword").value;

    // Xác thực
    if (!loginInput || !password) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    // Kiểm tra tài khoản admin
    if (loginInput === 'admin' && password === 'admin') {
      alert('Đăng nhập thành công với tài khoản admin!');
      // Xóa form
      document.getElementById('loginEmailOrPhone').value = '';
      document.getElementById('loginPassword').value = '';
      // Điều hướng đến trang admin
      window.location.href = 'admin.html';
      return;
  }

    // Lấy danh sách tài khoản
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Kiểm tra thông tin đăng nhập
    const account = accounts.find(
      (account) =>
        (account.phone === loginInput || account.email === loginInput) &&
        account.password === password
    );

    if (account) {
      alert("Đăng nhập thành công!");
      // Xóa form
      document.getElementById("loginEmailOrPhone").value = "";
      document.getElementById("loginPassword").value = "";
      // Có thể chuyển hướng hoặc thực hiện hành động khác tại đây
      window.location.href = 'index.html';
    } else {
      alert("Số điện thoại/email hoặc mật khẩu không đúng.");
    }
  });
});
