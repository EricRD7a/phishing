const login_mascarado = document.getElementById('login');
IMask(login_mascarado, {
    mask: '000.000.000-00',
    lazy: true,
    eager: true,
    placeholderChar: '',
});