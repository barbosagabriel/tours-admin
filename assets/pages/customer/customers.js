$(document).ready(function () {
    $('#customer-list').dataTable({
        "scrollX": true,
        "language": DataTablesConfig.language
    });

    DataTablesConfig.defaultStyle();
});