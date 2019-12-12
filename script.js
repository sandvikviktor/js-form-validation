$(function () {

    // ------ Form Validation Starts ------

    //First & Last name validation.
    function validateName(id) {
        const nameMessage = $('.name-message');
        if (/^[a-zA-Z ]{2,30}$/.test($(id).val().trim())) {
            $(id).removeClass('is-invalid');
            $(id).addClass('is-valid');
            return true;
        }
        else if (($(id).val() === '')) {
            nameMessage.text('Your name is required.');
            return false;
        }
        else {
            $(id).addClass('is-invalid');
            nameMessage.text('This is not a valid name.');
            return false;
        }
    };
    //Password validation.
    function validatePassword(id) {
        const pwMessage = $('.pw-message');
        if (/^.{4,8}$/.test($(id).val().trim())) {
            $(id).removeClass('is-invalid');
            $(id).addClass('is-valid');
            return true;
        } else if (($(id).val() === '')) {
            pwMessage.text('Choose a password between 4 and 8 characters.');
            return false;
        }
        else {
            $(id).addClass('is-invalid');
            pwMessage.text('(Password must be 4-8 characters long.)');
            return false;
        }
    };
    //Email validation.
    function validateEmail(id) {
        const emailMessage = $('.email-message');
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($(id).val().trim())) {
            $(id).removeClass('is-invalid');
            $(id).addClass('is-valid');
            return true;
        } else if (($(id).val() === '')) {
            emailMessage.text('Your email is required.');
            return false;
        } else {
            $(id).addClass('is-invalid');
            emailMessage.text('This is not a valid email.');
            return false;
        }
    };
    //Textarea & Gender Validation.
    function selectValue() {
        if ($('#gender').val() !== '' && $('#textarea').val() !== '') {
            $(this).addClass('is-valid');
            return true;
        } else {
            $(this).addClass('is-invalid');
            return false;
        }
    };

    //Validating textfields while the user types and 
    //enables last checkbox when everything is validated.
    //only on account registration)
    $('input').keyup(function () {

        if ($('body').is('.regPage')) {
            validateName('#firstName');
            validateName('#lastName');
            validatePassword('#password');
            validateEmail('#email');
    
            if (validateName('#firstName') && validateName('#lastName') &&
                validatePassword('#password') && validateEmail('#email')) {
                ($('#agreeCheck').removeAttr('disabled'))
            }
        }

    });


    //Form reg submit.
    const submitMessage = $('.submit-message');

    $('#regSection').submit((e) => {
        e.preventDefault();

        if (selectValue() && validateName('#firstName') && validateName('#lastName') &&
            validatePassword('#password') && validateEmail('#email')) {

            submitMessage.text('Check your email to confirm your account!');
            setTimeout(() => {
                document.location.href = '../Login/login.html';
            }, 3000);
            return true;
        } else {
            submitMessage.text('Enter all fields to proceed!');
            return false;
        }
    });

    //Form login submit.
    $('#loginSection').submit((e) => {
        e.preventDefault();

        if (validateEmail('#email') && validatePassword('#password')) {
            submitMessage.text('You\'re now logged in!');
            setTimeout(() => {
                $('#loginSection').removeClass('formSlideIn');
                $('#loginSection').addClass('formSlideOut');
                // $('#logo > span').text('');
                $('#logo > span').text('You\'re inlogged as Unknown');
                $('#sign-in').removeClass('bg-orange');
                $('#sign-in').addClass('bg-transparent');
            }, 3000);
        } else {
            submitMessage.text('Couldn\'t find email or password.');
        }
    })

    // ------ Form Validation Ends ------


    // Variables for sign button styling and form slide
    const regSection = $('#regSection');
    const loginSection = $('#loginSection');
    const signUp = $('#sign-up');
    const signIn = $('#sign-in');

    // ----- Sign In / Sign Up ----- COLOR ON LOAD
    if (signUp.hasClass('hideForm') && regSection.hasClass('formSlideIn')) {
        // signUp.css('background-color', '#201a13');
        signUp.addClass('bg-orange');
    } else if (signIn.hasClass('hideForm') && loginSection.hasClass('formSlideIn')) {
        signIn.addClass('bg-orange');
    } else {
        signUp.addClass('bg-transparent');
        signIn.addClass('bg-transparent');
    }

    // ----- Sign In / Sign Up ----- SLIDE/COLOR ON CLICK
    $('.hideForm').click(function () {
        // HIDE regForm
        if (regSection.hasClass('formSlideIn')) {
            regSection.removeClass('formSlideIn');
            regSection.addClass('formSlideOut');
            signUp.addClass('bg-transparent');

        // SHOW regForm    
        } else if (regSection.hasClass('formSlideOut')) {
            regSection.removeClass('formSlideOut');
            regSection.addClass('formSlideIn');
            signUp.removeClass('bg-transparent');
            signUp.addClass('bg-orange');

        // HIDE loginForm
        } else if (loginSection.hasClass('formSlideIn')) {
            loginSection.removeClass('formSlideIn');
            loginSection.addClass('formSlideOut');
            signIn.addClass('bg-transparent');

        // SHOW loginForm
        } else {
            loginSection.removeClass('formSlideOut');
            loginSection.addClass('formSlideIn');
            signIn.removeClass('bg-transparent');
            signIn.addClass('bg-orange');
        }
    });


    // ---------- SELECTBOX STYLE STARTS --------------
    let x, i, j, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                let y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        let x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);

    // ---------- SELECTBOX STYLE ENDS --------------

})