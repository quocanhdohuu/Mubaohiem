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


//sang trang chi tiết sản phẩm
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".sanpham-item");

  items.forEach(item => {
      item.addEventListener("click", function () {
          const img = this.querySelector("img").getAttribute("src");
          const name = this.querySelector("h4").textContent;
          const price = this.querySelector("p").textContent;

          // Lưu thông tin vào localStorage
          localStorage.setItem("product_img", img);
          localStorage.setItem("product_name", name);
          localStorage.setItem("product_price", price);

          // Chuyển đến trang chi tiết
          window.location.href = "chitietsanpham.html";
      });
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

