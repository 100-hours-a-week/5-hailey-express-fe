document.addEventListener('DOMContentLoaded', function () {
  const topUserImage = document.getElementById('top_user_img');
  const modal = document.getElementById('post_modal');
  const comment_modal = document.getElementById('comment_modal');
  const commentInput = document.getElementById('comment_box');
  const submit_btn = document.querySelector('.comment_submit');
  const form = document.getElementById('comment_form');
  const comment_modify_btn = document.getElementById('comment_modify_button');
  const url = new URLSearchParams(window.location.search);
  const modalOk = document.getElementById('post_ok');
  const modalDelete = document.getElementById('post_delete');
  const commentModalOk = document.getElementById('comment_ok');
  const commentModalDelete = document.getElementById('comment_delete');

  const postNum = window.location.pathname.split('/').pop();
  let isEditing = false; // 댓글 등록, 수정 버튼 둘다 이용하기위함

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

  function formatNumber(number) {
    if (number >= 100000) {
      return `${(number / 1000).toFixed(0)}k`;
    } else if (number >= 10000) {
      return `${(number / 1000).toFixed(0)}k`;
    } else if (number >= 1000) {
      return `${(number / 1000).toFixed(0)}k`;
    } else {
      return number.toString();
    }
  }

  function deleteButton(postNum) {
    modal.style.display = 'block';

    const formdata = new FormData();
    formdata.append('post_id', postNum);

    modalOk.addEventListener('click', function () {
      fetch(`http://localhost:3001/api/posts/${postNum}/delete`, {
        method: 'PATCH',
        body: formdata,
      }).then((response) => {
        alert('게시글 삭제완료');
        window.location.href = `/posts`;
      });
    });
  }

  function checkComment() {
    const comment = commentInput.value;

    if (comment == '') {
      submit_btn.style.backgroundColor = '#ACA0EB';

      submit_btn.disabled = true;
      return false;
    } else {
      submit_btn.style.backgroundColor = '#7F6AEE';
      submit_btn.disabled = false;
      return true;
    }
  }

  function commentModify(comment_id, comment_content) {
    commentInput.value = comment_content;
    submit_btn.textContent = '댓글 수정';
    console.log('=========', comment_id);

    isEditing = true;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const formdata = new FormData();
      formdata.append('comment_id', comment_id);
      formdata.append('content', commentInput.value);

      fetch(`http://localhost:3001/api/posts/${postNum}/comments/update`, {
        method: 'PATCH',
        body: formdata,
      }).then((response) => {
        alert('댓글 수정 성공');
        window.location.href = `/posts/${postNum}`;
      });
    });
  }

  function commentDelete(comment_id) {
    comment_modal.style.display = 'block';
    const commentId = comment_id;

    const formdata = new FormData();
    formdata.append('comment_id', commentId);

    commentModalOk.addEventListener('click', function () {
      fetch(
        `http://localhost:3001/api/posts/${postNum}/comments/${commentId}`,
        {
          method: 'PATCH',
          body: formdata,
        }
      ).then((response) => {
        alert('댓글 삭제완료');
        window.location.href = `/posts/${postNum}`;
      });
    });
  }

  fetch(`http://localhost:3001/api/posts/${postNum}`, {
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success == false) {
        window.location.href = '/users/login';
      }

      const detail = data.getPostDetail;
      const userSession = data.session;

      const post_detail = document.createElement('div');

      // 좋아요,댓글,조회수 format
      const comment = formatNumber(detail.comment_count);
      const hit = formatNumber(detail.hits);

      post_detail.innerHTML = `
      <div class="detail_title">
          <p>${detail.post_title}</p>
        </div>
        <div class="detail_sub">
          <div>
            <img src=${detail.profile_image_path} alt="" />
          </div>
          <div>
            <p class="comment_user">${detail.nickname}</p>
          </div>
          <div class="detail_date">
            <p>${detail.created_at}</p>
          </div>
          <div class="button">
            <button
            id="post_modify_button"
              type="button"
              onclick="location.href='/posts/${postNum}/update'"
            >
              수정
            </button>
            <button id="post_delete_button" type="submit" value="${postNum}">삭제</button>
          </div>
        </div>
        <div class="main">
          <img src="${detail.file_id}" alt=""/>
          <p>${detail.post_content}</p>
          <div class="hit_comment">
            <div class="hit">
              <div>${hit}</div>
              <div>조회수</div>
            </div>
            <div class="hit">
              <div>${comment}</div>
              <div>댓글</div>
            </div>
          </div>
        </div>
      `;

      document.getElementById('post_detail').appendChild(post_detail);

      if (detail.nickname == userSession) {
        post_detail.querySelector('#post_modify_button').style.display =
          'block';
        post_detail.querySelector('#post_delete_button').style.display =
          'block';
      } else {
        post_detail.querySelector('#post_modify_button').style.display = 'none';
        post_detail.querySelector('#post_delete_button').style.display = 'none';
      }

      post_detail
        .querySelector('#post_delete_button')
        .addEventListener('click', function () {
          deleteButton(postNum);
        });
    });

  fetch(`http://localhost:3001/api/posts/${postNum}/comments`, {
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success == false) {
        window.location.href = '/users/login';
      }

      const comments = data.getComment;
      const userSession = data.session;

      comments.forEach((comment) => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
        <div class="comment_list">
          <div>
            <div class="comment_info">
              <div>
                <img src="${comment.profile_image_path}" alt="" />
              </div>
              <div>
                <p class="comment_user">${comment.nickname}</p>
              </div>
              <div>
                <p class="detail_date">${comment.created_at}</p>
              </div>
            </div>
            <div class="comment_detail">
              <p>${comment.comment_content}</p>
            </div>
          </div>
          <div class="comment_button">
            <button id="comment_modify_button" type="submit" value="${comment.comment_id}">수정</button>
            <button id="comment_delete_button" type="submit" value="${comment.comment_id}">삭제</button>
          </div>
      </div>
                `;

        document.getElementById('commet_zip').appendChild(card);

        if (comment.nickname == userSession) {
          card.querySelector('#comment_modify_button').style.display = 'block';
          card.querySelector('#comment_delete_button').style.display = 'block';
        } else {
          card.querySelector('#comment_modify_button').style.display = 'none';
          card.querySelector('#comment_delete_button').style.display = 'none';
        }

        card
          .querySelector('#comment_modify_button')
          .addEventListener('click', function () {
            commentModify(comment.comment_id, comment.comment_content);
          });

        card
          .querySelector('#comment_delete_button')
          .addEventListener('click', function () {
            commentDelete(comment.comment_id);
          });
      });
    });

  //이벤트 리스너 start

  commentInput.addEventListener('input', function () {
    checkComment();
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (isEditing == false) {
      const formdata = new FormData();
      formdata.append('comment', commentInput.value);

      fetch(`http://localhost:3001/api/posts/${postNum}/comments`, {
        method: 'POST',
        body: formdata,
        credentials: 'include',
      }).then((response) => {
        alert('댓글 등록 성공');
        window.location.href = `/posts/${postNum}`;
      });
    }
  });

  modalDelete.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  commentModalDelete.addEventListener('click', function () {
    comment_modal.style.display = 'none';
  });
});
