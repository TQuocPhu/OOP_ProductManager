// let myStore = new Store(1, "Shopee");

// function renderProduct() {
//     // let list_product = myStore.listProduct;
//     let list_product = myStore.getListProducts();
//     let html = ``;
//     for (let i = 0; i < myStore.listProduct.length; i++) {
//         let product = list_product[i];
//         html += `
//             <tr>
//                 <td>${product.id}</td>
//                 <td>${product.name}</td>
//                 <td>${product.price}</td>
//                 <td>${product.quantity}</td>
//                 <td>
//                     <button onclick="showFormUpdate()" class="btn btn-warning btn-sm">Sửa</button>
//                     <button onclick="removeProduct()" class="btn btn-danger btn-sm">Xóa</button>
//                 </td>
//             </tr>
//         `;
//     }
//     document.getElementById('grip-products').innerHTML = html;
// }




// function addProduct() {
//     let list = myStore.getListProducts();

//     let id = list.length + 1;
//     let name = document.getElementById("productName").value;
//     let price = document.getElementById("productPrice").value;
//     let quantity = document.getElementById("productQuantity").value;
//     let p = new Product(id, name, price, quantity);
//     myStore.addProduct(p);
//     renderProduct();
// }


// function deleteProduct(id) {
//     let isComfirm = confirm("Are you sure ");
//     if (isComfirm) {
//         myStore.removeProduct(id);
//         renderProduct();
//     }
// }

// function updateProduct(id) {
//     let name = document.getElementById('productName').value;
//     let price = document.getElementById('productPrice').value;
//     let quantity = document.getElementById('productQuantity').value;

//     let product = new Product(id, name, price, quantity);
//     myStore.update(id, product);

//     renderProduct();
// }

// function showFormUpdate() {
//     let product = myStore.getProductById(id);
//     document.getElementById('ui').innerHTML = `
//             <!-- Form Sửa Sản phẩm -->
//         <div class="card mb-5">
//             <div class="card-header bg-primary text-white">
//                 Sửa Sản phẩm
//             </div>
//             <div class="card-body">
//                 <form>
//                     <div class="row g-3">
//                         <div class="col-md-6">
//                             <label for="productName" class="form-label">Tên sản phẩm</label>
//                             <input type="text" class="form-control" id="productName" value="${product.name}">
//                         </div>
//                         <div class="col-md-6">
//                             <label for="productPrice" class="form-label">Giá</label>
//                             <input type="number" class="form-control" id="productPrice" value="${product.price}" >
//                         </div>
//                         <!-- <div class="col-md-12">
//                             <label for="productDescription" class="form-label">Mô tả</label>
//                             <textarea class="form-control" id="productDescription" rows="3"
//                                 placeholder="Nhập mô tả sản phẩm"></textarea>
//                         </div> -->
//                         <div class="col-md-6">
//                             <label for="productPrice" class="form-label">Số lượng</label>
//                             <input type="number" class="form-control" id="productQuantity" value="${product.quantity}">
//                         </div>

//                         <!-- <div class="col-md-6">
//                             <label for="productImage" class="form-label">Hình ảnh</label>
//                             <input type="file" class="form-control" id="productImage">
//                         </div> -->
//                     </div>
//                     <div class="mt-4">
//                         <button onclick="updateProduct(${id})" type="submit" class="btn btn-success">Sửa sản phẩm</button>
//                         <button type="reset" class="btn btn-secondary">Làm mới</button>
//                     </div>
//                 </form>
//             </div>
//         </div>`;
// }


// renderProduct();



let myStore = new Store(1, "Shopee");
let filteredList = null;

myStore.loadFromStorage(); // Tải dữ liệu từ localStorage
// Hàm khởi tạo giao diện và hiển thị danh sách sản phẩm
function renderProduct() {
    let list_product = filteredList ?? myStore.getListProducts();
    let html = ``;
    for (let i = 0; i < list_product.length; i++) {
        let product = list_product[i];
        html += `
            <tr>
                <td>${i + 1}</td>
                <td>${product.name}</td>
                <td>${Number(product.price)}</td>
                <td>${Number(product.quantity)}</td>
                <td>
                    <button onclick="showFormUpdate(${product.id})" class="btn btn-warning btn-sm">Sửa</button>
                    <button onclick="deleteProduct(${product.id})" class="btn btn-danger btn-sm">Xóa</button>
                </td>
            </tr>
        `;
    }
    document.getElementById('grip-products').innerHTML = html;
}

