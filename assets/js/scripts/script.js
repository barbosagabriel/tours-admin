$(function() {
    $('.popovers').popover({container: 'body', trigger: 'hover', placement: 'top'});
    $('.tooltips').tooltip();
    
    $('.icheck input').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
    });

    displayUserInfo();
    displayNextTours();

    function displayNextTours(){
        var pureHtml = sessionStorage.getItem('nextTickets').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#34;/g, '"');
        document.getElementById('next-tours').innerHTML = pureHtml || 'Nenhum passeio agendado para os próximos dias :(';
    }

    function displayUserInfo(){
        var isMenuVisible = document.getElementById('menu-user-name');
        if(isMenuVisible){
            document.getElementById('menu-user-name').textContent = sessionStorage.getItem('user.name') || '';
            document.getElementById('menu-user-initials').textContent = sessionStorage.getItem('user.initials') || '';
        }
    }
});