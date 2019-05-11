$(document).ready(function() {
  $("#service-list").dataTable({
    scrollX: true,
    language: DataTablesConfig.language
  });

  DataTablesConfig.defaultStyle();
});
