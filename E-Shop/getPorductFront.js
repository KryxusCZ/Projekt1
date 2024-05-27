
const checkLogin = () => {
    const token = localStorage.getItem('token');
    if(!token){
        window.location.href = "prihlaseni.html";
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
            window.location.href = "prihlaseni.html";
           }
        })
        .catch(error => {
            console.error('Chyba při získávání dat:', error);
        });
}
window.onload = function() {
    fetchData();
    checkLogin();
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
            const productContainer = document.getElementById('homeProducts');

            // Vytvoření prvků pro každý produkt a přidání do kontejneru
            data.documents.forEach(item => {
                const flexDiv = document.createElement('div');
                flexDiv.classList.add('flex');

                const nazevDiv = document.createElement('div');
                nazevDiv.textContent = item.name;
                nazevDiv.classList.add('divContainer')

                const codeDiv = document.createElement('div');
                codeDiv.textContent = item.code;
                codeDiv.classList.add('divContainer');

                const cenaDiv = document.createElement('div');
                cenaDiv.textContent = item.price;
                cenaDiv.classList.add('divContainer');

                const popisDiv = document.createElement('div');
                popisDiv.textContent = item.description;
                popisDiv.classList.add('divContainer');

                const buttonsDiv = document.createElement('div');
                const smazatButton = document.createElement('button');
                smazatButton.textContent = 'Smazat';
                smazatButton.onclick = () => deleteProduct(item._id); // Opravení zavolání funkce deleteProduct
                smazatButton.classList.add('button');

                const videtButton = document.createElement('button');
                videtButton.textContent = 'Viditelnost';
                videtButton.classList.add('button');
                videtButton.onclick =()=>{
                    updateVisibility(item._id);
                }

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.classList.add('button');
                editButton.onclick =()=> {
                window.location.href = `products.html?id=${item._id}`;
                }

                buttonsDiv.appendChild(smazatButton);
                buttonsDiv.appendChild(videtButton);
                buttonsDiv.appendChild(editButton);
                buttonsDiv.classList.add('buttonsDiv')

                // Přidání vytvořených prvků do flexDiv
                flexDiv.appendChild(nazevDiv);
                flexDiv.appendChild(codeDiv);
                flexDiv.appendChild(cenaDiv);
                flexDiv.appendChild(popisDiv);
                flexDiv.appendChild(buttonsDiv);
                flexDiv.classList.add('flexDiv')

                // Přidání flexDiv do kontejneru homeProducts
                productContainer.appendChild(flexDiv);
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
        const productElement = document.getElementById(productId);
        productElement.remove();
        console.log('Produkt byl úspěšně smazán');
        location.reload(location.href);
    } catch (error) {
        console.error('Chyba při mazání produktu:', error);
    }
}


const updateVisibility = async(productId) =>{
    try {
        const response = await fetch(`http://localhost:5000/update-visible-product/${productId}`, { // Použití await pro počkání na odpověď
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Nepodařilo se aktualizovat produkt');
        }
        
    } catch (error) {
        console.error('Chyba při aktualizaci produktu:', error);
    }
}
