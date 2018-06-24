'use strict';

$(document).ready(function () {
    $('#form-customer').parsley(ParsleyConfig.options);

    $('#form-customer').submit(function(){
        return $('#form-customer').parsley().validate();
    });

    $('#name').on('focusout', function(){
        setNames();
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

function setNames(){
    var name = document.getElementById('name').value.trim();
    if(name.length > 0){
        var names = name.split(" ");
    
        var firstName = names[0];
        var lastName = (names.length > 1) ? names[names.length-1] : '';
    
        document.getElementById('first-name').value = firstName;
        document.getElementById('last-name').value = lastName;
    }    
}
