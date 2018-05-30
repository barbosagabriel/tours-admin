var ParsleyConfig = (function(){

    var _options = {
        successClass: '',//'has-success',
        errorClass: 'has-error',
        errorElem: '<span></span>',
        errorsWrapper: '<span class="help-block"></span>',
        errorTemplate: "<div></div>",
        classHandler: function(el) {
            return el.$element.closest("div");
        }
    }

    var _parsleyConfig = {
        options: _options
    }

    return _parsleyConfig;
})();