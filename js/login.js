//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const user = document.getElementById('user');
const password = document.getElementById('password');

    function verificar(){
        let usuario = {};
        let msj = document.getElementById('msj');
        if (user.value.trim() === '' || password.value.trim() === ''){
            msj.innerHTML = 'Debes rellenar todos los campos';
            msj.classList.add('alerta');
        }else{
            usuario.nombre = user.value;
            usuario.estado = "conectado";
            localStorage.setItem('usuario', JSON.stringify(usuario));
            location.href ="inicio.html";
            console.log('Success')
        }
    }

    function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);

        let usuario = {};
        usuario.nombre = profile.getGivenName();
        usuario.estado = "conectado";
        localStorage.setItem('usuario', JSON.stringify(usuario));
        location.href = "inicio.html";
    }
 
    
      

    

    
