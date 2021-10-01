var product = {};
var comments = [];
var allProducts = [];


//Función que muestra las imágenes del producto como carousel
function showImages(array) {
  for (let i = 0; i < array.length; i++) {
    let imageSrc = array[i];
    if (i == 0) {
      slides +=
        `<div class='carousel-item active'>  <img class='dblock w-100' src="` +
        imageSrc +
        `"></div>`;
    } else {
      slides +=
        `<div class='carousel-item '>  <img class='dblock w-100' src="` +
        imageSrc +
        `"></div>`;
    }
    i++;
  }

  document.getElementById("slides").innerHTML = slides;
}

//Función que muestra los comentarios del producto
function showComments(comments) {
  showSpinner();
  let append = "";
  comments.forEach((comment) => {
    {
      append +=
        `<div class="list-group-item list-group-item-action"><div class="row">
         <div class="col"> <div style="background-color: #F1F1F1; padding-left: 10px; padding-top: 5px;"><div class="d-flex w-100">
          <small class="text-muted">` +
        comment.dateTime +
        `</small>
          </div>
          <p class="mb-1 stars">` +
        rating(comment.score) +
        `</p>
          <p class="mb-1 text-uppercase font-weight-bold" style="font-size: 13px;"><i class="fas fa-user"></i> ` +
        comment.user +
        `<hr></p></div>
        <p class="mb-1">` +
        comment.description +
        `</p>
        </div></div></div>`;
    }
    document.getElementById("comments").innerHTML = append;
  });
  hideSpinner();
}

//Función que recorre todos los productos y devuelve los relacionados
function showRelatedProducts(allProducts){
  let append = "";
  product.relatedProducts.forEach((related) => {
    {
      append += 
    `<div class="card">
      <img src="${allProducts[related].imgSrc}">
      <div class="content">
        <h2>${allProducts[related].name}</h2>
          <p>${allProducts[related].description}</p>
          <h4>${allProducts[related].currency} ${allProducts[related].cost}</h4>
      </div>
    </div>`;
  }
  document.getElementById("relatedProducts").innerHTML = append;
  });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    product = resultObj.data;

    let productName = document.getElementById("productName");
    let productDescription = document.getElementById("productDescription");
    let productCost = document.getElementById("productCost");
    let productCount = document.getElementById("productCount");

    productName.innerHTML = product.name;
    productDescription.innerHTML = product.description;
    productCost.innerHTML = `${product.currency} ${product.cost}`;
    productCount.innerHTML = `${product.category} - ${product.soldCount} unidades vendidas`;

    showImages(product.images);
    
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
      if (resultObj.status === "ok") {
          allProducts = resultObj.data;
          
          showRelatedProducts(allProducts);
      }
  }); 
  });

  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      comments = resultObj.data;
      showComments(comments);
    }
  });

   

});

//Función para mostrar la calificación de los comentarios con estrellas
function rating(num) {
  let estrellas = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= num) {
      estrellas += '<i class="fas fa-star"></i>';
    } else {
      estrellas += '<i class="far fa-star"></i>';
    }
  }
  return estrellas;
}


//Función para agregar un nuevo comentario a la lista
function addComment() {
  let addedComment = {};
  let userRating = parseInt(document.getElementById("valor").innerHTML);
  let userComment = document.getElementById("newcomment").value;
  let commentDate = new Date();
  let userName = usuario.nombre;

  addedComment.dateTime =
    commentDate.getFullYear() +
    "-" +
    commentDate.getMonth() +
    "-" +
    commentDate.getDate()
  +" " +
    commentDate.getHours() +
    ":" +
    commentDate.getMinutes() +
    ":" +
    commentDate.getSeconds();
  addedComment.score = userRating;
  addedComment.description = userComment;
  addedComment.user = userName;

  comments.unshift(addedComment);
  showComments(comments);
}

document.getElementById("sendcomment").addEventListener("click", addComment);