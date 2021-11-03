var cantidad = [];
var subtotals = [];
let quantityArray = document.getElementsByClassName("quantity"); 
console.log(quantityArray);

function showCart(array){
  array.articles.forEach((article) => {
  document.getElementById("articles").innerHTML += 
    `
    <tbody>
    <tr>
      <td><img class="img-thumbnail" style="float: left; width: 100px;" src="${article.src}" alt="..."></td>
      <td><h5>${article.name}</h5><p class="small text-muted">${article.currency} <span class="unitCost">${article.unitCost}</span></p></td>
      <td><p>
      <input type="number" class="quantity" min="1" style="max-width: 4em;" value="${article.count}" onchange="updateQuantity(); articleSubtotal()"></td>
      <td>${article.currency}&nbsp<span class="subtotal">${article.unitCost * article.count}</span></td>
      <td><i class="far fa-trash-alt fa-2x"></i></td>
    </tr>
   </tbody>`
   
  /*document.getElementById("subtotal").innerHTML += `
    <div class="text-right"><strong>Subtotal</strong><br>
      ${article.currency}&nbsp<span id="articleSubtotal">${article.unitCost * article.count}</span></p>
    </div>`;*/
  }); 
}

function articleSubtotal(){
  let i = 0;
  let subtotal = document.getElementsByClassName(subtotal);
  articles.articles.forEach((product) => {
    subtotals[i] = cantidad[i] * product.unitCost;
    subtotal[i].innerHTML = subtotals[i];
    i++;
  })
  /*let quantity = e.target.value //document.getElementsByClassName("quantity").value;
  let unit = parseInt(document.getElementsByClassName("unitCost").innerHTML);
  let result = quantity * unit;
  document.getElementById("articleSubtotal").innerHTML = result;*/ 
};    

function getQuantity(array){
  array.articles.forEach((element) => {cantidad.push(element.count)});
}

function updateQuantity(){
  let quantityArray = document.getElementsByClassName("quantity");
  let i = 0;
  quantityArray.forEach((element) => {cantidad[i] = element.value;
   i++});
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_2_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
          articles = resultObj.data;
          showCart(articles);
          getQuantity(articles);
        }
      });
});

