var senha_valida = false;
var password_perdeu_foco = false;
var password = document.getElementById('password');
var mostrar = document.getElementById('mostrar');
var esconder = document.getElementById('esconder');
var alerta_senha = document.getElementById('alerta-senha');
function senha_erro() {
    password.style.borderColor = 'var(--color-error-primary)';
    mostrar.style.fill = 'var(--color-error-secondary)';
    esconder.style.fill = 'var(--color-error-secondary)';
    alerta_senha.style.color = 'var(--color-error-secondary)';
}
function senha_original() {
    password.style.borderColor = '';
    mostrar.style.fill = '';
    esconder.style.fill = '';
    alerta_senha.style.color = '';
}
document.getElementById('password').addEventListener('blur', function () {
    password_perdeu_foco = true;
    if (password.value === '') {
        senha_valida = false;
        formulario_valido();
        senha_erro();
        alerta_senha.innerText = 'Este campo é obrigatório';
    } else if (password.value.length < 8) {
        senha_valida = false;
        formulario_valido();
        senha_erro();
        alerta_senha.innerText = 'A senha deve ter 8 digitos ou mais';
    } else {
        senha_valida = true;
        formulario_valido();
        senha_original();
        alerta_senha.innerText = 'A senha precisa ter 8 ou mais caracteres.';
    }
});
document.getElementById('password').addEventListener('input', function () {
    if (password.value === '') {
        senha_valida = false;
        formulario_valido();
        if (password_perdeu_foco === true) {
            senha_erro();
            alerta_senha.innerText = 'Este campo é obrigatório';
        } else {
        }
    } else if (password.value.length < 8) {
        senha_valida = false;
        formulario_valido();
        if (password_perdeu_foco === true) {
            senha_erro();
            alerta_senha.innerText = 'A senha deve ter 8 digitos ou mais';
        } else {
        }
    } else {
        senha_valida = true;
        formulario_valido();
        senha_original();
        alerta_senha.innerText = 'A senha precisa ter 8 ou mais caracteres.';
    }
});