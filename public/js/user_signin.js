document.addEventListener('DOMContentLoaded', function () {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const form = document.getElementById('signin_form');
  const submit_btn = document.getElementById('login');
  const email_helper = document.getElementById('email_helper');
  const pw_helper = document.getElementById('pw_helper');

  function checkEmail() {
    const email = emailInput.value;
    const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    if (email == '') {
      email_helper.textContent = '이메일을 입력해주세요.';
      return false;
    } else if (!emailPattern.test(email)) {
      email_helper.textContent =
        '*올바른 이메일 주소 형식을 입력해주세요. (예:example@example.com)';
      return false;
    } else {
      email_helper.textContent = '';
      return true;
    }
  }

  function checkPassword() {
    const password = passwordInput.value;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,20}$/;

    if (password == '') {
      pw_helper.textContent = '*비밀번호를 입력해주세요.';
      return false;
    } else if (!passwordPattern.test(password)) {
      pw_helper.textContent =
        '*비밀번호는 8자 이상 20자 이하이며, 대소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.';
      return false;
    } else {
      pw_helper.textContent = '';
      return true;
    }
  }

  function isValid() {
    const isEmailValid = checkEmail();
    const isPasswordValid = checkPassword();

    if (isEmailValid && isPasswordValid) {
      submit_btn.style.backgroundColor = '#7F6AEE';
      return true;
    } else {
      submit_btn.style.backgroundColor = '#ACA0EB';
      return false;
    }
  }

  //  이벤트리스너 start

  emailInput.addEventListener('input', function () {
    checkEmail();
    isValid();
  });

  passwordInput.addEventListener('input', function () {
    checkPassword();
    isValid();
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    fetch('http://localhost:3001/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('로그인 성공');
          window.location.href = '/posts';
        } else {
          alert('이메일 또는 패스워드가 잘못되었습니다.');
        }
      });
  });
});
