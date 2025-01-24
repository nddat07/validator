function validator(options) {
    function validate (inputElement, rule) {
        const msg = inputElement.parentElement.querySelector(options.errorMsg)
        const errorMsg = rule.test(inputElement.value)
        if (errorMsg) {
            msg.innerText = errorMsg;
            inputElement.parentElement.classList.add('invalid')
            return false;
        } else {
            msg.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
            return true;
        }
    }

    const formElement = document.querySelector(options.form)

    if (formElement) {
        formElement.onsubmit = (e) => {
            e.preventDefault();
            let formIsValid = true;

            options.rules.forEach(rule => {
                const inputElement = formElement.querySelector(rule.selector)   
                const isValid = validate(inputElement, rule);

                if (!isValid) {
                   formIsValid = false;
                }
            });

            if (formIsValid) {
                formElement.submit();
            }
        }

        options.rules.forEach(rule => {
            const inputElement = formElement.querySelector(rule.selector)           
            
            if (inputElement) {
                inputElement.onblur = () => {
                    validate(inputElement, rule)
                }

                inputElement.oninput = () => {
                    const msg = inputElement.parentElement.querySelector(options.errorMsg)
                    msg.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        });
    }
}

validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: (value) => {
            return value.trim() ? undefined : 'vui long nhap day du ten';
        }
    }
}   

validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: (value) => {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (value.length < 1) {
                return 'vui long nhap truong nay'
            }
            return regex.test(value.trim()) ? undefined : 'truong nay phai la email';
        }
    }
}

validator.isPassword = function(selector, min) {
    return {
        selector: selector,
        test: (value) => {
            if (!value.trim()) {
                return 'Vui lòng nhập mật khẩu'; 
            }

            if (value.trim().length < min) {
                return `vui long nhap toi thieu ${min} ki tu`;
            }
            return undefined;
        }
    }
}   

validator.isPassword_confirmation = function(selector, passwordSelector) {
    return {
        selector: selector,
        test: (value) => {
            const passwordElement = document.querySelector(passwordSelector)
            if (!value.trim()) {
                return 'Vui lòng nhập lai mật khẩu'; 
            }
            if (passwordElement.value !== value) {
                return 'mat khau khong hop le'
            }
            return undefined
        }
    }
}   








