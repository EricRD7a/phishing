document.getElementById('mostrar-senha').addEventListener('click', function () {
    var password = document.getElementById('password');
    var mostrar = document.getElementById('mostrar');
    var esconder = document.getElementById('esconder');
    if (password.type === 'password') {
        password.type = 'text';
        mostrar.style.display = 'none';
        esconder.style.display = 'block';
    } else {
        password.type = 'password';
        mostrar.style.display = 'block';
        esconder.style.display = 'none';
    };
});