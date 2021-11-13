var cantidad = [];
var subtotals = [];
var quantityArray = document.getElementsByClassName("quantity");
let card = document.getElementById("cardInput");
let cardnumber = document.getElementById("cnumberInput");
let expmonth = document.getElementById("monthInput");
let expyear = document.getElementById("yearInput");
let cvv = document.getElementById("cvvInput");
let bank = document.getElementById("selectBank");

function showCart(articles) {
  let total = 0;
  articles.articles.forEach((article) => {
    total += article.unitCost * article.count;
    document.getElementById("articles").innerHTML += `
    <tbody>
    <tr>
      <td><img class="img-thumbnail" style="float: left; width: 100px;" src="${article.src}" alt="..."></td>
      <td><h5>${article.name}</h5><p class="small text-muted">${article.currency} <span class="unitCost">${article.unitCost}</span></p></td>
      <td><p>
      <input type="number" class="quantity" min="1" style="max-width: 4em;" value="${article.count}" onchange="updateQuantity(); articleSubtotal()"></td>
      <td><span class="currency">${article.currency}&nbsp<span class="subtotal">${article.unitCost * article.count}</span></span></td>
      <td><i class="far fa-trash-alt fa-2x"></i></td>
    </tr>
   </tbody>`;
  });
  document.getElementById("subtotalUSD").innerHTML = `USD ${total}`;
}

function getQuantity(array) {
  array.articles.forEach((product) => {
    cantidad.push(product.count);
  });
}

function updateQuantity() {
  let total = 0;
  let shipStandard = document.getElementById("shipstandard"); 
  let shipExpress = document.getElementById("shipexpress");
  let shipPremium = document.getElementById("shippremium");
  for (let i = 0; i < quantityArray.length; i++) {
    cantidad[i] = parseFloat(quantityArray[i].value);
    total += parseFloat(cantidad[i] * articles.articles[i].unitCost);
  }
  document.getElementById("subtotalUSD").innerHTML = `USD ${total}`;
  if (shipStandard.checked) {
    let standard = Math.round(total * 0.05);
    document.getElementById("shippingCost").innerHTML = `USD ` + standard;
    document.getElementById("totalCost").innerHTML =
      `USD ` + (parseInt(standard) + parseInt(total));
  } else if (shipExpress.checked) {
    let express = Math.round(total * 0.07);
    document.getElementById("shippingCost").innerHTML = `USD ` + express;
    document.getElementById("totalCost").innerHTML =
      `USD ` + (parseInt(express) + parseInt(total));
  } else if (shipPremium.checked) {
    let premium = Math.round(total * 0.15);
    document.getElementById("shippingCost").innerHTML = `USD ` + premium;
    document.getElementById("totalCost").innerHTML =
      `USD ` + (parseInt(premium) + parseInt(total));
  }
}

function articleSubtotal() {
  for (let i = 0; i < articles.articles.length; i++) {
    subtotals[i] = parseFloat(cantidad[i] * articles.articles[i].unitCost);
    document.getElementsByClassName("subtotal")[i].innerHTML = subtotals[i];
    i++;
    console.log(subtotals);
  }
}

function selectedPayment1() {
  document.getElementById("payment").innerHTML = `Tarjeta de Crédito`;
}

function selectedPayment2() {
  document.getElementById("payment").innerHTML = `Transferencia Bancaria`;
}

function validatedCard() {
  if (
    card.value.trim() != "" &&
    cardnumber.value.trim() != "" &&
    expmonth.value.trim() != "" &&
    expyear.value.trim() != "" &&
    cvv.value.trim() != ""
  ) {
    $("#paymentModal").modal("hide");
    Swal.fire({
      icon: "success",
      title: "Éxito!",
      text: "Se guardó la opción seleccionada",
    });
  }
}

function validatedBank() {
  if (bank.selectedIndex != 0) {
    $("#paymentModal").modal("hide");
    Swal.fire({
      icon: "success",
      title: "Éxito!",
      text: "Se guardó la opción seleccionada",
    });
  }
}

function finishPurchase() {
  let inputAddress1 = document.getElementById("inputAddres1");
  let inputAddress2 = document.getElementById("inputAddress2");
  let inputCorner = document.getElementById("inputCorner");
  let inputCity = document.getElementById("inputCity");
  let inputCountry = document.getElementById("inputCountry");
  if (
    inputCountry.value.trim() != "" &&
    inputCity.value.trim() != "" &&
    inputCorner.value.trim() != "" &&
    inputAddress2.value.trim() != "" &&
    inputAddress1.value.trim() != "" &&
    (bank.selectedIndex != 0 ||
      (card.value.trim() != "" &&
        cardnumber.value.trim() != "" &&
        expmonth.value.trim() != "" &&
        expyear.value.trim() != "" &&
        cvv.value.trim() != ""))
  ) {
    Swal.fire({
      icon: "success",
      title: "Compra confirmada",
      text: "Tu compra se realizó con éxito"
    });
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes rellenar todas las opciones'
    })
  }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_2_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      articles = resultObj.data;
      for (let i = 0; i < articles.articles.length; i++) {
        if (articles.articles[i].currency === "UYU") {
          articles.articles[i].currency = "USD";
          articles.articles[i].unitCost = parseFloat(
            articles.articles[i].unitCost / 40
          );
        }
      }
      showCart(articles);
      getQuantity(articles);
      updateQuantity();
    }
  });
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
$(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
});
