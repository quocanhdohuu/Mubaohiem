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

// Hàm hiển thị giỏ hàng
document.addEventListener("DOMContentLoaded", () => {
  displayCart();
  updateCartCount();
});

// Hàm hiển thị giỏ hàng
function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.querySelector("#cart-items");
  const totalPriceElement = document.querySelector("#total-price");

  if (!cartItemsContainer || !totalPriceElement) return;

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart">Giỏ hàng đang trống</p>';
    totalPriceElement.textContent = "Tổng tiền: 0 VNĐ";
    return;
  }

  let totalPrice = 0;

  cart.forEach((item, index) => {
    const itemPrice = item.price * item.quantity;
    totalPrice += itemPrice;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
          
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-p">
                    <p><strong>${item.name}</strong></p>
                    <p>Màu sắc: ${item.color}</p>
                    <p>Kích cỡ: ${item.size}</p>
                    <p>Giá: ${item.priceString}</p>
                </div>
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <div class="delete-btn-container">
                <button class="delete-btn" onclick="deleteItem(${index})">Xóa</button>
            </div>
      `;
    cartItemsContainer.appendChild(cartItem);
  });

  totalPriceElement.textContent = `Tổng tiền: ${totalPrice.toLocaleString(
    "vi-VN"
  )} VNĐ`;
}

// Hàm thay đổi số lượng sản phẩm
function changeQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const newQuantity = cart[index].quantity + change;

  // Không cho phép số lượng giảm dưới 1
  if (newQuantity < 1) return;

  cart[index].quantity = newQuantity;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function deleteItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Hàm cập nhật số lượng giỏ hàng trong header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.querySelector("#soluonggiohang");
  if (cartCountElement) {
    cartCountElement.textContent = totalQuantity;
  }
}

// Hàm chuyển hướng đến trang thanh toán
function goToCheckout() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
      alert('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán!');
      return;
  }
  window.location.href = 'thanhtoan.html';
}

