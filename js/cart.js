function showCart(array){
  array.articles.forEach((article) => {
  document.getElementById("articles").innerHTML += 
    `
    <tbody>
    <tr>
      <td><img class="img-thumbnail" style="float: left; width: 100px;" src="${article.src}" alt="..."></td>
      <td><h5>${article.name}</h5><p class="small text-muted">${article.currency} <span id="unitCost">${article.unitCost}</span></p></td>
      <td><p>
      <input type="number" id="quantity" min="1" style="max-width: 4em;" value="${article.count}" onchange="articleSubtotal()"></td>
    </tr>
   </tbody>`
   
  document.getElementById("subtotal").innerHTML += `
    <div class="text-right"><strong>Subtotal</strong><br>
      ${article.currency}&nbsp<span id="articleSubtotal">${article.unitCost * article.count}</span></p>
    </div>`;
  });
}

function articleSubtotal(){
  let quantity = document.getElementById("quantity").value;
  let unit = parseInt(document.getElementById("unitCost").innerHTML);
  let result = quantity * unit;
  document.getElementById("articleSubtotal").innerHTML = result; 
};    

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
          articles = resultObj.data;
          showCart(articles);
        }
      });
});

