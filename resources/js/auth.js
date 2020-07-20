import axios from 'axios';
import path from 'path';

(async () => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    if (window.location.pathname === path.resolve('user', 'register')) {
        const username = document.getElementById('username'),
            password = document.getElementById('password'),
            passwordConfirmation = document.getElementById('confirmPassword'),
            address = document.getElementById('address'),
            phoneNumber = document.getElementById('phoneNumber'),
            email = document.getElementById('email'),
            loginButton = document.getElementById('submit');

        const usernameLabelText = username.parentNode.children[0].innerText,
            passwordLabelText = password.parentNode.children[0].innerText,
            usernameLabel = username.parentNode.children[0],
            passwordLabel = password.parentNode.children[0];

        const setNotification = (errors = {}) => {
            usernameLabel.innerHTML = '';
            passwordLabel.innerHTML = '';
            usernameLabel.innerHTML = `${usernameLabelText}  <span>${
                errors.username ? errors.username[0] || '' : ''
            }</span>`;
            passwordLabel.innerHTML = `${passwordLabelText}  <span>${
                errors.password ? errors.password[0] || '' : ''
            }</span>`;
        };

        const onSubmit = async e => {
            e.preventDefault();

            const formData = new FormData();

            formData.append('username', username.value);
            formData.append('password', password.value);
            formData.append(
                'password_confirmation',
                passwordConfirmation.value
            );
            formData.append('address', address.value);
            formData.append('phone_number', phoneNumber.value);
            formData.append('email', email.value);

            let response = {};
            try {
                response = await axios.post(
                    path.resolve('user', 'register'),
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'X-CSRF-TOKEN': csrfToken
                        }
                    }
                );
            } catch (e) {
                if (e.response) {
                    response = e.response;
                } else {
                    console.error(e);
                }
            }

            if (
                response.data.status &&
                response.data.status === 'register success'
            ) {
                window.location.replace(response.data.url);
            } else if (response.data.errors) {
                setNotification(response.data.errors);
            } else {
                console.log(response);
            }
        };

        loginButton.addEventListener('click', onSubmit);
    } else if (window.location.pathname === path.resolve('user', 'login')) {
        const username = document.getElementById('username'),
            password = document.getElementById('password'),
            remember = document.getElementById('remember'),
            loginButton = document.getElementById('submit');

        const usernameLabelText = username.parentNode.children[0].innerText,
            passwordLabelText = password.parentNode.children[0].innerText,
            usernameLabel = username.parentNode.children[0],
            passwordLabel = password.parentNode.children[0];

        const setNotification = (errors = {}) => {
            usernameLabel.innerHTML = '';
            passwordLabel.innerHTML = '';
            usernameLabel.innerHTML = `${usernameLabelText}  <span>${
                errors.username ? errors.username[0] || '' : ''
            }</span>`;
            passwordLabel.innerHTML = `${passwordLabelText}  <span>${
                errors.password ? errors.password[0] || '' : ''
            }</span>`;
        };

        const onSubmit = async e => {
            e.preventDefault();

            const formData = new FormData();

            formData.append('username', username.value);
            formData.append('password', password.value);
            if (remember.checked) {
                formData.append('remember_me', 'on');
            }

            let response = {};
            try {
                response = await axios.post(
                    path.resolve('user', 'login'),
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'X-CSRF-TOKEN': csrfToken
                        }
                    }
                );
            } catch (e) {
                if (e.response) {
                    response = e.response;
                } else {
                    console.error(e);
                }
            }

            if (
                response.data.status &&
                response.data.status === 'login success'
            ) {
                window.location.replace(response.data.url);
            } else if (response.data.errors) {
                setNotification(response.data.errors);
            } else {
                console.log(response);
            }
        };

        loginButton.addEventListener('click', onSubmit);
    }
})();
