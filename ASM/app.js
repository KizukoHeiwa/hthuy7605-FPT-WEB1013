const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".sliderItem");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

var temp = false;
var i = 0;
let setTimerAutoSlide = setInterval(autoSlide, 2000);

function scrollOnTop() {
    window.scrollTo(0, 0);
}

function openForm() {
    if (!temp) {
        document.getElementById("bodyLogin").style.display = "block";
        temp = true;
    }
    else {
        document.getElementById("bodyLogin").style.display = "none";
        temp = false;
    }
}

function autoSlide() {
    i++;
    wrapper.style.transform = `translateX(${-100 * i}vw)`;
    if (i==menuItems.length-1) {
        i=-1;
    }
}

const products = [
    {
        id: 1,
        title: "HG 1/144 BLACK KNIGHT SQUAD Shi-ve.A",
        price: 1000000,
        desc: "Sản phẩm nhựa cao cấp với độ sắc nét cao, an toàn cho người chơi .Không bao gồm Giá đỡ mô hình (Các bạn có thể mua thêm tại Giá đỡ mô hình Gundam). Sản phẩm giúp phát triển trí não và rèn luyện tính kiên nhẫn cho người chơi. Các khớp cử động linh hoạt theo ý muốn. Sản phẩm gắn với nhau bằng khớp nối, không dùng keo dán.",
        colors: [
            {
                code: "black",
                img: "/img/gundam-black.png",
            },
            {
                code: "rgb(51, 89, 194)",
                img: "/img/gundam-blue.png",
            }
        ]
    },
    {
        id: 2,
        title: "Oversize Gundam T-Shirt",
        price: 500000,
        desc: "Áo thun in mô hình Gundam. Oversize phù hợp với mọi người.",
        colors: [
            {
                code: "#6a6b4c",
                img: "/img/tshirt-green.png",
            },
            {
                code: "#363636",
                img: "/img/tshirt-black.png",
            }
        ]
    },
    {
        id: 3,
        title: "Bilmola Gundam X Replicon GT Complete Set",
        price: 2000000,
        desc: "Nón bảo hiểm cosplay thuộc vũ trụ Gundam.",
        colors: [
            {
                code: "#f30c2c",
                img: "/img/helmet-red.png",
            },
            {
                code: "#e66b88",
                img: "/img/helmet-pink.png",
            }
        ]
    },
    {
        id: 4,
        title: "Gundam Blue",
        price: 6000000,
        colors: [
            {
                code: "blue",
                img: "/img/gundam-blue.png",
            },
            {
                code: "black",
                img: "/img/gundam-black.png",
            }
        ]
    },
    {
        id: 5,
        title: "T-Shirt Black",
        price: 75000,
        colors: [
            {
                code: "black",
                img: "/img/tshirt-black.png",
            }
            ,
            {
                code: "green",
                img: "/img/tshirt-green.png",
            }
        ]
    }
];
let str = "";

for (prod of products) {
    
    str += `
        <div class="column">
            <div class="san-pham">
                <div class="ten">${prod.title}</div>
                <a href="sanPham.html?num=${prod.id}#product"><img src="${prod.colors[0].img}" alt=""></a>
                <div class="gia">
                    <strong><del>${prod.price.toLocaleString("vi")} VNĐ</del><br>$${(prod.price * 0.9).toLocaleString("vi")} VNĐ</strong>
                </div>
            </div>
        </div>
    `
}
document.querySelector(".article").innerHTML = str;

let cart =[]; // tạo giỏ hàng rỗng

// cart.fill(localStorage.getItem("cart", JSON.stringify(cart)), 0);

cart = JSON.parse(localStorage.getItem("cart"));

showCart();

// Hiện thanh toán
function thanhToan() {
    payment.style.display = "flex";
}
close.addEventListener("click", () =>{
    payment.style.display = "none"
});

// Thanh Toán
function onPayButton() {
    cart = [];
    showCart();
    alert("Thanh toán thành công!");
}

