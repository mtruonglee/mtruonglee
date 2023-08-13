var itemList = {
    "sp11111111": {
        "name": "Nước Tẩy Trang Eucerin",
        "price": 299000,
        "photo": "picture/img-product-1.webp"
    },
    "sp11111112": {
        "name": "Tinh Chất Trị Mụn Eucerin",
        "price": 392000,
        "photo": "picture/tinh-chat-tri-mun.jpg"
    },
    "sp11111113": {
        "name": "Kem Dưỡng Trắng Da Eucerin",
        "price": 790000,
        "photo": "picture/kem-duong-trang-da.webp"
    },
    "sp11111114": {
        "name": "Kem Dưỡng Da Eucerin",
        "price": 1370000,
        "photo": "picture/kem-duong-ban-dem.webp"
    },
    "sp11111115": {
        "name": "Kem Chống Nắng Eucerin",
        "price": 549000,
        "photo": "picture/kem-chong-nang.jpg"
    },
    "sp11111116": {
        "name": "Kem Trị Mụn La Roche-Posay",
        "price": 455000,
        "photo": "picture/kem-tri-mun-laoroche.jpg"
    },
    "sp11111117": {
        "name": "Sữa Rửa Mặt La Roche-Posay",
        "price": 599000,
        "photo": "picture/sua-rua-mat-laroche.jpg"
    },
    "sp11111118": {
        "name": "Xịt Khoáng La Roche-Posay",
        "price": 499000,
        "photo": "picture/xit-khoang-laroche.jpg"
    }
}


function addCart(code) {
    var number = parseInt(document.getElementById(code).value);
    console.log(number);
    if (typeof localStorage[code] === 'undefined') {
        window.localStorage.setItem(code, number);
        alert("Bạn đã đặt hàng thành công");
    } else {
        if (window.localStorage.getItem(code) > 100 || number > 100) {
            window.localStorage.setItem(code, 100);
            alert("Bạn đã đạt giới số lượng sản phẩm và không thể đặt thêm\nMời bạn đặt sản phẩm khác");
        } else {
            var current = parseInt(window.localStorage.getItem(code));
            window.localStorage.setItem(code, current + number);
            alert("Bạn đã đặt hàng thành công");


        }

    }
}

function removeCart(code) {
    if (typeof window.localStorage[code] !== "undefined") {
        //xóa sản phẩm khỏi localStorage
        window.localStorage.removeItem(code);
        //Xóa nội dung của phần thân của bảng (<tbody>)
        document.getElementById("cartDetail")
            .getElementsByTagName('tbody')[0].innerHTML = "";
        //Hiển thị lại nội dung chi tiết của đơn hàng
        showCart();
    }
}


function showCart() {
    var formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    var container = document.getElementById("cartDetail").getElementsByTagName("tbody")[0];
    container.innerHTML = '';
    var sum = 0;
    var TotalPrice = 0;
    for (let i = 0; i < window.localStorage.length; i++) {
        if (typeof itemList[localStorage.key(i)] === 'undefined')
            continue;
        var tr = document.createElement("tr");
        var photoItem = document.createElement("td");
        var nameItem = document.createElement("td");
        var numberItem = document.createElement("td");
        var priceItem = document.createElement("td");
        var sumItem = document.createElement("td");
        var deleteButton = document.createElement("td");

        // lấy mã
        var item = itemList[localStorage.key(i)];
        var code = window.localStorage.key(i);
        // lấy số lượng sản phẩm
        var number = localStorage.getItem(localStorage.key(i));
        // thêm ảnh
        photoItem.style.textAlign = "center";
        photoItem.innerHTML = "<img src='" + item.photo + "'class='round-figure' width='100px'/>";
        // thêm tên
        nameItem.innerHTML = item.name;
        nameItem.style.textAlign = "center";
        // thêm giá 
        priceItem.innerHTML = formatter.format(item.price);
        priceItem.style.textAlign = "center";
        // thêm số lượng
        numberItem.innerHTML = number;
        numberItem.style.textAlign = "center";
        // thêm giá tiền
        sum = number * item.price;
        sumItem.innerHTML = formatter.format(sum);
        sumItem.style.textAlign = "center";

        // thêm nút xóa
        var button = document.createElement("button");
        button.innerHTML = 'Xóa';
        button.style.color = "black";
        button.setAttribute("onclick", "removeCart('" + code + "')");
        // thêm nút button vào thẻ td
        deleteButton.appendChild(button);
        deleteButton.style.textAlign = "center";
        // thêm con vào bảng
        tr.appendChild(photoItem);
        tr.appendChild(nameItem);
        tr.appendChild(numberItem);
        tr.appendChild(priceItem);
        tr.appendChild(sumItem);
        tr.appendChild(deleteButton);
        // thêm dòng vào tbody
        container.appendChild(tr);
        TotalPrice += sum;
    }
    var spanTotalPirce = document.getElementById('TotalPirce');
    spanTotalPirce.innerHTML = formatter.format(TotalPrice);
}

function showcart() {
    showCart();
}
window.onstorage = () => {
    showCart();
};