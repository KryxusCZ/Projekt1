const addToDB =()=> {
    const name = document.getElementById('productName').value;
    const code = document.getElementById('productCode').value;
    const price = document.getElementById('productPrice').value;
    const description = document.getElementById('productDescription').value;
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];

    if (!name || !code || !price || !description || !imageFile) {
        alert('Prosím vyplňte všechna pole');
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('code', code);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', imageFile);

    console.log(name + code + price + description + imageFile);

    fetch('http://localhost:5000/save-product', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert(data.msg);
        window.location.href = "employeeHome.html";
    })
    .catch(error => {
        console.error('Error uploading product:', error);
    });
}


const updateToDB = (productId) => {
    let name = document.getElementById("productName").value;
    let description = document.getElementById("productDescription").value;
    let price = document.getElementById("productPrice").value;
    let code = document.getElementById("productCode").value;
    fetch(`http://localhost:5000/update-product/${productId}`, {
        method: "put",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name:name, code:code, description:description, price:price}) // Zde použijeme zkrácený zápis
    })
    .then(res => res.json()) // Převést odpověď na formát JSON
    .then(data => {
        const { msg} = data; // Získat data z odpovědi
        alert(msg);
        window.location.href = "employeeHome.html";
    })
    .catch(error => {
        console.error('Chyba při ukládání produktu:', error);
    });
};

const click =()=>{
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get('id');
    
    if(productId){
        updateToDB(productId);
    }
    else{
        addToDB();
    }
}

const saveButton = document.getElementById('saveButton');
saveButton.onclick = () =>{
    click();
}

window.onload = function () {
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get('id');
    if (productId) {
        getProductInfo(productId);
    }
};

const getProductInfo = (productId) => {
    fetch(`http://localhost:5000/get-product/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Nepodařilo se získat data');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const product = data.documents[0]; 
            document.getElementById("productName").value = product.name;
            document.getElementById("productDescription").value = product.description;
            document.getElementById("productPrice").value = product.price;
            document.getElementById("productCode").value = product.code;
        })
        .catch(error => {
            console.error('Chyba při získávání dat:', error);
        });
}