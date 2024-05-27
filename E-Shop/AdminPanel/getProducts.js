
const checkLogin = () => {
    const token = localStorage.getItem('token');
    if(!token){
        window.location.href = "login.html";
    }
    fetch('http://localhost:5000/check-login', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Nepodařilo se získat data');
            }
            return response.json();
        })
        .then(data => {
          let message = data.message; 
          if(message != "login"){
            window.location.href = "login.html";
           }
        })
        .catch(error => {
            console.error('Chyba při získávání dat:', error);
        });
}


document.addEventListener('DOMContentLoaded', function() {
    fetchDataProducts();
    checkLogin();
});

function fetchDataProducts() {
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
            const productContainer = document.getElementById('productContainer');

            // Vytvoření prvků pro každý produkt a přidání do kontejneru
            data.documents.forEach(item => {
                const tr = document.createElement('tr');

                const tdname = document.createElement('td');
                tdname.textContent = item.name;
                tdname.classList.add('tm-product-name');

                const tdCode = document.createElement('td');
                tdCode.textContent = item.code;

                const tdPrice = document.createElement('td');
                tdPrice.textContent = item.price;

                const tdCategory = document.createElement('td');
                tdCategory.textContent = item.category.name;

                const tdUnits = document.createElement('td');
                tdUnits.textContent = item.units;
                
                const tdDelete = document.createElement('td');
                const iDelete = document.createElement('i');
                iDelete.classList.add('i');
                iDelete.classList.add('far');
                iDelete.classList.add('fa-trash-alt');
                iDelete.classList.add('tm-product-delete-icon');
                iDelete.onclick = () =>{
                    deleteProduct(item._id);
                }
                tdDelete.appendChild(iDelete);

                const tdEdit = document.createElement('td');
                const iconEdit = document.createElement('img');
                iconEdit.src = "img/edit-icon.png";
                iconEdit.classList.add('img-edit');
                iconEdit.onclick =()=>{
                window.location.href = `add-product.html?id=${item._id}`;
                }
                tdEdit.appendChild(iconEdit);

                tr.appendChild(tdname);
                tr.appendChild(tdCode);
                tr.appendChild(tdPrice);
                tr.appendChild(tdCategory);
                tr.appendChild(tdUnits);
                tr.appendChild(tdDelete);
                tr.appendChild(tdEdit);

                productContainer.appendChild(tr);
              
            });
        })
        .catch(error => {
            console.error('Chyba při získávání dat:', error);
        });
}



async function deleteProduct(productId) { // Přidání asynchronního označení
    try {
        const response = await fetch(`http://localhost:5000/delete-product/${productId}`, { // Použití await pro počkání na odpověď
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Nepodařilo se smazat produkt');
        }
        window.location.reload();
    } catch (error) {
        console.error('Chyba při mazání produktu:', error);
    }
}

