$(function() {
    $('.popovers').popover({container: 'body', trigger: 'hover', placement: 'top'});
    $('.tooltips').tooltip();
    
    $('.icheck input').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
    });

    displayUserName();

    function displayUserName(){
        var isMenuVisible = document.getElementById('menu-user-name');
        if(isMenuVisible)
            document.getElementById('menu-user-name').text = sessionStorage.getItem('user.name') || '';
    }
});