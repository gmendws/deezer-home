  function logado() {
    document.querySelector('#loggedin').style.visibility = 'hidden';
  }
  
  function login() {
    var valida = false;
    if (document.getElementById('email').value.length < 3) {
      document.getElementById('validacao').innerHTML = 'Email invalido';
    }
    else if (document.getElementById('password').value.length < 3){
      document.getElementById('validacao').innerHTML = 'Senha invalida';
    }
    else{
      valida = true;
    }
    if (valida === true){
      const params = {
        username: document.getElementById('email').value,
        password: document.getElementById('password').value
      };
  
      axios.get('https://reqres.in/api/users', params)
        .then(res => {
          console.log(res);
          const { token } = res.data;
          localStorage.setItem('token', token);
          document.getElementById('validacao').innerHTML = 'Login efetuado';
          document.querySelector('#loggedout').style.visibility = 'hidden';
          document.querySelector('#loggedin').style.visibility = 'visible';
        })
        .catch(error => {
          document.getElementById('validacao').innerHTML = 'Usuário não encontrado';
        });
    }
  }
  
  function getToken() {
    return localStorage.getItem('token');
  }
  
  function logout() {
    localStorage.clear();
    location.reload();
  }
