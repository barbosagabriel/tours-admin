$(document).ready(function () {
    $('#form-ticket').parsley(ParsleyConfig.options);

    if(document.getElementById('id').value == ''){
        document.getElementById('participants').value = 1;
        $('.datetime').mask('00/00/0000 00:00', { placeholder: "mm/dd/aaaa hh:mm" });
    }else{
        var d = new Date(document.getElementById('date').value);
        document.getElementById('date').value =  + ("0"+(d.getMonth()+1)).slice(-2) + ("0" + d.getDate()).slice(-2) +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        $('.datetime').mask('00/00/0000 00:00', { placeholder: "mm/dd/aaaa hh:mm" });
    }

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

    if($('#price').val() != ''){
        applyMask('subtotal');
        applyMask('discount');
        applyMask('total');
    }else{
        applyMoneyMask();
    }

    
    function applyMask(field) {
        var price = document.getElementById(field).value;
        document.getElementById(field).value = Number(price.replace(',', '')).toFixed(2);
        $('#' + field).mask('#,##0.00', { reverse: true });
        document.getElementById(field).value = $('#' + field).masked(Number(price.replace(',', '')).toFixed(2));
    }
    
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


