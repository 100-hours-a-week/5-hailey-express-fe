document.addEventListener('DOMContentLoaded', function () {
  const topUserImage = document.getElementById('top_user_img');
  const passwordInput = document.getElementById('user_pw');
  const repasswordInput = document.getElementById('user_repw');
  const pw_helper = document.getElementById('pw_helper');
  const repw_helper = document.getElementById('repw_helper');
  const form = document.getElementById('modify_pw_form');
  const submit_btn = document.getElementById('submit_btn');

  fetch(`http://localhost:3001/api/users/userInfo`, {
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => {
      const userInfo = data.userId;
      topUserImage.src = data.profileImage;

      console.log(userInfo);

      topUserImage.addEventListener('click', function () {
        const userDropdown = document.createElement('div');

        userDropdown.innerHTML = `
     
        <ul>
          <li>
            <a href="/users/${userInfo}" target="_self">회원정보수정</a>
          </li>
          <li>
            <a href="/users/${userInfo}/password" target="_self">비밀번호수정</a>
          </li>
          <li>
            <button id="logout_button">로그아웃</button>
          </li>
        </ul>
        
        `;

        document.querySelector('.dropdown').appendChild(userDropdown);

        const dropdown = document.querySelector('.dropdown');
        dropdown.style.display = 'block';

        document
          .querySelector('#logout_button')
          .addEventListener('click', function () {
            fetch('http://localhost:3001/api/users/logout', {
              credentials: 'include',
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data.success);
                if (data.success == true) {
                  alert('로그아웃되었습니다.');
                  window.location.href = '/users/login';
                } else {
                  alert('로그아웃에 실패했습니다.');
                }
              });
          });
      });
    });

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
