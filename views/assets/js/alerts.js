var Alerts = (function(){

    function _displayAlert(title, text, type){
        new PNotify({
            title: title,
            text: text,
            type: type,
            styling: 'fontawesome'
        });
    }

    return {
        displayAlert: _displayAlert
    };
    
})();