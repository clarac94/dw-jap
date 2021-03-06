const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_INFO_2_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

const username = document.getElementById('username');
var usuario = JSON.parse(localStorage.getItem('usuario'));

console.log(usuario);
if(usuario !== null && usuario !== undefined){
  username.innerHTML = `<a class="px-3 py-2 dropbtn dropdown-toggle" id="username" href="inicio.html">${usuario.nombre}</a>
  <div class="dropdown-content">
  <a class="py-2 d-none d-md-inline-block" href="cart.html">Mi carrito</a>
  <a class="py-2 d-none d-md-inline-block" href="my-profile.html">Mi perfil</a>
  <a class="py-2 d-none d-md-inline-block" href="index.html" onclick=desconectar()>Cerrar Sesión</a>
</div>`;
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function onLoad(){
  gapi.load('auth2', function(){
    gapi.auth2.init();
  });
}

function desconectar(){
  localStorage.clear();
  location.href = "index.html";
  signOut()
}

//document.getElementById("desconectar").addEventListener("click", desconectar);

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});