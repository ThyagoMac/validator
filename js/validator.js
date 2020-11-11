let tag_validator = {
    handleSubmit: (event) => {
        event.preventDefault();
        let allApproved = true;

        let inputs = form.querySelectorAll(".tag-validator input")

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
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let ruleDetails = rules[k].split('=');

                switch (ruleDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'Campo não pode ser vazio.'
                        }
                        break;
                    case 'min':

                        break;
                }
            }
        }

        return true;
    },
    showError: (input, error) => {
        input.style.borderColor = '#FF0000';

        let errorSpan = document.createElement('span');
        errorSpan.classList.add('tag-error');
        errorElement.innerHTML = error;

        
    }
}

let form = document.querySelector('.tag-validator');
form.addEventListener('submit', tag_validator.handleSubmit);