// del sp trong cửa hàng
function del(x,i){
    let tr = x.parentElement.parentElement;
    cart.splice(i,1);
    showCart();
}

function update(x, i){
    cart[i][3] = x.value*1; // lấy số lượng đang lưu trong giỏ hàng gán bằng số lượng mới thay đổi tại thẻ input
    showCart();
}

// hàm thêm sp
function addCart(button){
    let div = button.parentElement.children;// truy xuất tới thẻ div
    let hinh = button.parentElement.parentElement.children[0].src; // lấy thông tin hình
    let ten = div[0].innerHTML; // lấy tên
    let gia = div[1].innerHTML; // lấy giá     
    let sl = div[5].value; // lấy số lượng người dùng muốn mua
    if (sl.length == 0 || sl == "0") {
        alert("Bạn chưa nhập số lượng");
        return;
    }
    sl = parseInt(sl);
    const item = [hinh,ten,gia,sl]; // lưu thông tin sp lấy được
    let check = true; 
    for(let i = 0; i <cart.length;i++){
        if(cart[i][1] == item[1]){
            check = false;
            sl += cart[i][3];
            cart[i][3] = sl;
            break;
        }
    }

    if (check == true){
        cart.push(item); // lưu sp mua được vào giỏ hàng
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
}

// show giỏ hàng 
    function showCart(){
        let row = "";
        let tong = 0;
        if (cart.length == 0) {
            row += `
                <tr>
                    <td colspan="9">Giỏ hàng đang trống</td>
                </tr>
            `
        } else {
            for(let i = 0; i < cart.length; i++){
                let tt = cart[i][2].replace(" VNĐ", "").replaceAll(".", "") * cart[i][3];
                tong += tt;
                row += 
                `
            <tr>
                <td>${i+1}</td>
                <td><img src="${cart[i][0]}"</td>
                <td>${cart[i][1]}</td>
                <td>${cart[i][2]}</td>
                <td><input type="number" min="1" value="${cart[i][3]}" onchange="update(this,${i})"></td>
                <td>${tt.toLocaleString("vi")}</td>
                <td><i class="fa-solid fa-user-xmark" onclick ="del(this,${i})"></i></td>
            </tr>            
                `
            }
        }
    document.getElementById("tb").innerHTML = row;
    document.getElementById("total").innerHTML = tong.toLocaleString("vi") + " VNĐ";
    localStorage.setItem("cart", JSON.stringify(cart));
    }


// ẩn hiện giỏ hàng
let open_cart = document.querySelector("#gioHang");
// let close_cart = document.querySelector(".fa-rectangle-xmark");

// hiện giỏ hàng
open_cart.addEventListener("click",function(){
    if (document.getElementById("cart").style.display == "block") {
        document.getElementById("cart").style.display = "none";
    } else {
        document.getElementById("cart").style.display = "block";
    }
});

let setTimerCountDown = setInterval(countDown, 1000);

// sự kiện sale off
function countDown() {
    let saledate = new Date('2024/08/15 00:00').getTime();
    let now = new Date().getTime();    
    let d = saledate - now;    
    let days = Math.floor(d/(24*60*60*1000));
    let hours = Math.floor(d/(60*60*1000));
    let minutes = Math.floor(d/(60*1000));
    let seconds = Math.floor(d/(1000));
    // Đảm bảo hiện thị 1 ngày có 24h, 1h có 60 phút , 1 phút có 60 giây
            hours%=24;
            minutes%=60;
            seconds%=60;
    document.getElementById("ngay").innerHTML = days;
    document.getElementById("gio").innerHTML = hours;
    document.getElementById("phut").innerHTML = minutes;
    document.getElementById("giay").innerHTML = seconds;    
    
    // dừng đếm ngược
    if(d < 0){
        clearInterval(setTimerCountDown);
        document.getElementById("ngay").innerHTML = "00";
        document.getElementById("gio").innerHTML = "00";
        document.getElementById("phut").innerHTML = "00";
        document.getElementById("giay").innerHTML = "00"; 
    }
}