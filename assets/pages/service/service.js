'use strict';

$(document).ready(function () {
    $('#form-service').parsley(ParsleyConfig.options);

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
