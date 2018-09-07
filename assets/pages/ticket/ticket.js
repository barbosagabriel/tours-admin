$(document).ready(function () {
    
    document.getElementById('participants').value = 1;

    $('#service').on('change', function(){
        setSubtotal();
        setTotal();
    });

    $('#participants').on('change', function(){
        setSubtotal();
        setTotal();
    });

    $('#discount').on('change', function(){
        setTotal();
    });

    function setTotal() {
        var total = document.getElementById('subtotal').value;
        var discount = document.getElementById('discount').value;
        if(total > 0 && discount > 0){
            total = total - discount;
        }

        document.getElementById('total').value = total;
    }

    function setSubtotal() {
        var servicePrice = getServicePrice();
        if (servicePrice) {
            document.getElementById('subtotal').value = servicePrice * getNumberOfPartipants();
            $('#subtotal').trigger('change');
        }
        else {
            document.getElementById('subtotal').value = "";
        }
    }
    
    function getServicePrice() {
        var ddl = document.getElementById('service');
        var selectedOption = ddl.options[ddl.selectedIndex];
    
        if(selectedOption.value){
            return selectedOption.attributes["data-price"].value;
        }
    
        return "";
    }
    
    function getNumberOfPartipants() {
        return (document.getElementById('participants').value) ? document.getElementById('participants').value : 1;
    }
});

