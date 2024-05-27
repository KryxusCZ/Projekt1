
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
          if(message === "login"){
           
           }

           else{
            window.location.href = "login.html";
           }
        })
        .catch(error => {
            console.error('Chyba při získávání dat:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    checkLogin();
});


const deleteToken = () =>{
    localStorage.removeItem('token');
}