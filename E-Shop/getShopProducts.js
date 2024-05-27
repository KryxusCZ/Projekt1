window.onload = function() {
    fetchData();
};


function fetchData() {
    fetch('http://localhost:5000/getproduct')
        .then(response => {
            if (!response.ok) {
                throw new Error('Nepodařilo se získat data');
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data.documents)) {
                throw new Error('Data nejsou ve správném formátu');
            }

            // Získání kontejneru pro produkty
            const productContainer = document.getElementById('shopContainer');

            // Vytvoření prvků pro každý produkt a přidání do kontejneru
            data.documents.forEach(item => {
                const fullDiv = document.createElement('div');
                fullDiv.classList.add('col-md-12');
                fullDiv.classList.add('col-md-4');
                fullDiv.classList.add('col-lg-3');
                fullDiv.classList.add('mb-5');

                const a = document.createElement('a');
                a.classList.add('product-item');
                fullDiv.appendChild(a);
                
                const img = document.createElement('img');
                img.src = item.url;
                img.classList.add('img-fluid');
                img.classList.add('img-shop-product');
                img.classList.add('product-thumbnail');
                a.appendChild(img);

                const h3 = document.createElement('h3');
                h3.classList.add('product-title');
                h3.textContent = item.name;
                a.appendChild(h3);

                const strong = document.createElement('strong');
                strong.classList.add('product-price');
                strong.textContent = item.price + " Kč";
                a.appendChild(strong);
                
                const span = document.createElement('span');
                span.classList.add('icon-cross');
                span.onclick =()=>{
                    addToCart(item._id,item.name, item.url, item.price);
                    alert('Položka: ' + item.name + ' byla přidána do košíku');
                }
                a.appendChild(span);


                const img_icon = document.createElement('img');
                img_icon.src = "images/cross.svg";
                img_icon.classList.add('img-fluid');
                span.appendChild(img_icon);
                productContainer.appendChild(fullDiv);
            });
        })
        .catch(error => {
            console.error('Chyba při získávání dat:', error);
        });
}


function addToCart(id, name, img, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let newProduct = {
        id:id,
        name: name,
        img: img,
        price: price
    };

    let productExists = cart.some(product => product.name === name);

    if (!productExists) {
        cart.push(newProduct);

        localStorage.setItem('cart', JSON.stringify(cart));
        
        console.log('Product added to cart:', newProduct);
    } else {
        console.log('Product already in cart:', newProduct);
    }
}