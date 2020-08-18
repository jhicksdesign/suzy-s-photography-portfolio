$(document).ready(function () {
  $(`#contact`).validate({
    debug: true,
    errorClass: 'alert alert-danger',
    errorLabelContainer: '#output-area',
    errorElement: 'div',
    rules: {
      name: {
        required: true
      },
      email: {
        email: true,
        required: true
      },
      message: {
        required: true,
        maxlength: 2000,
      }
    },
    messages: {
      name: {
        required: 'Name is a required field.',
      },
      email: {
        required: 'Email is a required field.',
        email: 'Please provide a valid email address.',
      },
      message: {
        required: 'Message is a required field.',
        maxlength: 'Message is too long.',
      }
    },
    submitHandler: function (form) {
      $("#contact").ajaxSubmit({
        type: "POST",
        url: $('#contact').attr('action'),
        success: function (ajaxOutput) {
          $("#output-area").css("display", "")
          $("#output-area").html(ajaxOutput)

          if ($(".alert-success").length >= 1) {
            $("#contact")[0].reset()
          }
        }
      })
    }
  })
})

// Code to hide and display photos in mobile view, also disables clicked button and enables other buttons..
const gallerySwitch = (ev) => {
  const buttonOne = document.getElementById("button-one");
  const buttonTwo = document.getElementById("button-two");
  const buttonThree = document.getElementById("button-three");
  const firstRow = document.getElementById("first-row");
  const secondRow = document.getElementById("second-row");
  const thirdRow = document.getElementById("third-row");
  if (ev === buttonOne) {
    buttonOne.disabled = true;
    buttonTwo.disabled = false;
    buttonThree.disabled = false;
    firstRow.classList.remove("d-none")
    secondRow.classList.add("d-none")
    thirdRow.classList.add("d-none")
  } else if (ev === buttonTwo) {
    buttonOne.disabled = false;
    buttonTwo.disabled = true;
    buttonThree.disabled = false;
    secondRow.classList.remove("d-none")
    firstRow.classList.add("d-none")
    thirdRow.classList.add("d-none")
  } else {
    buttonOne.disabled = false;
    buttonTwo.disabled = false;
    buttonThree.disabled = true;
    thirdRow.classList.remove("d-none")
    firstRow.classList.add("d-none")
    secondRow.classList.add("d-none")
  }
}

window.onload = () => {
  initModal()
}

// Adds event listener to all pictures in gallery, allows for modal functionality with bootstrap.
const initModal = () => {
  let modals = document.querySelectorAll('.pop')
  modals.forEach((element) => {
    element.addEventListener("click", () => {
      document.querySelector('.image-preview').src = element.src
      $('#image-modal').modal("show")
    })
  })
}
