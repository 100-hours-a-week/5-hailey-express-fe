document.addEventListener('DOMContentLoaded', function () {
  const topUserImage = document.getElementById('top_user_img');

  function formatNumber(number) {
    if (number >= 100000) {
      return `${(number / 1000).toFixed(0)}k`;
    } else if (number >= 10000) {
      return `${(number / 1000).toFixed(0)}k`;
    } else if (number >= 1000) {
      return `${(number / 1000).toFixed(0)}k`;
    } else {
      return number;
    }
  }

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

  fetch('http://localhost:3001/api/posts')
    .then((response) => response.json())
    .then((data) => {
      const posts = data.posts;

      posts.forEach((post) => {
        const card = document.createElement('div');
        card.className = 'card';

        // 제목 요소 생성
        const titleElement = document.createElement('p');
        titleElement.textContent = post.post_title;

        // 제목 길이가 26자 이상이면 글자를 자르고 "..."을 추가
        if (titleElement.textContent.length > 26) {
          titleElement.textContent =
            titleElement.textContent.substring(0, 26) + '...';
        }

        // 좋아요,댓글,조회수 format
        const like = formatNumber(post.like);
        const comment = formatNumber(post.comment_count);
        const hit = formatNumber(post.hits);

        //카드 클릭이벤트
        card.addEventListener('click', function () {
          const postNum = post.post_id;
          window.location.href = `/posts/${postNum}`;
        });

        card.innerHTML = `
              <div class="card_top">
                  <div class="card_title">
                      <p name='content_title'>${titleElement.textContent}
                      </p>
                  </div>
                  <div class="card_center">
                      <div>
                          <p>좋아요 ${like}&nbsp;&nbsp;&nbsp;댓글 ${comment}&nbsp;&nbsp;&nbsp;조회수 ${hit}</p>
                      </div>
                      <div>
                          <p>${post.created_at}</p>
                      </div>
                  </div>
              </div>
              <div class="card_bottom">
                  <img src=${post.profile_image_path} alt="" />
                  <p>${post.nickname}</p>
              </div>
              `;

        document.getElementById('postlist').appendChild(card);
      });
    });

  //  이벤트리스너 start
});
