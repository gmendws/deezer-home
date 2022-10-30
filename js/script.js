  function logado() {
    if(getToken()){
      document.querySelector('#loggedout').style.visibility = 'hidden';  
      document.querySelector('#loggedin').style.visibility = 'visible';    
    } 
    else {
      document.querySelector('#loggedin').style.visibility = 'hidden'; 
      document.querySelector('#loggedout').style.visibility = 'visible'; 
    }
    
  }

  function RequestLogin(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (document.getElementById('email').value.length < 3) {
      document.getElementById('validacao').innerHTML = 'Email invalido';
    }
    else if (document.getElementById('password').value.length < 3){
      document.getElementById('validacao').innerHTML = 'Senha invalida';
    }
    else{
      login(email, password, function(response){
        if(response.error){
          document.getElementById('validacao').innerHTML = 'Login incorreto';query
        }
        else{
          localStorage.setItem("loginToken", response.token);
          logado();
        }
      })
    }
  }

  function RequestSearch(){
    var music = document.getElementById('search-music-value').value;

    searchMusic(music, 10, function(res){
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
  
  function login(email, password, callback) {
    let request = new XMLHttpRequest();
    request.open("POST", "https://reqres.in/api/login", true);
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
  
  function getToken() {
    return localStorage.getItem('loginToken');
  }
  
  function logout() {
    localStorage.clear();
    location.reload();
  }

