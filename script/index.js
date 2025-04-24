var n = 3;
var i = 1;

function next() {
  if (i == n) i = 1;
  else i++;

  document
    .getElementById("banner")
    .setAttribute("src", "img/banner" + i + ".png");
}

function back() {
  if (i == 1) i = n;
  else i--;

  document
    .getElementById("banner")
    .setAttribute("src", "img/banner" + i + ".png");
}

function autoPlay() {
  setInterval(next, 2000);
}

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

//
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
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector('#soluonggiohang').textContent = totalQuantity;
}

// Gọi hàm updateCartCount khi trang được tải để đảm bảo số lượng hiển thị đúng
document.addEventListener('DOMContentLoaded', updateCartCount);

