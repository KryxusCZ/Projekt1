const saveAdmin = () => {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    fetch('http://localhost:5000/save-admin', {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name:name, email:email, password:password})
    })
    .then(res => res.json())
    .then(data => {
        const {msg} = data;
        alert(msg);
        //window.location.href = "products.html";
    })
    .catch(error => {
        console.error('Chyba při ukládání produktu:', error);
    });
};