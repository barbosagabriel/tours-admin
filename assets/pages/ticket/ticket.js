$(document).ready(function () {
    $('#form-ticket').parsley(ParsleyConfig.options);
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

    applyMoneyMask();

    function applyMoneyMask(){
        $('#subtotal').mask('#,##0.00', {reverse: true});
        $('#discount').mask('#,##0.00', {reverse: true});
        $('#total').mask('#,##0.00', {reverse: true});
    }

    function setTotal() {
        var total = document.getElementById('subtotal').value;
        var discount = document.getElementById('discount').value;
        if(total > 0 && discount > 0){
            total = total - discount;
            document.getElementById('discount').value = Number(discount).toFixed(2);
        }

        document.getElementById('total').value = Number(total).toFixed(2);
        applyMoneyMask();
    }

    function setSubtotal() {
        var servicePrice = getServicePrice();
        if (servicePrice) {
            document.getElementById('subtotal').value = (servicePrice * getNumberOfPartipants()).toFixed(2);
            $('#subtotal').trigger('change');
        }
        else {
            document.getElementById('subtotal').value = "";
        }
        applyMoneyMask();
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

