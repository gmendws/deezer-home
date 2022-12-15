  function RequestSearch(){
    var music = document.getElementById('search-music-value').value;

    if (document.getElementById('search-music-value').value.length == 0) {
      document.getElementById('validacaoMusic').innerHTML = 'Insira uma musica!';
    } 
    else if (document.getElementById('search-music-value').value.length < 3) {
      document.getElementById('validacaoMusic').innerHTML = 'Preencha corretamente a musica!';
    }



    searchMusic(music, 10, function(res){
      if (res.length == 0){
        document.getElementById('validacaoMusic').innerHTML = 'Nenhuma música encontrada!';  
      }
      Results(res);
    });
  }

  function searchMusic(query, limit, callback){
    let request = new XMLHttpRequest();

    request.open("GET", "https://api.lyrics.ovh/suggest/" + query, true);
    request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  
    request.onreadystatechange = function () {
  
      if(request.readyState !== 4){
        return;
      }

      let content = [];
  
      if(request.status === 200){
  
        let data = JSON.parse(request.responseText).data;
  
        limit = (limit >= 15 ? 15 : limit);
        let max = (limit > data.length ? data.length : limit);
  
        for(let i = 0; i < max ; i++ ) {
  
          let dt = data[i];
  
          content[i] = {
  
            artist: {
              name: dt.artist.name,
              picture: dt.artist.picture
            },
  
            album: {
              title: dt.album.title,
              cover: dt.album.cover
            },
  
            title: dt.title
          };
        }
      }
  
      callback(content);
    };
  
    request.send();
  }

  function Results(res){
    let searchBox = document.querySelector(".search-music");
    let list = document.querySelector(".music-box");
  
    for(let i = 0; i < res.length; i++){
      let div = document.createElement("div");
      let p = document.createElement("p");
      
      p.classList.add("music-name");
  
      p.innerHTML = res[i].title;
  
      div.appendChild(p);
      list.appendChild(div);
    }
  
    searchBox.appendChild(list);
  }

  function RequestLogin(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;


    login(email, password, function(response){
      if(response.msg != 'Autenticação realizada com sucesso'){
        document.getElementById('validacao').innerHTML = response.msg;
      }
      else{
        localStorage.setItem("loginToken", response.token);
        logado();
      }
    })
  }

  function login(email, password, callback) {
    let url = 'http://localhost:3000/auth/login'

    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    request.onreadystatechange = function () {
  
      if(request.readyState !== 4){
        return;
      }
  
      callback(JSON.parse(request.responseText));  
    };
  
    request.send(JSON.stringify({
      email: email,
      password: password
    }));
  }

  function RequestLogin(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;


    login(email, password, function(response){
      if(response.msg != 'Autenticação realizada com sucesso'){
        document.getElementById('validacao').innerHTML = response.msg;
      }
      else{
        localStorage.setItem("loginToken", response.token);
        logado();
      }
    })
  }

  function RequestRegister(){
    var name = document.getElementById('name-register').value;
    var email = document.getElementById('email-register').value;
    var password = document.getElementById('password-register').value;
    var confirmpassword = document.getElementById('confirm-password-register').value;

    register(name, email, password, confirmpassword, function(response){
      if(response.msg != 'Usuario criado com sucesso!'){
        document.getElementById('validacao-register').innerHTML = response.msg;
      }
      else{
        document.getElementById('validacao-register').innerHTML = response.msg;
        AfterRegister();
      }
    })
  }

  function register(name, email, password, confirmpassword, callback) {
    let url = 'http://localhost:3000/auth/register'

    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    request.onreadystatechange = function () {
  
      if(request.readyState !== 4){
        return;
      }
  
      callback(JSON.parse(request.responseText));  
    };
  
    request.send(JSON.stringify({
      name: name,
      email: email,
      password: password,
      confirmpassword: confirmpassword
    }));
  }

  function AfterRegister() {
    document.querySelector('#loggedout').style.visibility = 'visible';  
    document.querySelector('#register').style.visibility = 'hidden';     
  }
  
  function getToken() {
    return localStorage.getItem('loginToken');
  }
  
  function logout() {
    localStorage.clear();
    location.reload();
  }

  function logado() {
    if(getToken()){
      document.querySelector('#register').style.visibility = 'hidden'; 
      document.querySelector('#loggedout').style.visibility = 'hidden';
      document.querySelector('#loggedin').style.visibility = 'visible';  
      document.querySelector('#isLogado').style.visibility = 'visible'; 
    } 
    else {
      document.querySelector('#register').style.visibility = 'hidden';
      document.querySelector('#loggedin').style.visibility = 'hidden'; 
      document.querySelector('#loggedout').style.visibility = 'visible'; 
      document.querySelector('#isLogado').style.visibility = 'hidden';  
    }
    
  }
  

  
