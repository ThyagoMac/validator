let tag_validator = {
  handleSubmit: (event) => {
    event.preventDefault();
    let allApproved = true;

    let inputs = form.querySelectorAll(".tag-validator input");

    tag_validator.clearErrors();

    /* for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
        } */
    inputs.forEach((input, i) => {
      let checked = tag_validator.checkInput(input);
      if (checked !== true) {
        allApproved = false;
        tag_validator.showError(input, checked);
      }
    });

    if (allApproved) {
      form.submit();
    }
  },
  checkInput: (input) => {
    let rules = input.getAttribute("data-rules");
    if (rules !== null) {
      rules = rules.split("|");
      for (let k in rules) {
        let ruleDetails = rules[k].split(":");
        switch (ruleDetails[0]) {
          case "required":
            if (input.value == "") {
              return "Campo " + input.parentNode.innerText + " não pode ser vazio.";
            }
            break;
          case "min":
            if (input.value.length < ruleDetails[1]) {
              return "Campo " + input.parentNode.innerText + " tem que ter ao menos " + ruleDetails[1] + " caracteres";
            }
            break;
          case "max":
            if (input.value.length >= ruleDetails[1]) {
              return "Campo " + input.parentNode.innerText + " tem que ter no máximo " + ruleDetails[1] + " caracteres";
            }
            break;
          case "email":
            if (input.value != "") {
              let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (!regex.test(input.value.toLowerCase())) {
                return "Esse campo precisa ser um email válido";
              }
            }
            break;
          case "number":
            if (input.value != "") {
                let regex = /^[0-9]+$/;
                if (!regex.test(input.value.toLowerCase())) {
                  return "Campo " + input.parentNode.innerText + " aceita apenas números";
                }
              }
            break;
        }
      }
    }

    return true;
  },
  showError: (input, error) => {
    input.style.borderColor = "rgb(255, 142, 142)";

    let inputId = input.id;
    let errorSpan = document.createElement("label");

    if (inputId) {
      errorSpan.setAttribute("for", inputId);
    }
    errorSpan.classList.add("tag-error");
    errorSpan.innerHTML = error;

    input.parentElement.insertBefore(errorSpan, input.ElementSibling);
  },
  clearErrors: () => {
    let inputs = form.querySelectorAll("input");
    inputs.forEach((element) => {
      element.style.borderColor = "";
    });

    let errorElements = document.querySelectorAll(".tag-error");

    errorElements.forEach((element) => {
      element.remove();
    });
  },
};

const form = document.querySelector(".tag-validator");
form.addEventListener("submit", tag_validator.handleSubmit);
