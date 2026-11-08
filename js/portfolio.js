// 두빗살롱 산본2호점 - 디자이너 시술 사진 (디자이너 페이지 전용)

(function(){
  var buttons = document.querySelectorAll('.designer-pf-btn');
  if(!buttons.length) return;

  var base = new URL('../images/portfolio/', document.currentScript.src).href;

  // 지원 디자이너의 both 폴더 사진은 펌·컷 탭에서 같은 파일을 함께 쓴다
  var jiwonBoth = [['both/both-01.webp',941,1672],['both/both-02.webp',1200,2133],['both/both-03.webp',1200,2133]];
  var DATA = {
    seoji: {
      name: {ko:'서지', en:'Seoji', ja:'ソジ', zh:'Seoji'},
      perm: [['perm/perm-01.webp',1142,1484],['perm/perm-02.webp',1004,1360],['perm/perm-03.webp',1010,1491],['perm/perm-04.webp',1179,1530],['perm/perm-05.webp',1119,1695],['perm/perm-06.webp',966,1449]],
      cut: []
    },
    yua: {
      name: {ko:'유아', en:'Yua', ja:'ユア', zh:'Yua'},
      perm: [['perm/perm-01.webp',1152,1440],['perm/perm-02.webp',935,1440],['perm/perm-03.webp',861,1440],['perm/perm-04.webp',823,1440],['perm/perm-05.webp',863,1440],['perm/perm-06.webp',935,1440],['perm/perm-07.webp',1152,1440],['perm/perm-08.webp',868,1440],['perm/perm-09.webp',874,1440],['perm/perm-10.webp',1018,1440],['perm/perm-11.webp',862,1440],['perm/perm-12.webp',910,1440],['perm/perm-13.webp',834,1440],['perm/perm-14.webp',766,1440],['perm/perm-15.webp',839,1440],['perm/perm-16.webp',1200,1200],['perm/perm-17.webp',1152,1440]],
      cut: [['cut/cut-01.webp',908,1440],['cut/cut-02.webp',862,1440],['cut/cut-03.webp',905,1440],['cut/cut-04.webp',819,1440],['cut/cut-05.webp',930,1440],['cut/cut-06.webp',987,1440]]
    },
    yoonseul: {
      name: {ko:'윤슬', en:'Yoonseul', ja:'ユンスル', zh:'Yoonseul'},
      perm: [],
      cut: [['cut/cut-01.webp',1034,1353]]
    },
    jiwon: {
      name: {ko:'지원', en:'Jiwon', ja:'ジウォン', zh:'Jiwon'},
      perm: [['perm/perm-01.webp',1200,2133],['perm/perm-02.webp',1200,2133]].concat(jiwonBoth),
      cut: [['cut/cut-01.webp',1200,2133],['cut/cut-02.webp',1200,2133]].concat(jiwonBoth)
    }
  };

  var TEXT = {
    ko: {perm:'펌', cut:'컷', title:function(n){return n+' 시술 사진';}, alt:function(n,k){return n+' '+k+' 시술';}, close:'닫기', prev:'이전 사진', next:'다음 사진', open:function(i){return i+'번째 사진 크게 보기';}},
    en: {perm:'Perm', cut:'Cut', title:function(n){return n+'’s work';}, alt:function(n,k){return n+' '+k.toLowerCase()+' service';}, close:'Close', prev:'Previous photo', next:'Next photo', open:function(i){return 'View photo '+i;}},
    ja: {perm:'パーマ', cut:'カット', title:function(n){return n+'の施術写真';}, alt:function(n,k){return n+' '+k+'施術';}, close:'閉じる', prev:'前の写真', next:'次の写真', open:function(i){return i+'枚目の写真を拡大';}},
    zh: {perm:'烫发', cut:'剪发', title:function(n){return n+' 的作品';}, alt:function(n,k){return n+' '+k+'作品';}, close:'关闭', prev:'上一张', next:'下一张', open:function(i){return '查看第'+i+'张照片';}}
  };
  var lang = (document.documentElement.lang || 'ko').slice(0,2);
  var T = TEXT[lang] || TEXT.ko;

  function el(tag, cls, attrs){
    var e = document.createElement(tag);
    if(cls) e.className = cls;
    for(var k in attrs||{}) e.setAttribute(k, attrs[k]);
    return e;
  }

  // 목록 창
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

  // 크게 보기 창
  var view = el('div','pfg-view',{hidden:'',role:'dialog','aria-modal':'true'});
  var big = el('img','pfg-big',{alt:''});
  var count = el('div','pfg-count',{'aria-live':'polite'});
  var viewClose = el('button','pfg-view-close',{type:'button','aria-label':T.close});
  viewClose.textContent = '×';
  var prev = el('button','pfg-nav pfg-prev',{type:'button','aria-label':T.prev});
  prev.textContent = '‹';
  var next = el('button','pfg-nav pfg-next',{type:'button','aria-label':T.next});
  next.textContent = '›';
  [big,count,viewClose,prev,next].forEach(function(n){ view.appendChild(n); });

  document.body.appendChild(modal);
  document.body.appendChild(view);

  var current = null, kind = null, index = 0, opener = null, thumbOpener = null;

  function src(item){ return base + current.id + '/' + item[0]; }
  function list(){ return current.data[kind]; }
  function altText(){ return T.alt(current.data.name[lang] || current.data.name.ko, T[kind]); }

  function renderTabs(){
    tabs.innerHTML = '';
    ['perm','cut'].forEach(function(k){
      if(!current.data[k].length) return;
      var b = el('button','pfg-tab',{type:'button',role:'tab','aria-selected':String(k===kind)});
      b.textContent = T[k] + ' ' + current.data[k].length;
      b.addEventListener('click', function(){ kind = k; renderTabs(); renderGrid(); });
      tabs.appendChild(b);
    });
  }

  function renderGrid(){
    grid.innerHTML = '';
    grid.scrollTop = 0;
    list().forEach(function(item, i){
      var b = el('button','pfg-thumb',{type:'button','aria-label':T.open(i+1)});
      var img = el('img','',{src:src(item), alt:altText(), width:item[1], height:item[2], loading:'lazy'});
      b.appendChild(img);
      b.addEventListener('click', function(){ thumbOpener = b; openView(i); });
      grid.appendChild(b);
    });
  }

  function open(id, btn){
    current = {id:id, data:DATA[id]};
    kind = current.data.perm.length ? 'perm' : 'cut';
    opener = btn;
    title.textContent = T.title(current.data.name[lang] || current.data.name.ko);
    renderTabs(); renderGrid();
    modal.hidden = false;
    document.documentElement.classList.add('pf-open');
    close.focus();
  }

  function closeModal(){
    modal.hidden = true;
    document.documentElement.classList.remove('pf-open');
    if(opener) opener.focus();
  }

  function show(){
    var l = list(), item = l[index];
    big.src = src(item);
    big.alt = altText();
    count.textContent = (index+1) + ' / ' + l.length;
    var single = l.length < 2;
    prev.hidden = single; next.hidden = single;
    if(!single){ new Image().src = src(l[(index+1)%l.length]); }
  }
  function move(d){
    var n = list().length;
    if(n < 2) return;
    index = (index + d + n) % n;
    show();
  }
  function openView(i){ index = i; show(); view.hidden = false; viewClose.focus(); }
  function closeView(){ view.hidden = true; big.removeAttribute('src'); if(thumbOpener) thumbOpener.focus(); }

  buttons.forEach(function(b){
    b.addEventListener('click', function(){ open(b.getAttribute('data-designer'), b); });
  });
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
      var f = [].filter.call(active.querySelectorAll('button'), function(n){ return !n.hidden; });
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
