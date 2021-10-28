

function profileData(){
    var perfil = JSON.parse(localStorage.getItem('usuario'));
    perfil.fname = document.getElementById('name').value;
    perfil.lname = document.getElementById('lname').value;
    perfil.email = document.getElementById('userEmail').value;
    perfil.phonenum = document.getElementById('userNum').value;
    perfil.age = document.getElementById('userAge').value;
    localStorage.setItem('usuario', JSON.stringify(perfil));
    console.log(usuario);
    //showProfile()
    
}

/*function showProfile(){
    var usuario = JSON.parse(localStorage.getItem('usuario'));
    document.getElementById('userProfile').innerHTML += `
        <p id="uLName"><i class="fas fa-user"></i>&nbsp${usuario.fname}<span id="uFName">&nbsp${usuario.lname}</span></p>
        <p id="uEmail"><i class="fas fa-envelope"></i>&nbsp${usuario.email}</p>
        <p id="uNum"><i class="fas fa-phone"></i>&nbsp${usuario.phonenum}</p>
        <p id="uAge"><i class="fas fa-birthday-cake"></i>&nbsp${usuario.age}</p>
        <button id="editData" class="profile-save-button" onclick=editData()>Editar datos</button>`;
}*/

function editData() {
    document.getElementById('profileData').innerHTML = `<label for="userFname">Nombre: </label><br>
        <input type="text" id="name" name="name" value=""><br>
        <label for="userLname">Apellido: </label><br>
        <input type="text" id="lname" name="lname" value=" "><br>
        <label for="userEmail">Email:</label><br>
        <input type="email" id="userEmail" name="userEmail" value=""><br>
        <label for="userNum">Teléfono:</label><br>
        <input type="tel" id="userNum" name="userNum" value=""
          ><br>
        <label for="userAge">Fecha de Nacimiento:</label><br>
        <input type="date" name="age" id="userAge" value=""><br><br>
        <button id="saveChanges" class="profile-save-button" onclick=profileData()><span class="profile-save-span">Guardar cambios</span></button>`;
        document.getElementById('userProfile').innerHTML = `<span></span>`;
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    if (usuario.fname === undefined || usuario.lname === undefined || usuario.email === undefined || usuario.phonenum === undefined || usuario.age === undefined) {
        document.getElementById('dataRequest').innerHTML = `<span></span>`;
        document.getElementById('profileData').innerHTML = `<label for="userFname">Nombre: </label><br>
        <input type="text" id="name" name="name" value="" required><br>
        <label for="userLname">Apellido: </label><br>
        <input type="text" id="lname" name="lname" value="" required><br>
        <label for="userEmail">Email:</label><br>
        <input type="email" id="userEmail" name="userEmail" value="" required><br>
        <label for="userNum">Teléfono:</label><br>
        <input type="tel" id="userNum" name="userNum" value=""
           ><br>
        <label for="userAge">Fecha de Nacimiento:</label><br>
        <input type="date" name="age" id="userAge" value="" required><br><br>
        <button id="saveChanges" class="btn-img btn-img2" onclick=profileData()>Guardar cambios</button>`;
    }else{
        var perfil = JSON.parse(localStorage.getItem('usuario'));
        document.getElementById('userProfile').innerHTML += `
        <p id="uLName"><i class="fas fa-user"></i>&nbsp&nbsp${perfil.fname}<span id="uFName">&nbsp${perfil.lname}</span></p>
        <p id="uEmail"><i class="fas fa-envelope"></i>&nbsp&nbsp${perfil.email}</p>
        <p id="uNum"><i class="fas fa-phone"></i>&nbsp&nbsp${perfil.phonenum}</p>
        <p id="uAge"><i class="fas fa-birthday-cake"></i>&nbsp&nbsp${perfil.age}</p>
        <button id="editData" class="btn-img btn-img2" onclick=editData()>Editar datos</button>`;
        document.getElementById('profileData').innerHTML = `<span></span>`;
    }

    if (usuario !== undefined){
        document.getElementById('profileUsername').innerHTML = usuario.nombre;
    }


    
});