"use strict";

$(document).ready(function() {
  $("#form-company").parsley(ParsleyConfig.options);

  $("#form-company").submit(function() {
    return $("#form-company")
      .parsley()
      .validate();
  });

  $("#btnClear").on("click", function() {
    clearAllFields();
  });
});

function clearAllFields() {
  var children = $("input, textarea, select").not(
    ":input[type=button], :input[type=submit], #id"
  );
  children.each(function(i, el) {
    if ($(el).attr("id") != "id") {
      if ($(el).attr("type") === "checkbox") return $(el).removeAttr("checked");
      $(el)
        .val("")
        .text("");
    }
  });
}
