'use strict';

$(document).ready(function () {
    
    $('#form-company').parsley(ParsleyConfig.options);

    $('#form-login').submit(function() {
        var isFormValid = $('#form-company').parsley().validate();
        return isFormValid;
    });
});
