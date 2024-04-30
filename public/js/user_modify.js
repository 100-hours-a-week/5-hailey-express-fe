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

    const isNicknameValid = checkNickname();

    if (isNicknameValid) {
      toast.style.display = 'block';
    } else {
      toast.style.display = 'none';
    }
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
