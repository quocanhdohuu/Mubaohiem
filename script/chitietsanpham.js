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

$(document).ready(function () {
  const img = localStorage.getItem("product_img");
  const name = localStorage.getItem("product_name");
  const price = localStorage.getItem("product_price");

  $(".product-img").attr("src", img);
  $(".product-name").text(name);
  $(".product-price").text(price);
});


//chọn size
document.addEventListener("DOMContentLoaded", function () {
  const sizeButtons = document.querySelectorAll(".size-btn");

  sizeButtons.forEach(button => {
      button.addEventListener("click", () => {
          // Bỏ class active ở tất cả nút
          sizeButtons.forEach(btn => btn.classList.remove("active"));

          // Thêm class active vào nút vừa click
          button.classList.add("active");

          // Bạn có thể lưu vào biến hoặc localStorage nếu muốn dùng sau
          const selectedSize = button.textContent;
          console.log("Kích cỡ đã chọn:", selectedSize);
      });
  });
});


//chọn màu
document.addEventListener("DOMContentLoaded", function () {
  const sizeButtons = document.querySelectorAll(".color-btn");

  sizeButtons.forEach(button => {
      button.addEventListener("click", () => {
          // Bỏ class active ở tất cả nút
          sizeButtons.forEach(btn => btn.classList.remove("active"));

          // Thêm class active vào nút vừa click
          button.classList.add("active");

          // Bạn có thể lưu vào biến hoặc localStorage nếu muốn dùng sau
          const selectedColor = button.textContent;
          console.log("Màu đã chọn:", selectedColor);
      });
  });
});

//số lượng
document.addEventListener("DOMContentLoaded", function () {
  const soluongHienThi = document.getElementById("soluong");
  const nutGiam = document.getElementById("giam");
  const nutTang = document.getElementById("tang");

  let soluong = 1;

  nutGiam.addEventListener("click", () => {
      if (soluong > 1) {
          soluong--;
          soluongHienThi.textContent = soluong;
      }
  });

  nutTang.addEventListener("click", () => {
      soluong++;
      soluongHienThi.textContent = soluong;
  });

  // const nutThemVaoGio = document.querySelector(".add-to-cart-btn");
  // nutThemVaoGio.addEventListener("click", () => {
  //     console.log("Số lượng đã chọn:", soluong);
      // Gọi hàm thêm vào giỏ hàng hoặc lưu vào localStorage nếu cần
  // });
});


//thêm vào giỏ hàng
document.addEventListener('DOMContentLoaded', () => {
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  if (addToCartBtn) {
      addToCartBtn.addEventListener('click', function () {
          const productName = document.querySelector('.product-name').textContent;
          const productPriceText = document.querySelector('.product-price').textContent.trim();
          const productImage = document.querySelector('.product-img').src;
          const selectedColor = document.querySelector('.color-btn.active').textContent;
          const selectedSize = document.querySelector('.size-btn.active').textContent;
          const quantity = parseInt(document.querySelector('#soluong').textContent);

          // Lấy giá gốc (dạng chuỗi: "330,000 VNĐ")
          const priceString = productPriceText;

          // Chuyển đổi giá thành số để tính toán
          const priceNumber = parseInt(productPriceText.replace(/[^0-9]/g, ''));

          const product = {
              name: productName,
              price: priceNumber, // Dùng để tính toán
              priceString: priceString, // Dùng để hiển thị
              image: productImage,
              color: selectedColor,
              size: selectedSize,
              quantity: quantity
          };

          let cart = JSON.parse(localStorage.getItem('cart')) || [];
          const existingProductIndex = cart.findIndex(
              item => item.name === productName && item.color === selectedColor && item.size === selectedSize
          );

          if (existingProductIndex !== -1) {
              cart[existingProductIndex].quantity += quantity;
          } else {
              cart.push(product);
          }

          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartCount();
      });
  }
  updateCartCount();
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.querySelector('#soluonggiohang');
  if (cartCountElement) {
      cartCountElement.textContent = totalQuantity;
  }
}

