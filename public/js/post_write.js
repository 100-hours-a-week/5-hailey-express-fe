document.addEventListener('DOMContentLoaded', function () {
  const topUserImage = document.getElementById('top_user_img');
  const titleInput = document.querySelector('.item_title');
  const contentInput = document.querySelector('.item_content');
  const imageInput = document.querySelector('.item_img');
  const submit_btn = document.getElementById('submit_btn');
  const form = document.getElementById('post_write_form');

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

  function checkTitle() {
    const title = titleInput.value;

    if (title == '') {
      submit_btn.style.backgroundColor = '#ACA0EB';
      return false;
    } else {
      // submit_btn.style.backgroundColor = '#'
      return true;
    }
  }

  function checkContent() {
    const content = contentInput.value;

    if (content == '') {
      submit_btn.style.backgroundColor = '#ACA0EB';
      return false;
    } else {
      return true;
    }
  }

  function isValid() {
    const titleValid = checkTitle();
    const contentValid = checkContent();

    if (titleValid && contentValid) {
      submit_btn.style.backgroundColor = '#7F6AEE';
      submit_btn.disabled = false;
    } else {
      submit_btn.style.backgroundColor = '#ACA0EB';
    }
  }

  // 이벤트 리스너 start

  titleInput.addEventListener('input', function () {
    checkTitle();
    isValid();
  });

  contentInput.addEventListener('input', function () {
    checkContent();
    isValid();
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function () {
      const base64Image = reader.result;

      const formdata = new FormData();
      formdata.append('title', titleInput.value);
      formdata.append('content', contentInput.value);
      formdata.append('file', base64Image);

      fetch('http://localhost:3001/api/post/new', {
        method: 'POST',
        body: formdata,
        credentials: 'include',
      }).then((response) => {
        alert('게시글 등록 성공');
        window.location.href = '/posts';
      });
    };
  });
});
