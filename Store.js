// class Store { // quản lý các sản phẩmphẩm
//     id;
//     name;
//     listProduct;

//     constructor(id, name, listProduct) {
//         // let product = new Product(1, "Iphone", 31000000, 3);
//         this.id = id;
//         this.name = name;
//         this.listProduct = [];
//     }

//     getProductById(id) {
//         for (let i = 0; i < this.listProduct.length; i++) {
//             if (this.listProduct[i] == id) {
//                 return this.listProduct[i];
//             }
//         }
//     }
//     getListProducts() {
//         return this.listProduct;
//     }

//     addProduct(newProduct) {
//         this.listProduct.push(newProduct);
//     }

//     removeProduct(id) {
//         let index = -1;
//         for (let i = 0; i < this.listProduct.length; i++) {
//             let product = this.listProduct[i];

//             if (p.id == id) {
//                 index = i;
//                 break;
//             }

//         }
//         if (index == -1) {
//             alert('Khong co san pham nay!!');
//         }
//         else {
//             this.listProduct.splice(index, 1);
//         }
//     }

//     update(id, newProduct) {
//         let index = -1;
//         for (let i = 0; i < this.listProduct.length; i++) {
//             let product = this.listProduct[i];

//             if (p.id == id) {
//                 index = i;
//                 break;
//             }

//         }
//         if (index == -1) {
//             alert('Khong co san pham nay!!');
//         }
//         else {
//             this.listProduct[index] = newProduct;
//         }
//     }
// }

class Store {
    id;
    name;
    listProduct;

    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.listProduct = [];
    }

    getProductById(id) {
        return this.listProduct.find(product => product.id === id);
    }

    getListProducts() {
        return this.listProduct;
    }

    addProduct(newProduct) {
        this.listProduct.push(newProduct);
    }

    removeProduct(id) {
        const index = this.listProduct.findIndex(product => product.id === id);
        if (index === -1) {
            alert('Không có sản phẩm này!');
        } else {
            this.listProduct.splice(index, 1);
        }
    }

    update(id, newProduct) {
        const index = this.listProduct.findIndex(product => product.id === id);
        if (index === -1) {
            alert('Không có sản phẩm này!');
        } else {
            this.listProduct[index] = newProduct;
        }
    }

    getListByName(name){
        let result = [];
        for(let i = 0; i< this.listProduct.length; i++) {
            let product = this.listProduct[i];
            if(product.name.toLowerCase().includes(name.toLowerCase())) {
                result.push(product);
            }
        }
        return result;
    }

    
    saveToStorage() {
        localStorage.setItem("productList", JSON.stringify(this.listProduct));
    }

    loadFromStorage() {
        const data = localStorage.getItem("productList");
        if (data) {
            const parsed = JSON.parse(data);
            this.listProduct = parsed.map(p => new Product(p.id, p.name, p.price, p.quantity));
        } else {
            this.listProduct = [];
        }
    }
}
