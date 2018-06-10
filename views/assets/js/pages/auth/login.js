$(document).ready(function () {
    $('#form-login').parsley(ParsleyConfig.options);

    $('#form-login').submit(function() {
        var isFormValid = $('#form-login').parsley().validate();
        return isFormValid;
    });
});