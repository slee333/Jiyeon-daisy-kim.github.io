class NavBar extends HTMLElement {
    constructor() {
      super();
  
      const shadow = this.attachShadow({ mode: 'open' });
  
      // 현재 페이지가 index.html인지 확인
      const isIndexPage = window.location.pathname.endsWith('index.html');
  
      shadow.innerHTML = `
        <style>
          .navigator {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            z-index: 1000;
            position: fixed;
            width: 80%;
            font-family: 'Montserrat', sans-serif;
          }
  
          .site-name {
            margin: 0;
            font-size: 24px;
            font-family: 'Espacio Novo', sans-serif;
            color: ${isIndexPage ? 'white' : 'black'};
          }
  
          .site-name a {
            color: ${isIndexPage ? 'white' : 'black'};
            text-decoration: none;
          }
  
          .navigator ul {
            display: flex;
            margin: 0%;
            padding: 0%;
            flex-wrap: nowrap;
          }
  
          .navigator li {
            display: inline;
            align-self: center;
            margin-left: 3%;
            margin-right: 3%;
          }
  
          .navigator a {
            text-decoration: none;
          }
  
          .navigator a:hover {
            color: gray;
            transition: 0.3s;
          }
  
          .nav-menu {
            font-size: 18px;
            color: ${isIndexPage ? 'white' : '#C9C9C9'};
          }

          .nav-menu.active {
            color: black;
            font-weight: bold; /* 선택사항: 강조 효과 */
          }
  
          .triangle {
            font-size: 10px;
            margin-left: 3px;
          }
  
          .dropdown-content {
            display: none;
            position: absolute;
            background-color: white;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
          }
  
          .dropdown:hover .dropdown-content {
            display: block;
          }
  
          .dropdown-content a {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            font-size: 14px;
            padding-left: 5%;
          }
  
          .dropdown-content a:hover {
            background-color: #f1f1f1;
          }
        </style>
  
        <nav class="navigator">
          <h3 class="site-name"><a href="index.html">Daisyeon</a></h3>
          <ul>
            <li><a href="index.html" class="nav-menu">HOME</a></li>
            <li><a href="intoduction.html" class="nav-menu">Introduction</a></li>
            <li><a href="art-work/" class="nav-menu">Artwork</a></li>
            <li class="dropdown">
              <a href="film.html" class="nav-menu">FILM<span class="triangle">▼</span></a>
              <div class="dropdown-content">
                <a href="mejfk-youicn/index.html">Me:JFK, You:ICN</a>
                <a href="haenamCabbage.html">Haenam Cabbage</a>
                <a href="suddenlyHome.html">Suddenly, Home</a>
                <a href="caseOfR.html">Case of 'r'</a>
              </div>
            </li>
          </ul>
        </nav>
      `;


      const filmRelatedPages = [
        'film.html',
        'mejfk-youicn/index.html',
        'haenamCabbage.html',
        'suddenlyHome.html',
        'caseOfR.html'
      ];

      const currentPage = window.location.pathname.split('/').slice(-2).join('/'); // 폴더/파일명 모두 포함
      const simplePage = window.location.pathname.split('/').pop(); // 파일명만 (예: caseOfR.html)

      // nav-menu 링크에 active 클래스 추가
      const links = shadow.querySelectorAll('.nav-menu');
      links.forEach(link => {
        const href = link.getAttribute('href');
  
        // FILM 관련 페이지면 film 메뉴에 active 부여
        if (href === 'film.html' && (filmRelatedPages.includes(currentPage) || filmRelatedPages.includes(simplePage))) {
          link.classList.add('active');
        }

        // 일반 페이지 (home, intro 등)
        if (href === simplePage) {
          link.classList.add('active');
        }
      });
      
  }
}

customElements.define('nav-bar', NavBar);