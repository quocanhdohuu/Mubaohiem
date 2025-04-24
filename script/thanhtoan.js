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
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('#soluonggiohang').textContent = totalQuantity;
  }
  
  // Gọi hàm updateCartCount khi trang được tải để đảm bảo số lượng hiển thị đúng
  document.addEventListener('DOMContentLoaded', updateCartCount);




  //sử lý đặt hàng
  // Hiển thị đơn hàng khi trang tải
  document.addEventListener('DOMContentLoaded', () => {
    displayOrder();

    // Gắn sự kiện cho nút "Đặt hàng"
    document.querySelector('#dathang-btn').addEventListener('click', submitOrder);
});

// Hàm hiển thị danh sách sản phẩm trong đơn hàng
function displayOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsContainer = document.querySelector('#sanphammua');
    const totalPriceElement = document.querySelector('#order-total');

    if (!orderItemsContainer || !totalPriceElement) return;

    orderItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const itemPrice = item.price * item.quantity;
        totalPrice += itemPrice;

        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');
        orderItem.innerHTML = `
            <p><strong>${item.name} x ${item.quantity}</strong></p>
            <p>Màu sắc: ${item.color}</p>
            <p>Kích cỡ: ${item.size}</p>
            <p>${item.priceString}</p>
        `;
        orderItemsContainer.appendChild(orderItem);
    });

    totalPriceElement.textContent = `Tổng: ${totalPrice.toLocaleString('vi-VN')} VNĐ`;
}

// Hàm xử lý đặt hàng
function submitOrder() {
    // Lấy giá trị từ form
    const fullName = document.querySelector('#fullName').value.trim();
    const email = document.querySelector('#email').value.trim();
    const phone = document.querySelector('#phone').value.trim();
    const province = document.querySelector('#province').value;
    const district = document.querySelector('#district').value;
    const ward = document.querySelector('#ward').value;
    const address = document.querySelector('#address').value.trim();
    const notes = document.querySelector('#notes').value.trim();
    const terms = document.querySelector('#Check').checked;

    // Kiểm tra các trường bắt buộc
    if (!fullName || !phone || !province || !district || !ward || !address) {
        alert('Vui lòng điền đầy đủ các trường bắt buộc!');
        return;
    }

    // Kiểm tra định dạng email (nếu có nhập)
    if (email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert('Vui lòng nhập địa chỉ email hợp lệ!');
            return;
        }
    }

    // Kiểm tra định dạng số điện thoại
    const phoneRegex = /^(\+84|0)[1-9][0-9]{8,9}$/;
    if (!phoneRegex.test(phone)) {
        alert('Vui lòng nhập số điện thoại hợp lệ (bắt đầu bằng +84 hoặc 0, theo sau là 9-10 chữ số)!');
        return;
    }

    // Kiểm tra checkbox
    if (!terms) {
        alert('Vui lòng đồng ý với điều khoản và điều kiện của website!');
        return;
    }

    // Lấy giỏ hàng
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;
    const orderItems = cart.map(item => {
        const itemPrice = item.price * item.quantity;
        totalPrice += itemPrice;
        return `${item.name} x ${item.quantity} (Màu sắc: ${item.color}, Kích cỡ: ${item.size}, Giá: ${item.priceString})`;
    }).join('\n');

    // Tạo thông báo
    const orderSummary = `
        Thông tin đơn hàng:
        Họ và tên: ${fullName}
        Email: ${email || 'Không cung cấp'}
        Số điện thoại: ${phone}
        Địa chỉ: ${address}, ${ward}, ${district}, ${province}
        Ghi chú giao hàng: ${notes || 'Không có'}
        Sản phẩm:
        ${orderItems}
        Tổng tiền: ${totalPrice.toLocaleString('vi-VN')} VNĐ
    `;

    alert(orderSummary);

    // Xóa giỏ hàng
    localStorage.removeItem('cart');

    // Chuyển về trang index.html
    window.location.href = 'index.html';
}
