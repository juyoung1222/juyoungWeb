insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title1', 'content..', null, SYSDATE, 1, 10 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title2', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title3', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title4', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title5', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title6', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title7', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title8', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title9', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title10', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title11', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title12', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title13', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title14', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title15', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title16', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title17', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title18', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title19', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title20', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title21', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title22', 'content..', null, SYSDATE, 2, 8 );
insert into TB_BOARD ( POST_ID, TITLE, CONTENTS, REG_ID, REG_DATE, COMMUNITY_ID, HIT_COUNT ) values ( (select nvl(max(POST_ID)+1, 1) from TB_BOARD), 'title23', 'content..', null, SYSDATE, 2, 8 );

insert into TB_CODEGROUP (GROUP_CD, GROUP_NM, USE_FG, CREATE_DT, CREATE_USER, GROUP_DESC) values('10000', '화면연동', '1', SYSDATE, 'test', '화면을 연동하는 방식을 결정');
insert into TB_CODEGROUP (GROUP_CD, GROUP_NM, USE_FG, CREATE_DT, CREATE_USER, GROUP_DESC) values('20000', '화면타입', '1', SYSDATE, 'test', '화면의 타입을 정의');
insert into TB_CODEGROUP (GROUP_CD, GROUP_NM, USE_FG, CREATE_DT, CREATE_USER, GROUP_DESC) values('30000', '메뉴오픈', '1', SYSDATE, 'test', '메뉴를 오픈하는 방식을 결정');
insert into TB_CODEGROUP (GROUP_CD, GROUP_NM, USE_FG, CREATE_DT, CREATE_USER, GROUP_DESC) values('40000', '화면그룹', '1', SYSDATE, 'test', '화면의 기능별 그룹');
insert into TB_CODEGROUP (GROUP_CD, GROUP_NM, USE_FG, CREATE_DT, CREATE_USER, GROUP_DESC) values('50000', '메뉴상태', '1', SYSDATE, 'test', '메뉴의 상태를 결정');

insert into TB_CODE (CODE_CD, GROUP_CD, CODE_NM, CODE_DESC, CODE_GBN, CODE_SEQ, USE_FG, CREATE_DT, CREATE_USER) values('FORM', '10000', '일반화면', '일반적인 화면으로 연동','', 1, '1', SYSDATE, 'test');
insert into TB_CODE (CODE_CD, GROUP_CD, CODE_NM, CODE_DESC, CODE_GBN, CODE_SEQ, USE_FG, CREATE_DT, CREATE_USER) values('LINK', '10000', '웹페이지', '웹페이지 연동','', 2, '1', SYSDATE, 'test');
insert into TB_CODE (CODE_CD, GROUP_CD, CODE_NM, CODE_DESC, CODE_GBN, CODE_SEQ, USE_FG, CREATE_DT, CREATE_USER) values('EXEC', '10000', '외부연동', '외부모듈의 실행으로 연동','', 3, '1', SYSDATE, 'test');

insert into TB_USER ( USER_ID, USER_NAME, EN_NAME, COMP_PHONE, PHONE, CELL_PHONE, COMPANY, JOB_POSITION, ASSIGNMENT, OFFICER_YN, FAX, ZIP_CODE, ADDRESS, COMP_ZIP_CODE, COMP_ADDRESS, EMAIL, DEPT_ID, PASSWORD ) values ( 'hong', '홍길동', 'hong gil dong', '02-2140-7700', '02-2140-7700', '010-1111-2222','투비소프트', '과장','개발', 'Y','02-2140-7798','223232','서울시 강남구 봉은사로','223232','서울시 강남구 봉은사로','hong@tobesoft.com','DEPT-001','1111');





Insert into CODE_TB
   (CODE_SE_CD, CODE, CODE_NM, DESCRIPTION, REG_DT)
 Values
   ('LEC_LV_SE_CD', '1', '초급', '강사등급구분코드_초급', sysdate);
Insert into CODE_TB
   (CODE_SE_CD, CODE, CODE_NM, DESCRIPTION, REG_DT)
 Values
   ('LEC_LV_SE_CD', '2', '중급', '강사등급구분코드_중급', sysdate);
Insert into CODE_TB
   (CODE_SE_CD, CODE, CODE_NM, DESCRIPTION, REG_DT)
 Values
   ('LEC_LV_SE_CD', '3', '고급', '강사등급구분코드_고급', sysdate);
Insert into CODE_TB
   (CODE_SE_CD, CODE, CODE_NM, DESCRIPTION, REG_DT)
 Values
   ('LEC_LV_SE_CD', '4', '특급', '강사등급구분코드_특급', sysdate);
Insert into CODE_TB
   (CODE_SE_CD, CODE, CODE_NM, DESCRIPTION, REG_DT)
 Values
   ('CAREER_SE_CD', '1', '근무경력', '경력구분코드_근무경력', sysdate);
Insert into CODE_TB
   (CODE_SE_CD, CODE, CODE_NM, DESCRIPTION, REG_DT)
 Values
   ('CAREER_SE_CD', '2', '자격증', '경력구분코드_자격증', sysdate);
Insert into CODE_TB
   (CODE_SE_CD, CODE, CODE_NM, DESCRIPTION, REG_DT)
 Values
   ('CAREER_SE_CD', '3', '수상내역', '경력구분코드_수상내역', sysdate);
Insert into CODE_TB
   (CODE_SE_CD, CODE, CODE_NM, DESCRIPTION, REG_DT)
 Values
   ('CAREER_SE_CD', '4', '집필내역', '경력구분코드_집필내역', sysdate);


