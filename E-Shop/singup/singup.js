

const saveUser =() =>{
    let signupName = document.getElementById("signupName").value;
    let signupEmail = document.getElementById("signupEmail").value;
    let signupPassword = document.getElementById("signupPassword").value;
    
    fetch("http://localhost:5000/save-user", {
      method:"post",
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body:JSON.stringify({email:signupEmail, name:signupName, password:signupPassword})
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
    })
    .then((data) => {
      alert(data.msg);
      window.location.href = "login/login.html";
    })
    .catch(error => {
      console.error('There was an error!', error);
      alert("Účet s vaším emailem již existuje, běžte se přihlásit");
    });
  } 

  const buttonSignup = document.getElementById('signupButton');
  buttonSignup.onclick = () =>{
    saveUser();
  }