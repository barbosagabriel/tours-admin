$(document).ready(function() {
  $("#form-login").parsley(ParsleyConfig.options);

  $("#form-login").submit(function() {
    return $("#form-login")
      .parsley()
      .validate();
  });
});
