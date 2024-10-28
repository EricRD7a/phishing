var login_valido = false;
var login_perdeu_foco = false;
var login = document.getElementById('login');
var invalido = document.getElementById('invalido');
var alerta_login = document.getElementById('alerta-login');
function login_erro() {
    login.style.borderColor = 'var(--color-error-primary)';
    invalido.style.fill = 'var(--color-error-secondary)';
    invalido.style.display = 'block';
    alerta_login.style.color = 'var(--color-error-secondary)';
}
function login_original() {
    login.style.borderColor = '';
    invalido.style.fill = '';
    invalido.style.display = 'none';
    alerta_login.style.color = '';
}
document.getElementById('login').addEventListener('blur', function () {
    login_perdeu_foco = true;
    if (login.value === '') {
        login_valido = false;
        formulario_valido();
        login_erro();
        alerta_login.innerText = 'Este campo é obrigatório';
    } else if (login.value.length < 14) {
        login_valido = false;
        formulario_valido();
        login_erro();
        alerta_login.innerText = 'CPF inválido';
    } else {
        login_valido = true;
        formulario_valido();
        login_original();
        alerta_login.innerText = '';
    }
});
document.getElementById('login').addEventListener('input', function () {
    if (login.value === '') {
        login_valido = false;
        formulario_valido();
        if (login_perdeu_foco === true) {
            login_erro();
            alerta_login.innerText = 'Este campo é obrigatório';
        } else {
        }
    } else if (login.value.length < 14) {
        login_valido = false;
        formulario_valido();
        if (login_perdeu_foco === true) {
            login_erro();
            alerta_login.innerText = 'CPF inválido';
        } else {
        }
    } else {
        login_valido = true;
        formulario_valido();
        login_original();
        alerta_login.innerText = '';
    }
});