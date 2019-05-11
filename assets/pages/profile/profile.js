"use strict";

$(document).ready(function() {
  $("#form-profile").parsley(ParsleyConfig.options);
  $("#form-profile").submit(function() {
    return $("#form-profile")
      .parsley()
      .validate();
  });

  $("#form-password").parsley(ParsleyConfig.options);
  $("#form-password").submit(function() {
    return $("#form-password")
      .parsley()
      .validate();
  });

  $("#btnClear").on("click", function() {
    document.getElementById("name").value = "";
    document.getElementById("name").textContent = "";
  });

  $("#btnClearPassword").on("click", function() {
    document.getElementById("password").value = "";
    document.getElementById("password").textContent = "";
    document.getElementById("c-password").value = "";
    document.getElementById("c-password").textContent = "";
  });
});
