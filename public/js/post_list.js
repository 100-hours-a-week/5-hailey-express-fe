document.addEventListener('DOMContentLoaded', function () {
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
                  <img src="/image/images.jpeg" alt="" />
                  <p>${post.nickname}</p>
              </div>
              `;

        document.getElementById('postlist').appendChild(card);
      });
    });
});
