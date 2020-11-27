const formulario = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellidos: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	contraseña: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, // La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
                                                            //NO puede tener otros símbolos.
}

const campos = {
    name: false,
    surnames: false,
    email: false,
    password: false
}

const validarFormulario = (e) => {
    switch(e.target.name){
        case "name":
            validarCampo(expresiones.nombre, e.target, 'name');
        break;

        case "surnames":
            validarCampo(expresiones.apellidos, e.target, "surnames");
        break;

        case "email":
            validarCampo(expresiones.correo, e.target, "email")
        break;

        case "password":
            validarCampo(expresiones.contraseña, e.target, "password");
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`group__${campo}`).classList.remove('form__group-incorrect');
		document.getElementById(`group__${campo}`).classList.add('form__group-right');
		document.querySelector(`#group__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#group__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#group__${campo} .form__input-error`).classList.remove('form__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`group__${campo}`).classList.add('form__group-incorrect');
		document.getElementById(`group__${campo}`).classList.remove('form__group-right');
		document.querySelector(`#group__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#group__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#group__${campo} .form__input-error`).classList.add('form__input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if(campos.name && campos.surnames && campos.email && campos.password){
        formulario.reset();

        document.getElementById('form__menssage-succes').classList.add('form__menssage-succes-activo');
		setTimeout(() => {
			document.getElementById('form__menssage-succes').classList.remove('form__menssage-succes-activo');
		}, 5000);

		document.querySelectorAll('.form__group-right').forEach((icono) => {
			icono.classList.remove('form__group-right'); 
		});
	} else {
        document.getElementById('form__menssage').classList.add('form__menssage-activo');
        setTimeout(() =>{
            document.getElementById('form__menssage').classList.remove('form__menssage-activo');
        }, 10000);
	}
});