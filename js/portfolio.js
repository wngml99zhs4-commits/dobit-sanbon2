// 두빗살롱 산본2호점 - 시술 사진 (사진 목록은 portfolio-data.js)

(function(){
  var script = document.currentScript.src;
  var imageBase = new URL('../images/portfolio/', script).href;
  var siteRoot = new URL('../', script).href;
  var lang = (document.documentElement.lang || 'ko').slice(0,2);
  var pagePrefix = lang === 'ko' ? '' : lang + '/';

  // 표시 이름: 이름 + 직급 (디자이너 소개 카드와 같은 직급)
  var DESIGNERS = {
    '유아': {id:'yua', ko:'유아 부원장', en:'Yua (Vice Director)', ja:'ユア 副院長', zh:'Yua 副院长'},
    '서지': {id:'seoji', ko:'서지 디자이너', en:'Seoji (Designer)', ja:'ソジ デザイナー', zh:'Seoji 发型师'},
    '지원': {id:'jiwon', ko:'지원 디자이너', en:'Jiwon (Designer)', ja:'ジウォン デザイナー', zh:'Jiwon 发型师'},
    '윤슬': {id:'yoonseul', ko:'윤슬 수석팀장', en:'Yoonseul (Head Team Leader)', ja:'ユンスル チーフ', zh:'Yoonseul 首席组长'},
    '아키': {id:'aki', ko:'아키 부원장', en:'Aki (Vice Director)', ja:'アキ 副院長', zh:'Aki 副院长'},
    '주희': {id:'juhee', ko:'주희 원장', en:'Juhee (Director)', ja:'ジュヒ 院長', zh:'Juhee 院长'}
  };

  var CATEGORIES = {
    '펌': {slug:'perm', en:'Perm', ja:'パーマ', zh:'烫发'},
    '컷': {slug:'cut', en:'Cut', ja:'カット', zh:'剪发'},
    '염색': {slug:'color', en:'Color', ja:'カラー', zh:'染发'},
    '클리닉': {slug:'clinic', en:'Clinic', ja:'トリートメント', zh:'护理'}
  };

  // 시술명 번역표: 여기에 없는 시술명은 한국어로 표시한다
  var SERVICES = {
    '구름펌': ['Cloud Perm','クラウドパーマ','云朵烫'],
    '굵은히피펌': ['Bold Hippie Perm','太めヒッピーパーマ','粗卷嬉皮烫'],
    '단발빈티지펌': ['Short Vintage Perm','ボブヴィンテージパーマ','短发复古烫'],
    '단발젤리펌': ['Short Jelly Perm','ボブゼリーパーマ','短发果冻烫'],
    '슬릭펌': ['Sleek Perm','スリークパーマ','Sleek烫'],
    '젤리펌': ['Jelly Perm','ゼリーパーマ','果冻烫'],
    '허쉬레이어드펌': ['Hush Layered Perm','ハッシュレイヤードパーマ','Hush层次烫'],
    '허쉬펌': ['Hush Perm','ハッシュパーマ','Hush烫'],
    '슬릭댄디컷': ['Sleek Dandy Cut','スリークダンディカット','Sleek绅士剪'],
    '허쉬레이어드컷': ['Hush Layered Cut','ハッシュレイヤードカット','Hush层次剪'],
    '허쉬컷': ['Hush Cut','ハッシュカット','Hush剪'],
    '그레이스펌': ['Grace Perm','グレースパーマ','Grace烫'],
    '빌드펌': ['Build Perm','ビルドパーマ','Build烫'],
    '슬릭레이어드펌': ['Sleek Layered Perm','スリークレイヤードパーマ','Sleek层次烫'],
    '엘리자벳펌': ['Elizabeth Perm','エリザベスパーマ','Elizabeth烫'],
    '빈티지펌': ['Vintage Perm','ヴィンテージパーマ','复古烫'],
    '슬릭리프펌': ['Sleek Leaf Perm','スリークリーフパーマ','Sleek叶片烫'],
    '필러스컷': ['Pillars Cut','ピラーズカット','Pillars剪'],
    '숏가일': ['Short Guile','ショートガイル','Short Guile'],
    '세미리프': ['Semi Leaf','セミリーフ','Semi Leaf'],
    '슬릭댄디': ['Sleek Dandy','スリークダンディ','Sleek Dandy'],
    '단발레이어드컷': ['Short Layered Cut','ボブレイヤードカット','短发层次剪'],
    '윈드펌': ['Wind Perm','ウィンドパーマ','Wind烫'],
    '레이어드컷': ['Layered Cut','レイヤードカット','层次剪'],
    '중단발레이어드': ['Medium Layered','ミディアムレイヤード','中长发层次'],
    '중단발레이어드컷': ['Medium Layered Cut','ミディアムレイヤードカット','中长发层次剪'],
    '레이어드C컬펌': ['Layered C-Curl Perm','レイヤードCカールパーマ','层次C卷烫'],
    '디자인컬러': ['Design Color','デザインカラー','设计染发'],
    '솜브레염색': ['Sombré Color','ソンブレカラー','Sombré染发'],
    '애쉬핑크': ['Ash Pink','アッシュピンク','灰粉色']
  };

  var TEXT = {
    ko: {photos:'시술 사진', more:'더보기 ›', title:function(n){return n+' 시술 사진';}, all:'전체', close:'닫기', prev:'이전 사진', next:'다음 사진', open:function(s){return s+' 크게 보기';}},
    en: {photos:'PORTFOLIO', more:'See all ›', title:function(n){return n+'’s work';}, all:'All', close:'Close', prev:'Previous photo', next:'Next photo', open:function(s){return 'View '+s;}},
    ja: {photos:'施術写真', more:'すべて見る ›', title:function(n){return n+'の施術写真';}, all:'すべて', close:'閉じる', prev:'前の写真', next:'次の写真', open:function(s){return s+'を拡大';}},
    zh: {photos:'作品', more:'查看全部 ›', title:function(n){return n+' 的作品';}, all:'全部', close:'关闭', prev:'上一张', next:'下一张', open:function(s){return '查看 '+s;}}
  };
  var T = TEXT[lang] || TEXT.ko;
  var LANG_INDEX = {en:0, ja:1, zh:2};
  var ROW_MAX = 8;

  var photos = (window.PORTFOLIO || []).filter(function(p){
    return p.img && DESIGNERS[p.designer] && p.service && p.cat && p.cat.length;
  });

  function designerName(p){ var d = DESIGNERS[p.designer]; return d[lang] || p.designer; }
  function serviceName(p){
    var row = SERVICES[p.service], i = LANG_INDEX[lang];
    return (row && i !== undefined) ? row[i] : p.service;
  }
  function categoryName(c){ return CATEGORIES[c][lang] || c; }
  function imgSrc(p){ return imageBase + p.img; }
  function altText(p){ return designerName(p) + ' - ' + serviceName(p); }
  function designerLink(p){ return siteRoot + pagePrefix + 'designers/#' + DESIGNERS[p.designer].id; }
  function categoryLink(c){ return siteRoot + pagePrefix + CATEGORIES[c].slug + '/'; }
  function inCat(list, c){ return list.filter(function(p){ return p.cat.indexOf(c) !== -1; }); }

  function el(tag, cls, attrs){
    var e = document.createElement(tag);
    if(cls) e.className = cls;
    for(var k in attrs||{}) e.setAttribute(k, attrs[k]);
    return e;
  }

  function thumb(p, list, i){
    var b = el('button','pfg-thumb',{type:'button','aria-label':T.open(altText(p))});
    b.appendChild(el('img','',{src:imgSrc(p), alt:altText(p), width:600, height:750, loading:'lazy', draggable:'false'}));
    b.addEventListener('click', function(){ openView(list, i, b); });
    return b;
  }

  // 사진 + 시술명 + 카테고리 태그
  function item(p, list, i){
    var box = el('div','pfg-item');
    box.appendChild(thumb(p, list, i));
    var name = el('div','pfg-name');
    name.textContent = serviceName(p);
    box.appendChild(name);
    var tags = el('div','pfg-tags');
    p.cat.forEach(function(c){
      if(!CATEGORIES[c]) return;
      var a = el('a','pfg-tag',{href:categoryLink(c)});
      a.textContent = categoryName(c);
      tags.appendChild(a);
    });
    box.appendChild(tags);
    return box;
  }

  // 크게 보기 창 (디자이너 페이지·시술 페이지 공통)
  var view = el('div','pfg-view',{hidden:'',role:'dialog','aria-modal':'true'});
  var big = el('img','pfg-big',{alt:''});
  var caption = el('div','pfg-cap');
  var count = el('div','pfg-count',{'aria-live':'polite'});
  var viewClose = el('button','pfg-view-close',{type:'button','aria-label':T.close});
  viewClose.textContent = '×';
  var prev = el('button','pfg-nav pfg-prev',{type:'button','aria-label':T.prev});
  prev.textContent = '‹';
  var next = el('button','pfg-nav pfg-next',{type:'button','aria-label':T.next});
  next.textContent = '›';
  [big,caption,count,viewClose,prev,next].forEach(function(n){ view.appendChild(n); });

  var viewList = [], viewIndex = 0, viewOpener = null;

  function show(){
    var p = viewList[viewIndex];
    big.src = imgSrc(p);
    big.alt = altText(p);
    caption.textContent = serviceName(p) + ' · ' + designerName(p);
    count.textContent = (viewIndex+1) + ' / ' + viewList.length;
    var single = viewList.length < 2;
    prev.hidden = single; next.hidden = single;
    if(!single){ new Image().src = imgSrc(viewList[(viewIndex+1)%viewList.length]); }
  }
  function move(d){
    var n = viewList.length;
    if(n < 2) return;
    viewIndex = (viewIndex + d + n) % n;
    show();
  }
  function openView(list, i, opener){
    viewList = list; viewIndex = i; viewOpener = opener;
    show();
    view.hidden = false;
    document.documentElement.classList.add('pf-open');
    viewClose.focus();
  }
  function closeView(){
    view.hidden = true;
    big.removeAttribute('src');
    if(all.hidden) document.documentElement.classList.remove('pf-open');
    if(viewOpener) viewOpener.focus();
  }

  // 디자이너 전체 사진 창 (더보기)
  var all = el('div','pfa',{hidden:'',role:'dialog','aria-modal':'true','aria-labelledby':'pfaTitle'});
  var allTop = el('div','pfa-top');
  var allTitle = el('h2','pfa-title',{id:'pfaTitle'});
  var allClose = el('button','pfa-close',{type:'button','aria-label':T.close});
  allClose.textContent = '×';
  var allBody = el('div','pfa-body');
  var allGrid = el('div','pfa-grid');
  allTop.appendChild(allTitle); allTop.appendChild(allClose);
  allBody.appendChild(allGrid);
  all.appendChild(allTop); all.appendChild(allBody);
  var allOpener = null;

  function openAll(list, opener){
    allOpener = opener;
    allTitle.textContent = T.title(designerName(list[0]));
    var n = el('b');
    n.textContent = list.length;
    allTitle.appendChild(n);
    allGrid.innerHTML = '';
    list.forEach(function(p, i){ allGrid.appendChild(item(p, list, i)); });
    allBody.scrollTop = 0;
    all.hidden = false;
    document.documentElement.classList.add('pf-open');
    allClose.focus();
  }
  function closeAll(){
    all.hidden = true;
    document.documentElement.classList.remove('pf-open');
    if(allOpener) allOpener.focus();
  }

  // 가로 줄: 마우스로 끌어서 넘기기, PC 좌우 화살표
  function makeRow(row, wrap){
    var left = el('button','designer-pf-arrow prev',{type:'button','aria-label':T.prev});
    left.textContent = '‹';
    var right = el('button','designer-pf-arrow next',{type:'button','aria-label':T.next});
    right.textContent = '›';
    wrap.appendChild(left); wrap.appendChild(right);

    function step(){ var f = row.firstElementChild; return f ? f.getBoundingClientRect().width + 8 : row.clientWidth; }
    function update(){
      left.hidden = row.scrollLeft <= 2;
      right.hidden = row.scrollLeft + row.clientWidth >= row.scrollWidth - 2;
    }
    left.addEventListener('click', function(){ row.scrollBy({left:-step()*2, behavior:'smooth'}); });
    right.addEventListener('click', function(){ row.scrollBy({left:step()*2, behavior:'smooth'}); });
    row.addEventListener('scroll', update, {passive:true});
    window.addEventListener('resize', update);
    update();

    var drag = null, moved = false;
    row.addEventListener('pointerdown', function(e){
      if(e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = {x:e.clientX, left:row.scrollLeft};
      moved = false;
    });
    window.addEventListener('pointermove', function(e){
      if(!drag) return;
      var dx = e.clientX - drag.x;
      if(!moved && Math.abs(dx) > 5){ moved = true; row.classList.add('dragging'); }
      if(moved) row.scrollLeft = drag.left - dx;
    });
    window.addEventListener('pointerup', function(){
      if(!drag) return;
      drag = null;
      row.classList.remove('dragging');
    });
    // 끌어서 넘긴 뒤에는 사진이 열리지 않게
    row.addEventListener('click', function(e){
      if(moved){ e.stopPropagation(); e.preventDefault(); moved = false; }
    }, true);
  }

  // 디자이너 페이지: 소개 아래에 시술 사진 가로 한 줄 (최대 8장) + 더보기
  Object.keys(DESIGNERS).forEach(function(k){
    var card = document.getElementById(DESIGNERS[k].id);
    if(!card || !card.classList.contains('designer-card')) return;
    var list = photos.filter(function(p){ return p.designer === k; });
    if(!list.length) return;

    var box = el('div','designer-pf');
    var head = el('div','designer-pf-head');
    var title = el('div','designer-pf-title');
    title.textContent = T.photos;
    var n = el('b');
    n.textContent = list.length;
    title.appendChild(n);
    head.appendChild(title);
    if(list.length > 1){
      var more = el('button','designer-pf-more',{type:'button'});
      more.textContent = T.more;
      more.addEventListener('click', function(){ openAll(list, more); });
      head.appendChild(more);
    }
    var wrap = el('div','designer-pf-rowwrap');
    var row = el('div','designer-pf-row');
    list.slice(0, ROW_MAX).forEach(function(p, i){ row.appendChild(item(p, list, i)); });
    wrap.appendChild(row);
    box.appendChild(head);
    box.appendChild(wrap);
    card.appendChild(box);
    makeRow(row, wrap);
  });

  // 시술 페이지: 카테고리 갤러리 + 디자이너 필터
  [].forEach.call(document.querySelectorAll('.pfc'), function(box){
    var cat = box.getAttribute('data-cat');
    var list = inCat(photos, cat);
    if(!list.length) return;
    var section = box.closest('section');
    if(section) section.hidden = false;

    var names = [];
    list.forEach(function(p){ if(names.indexOf(p.designer) === -1) names.push(p.designer); });

    var filter = el('div','pfc-filter',{role:'group'});
    var cards = el('div','pfc-grid');
    var buttons = [];

    function render(who){
      cards.innerHTML = '';
      var shown = who ? list.filter(function(p){ return p.designer === who; }) : list;
      shown.forEach(function(p, i){
        var fig = el('figure','pfc-card');
        fig.appendChild(thumb(p, shown, i));
        var cap = el('figcaption','pfc-cap');
        cap.appendChild(document.createTextNode(serviceName(p) + ' · '));
        var a = el('a','',{href:designerLink(p)});
        a.textContent = designerName(p);
        cap.appendChild(a);
        fig.appendChild(cap);
        cards.appendChild(fig);
      });
    }
    function addButton(label, who){
      var b = el('button','pfc-btn',{type:'button','aria-pressed':String(!who)});
      b.textContent = label;
      b.addEventListener('click', function(){
        buttons.forEach(function(x){ x.setAttribute('aria-pressed', String(x === b)); });
        render(who);
      });
      buttons.push(b);
      filter.appendChild(b);
    }
    addButton(T.all, null);
    names.forEach(function(n){ addButton(DESIGNERS[n][lang] || n, n); });
    box.appendChild(filter);
    box.appendChild(cards);
    render(null);
  });

  document.body.appendChild(all);
  document.body.appendChild(view);
  allClose.addEventListener('click', closeAll);
  viewClose.addEventListener('click', closeView);
  prev.addEventListener('click', function(){ move(-1); });
  next.addEventListener('click', function(){ move(1); });
  view.addEventListener('click', function(e){ if(e.target === view) closeView(); });

  // 키보드: Esc 닫기, 좌우 넘기기, Tab 은 창 안에서만 이동
  document.addEventListener('keydown', function(e){
    var active = !view.hidden ? view : (!all.hidden ? all : null);
    if(!active) return;
    if(e.key === 'Escape'){ if(active === view) closeView(); else closeAll(); return; }
    if(active === view && e.key === 'ArrowLeft') move(-1);
    if(active === view && e.key === 'ArrowRight') move(1);
    if(e.key === 'Tab'){
      var f = [].filter.call(active.querySelectorAll('button,a'), function(n){ return !n.hidden; });
      if(!f.length) return;
      var first = f[0], last = f[f.length-1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  });

  // 손가락으로 좌우 넘기기
  var startX = null;
  view.addEventListener('touchstart', function(e){ startX = e.touches[0].clientX; }, {passive:true});
  view.addEventListener('touchend', function(e){
    if(startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    startX = null;
    if(Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
  });
})();
