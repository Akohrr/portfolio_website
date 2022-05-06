let userResponseToken = "";

function toggleSubmitBtn(token) {
  // I tried using !el.disabled but it was unstable
  const el = document.getElementById("contact-form-submit-btn");
  if (el.disabled) {
    el.disabled = false;
  } else {
    el.disabled = true;
  }
  userResponseToken = token;
}

function toggleCaptchaError() {
  const el = document.getElementById("captcha_error_message");
  if (el.style.display === "none") {
    el.style.display = "block";
  } else {
    el.style.display = "none";
  }
}

function handleSuccessContactMe(response) {
  // console.log("====================================");
  // console.log(response);
  // console.log("====================================");
  if (response.message === "Message sent successfully") {
    $("#contact-form").hide();
    $("#error_message").hide();
    $("#success_message").show();
  } else {
    $("#error_message").show();
  }
}

function handleErrorContactMe(response) {
  $("#error_message").show();
}

$("#contact-form").submit((e) => {
  e.preventDefault();
  let url =
    "https://contact.akoh.dev/send_message";
    $form = $(this);
    var data = {};
    $("#contact-form")
      .serializeArray()
      .map(function (x) {
        data[x.name] = x.value;
      }); 

    data["user_captcha"] = userResponseToken;
    
  //show some response on the button
  $('button[type="submit"]', $form).each(function () {
    $btn = $(this);
    $btn.prop("type", "button");
    $btn.prop("orig_label", $btn.text());
    $btn.text("Sending ...");
  });

  $.ajax({
    type: "POST",
    url: url,
    // contentType: "application/json",
    data: data,
    success: handleSuccessContactMe,
    error: handleErrorContactMe,
    dataType: "json",
  });
});
