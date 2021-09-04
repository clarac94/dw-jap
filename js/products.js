var productsArray = [];
var searchList = [];
var min, max;

function showProducts(products) {
  showSpinner();
  let append = "";
  products.forEach((product) => {
    if (
      (min == undefined ||
        (min != undefined && parseInt(product.cost) >= min)) &&
      (max == undefined || (max != undefined && parseInt(product.cost) <= max))
    ) {
      append +=
        ` <div class="list-group-item list-group-item-action"><div class="row"><div class="col-3">
        <img src="` +
        product.imgSrc +
        `" class="img-thumbnail"></div>
       <div class="col"> <div class="d-flex w-100 justify-content-between">
        <h4 class="mb-1">` +
        product.name +
        ` - ` +
        product.cost +
        ` ` +
        product.currency +
        `</h4>
        <small class="text-muted">` +
        product.soldCount +
        ` vendidos</small>
        </div>
      <p class="mb-1">` +
        product.description +
        `</p>
      </div></div></div> `;
    }
    document.getElementById("products").innerHTML = append;
  });
  hideSpinner();
}

function sortAscPrice() {
  productsArray.sort((a, b) => {
    if (a.cost < b.cost) {
      return -1;
    } else if (a.cost > b.cost) {
      return 1;
    } else {
      return 0;
    }
  });

  showProducts(productsArray);
}

function sortDescPrice() {
  productsArray.sort((a, b) => {
    if (a.cost > b.cost) {
      return -1;
    } else if (a.cost < b.cost) {
      return 1;
    } else {
      return 0;
    }
  });

  showProducts(productsArray);
}

function sortDescRel() {
  productsArray.sort((a, b) => {
    if (a.soldCount > b.soldCount) {
      return -1;
    } else if (a.soldCount < b.soldCount) {
      return 1;
    } else {
      return 0;
    }
  });
  showProducts(productsArray);
}

function buscador() {
  var searchitem = document.getElementById("search").value;
  var searchList = productsArray.filter(function (product) {
    return (
      product.name.toLowerCase().indexOf(searchitem.toLowerCase()) > -1 ||
      product.description.toLowerCase().indexOf(searchitem.toLowerCase()) > -1
    );
  });
  showProducts(searchList);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsArray = resultObj.data;
      showProducts(productsArray);
    }
  });
});

document.getElementById("filter").addEventListener("click", function () {
  min = parseInt(document.getElementById("minPrice").value);
  max = parseInt(document.getElementById("maxPrice").value);

  if (min != undefined && min >= 0) {
    min;
  } else {
    min = undefined;
  }
  if (max != undefined && max >= 0) {
    max;
  } else {
    max = undefined;
  }
  showProducts(productsArray);
});

document.getElementById("clear").addEventListener("click", function () {
  min = undefined;
  max = undefined;
  document.getElementById("minPrice").value = undefined;
  document.getElementById("maxPrice").value = undefined;
  showProducts(productsArray);
});

document.getElementById("search").addEventListener("keyup", buscador);
document.getElementById("ordenAscPrice").addEventListener("click", sortAscPrice);
document.getElementById("ordenDescPrice").addEventListener("click", sortDescPrice);
document.getElementById("ordenDescRel").addEventListener("click", sortDescRel);
