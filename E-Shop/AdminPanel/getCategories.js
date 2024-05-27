
document.addEventListener('DOMContentLoaded', function() {
    fetchData();
});

function fetchData() {
    fetch('http://localhost:5000/get-categories')
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
            const categoryContainer = document.getElementById('categoryContainer');

            // Vytvoření prvků pro každý produkt a přidání do kontejneru
            data.documents.forEach(item => {
                const tr = document.createElement('tr');

                const tdname = document.createElement('td');
                tdname.textContent = item.name;
                tdname.classList.add('tm-product-name');

                const tdDelete = document.createElement('td');
                const iDelete = document.createElement('i');
                iDelete.classList.add('i');
                iDelete.classList.add('far');
                iDelete.classList.add('fa-trash-alt');
                iDelete.classList.add('tm-product-delete-icon');
                iDelete.onclick = () =>{
                    deleteCategory(item._id);
                }
                tdDelete.appendChild(iDelete);

                const tdEdit = document.createElement('td');
                const iconEdit = document.createElement('img');
                iconEdit.src = "img/edit-icon.png";
                iconEdit.classList.add('img-edit');
                iconEdit.onclick =()=>{
                window.location.href = `add-category.html?id=${item._id}`;
                }
                tdEdit.appendChild(iconEdit);

                tr.appendChild(tdname);
                tr.appendChild(tdDelete);
                tr.appendChild(tdEdit);

                categoryContainer.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Chyba při získávání dat:', error);
        });
}



async function deleteCategory(categoryId) { // Přidání asynchronního označení
    try {
        const response = await fetch(`http://localhost:5000/delete-category/${categoryId}`, { // Použití await pro počkání na odpověď
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Nepodařilo se smazat produkt');
        }
        const productElement = document.getElementById(categoryId);
        productElement.remove();
        console.log('Produkt byl úspěšně smazán');
        location.reload(location.href);
    } catch (error) {
        console.error('Chyba při mazání produktu:', error);
    }
}