'use strict';

$(document).ready(function () {
    $('#form-service').parsley(ParsleyConfig.options);

    $('#price').mask('#,##0.00', {reverse: true});

    $('#price').on('change', function(){
        var price = document.getElementById('price').value;
        document.getElementById('price').value = $('#price').masked(Number(price.replace(',', '')).toFixed(2));
        $('#price').trigger('keyup');
    });

    $('#form-service').submit(function(){
        return $('#form-service').parsley().validate();
    });

    $('#btnClear').on('click', function(){
        clearAllFields()
    });
});

function clearAllFields(){
    var children = $('input, textarea, select')
                        .not(':input[type=button], :input[type=submit], #id');
    children.each(function(i, el) {
        if($(el).attr('id') != 'id'){
            if ($(el).attr('type') === 'checkbox') return $(el).removeAttr('checked');
            $(el).val('').text('');
        }
    })
}