// function addProduct() {
//     let list = myStore.getListProducts();
//     let id = list.length > 0 ? list[list.length - 1].id + 1 : 1;
//     let name = document.getElementById("productName").value;
//     let price = document.getElementById("productPrice").value;
//     let quantity = document.getElementById("productQuantity").value;

//     let p = new Product(id, name, price, quantity);
//     myStore.addProduct(p);
//     renderProduct();
//     document.querySelector("form").reset();
// }

function addProduct(event) {
    event.preventDefault(); //  Ngăn reload form

    let list = myStore.getListProducts();
    let id = list.length > 0 ? list[list.length - 1].id + 1 : 1;
    let name = document.getElementById("productName").value;
    let price = document.getElementById("productPrice").value;
    let quantity = document.getElementById("productQuantity").value;

    if (!name || !price || !quantity) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    let p = new Product(id, name, Number(price), Number(quantity));
    myStore.addProduct(p);
    myStore.saveToStorage();
    renderProduct();
    document.querySelector("form").reset();
}

function deleteProduct(id) {
    let isConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm?");
    if (isConfirm) {
        myStore.removeProduct(id);
        myStore.saveToStorage();
        renderProduct();
    }
}

function updateProduct(id) {
    let name = document.getElementById('productName').value;
    let price = document.getElementById('productPrice').value;
    let quantity = document.getElementById('productQuantity').value;

    let product = new Product(id, name, Number(price), Number(quantity));
    myStore.update(id, product);
    myStore.saveToStorage();
    renderProduct();

    // Trả form về lại giao diện thêm mới
    document.getElementById('ui').innerHTML = defaultFormHTML;
}

function showFormUpdate(id) {
    let product = myStore.getProductById(id);
    document.getElementById('ui').innerHTML = `
        <div class="card mb-5">
            <div class="card-header bg-primary text-white">
                <h3>Sửa Sản phẩm</h3>
            </div>
            <div class="card-body">
                <form onsubmit="event.preventDefault(); updateProduct(${id})">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label for="productName" class="form-label">Tên sản phẩm</label>
                            <input type="text" class="form-control" id="productName" value="${product.name}">
                        </div>
                        <div class="col-md-6">
                            <label for="productPrice" class="form-label">Giá</label>
                            <input type="number" class="form-control" id="productPrice" value="${product.price}">
                        </div>
                        <div class="col-md-6">
                            <label for="productQuantity" class="form-label">Số lượng</label>
                            <input type="number" class="form-control" id="productQuantity" value="${product.quantity}">
                        </div>
                    </div>
                    <div class="mt-4">
                        <button type="submit" class="btn btn-success p-2">Cập nhật sản phẩm</button>
                        <button type="button" onclick="restoreAddForm()" class="btn btn-secondary p-2">Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}


function searchProduct(keyword, minPrice, maxPrice) {
    let allProducts = myStore.getListProducts();

    filteredList = allProducts.filter(p => {
        const matchKeyword =
            keyword === "" ||
            p.name.toLowerCase().includes(keyword) ||
            p.price.toString().includes(keyword) ||
            p.quantity.toString().includes(keyword);

        const matchPrice = p.price >= minPrice && p.price <= maxPrice;

        return matchKeyword && matchPrice;
    });

    renderProduct();
}

function search(){
    let keyword = document.getElementById("searchInput").value.toLowerCase().trim();
    let minPrice = parseFloat(document.getElementById("minPrice").value);
    let maxPrice = parseFloat(document.getElementById("maxPrice").value);
    if(!minPrice) minPrice = -Infinity;
    if(!maxPrice) maxPrice = Infinity;

    searchProduct(keyword, minPrice, maxPrice);
}

let defaultFormHTML = document.getElementById('ui').innerHTML;

function restoreAddForm() {
    document.getElementById('ui').innerHTML = defaultFormHTML;
}

myStore.saveToStorage();
// myStore.loadFromStorage();
// Khi tải trang
renderProduct();

//Dự án cuối module: 
// Quản lý: tương tự demo, tìm hiểu thêm về giao diện, quản lý nhiều chủ thể hơn.
// Bí idea => hỏi Linh
//hoặc
//Mini game: bắn bóng, flappy bird, game đơn giản