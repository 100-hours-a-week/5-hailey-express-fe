document.addEventListener('DOMContentLoaded', function () {
  const emailInput = document.getElementById('user_mail');
  const passwordInput = document.getElementById('user_pw');
  const repasswordInput = document.getElementById('user_repw');
  const nicknameInput = document.getElementById('user_nickname');
  const submit_btn = document.getElementById('signup_btn');
  const form = document.getElementById('signup_form');
  const imageInput = document.getElementById('user_img');
  const image_helper = document.getElementById('image_helper');
  const email_helper = document.getElementById('email_helper');
  const pw_helper = document.getElementById('pw_helper');
  const repw_helper = document.getElementById('repw_helper');
  const nickname_helper = document.getElementById('nickname_helper');

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

  function checkRepassword() {
    const repassword = repasswordInput.value;
    const firstpassword = passwordInput.value;

    if (repassword == firstpassword) {
      repw_helper.textContent = '*비밀번호가 동일합니다.';
      return true;
    } else {
      repw_helper.textContent = '*비밀번호가 다릅니다.';
      return false;
    }
  }

  function checkNickname() {
    const nickname = nicknameInput.value;
    const nicknamePattern = /[\s]/g;

    if (nickname == '') {
      nickname_helper.textContent = '*닉네임을 입력해주세요.';
      return false;
    } else if (nicknamePattern.test(nickname)) {
      nickname_helper.textContent = '*띄어쓰기를 없애주세요.';
      return false;
    } else if (nickname.length > 10) {
      nickname_helper.textContent = '*닉네임은 최대 10자까지 작성 가능합니다.';
      return false;
    } else {
      nickname_helper.textContent = '';
      return true;
    }
  }

  function checkEmailDuplicate() {
    const email = emailInput.value;

    fetch(`http://localhost:3001/api/users/email/check?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.isDuplicate) {
          email_helper.textContent = '*중복된 이메일입니다.';
        } else {
          email_helper.textContent = '';
        }
      });
  }

  function checkNicknameDuplicate() {
    const nickname = nicknameInput.value;

    fetch(`http://localhost:3001/api/users/nickname/check?nickname=${nickname}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.isDuplicate) {
          nickname_helper.textContent = '*중복된 닉네임입니다.';
        } else {
          nickname_helper.textContent = '';
        }
      });
  }

  function isValid() {
    const isEmailValid = checkEmail();
    const isPasswordValid = checkPassword();
    const isRepasswordValid = checkRepassword();
    const isNicknameValid = checkNickname();

    if (
      isEmailValid &&
      isPasswordValid &&
      isRepasswordValid &&
      isNicknameValid
    ) {
      submit_btn.style.backgroundColor = '#7F6AEE';
      submit_btn.disabled = false;
      return true;
    } else {
      submit_btn.style.backgroundColor = '#ACA0EB';
      submit_btn.disabled = true;
      return false;
    }
  }

  //  이벤트리스너 start

  imageInput.addEventListener('change', function (event) {
    const userImgLabel = document.getElementById('user_img_label');

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        userImgLabel.style.backgroundImage = `url(${e.target.result})`;
        document.querySelector('#user_img_label span').style.display = 'none';
      };

      reader.readAsDataURL(event.target.files[0]);
    }
    image_helper.textContent = '';
  });

  emailInput.addEventListener('input', function () {
    checkEmail();
    checkEmailDuplicate();
    isValid();
  });

  passwordInput.addEventListener('input', function () {
    checkPassword();
    isValid();
  });

  repasswordInput.addEventListener('input', function () {
    checkRepassword();
    isValid();
  });

  nicknameInput.addEventListener('input', function () {
    checkNickname();
    checkNicknameDuplicate();
    isValid();
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append('email', emailInput.value);
    formdata.append('password', passwordInput.value);
    formdata.append('nickname', nicknameInput.value);
    formdata.append('profileImage', imageInput.files[0]);

    fetch('http://localhost:3001/api/users/signup', {
      method: 'POST',
      body: formdata,
    }).then((response) => {
      alert('회원가입 성공');
      window.location.href = '/users/login';
    });
  });
});
