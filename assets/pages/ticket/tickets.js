$(document).ready(function() {
  $("#ticket-list").dataTable({
    scrollX: true,
    language: DataTablesConfig.language
  });

  DataTablesConfig.defaultStyle();
});
