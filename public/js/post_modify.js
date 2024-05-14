document.addEventListener('DOMContentLoaded', function () {
  const topUserImage = document.getElementById('top_user_img');
  const title = document.querySelector('.item_title');
  const content = document.querySelector('.item_content');
  const imageInput = document.getElementById('imgupload');
  const form = document.getElementById('post_modify_form');

  const url = window.location.pathname; // 현재 페이지의 경로를 가져옴
  const postNum = parseInt(url.split('/')[2]);

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

  fetch(`http://localhost:3001/api/posts/${postNum}`, {
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success == false) {
        window.location.href = '/users/login';
      }

      const detail = data.getPostDetail;

      title.value = detail.post_title;
      content.value = detail.post_content;
    });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function () {
      const base64Image = reader.result;

      const formdata = new FormData();
      formdata.append('title', title.value);
      formdata.append('content', content.value);
      formdata.append('file', base64Image);

      fetch(`http://localhost:3001/api/posts/${postNum}/update`, {
        method: 'PATCH',
        body: formdata,
        credentials: 'include',
      }).then((response) => {
        alert('게시글 수정 성공');
        window.location.href = `/posts/${postNum}`;
      });
    };
  });
});
