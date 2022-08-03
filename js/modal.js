export default function openModal() {
  const modal = document.querySelectorAll(".header__contact-us");
  const modalOpen = document.querySelector(".modal");

  const sendBtn = document.querySelector(".modal__btn-send");
  const loadContent = document.querySelector(".load__content");
  let username = document.getElementById("firstname"),
    email = document.getElementById("email"),
    userPhone = document.getElementById("phoneNumber"),
    comment = document.getElementById("comment"),
    errorMsg = document.querySelectorAll(".input-status");
  const errorChecked = document.querySelector(".checked__error");
  const doneBtn = document.querySelector(".hidden__btn-done");
  const closeModal = document.querySelector(".close__content");


  const openByBtn = () => {
    const form = document.getElementById("form-modal");
    Array.from(form.elements.checkbox__value).forEach(
      (x) => (x.checked = false)
    );

    modalOpen.style.display = "block";
    document.body.classList.add("body__scroll-off");
  };
  function validateEmail(email) {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  modal.forEach((tag) => {
    tag.addEventListener("click", function (e) {
      modalOpen.style.display = "block";
      document.body.classList.add("body__scroll-off");
    });
  });
  let validation = (id, serial, message) => {
    if (id.value.trim() === "") {
      errorMsg[serial].innerHTML = message;
      id.classList.add("error-input");

      return false;
    } else {
      errorMsg[serial].innerHTML = "";
    }
    if (id.value.length < 3) {
      id.classList.add("error-input");
      errorMsg[serial].innerHTML = "should be more then 3 symbols";
      return false;
    } else {
      errorMsg[serial].innerHTML = "";
      id.classList.remove("error-input");
    }
  };

  sendBtn.addEventListener("click", function (e) {
    e.preventDefault();
    validation(username, 0, "required field");
    validation(email, 1, "required field");
    validation(userPhone, 2, "required field");
    validation(comment, 3, "required field");

    if (username.value && email.value && userPhone.value && comment.value) {

      loadContent.classList.add("hidden__modal__content");
      setTimeout(() => {
        sendBtn.setAttribute("disabled", "");
        loadContent.classList.remove("hidden__modal__content");

        username.value = "";
        email.value = "";
        userPhone.value = "";
        comment.value = "";
        username.classList.remove("error-input");
        email.classList.remove("error-input");
        userPhone.classList.remove("error-input");
        comment.classList.remove("error-input");
        modalOpen.style.display = "none";
        sendBtn.removeAttribute("disabled", "");
        document.body.classList.remove("body__scroll-off");
      }, 3000);

      const form = document.getElementById("form-modal");

      const data = {
        username: username.value,
        email: email.value,
        userPhome: userPhone.value,
        comment: comment.value,
      };

      console.log("DATA", data);
    } else {
      console.log("false");
    }
  });
  closeModal.addEventListener("click", function (e) {
    username.value = "";
    email.value = "";
    userPhone.value = "";
    comment.value = "";
    username.classList.remove("error-input");
    email.classList.remove("error-input");
    userPhone.classList.remove("error-input");
    comment.classList.remove("error-input");
    modalOpen.style.display = "none";
    sendBtn.removeAttribute("disabled", "");

    document.body.classList.remove("body__scroll-off");
  });
  document.querySelector(".modal__body").addEventListener(
    "click",
    (e) => {
      const modalContent = document.querySelector(".modal__content");
      if (e.path.indexOf(modalContent) === -1) {
        username.value = "";
        email.value = "";
        userPhone.value = "";
        comment.value = "";
        document.body.classList.remove("body__scroll-off");
        username.classList.remove("error-input");
        email.classList.remove("error-input");
        userPhone.classList.remove("error-input");
        comment.classList.remove("error-input");
        modalOpen.style.display = "none";

        sendBtn.removeAttribute("disabled", "");
      }
    },
    false
  );
}
