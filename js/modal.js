export default function openModal() {
  const modal = document.querySelectorAll(".header__contact-us");
  const modalOpen = document.querySelector(".modal");

  const sendBtn = document.querySelector(".modal__btn-send");
  const loadContent = document.querySelector(".load__content");
  let username = document.getElementById("firstname"),
    email = document.getElementById("email"),
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
  buyBtn.addEventListener("click", function (e) {
    openByBtn();
  });
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

    if (username.value && email.value && activeCheckboxesText()) {
      errorChecked.style.display = "none";
      loadContent.classList.add("hidden__modal__content");
      setTimeout(() => {
        sendBtn.setAttribute("disabled", "");
        loadContent.classList.remove("hidden__modal__content");

        username.value = "";
        email.value = "";
        username.classList.remove("error-input");
        email.classList.remove("error-input");
        errorChecked.style.display = "none";
        modalOpen.style.display = "none";
        sendBtn.removeAttribute("disabled", "");
        document.body.classList.remove("body__scroll-off");
      }, 3000);

      const form = document.getElementById("form-modal");

      const data = {
        username: username.value,
        email: email.value,
        plans: Array.from(form.elements.drone).find((x) => x.checked)?.value,
        socials: Array.from(form.elements.checkbox__value)
          .filter((x) => x.checked)
          .map((x) => x.value),
      };

      console.log("DATA", data);
    } else {
      console.log("false");
    }
  });
  closeModal.addEventListener("click", function (e) {
    username.value = "";
    email.value = "";
    username.classList.remove("error-input");
    email.classList.remove("error-input");
    errorChecked.style.display = "none";
    modalOpen.style.display = "none";
    doneBtn.style.display = "none";
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
        errorChecked.style.display = "none";
        document.body.classList.remove("body__scroll-off");
        username.classList.remove("error-input");
        email.classList.remove("error-input");
        modalOpen.style.display = "none";
        doneBtn.style.display = "none";
        sendBtn.removeAttribute("disabled", "");
      }
    },
    false
  );
}
