// 두빗살롱 산본2호점 - 시술 사진 목록 (디자이너 페이지와 시술 페이지가 함께 쓰는 단 하나의 목록)
//
// 새 사진 추가: 사진을 images/portfolio/ 아래에 넣고, 아래 목록에 한 줄만 추가한다.
//   img      images/portfolio/ 뒤의 경로
//   designer 디자이너 이름: 유아, 서지, 지원, 윤슬, 아키, 주희
//   service  시술명
//   cat      컷, 펌, 염색, 클리닉 중 하나 이상 (예: ['컷','염색'])
//   desc     설명 (선택)

window.PORTFOLIO = [
  {img:'yua/perm/perm-01.webp', designer:'유아', service:'구름펌', cat:['펌']},
  {img:'yua/perm/perm-02.webp', designer:'유아', service:'구름펌', cat:['펌']},
  {img:'yua/perm/perm-03.webp', designer:'유아', service:'굵은히피펌', cat:['펌']},
  {img:'yua/perm/perm-04.webp', designer:'유아', service:'단발빈티지펌', cat:['펌']},
  {img:'yua/perm/perm-05.webp', designer:'유아', service:'단발젤리펌', cat:['펌']},
  {img:'yua/perm/perm-06.webp', designer:'유아', service:'단발젤리펌', cat:['펌']},
  {img:'yua/perm/perm-07.webp', designer:'유아', service:'슬릭펌', cat:['펌']},
  {img:'yua/perm/perm-08.webp', designer:'유아', service:'젤리펌', cat:['펌']},
  {img:'yua/perm/perm-09.webp', designer:'유아', service:'젤리펌', cat:['펌']},
  {img:'yua/perm/perm-10.webp', designer:'유아', service:'허쉬레이어드펌', cat:['펌']},
  {img:'yua/perm/perm-11.webp', designer:'유아', service:'허쉬펌', cat:['펌']},
  {img:'yua/perm/perm-12.webp', designer:'유아', service:'허쉬펌', cat:['펌']},
  {img:'yua/perm/perm-13.webp', designer:'유아', service:'허쉬펌', cat:['펌']},
  {img:'yua/perm/perm-14.webp', designer:'유아', service:'허쉬펌', cat:['펌']},
  {img:'yua/perm/perm-15.webp', designer:'유아', service:'허쉬펌', cat:['펌']},
  {img:'yua/perm/perm-16.webp', designer:'유아', service:'허쉬펌', cat:['펌']},
  {img:'yua/perm/perm-17.webp', designer:'유아', service:'허쉬펌', cat:['펌']},
  {img:'yua/cut/cut-01.webp', designer:'유아', service:'슬릭댄디컷', cat:['컷']},
  {img:'yua/cut/cut-02.webp', designer:'유아', service:'허쉬레이어드컷', cat:['컷']},
  {img:'yua/cut/cut-03.webp', designer:'유아', service:'허쉬컷', cat:['컷']},
  {img:'yua/cut/cut-04.webp', designer:'유아', service:'허쉬컷', cat:['컷']},
  {img:'yua/cut/cut-05.webp', designer:'유아', service:'허쉬컷', cat:['컷']},
  {img:'yua/cut/cut-06.webp', designer:'유아', service:'허쉬컷', cat:['컷']},
  {img:'seoji/perm/perm-01.webp', designer:'서지', service:'그레이스펌', cat:['펌']},
  {img:'seoji/perm/perm-02.webp', designer:'서지', service:'빌드펌', cat:['펌']},
  {img:'seoji/perm/perm-03.webp', designer:'서지', service:'슬릭레이어드펌', cat:['펌']},
  {img:'seoji/perm/perm-04.webp', designer:'서지', service:'슬릭펌', cat:['펌']},
  {img:'seoji/perm/perm-05.webp', designer:'서지', service:'엘리자벳펌', cat:['펌']},
  {img:'seoji/perm/perm-06.webp', designer:'서지', service:'허쉬레이어드펌', cat:['펌']},
  {img:'seoji/perm/perm-07.webp', designer:'서지', service:'굵은히피펌', cat:['펌']},
  {img:'seoji/perm/perm-08.webp', designer:'서지', service:'단발젤리펌', cat:['펌']},
  {img:'seoji/perm/perm-09.webp', designer:'서지', service:'윈드펌', cat:['펌']},
  {img:'seoji/perm/perm-10.webp', designer:'서지', service:'허쉬펌', cat:['펌']},
  {img:'seoji/cut/cut-01.webp', designer:'서지', service:'레이어드컷', cat:['컷']},
  {img:'seoji/cut/cut-02.webp', designer:'서지', service:'중단발레이어드', cat:['컷']},
  {img:'jiwon/perm/perm-01.webp', designer:'지원', service:'빈티지펌', cat:['펌']},
  {img:'jiwon/perm/perm-02.webp', designer:'지원', service:'슬릭리프펌', cat:['펌']},
  {img:'jiwon/cut/cut-01.webp', designer:'지원', service:'필러스컷', cat:['컷']},
  {img:'jiwon/cut/cut-02.webp', designer:'지원', service:'슬릭댄디컷', cat:['컷']},
  {img:'jiwon/both/both-01.webp', designer:'지원', service:'숏가일', cat:['컷','펌']},
  {img:'jiwon/both/both-02.webp', designer:'지원', service:'세미리프', cat:['컷','펌']},
  {img:'jiwon/both/both-03.webp', designer:'지원', service:'슬릭댄디', cat:['컷','펌']},
  {img:'yoonseul/cut/cut-01.webp', designer:'윤슬', service:'단발레이어드컷', cat:['컷']},
  {img:'yoonseul/cut/cut-02.webp', designer:'윤슬', service:'중단발레이어드컷', cat:['컷']},
  {img:'yoonseul/perm/perm-01.webp', designer:'윤슬', service:'구름펌', cat:['펌']},
  {img:'yoonseul/perm/perm-02.webp', designer:'윤슬', service:'단발젤리펌', cat:['펌']},
  {img:'yoonseul/perm/perm-03.webp', designer:'윤슬', service:'레이어드C컬펌', cat:['펌']},
  {img:'yoonseul/perm/perm-04.webp', designer:'윤슬', service:'레이어드C컬펌', cat:['펌']},
  {img:'yoonseul/perm/perm-05.webp', designer:'윤슬', service:'레이어드C컬펌', cat:['펌']},
  {img:'yoonseul/perm/perm-06.webp', designer:'윤슬', service:'젤리펌', cat:['펌']},
  {img:'yoonseul/color/color-01.webp', designer:'윤슬', service:'디자인컬러', cat:['염색']},
  {img:'yoonseul/color/color-02.webp', designer:'윤슬', service:'솜브레염색', cat:['염색']},
  {img:'yoonseul/color/color-03.webp', designer:'윤슬', service:'애쉬핑크', cat:['염색']}
];
