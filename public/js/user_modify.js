document.addEventListener('DOMContentLoaded', function () {
  const topUserImage = document.getElementById('top_user_img');
  const dropdown = document.querySelector('.dropdown');
  const imageInput = document.getElementById('user_img');
  const nicknameInput = document.getElementById('user_nickname');
  const nickname_helper = document.getElementById('nickname_helper');
  const form = document.getElementById('modify_form');
  const signout = document.getElementById('signout_btn');
  const modal = document.querySelector('.modal');
  const modalOk = document.querySelector('.ok');
  const modalDelete = document.querySelector('.delete');
  const toast = document.getElementById('modify_success');
  const email = document.querySelector('.user_mail');

  const url = window.location.pathname; // 현재 페이지의 경로를 가져옴
  const userId = parseInt(url.split('/')[2]);

  function checkNickname() {
    const nickname = nicknameInput.value;

    if (nickname == '') {
      nickname_helper.textContent = '*닉네임을 입력해주세요.';
      return false;
    } else if (nickname.length > 10) {
      nickname_helper.textContent = '*닉네임은 최대 10자까지 작성 가능합니다.';
      return false;
    } else {
      nickname_helper.textContent = '';
      return true;
    }
  }

  fetch(`http://localhost:3001/api/users/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      const detail = data.getUserDetail;

      topUserImage.src = detail.profileImage;

      const userImgLabel = document.getElementById('user_img_label');

      email.textContent = detail.email;
      nicknameInput.value = detail.nickname;
      userImgLabel.style.backgroundImage = `url(${detail.profileImage})`;
    });

  //  이벤트리스너 start

  topUserImage.addEventListener('click', function () {
    dropdown.style.display = 'block';
  });

  imageInput.addEventListener('change', function (event) {
    const userImgLabel = document.getElementById('user_img_label');

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        userImgLabel.style.backgroundImage = `url(${e.target.result})`;
        document.querySelector('.user_img span').style.display = 'none';
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  });

  form.addEventListener('submit', function (event) {
    checkNickname();
    event.preventDefault();

    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function () {
      const base64Image = reader.result;

      const formdata = new FormData();
      formdata.append('nickname', nicknameInput.value);
      formdata.append('profileImage', base64Image);

      fetch(`http://localhost:3001/api/users/${userId}/update`, {
        method: 'PATCH',
        body: formdata,
      }).then((response) => {
        toast.style.display = 'block';
      });
    };
  });

  nicknameInput.addEventListener('input', function () {
    checkNickname();
  });

  signout.addEventListener('click', function () {
    modal.style.display = 'block';
  });

  modalOk.addEventListener('click', function () {
    window.location.href = '/';
  });

  modalDelete.addEventListener('click', function () {
    modal.style.display = 'none';
  });
});
