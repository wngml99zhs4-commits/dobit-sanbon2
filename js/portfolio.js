// 두빗살롱 산본2호점 - 시술 사진 (사진 목록은 portfolio-data.js)

(function(){
  var script = document.currentScript.src;
  var imageBase = new URL('../images/portfolio/', script).href;
  var siteRoot = new URL('../', script).href;
  var lang = (document.documentElement.lang || 'ko').slice(0,2);
  var pagePrefix = lang === 'ko' ? '' : lang + '/';

  var DESIGNERS = {
    '유아': {id:'yua', en:'Yua', ja:'ユア', zh:'Yua'},
    '서지': {id:'seoji', en:'Seoji', ja:'ソジ', zh:'Seoji'},
    '지원': {id:'jiwon', en:'Jiwon', ja:'ジウォン', zh:'Jiwon'},
    '윤슬': {id:'yoonseul', en:'Yoonseul', ja:'ユンスル', zh:'Yoonseul'},
    '아키': {id:'aki', en:'Aki', ja:'アキ', zh:'Aki'},
    '주희': {id:'juhee', en:'Juhee', ja:'ジュヒ', zh:'Juhee'}
  };

  var CATEGORIES = {
    '펌': {slug:'perm', en:'Perm', ja:'パーマ', zh:'烫发'},
    '컷': {slug:'cut', en:'Cut', ja:'カット', zh:'剪发'},
    '염색': {slug:'color', en:'Color', ja:'カラー', zh:'染发'},
    '클리닉': {slug:'clinic', en:'Clinic', ja:'トリートメント', zh:'护理'}
  };
  var CATEGORY_ORDER = ['펌','컷','염색','클리닉'];

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
    '단발레이어드컷': ['Short Layered Cut','ボブレイヤードカット','短发层次剪']
  };

  var TEXT = {
    ko: {view:'시술 사진 보기', all:'전체', title:function(n){return n+' 시술 사진';}, close:'닫기', prev:'이전 사진', next:'다음 사진', open:function(s){return s+' 크게 보기';}},
    en: {view:'View Portfolio', all:'All', title:function(n){return n+'’s work';}, close:'Close', prev:'Previous photo', next:'Next photo', open:function(s){return 'View '+s;}},
    ja: {view:'施術写真を見る', all:'すべて', title:function(n){return n+'の施術写真';}, close:'閉じる', prev:'前の写真', next:'次の写真', open:function(s){return s+'を拡大';}},
    zh: {view:'查看作品', all:'全部', title:function(n){return n+' 的作品';}, close:'关闭', prev:'上一张', next:'下一张', open:function(s){return '查看 '+s;}}
  };
  var T = TEXT[lang] || TEXT.ko;
  var LANG_INDEX = {en:0, ja:1, zh:2};

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

  function el(tag, cls, attrs){
    var e = document.createElement(tag);
    if(cls) e.className = cls;
    for(var k in attrs||{}) e.setAttribute(k, attrs[k]);
    return e;
  }

  function thumb(p, list, i){
    var b = el('button','pfg-thumb',{type:'button','aria-label':T.open(altText(p))});
    b.appendChild(el('img','',{src:imgSrc(p), alt:altText(p), width:600, height:600, loading:'lazy'}));
    b.addEventListener('click', function(){ openView(list, i, b); });
    return b;
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
    if(modal.hidden) document.documentElement.classList.remove('pf-open');
    if(viewOpener) viewOpener.focus();
  }

  // 디자이너 페이지: 디자이너별 사진 창
  var modal = el('div','pfg',{hidden:'',role:'dialog','aria-modal':'true','aria-labelledby':'pfgTitle'});
  var backdrop = el('div','pfg-backdrop');
  var dialog = el('div','pfg-dialog');
  var top = el('div','pfg-top');
  var title = el('h2','pfg-title',{id:'pfgTitle'});
  var close = el('button','pfg-close',{type:'button','aria-label':T.close});
  close.textContent = '×';
  var tabs = el('div','pfg-tabs',{role:'tablist'});
  var grid = el('div','pfg-grid');
  top.appendChild(title); top.appendChild(close);
  dialog.appendChild(top); dialog.appendChild(tabs); dialog.appendChild(grid);
  modal.appendChild(backdrop); modal.appendChild(dialog);

  var current = [], currentCat = null, modalOpener = null;

  function inCat(list, c){ return list.filter(function(p){ return p.cat.indexOf(c) !== -1; }); }

  function renderTabs(){
    tabs.innerHTML = '';
    CATEGORY_ORDER.forEach(function(c){
      var n = inCat(current, c).length;
      if(!n) return;
      var b = el('button','pfg-tab',{type:'button',role:'tab','aria-selected':String(c===currentCat)});
      b.textContent = categoryName(c) + ' ' + n;
      b.addEventListener('click', function(){ currentCat = c; renderTabs(); renderGrid(); });
      tabs.appendChild(b);
    });
  }

  function renderGrid(){
    grid.innerHTML = '';
    grid.scrollTop = 0;
    var list = inCat(current, currentCat);
    list.forEach(function(p, i){
      var item = el('div','pfg-item');
      item.appendChild(thumb(p, list, i));
      var name = el('div','pfg-name');
      name.textContent = serviceName(p);
      item.appendChild(name);
      var tags = el('div','pfg-tags');
      p.cat.forEach(function(c){
        if(!CATEGORIES[c]) return;
        var a = el('a','pfg-tag',{href:categoryLink(c)});
        a.textContent = categoryName(c);
        tags.appendChild(a);
      });
      item.appendChild(tags);
      grid.appendChild(item);
    });
  }

  function openModal(list, name, opener){
    current = list;
    currentCat = CATEGORY_ORDER.filter(function(c){ return inCat(list,c).length; })[0];
    modalOpener = opener;
    title.textContent = T.title(name);
    renderTabs(); renderGrid();
    modal.hidden = false;
    document.documentElement.classList.add('pf-open');
    close.focus();
  }
  function closeModal(){
    modal.hidden = true;
    document.documentElement.classList.remove('pf-open');
    if(modalOpener) modalOpener.focus();
  }

  // 디자이너 카드에 버튼 넣기: 사진이 있는 디자이너만
  var hasCards = false;
  Object.keys(DESIGNERS).forEach(function(k){
    var card = document.getElementById(DESIGNERS[k].id);
    if(!card || !card.classList.contains('designer-card')) return;
    var list = photos.filter(function(p){ return p.designer === k; });
    if(!list.length) return;
    hasCards = true;
    var b = el('button','designer-pf-btn',{type:'button'});
    b.textContent = T.view;
    b.addEventListener('click', function(){ openModal(list, designerName(list[0]), b); });
    var ig = card.querySelector('.designer-ig');
    ig.parentNode.insertBefore(b, ig);
  });

  // 시술 페이지: 카테고리 갤러리 + 디자이너 필터
  var galleries = document.querySelectorAll('.pfc');
  [].forEach.call(galleries, function(box){
    var cat = box.getAttribute('data-cat');
    var all = inCat(photos, cat);
    if(!all.length) return;
    var section = box.closest('section');
    if(section) section.hidden = false;

    var names = [];
    all.forEach(function(p){ if(names.indexOf(p.designer) === -1) names.push(p.designer); });

    var filter = el('div','pfc-filter',{role:'group'});
    var cards = el('div','pfc-grid');
    var buttons = [];

    function render(who){
      cards.innerHTML = '';
      var list = who ? all.filter(function(p){ return p.designer === who; }) : all;
      list.forEach(function(p, i){
        var fig = el('figure','pfc-card');
        fig.appendChild(thumb(p, list, i));
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

  if(hasCards) document.body.appendChild(modal);
  if(hasCards || galleries.length) document.body.appendChild(view);

  close.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  viewClose.addEventListener('click', closeView);
  prev.addEventListener('click', function(){ move(-1); });
  next.addEventListener('click', function(){ move(1); });
  view.addEventListener('click', function(e){ if(e.target === view) closeView(); });

  // 키보드: Esc 닫기, 좌우 넘기기, Tab 은 창 안에서만 이동
  document.addEventListener('keydown', function(e){
    var active = !view.hidden ? view : (!modal.hidden ? modal : null);
    if(!active) return;
    if(e.key === 'Escape'){ if(active === view) closeView(); else closeModal(); return; }
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
