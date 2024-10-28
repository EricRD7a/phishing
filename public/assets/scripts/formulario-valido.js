var enviar_formulario = document.getElementById('enviar-formulario');
function formulario_valido() {
    if (login_valido === true && senha_valida === true) {
        enviar_formulario.disabled = false;
    } else {
        enviar_formulario.disabled = true;
    };
};