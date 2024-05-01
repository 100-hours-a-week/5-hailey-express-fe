document.addEventListener('DOMContentLoaded', function () {
  const title = document.querySelector('.item_title');
  const content = document.querySelector('.item_content');
  const imageInput = document.getElementById('imgupload');
  const form = document.getElementById('post_modify_form');

  const url = window.location.pathname; // 현재 페이지의 경로를 가져옴
  const postNum = parseInt(url.split('/')[2]);

  fetch(`http://localhost:3001/api/posts/${postNum}`)
    .then((response) => response.json())
    .then((data) => {
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
      }).then((response) => {
        alert('게시글 수정 성공');
        window.location.href = `/posts/${postNum}`;
      });
    };
  });
});
