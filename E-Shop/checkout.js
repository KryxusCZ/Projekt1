window.onload = function() {
    zobrazCheckOut();
};

function zobrazCheckOut() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.forEach(function(item, index) {
        let tr = document.createElement('tr');

        // Vytvoření buňky pro název produktu a množství
        let tdProduct = document.createElement('td');
        tdProduct.innerHTML = `${item.name} <strong class="mx-2">x</strong> ${item.quantity}`;
        
        // Vytvoření buňky pro cenu
        let tdPrice = document.createElement('td');
        tdPrice.textContent = `${item.price * item.quantity} Kč`;
        
        // Připojení buněk k řádku
        tr.appendChild(tdProduct);
        tr.appendChild(tdPrice);
        
        // Připojení řádku k tabulce nebo jinému kontejneru
        const tableBody = document.getElementById('checkOutProducts'); // nahraďte 'yourTableBodyId' skutečným ID těla tabulky
        tableBody.appendChild(tr);
    });
}

const saveOrder = () => {
    const name = document.getElementById('checkoutName').value;
    const lastName = document.getElementById('checkoutLastName').value;
    const company = document.getElementById('checkoutCompany').value;
    const address = document.getElementById('checkoutAddress').value;
    const country = document.getElementById('checkoutCountry').value;
    const psc = document.getElementById('checkoutPSC').value;
    const email = document.getElementById('checkoutEmail').value;
    const phone = document.getElementById('checkoutPhone').value;
    const description = document.getElementById('checkoutDescription').value;
    const price = parseInt(localStorage.getItem('totalPrice'));
    const productsInfo = JSON.parse(localStorage.getItem('cart')) || [];

    const products = productsInfo.map(product => ({
        productId: product.id,
        quantity: product.quantity
      }));

    fetch('http://localhost:5000/save-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Přidání hlavičky Content-Type
        },
        body: JSON.stringify({ name: name, lastName:lastName, company:company, address:address, country:country, psc:psc, email:email, phone:phone,  description: description, products:products, price:price })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert(data.msg);
        window.location.href = "thankyou.html";
    })
    .catch(error => {
        console.error('Error uploading category:', error);
        alert('Error uploading category: ' + error.message);
    });
}

const buttonCheckOut = document.getElementById('buttonPlaceOrder');
buttonCheckOut.onclick =()=>{
    saveOrder();
}