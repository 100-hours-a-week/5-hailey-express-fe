document.addEventListener('DOMContentLoaded', function () {
  const titleInput = document.querySelector('.item_title');
  const contentInput = document.querySelector('.item_content');
  const imageInput = document.querySelector('.item_img');
  const submit_btn = document.getElementById('submit_btn');
  const form = document.getElementById('post_write_form');

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

    const formdata = new FormData();
    formdata.append('title', titleInput.value);
    formdata.append('content', contentInput.value);
    formdata.append('file', imageInput.files[0]);
    console.log('--------------', imageInput.files[0]);

    fetch('http://localhost:3001/api/post/new', {
      method: 'POST',
      body: formdata,
    }).then((response) => {
      alert('게시글 등록 성공');
      window.location.href = '/posts';
    });
  });
});
