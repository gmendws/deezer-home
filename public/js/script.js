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

  function login() {
    var valida = false;
    if (document.getElementById('email').value.length < 3) {
      document.getElementById('validacao').innerHTML = 'Email invalido';
    }else if (document.getElementById('password').value.length < 3){
      document.getElementById('validacao').innerHTML = 'Senha invalida';
    }else{
      valida = true;
    }
    if (valida === true){
      const params = {
        username: document.getElementById('email').value,
        password: document.getElementById('password').value
      };
  
      axios.post('/login', params)
        .then(res => {
          const { token } = res.data;
          localStorage.setItem('token', token);
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

  function logado() {
    if(getToken()){
      document.querySelector('#loggedout').style.visibility = 'hidden';  
      document.querySelector('#loggedin').style.visibility = 'visible';  
      document.querySelector('#isLogado').style.visibility = 'visible';    
    } 
    else {
      document.querySelector('#loggedin').style.visibility = 'hidden'; 
      document.querySelector('#loggedout').style.visibility = 'visible'; 
      document.querySelector('#isLogado').style.visibility = 'hidden';  
    }
    
  }
