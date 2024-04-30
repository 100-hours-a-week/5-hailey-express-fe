document.addEventListener('DOMContentLoaded', function () {
  const passwordInput = document.getElementById('user_pw');
  const repasswordInput = document.getElementById('user_repw');
  const pw_helper = document.getElementById('pw_helper');
  const repw_helper = document.getElementById('repw_helper');
  const form = document.getElementById('modify_pw_form');
  const submit_btn = document.getElementById('submit_btn');

  function checkPassword() {
    const password = passwordInput.value;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,20}$/;

    if (password == '') {
      pw_helper.textContent = '비밀번호를 입력해주세요';
      return false;
    } else if (!passwordPattern.test(password)) {
      pw_helper.textContent =
        '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야합니다.';
      return false;
    } else {
      pw_helper.textContent = '';
      return true;
    }
  }

  function checkRepassword() {
    const repassword = repasswordInput.value;
    const password = passwordInput.value;

    if (repassword == password) {
      repw_helper.textContent = '비밀번호가 동일합니다.';
      return true;
    } else {
      repw_helper.textContent = '비밀번호와 다릅니다.';
      return false;
    }
  }

  function isValid() {
    const isPasswordValid = checkPassword();
    const isRepasswordValid = checkRepassword();

    if (isPasswordValid && isRepasswordValid) {
      submit_btn.style.backgroundColor = '#7F6AEE';
      submit_btn.disabled = false;
      return true;
    } else {
      submit_btn.style.backgroundColor = '#ACA0EB';
      submit_btn.disabled = true;
      return false;
    }
  }

  // 이벤트리스너 start

  passwordInput.addEventListener('input', function () {
    checkPassword();
    isValid();
  });

  repasswordInput.addEventListener('input', function () {
    checkRepassword();
    isValid();
  });

  form.addEventListener('submit', function () {});
});
