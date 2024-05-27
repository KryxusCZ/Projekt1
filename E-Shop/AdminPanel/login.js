const login =() =>{
    let loginEmail = document.getElementById("loginEmail").value;
    let loginPassword = document.getElementById("loginPassword").value;
    fetch("http://localhost:5000/loginuser", {
      method:"post",
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body:JSON.stringify({email:loginEmail, password:loginPassword})
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
    })
    .then(data => {
      const token = data.token;
      localStorage.setItem('token', token);
      checkLogin();
    })
    .catch(error => {
      console.error('There was an error!', error);
      alert("Zadali jste špatný email nebo heslo");
    });
  }
  

    const checkLogin = () => {
      const token = localStorage.getItem('token');
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
              window.location.href = "index.html";
             }
             else{
             // window.location.href = "prihlaseni.html";
             alert('kokos');
             }
          })
          .catch(error => {
              console.error('Chyba při získávání dat:', error);
          });
  }

  const loginButton = document.getElementById('loginButton');
  loginButton.onclick =()=>{
    login();
  }