(async () => {
    const productContainerEl = document.getElementById("productContainer");
    const searchBarEl = document.getElementById("searchBar");
    const url = "https://fakestoreapi.com/products";
    const fetchProduts = async () => {
        try {
            const res = await fetch(url);
            return await res.json();
        } catch (error) {
            return error;
        }
    };
    const products = await fetchProduts();
    const generateProducts = (product) => {
        return `
    <div class="product_card">
            <div class="image_container">
                <img src=${product.image} alt=""/>
            </div>
            <div class="product_content">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <button>${product.price} $</button>
            </div>
        </div>`;
    };
    const renderProducts = (products) => {
        productContainerEl.innerHTML = "";
        products.forEach((product) => {
            productContainerEl.innerHTML += generateProducts(product);
        });
    };
    renderProducts(products);
    const filterHandler = (event) => {
        const searchText = event.target.value.toLowerCase();

        const filterProduct = products.filter((product) => {
            return (
                product.description.toLowerCase().includes(searchText) ||
                product.title.toLowerCase().includes(searchText) ||
                product.price.toString().includes(searchText)
            );
        });

        renderProducts(filterProduct);
    };

    searchBarEl.addEventListener("keyup", filterHandler);
})();
