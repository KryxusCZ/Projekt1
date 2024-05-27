function fetchData() {
    fetch('http://localhost:5000/get-visible-product')
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
            const productContainer = document.getElementById('productContainer');

            // Vytvoření prvků pro každý produkt a přidání do kontejneru
            data.documents.forEach(item => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('products');
                
                const image = document.createElement('img');
                image_url = item.url;
                image.src = image_url.slice(6);
                console.log(item.url);
                image.alt = item.name;
                productDiv.appendChild(image);
                
                const nameHeading = document.createElement('h3');
                nameHeading.textContent = item.name;
                productDiv.appendChild(nameHeading);
                
                const priceHeading = document.createElement('h4');
                priceHeading.textContent = item.price + ' €';
                productDiv.appendChild(priceHeading);
                
                const buyLink = document.createElement('a');
                buyLink.href = '#';
                buyLink.classList.add('primary-btn');
                buyLink.textContent = 'Kup nyní';
                productDiv.appendChild(buyLink);
                
                productContainer.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error('Chyba při získávání dat:', error);
        });
}

// Volání funkce pro získání a zobrazení dat po načtení stránky
window.onload = function() {
    fetchData();
};
