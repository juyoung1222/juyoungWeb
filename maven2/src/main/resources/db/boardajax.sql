CREATE TABLE CODE_MASTER (
  CODE_SEQ NUMBER(11) PRIMARY KEY,
  CODE VARCHAR2(11) NOT NULL,
  CATEGORY VARCHAR2(11) ,
  COM_KOR VARCHAR2(100) ,
  SUB_COM VARCHAR2(200) ,
  USE_YN VARCHAR2(2) ,
  REG_DT DATE
) ;

CREATE TABLE USER_TB (
  USER_SEQ NUMBER(11) PRIMARY KEY,
  USER_ID VARCHAR2(20) NOT NULL,
  PWD VARCHAR2(100) ,
  USER_NAME VARCHAR2(100) ,
  REG_DT DATE
) ;

CREATE TABLE ACCOUNT_TB (
  ACCOUNT_SEQ NUMBER(11) PRIMARY KEY,
  PROFIT_COST VARCHAR2(11) DEFAULT NULL,
  BIG_GROUP VARCHAR2(11) DEFAULT NULL,
  MIDDLE_GROUP VARCHAR2(11) DEFAULT NULL,
  SMALL_GROUP VARCHAR2(11) DEFAULT NULL,
  DETAIL_GROUP VARCHAR2(11) DEFAULT NULL,
  COMMENTS VARCHAR2(200) DEFAULT NULL,
  TRANSACTION_MONEY NUMBER(11) DEFAULT NULL,
  TRANSACTION_DATE DATE DEFAULT NULL,
  WRITER VARCHAR2(20)DEFAULT NULL,
  REG_DATE DATE
) ;


CREATE SEQUENCE ACCOUNT_SEQ;
CREATE SEQUENCE USER_SEQ;


INSERT INTO code_master VALUES(1,'0','0','대분류선택','','Y','2017-12-27');
INSERT INTO code_master VALUES(2,'A000000','0','계정과목','계정과목','Y','2018-01-24');
INSERT INTO code_master VALUES(3,'AA00000','A000000','수익','','Y','2017-12-27');
INSERT INTO code_master VALUES(4,'AAA0000','AA00000','매출수익','','Y','2017-12-27');
INSERT INTO code_master VALUES(5,'AAAA000','AAA0000','매출금','','Y','2017-12-27');
INSERT INTO code_master VALUES(6,'AAAB000','AAA0000','외상매출금','','Y','2017-12-27');
INSERT INTO code_master VALUES(7,'AAAC000','AAA0000','선수금','','Y','2017-12-27');
INSERT INTO code_master VALUES(8,'AAB0000','AA00000','영업외 수익','','Y','2017-12-27');
INSERT INTO code_master VALUES(9,'AABA000','AAB0000','자본금','','Y','2017-12-27');
INSERT INTO code_master VALUES(10,'AABB000','AAB0000','이자수익','','Y','2017-12-27');
INSERT INTO code_master VALUES(11,'AABC000','AAB0000','차입금','','Y','2017-12-27');
INSERT INTO code_master VALUES(12,'AABD000','AAB0000','대여금상환금','','Y','2017-12-27');
INSERT INTO code_master VALUES(13,'AABE000','AAB0000','미수금','','Y','2017-12-27');
INSERT INTO code_master VALUES(14,'AABF000','AAB0000','예수금','','Y','2017-12-27');
INSERT INTO code_master VALUES(15,'AABG000','AAB0000','가수금','','Y','2017-12-27');
INSERT INTO code_master VALUES(16,'AABH000','AAB0000','가지급금반환금','','Y','2017-12-27');
INSERT INTO code_master VALUES(17,'AABI000','AAB0000','외화환산이익','','Y','2017-12-27');
INSERT INTO code_master VALUES(18,'AABJ000','AAB0000','유형자산처분이익','','Y','2017-12-27');
INSERT INTO code_master VALUES(19,'AABK000','AAB0000','법인세환급금','','Y','2017-12-27');
INSERT INTO code_master VALUES(20,'AABL000','AAB0000','부가가치세환급금','','Y','2017-12-27');
INSERT INTO code_master VALUES(21,'AABM000','AAB0000','정부 보조 및 지원금','','Y','2017-12-27');
INSERT INTO code_master VALUES(22,'AAC0000','AA00000','특별이익','','Y','2017-12-27');
INSERT INTO code_master VALUES(23,'AACA000','AAC0000','자산수증이익','','Y','2017-12-27');
INSERT INTO code_master VALUES(24,'AACB000','AAC0000','채무면제이익','','Y','2017-12-27');
INSERT INTO code_master VALUES(25,'AACC000','AAC0000','보험차익','','Y','2017-12-27');
INSERT INTO code_master VALUES(26,'AB00000','A000000','비용','','Y','2017-12-27');
INSERT INTO code_master VALUES(27,'ABA0000','AB00000','매출원가','','Y','2017-12-27');
INSERT INTO code_master VALUES(28,'ABAC000','ABA0000','사업인건비','','Y','2017-12-27');
INSERT INTO code_master VALUES(29,'ABACA00','ABAC000','계약직','','Y','2017-12-27');
INSERT INTO code_master VALUES(30,'ABACA01','ABACA00','특급기술자','','Y','2017-12-27');
INSERT INTO code_master VALUES(31,'ABACA02','ABACA00','고급기술자','','Y','2017-12-27');
INSERT INTO code_master VALUES(32,'ABACA03','ABACA00','중급기술자','','Y','2017-12-27');
INSERT INTO code_master VALUES(33,'ABACA04','ABACA00','초급기술자','','Y','2017-12-27');
INSERT INTO code_master VALUES(34,'ABACA05','ABACA00','특별인부','','Y','2017-12-27');
INSERT INTO code_master VALUES(35,'ABACA06','ABACA00','보통인부','','Y','2017-12-27');
INSERT INTO code_master VALUES(36,'ABACB00','ABAC000','현장보조인부','','Y','2017-12-27');
INSERT INTO code_master VALUES(37,'ABACB01','ABACB00','특별인부','','Y','2017-12-27');
INSERT INTO code_master VALUES(38,'ABACB02','ABACB00','보통인부','','Y','2017-12-27');
INSERT INTO code_master VALUES(39,'ABACC00','ABAC000','자문비','','Y','2017-12-27');
INSERT INTO code_master VALUES(40,'ABACC01','ABACC00','교수/박사/특별기술자','','Y','2017-12-27');
INSERT INTO code_master VALUES(41,'ABACC02','ABACC00','고급기술자','','Y','2017-12-27');
INSERT INTO code_master VALUES(42,'ABAD000','ABA0000','사업경비','','Y','2017-12-27');
INSERT INTO code_master VALUES(43,'ABADA00','ABAD000','여비교통비','','Y','2017-12-27');
INSERT INTO code_master VALUES(44,'ABADA01','ABADA00','통행료(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(45,'ABADA02','ABADA00','운임(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(46,'ABADA03','ABADA00','숙박비','','Y','2017-12-27');
INSERT INTO code_master VALUES(47,'ABADA04','ABADA00','식비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(48,'ABADA05','ABADA00','일비',NULL,'N','2018-05-24');
INSERT INTO code_master VALUES(49,'ABADB00','ABAD000','차량유지비','','Y','2017-12-27');
INSERT INTO code_master VALUES(50,'ABADB01','ABADB00','임차료','','Y','2017-12-27');
INSERT INTO code_master VALUES(51,'ABADB02','ABADB00','유류대','','Y','2017-12-27');
INSERT INTO code_master VALUES(52,'ABADB03','ABADB00','차량수리/소모품비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(53,'ABADB04','ABADB00','차량관리비','','Y','2017-12-27');
INSERT INTO code_master VALUES(54,'ABADC00','ABAD000','복리후생비','','Y','2017-12-27');
INSERT INTO code_master VALUES(55,'ABADC01','ABADC00','작업복(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(56,'ABADC02','ABADC00','현장안전용품(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(57,'ABADC03','ABADC00','회식비','','Y','2017-12-27');
INSERT INTO code_master VALUES(58,'ABADC04','ABADC00','기타(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(59,'ABADD00','ABAD000','소모품비','','Y','2017-12-27');
INSERT INTO code_master VALUES(60,'ABADD01','ABADD00','현장소모품','','Y','2017-12-27');
INSERT INTO code_master VALUES(61,'ABADD02','ABADD00','테스용 소모재료비','','Y','2017-12-27');
INSERT INTO code_master VALUES(62,'ABADD03','ABADD00','사무용품','','Y','2017-12-27');
INSERT INTO code_master VALUES(63,'ABADD04','ABADD00','컴퓨터/주변기기 소모품(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(64,'ABADE00','ABAD000','수용비/수수료','','Y','2017-12-27');
INSERT INTO code_master VALUES(65,'ABADE01','ABADE00','도서제작비','','Y','2017-12-27');
INSERT INTO code_master VALUES(66,'ABADE02','ABADE00','도면/도서 복사비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(67,'ABADE03','ABADE00','수입인지대(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(68,'ABADE04','ABADE00','수수료(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(69,'ABADF00','ABAD000','보험료','','Y','2017-12-27');
INSERT INTO code_master VALUES(70,'ABADF01','ABADF00','보증보험료(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(71,'ABADF02','ABADF00','상해보험료(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(72,'ABADG00','ABAD000','접대비','','Y','2017-12-27');
INSERT INTO code_master VALUES(73,'ABADG01','ABADF00','접대비','','Y','2017-12-27');
INSERT INTO code_master VALUES(74,'ABADH00','ABAD000','예비비','','Y','2017-12-27');
INSERT INTO code_master VALUES(75,'ABADH01','ABADH00','예비비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(76,'ABADI00','ABAD000','경상연구개발비','','Y','2017-12-27');
INSERT INTO code_master VALUES(77,'ABADI01','ABADI00','유류대','','Y','2017-12-27');
INSERT INTO code_master VALUES(78,'ABADI02','ABADI00','기타(외주비)','','Y','2017-12-27');
INSERT INTO code_master VALUES(79,'ABAE000','ABA0000','위탁사업비','','Y','2017-12-27');
INSERT INTO code_master VALUES(80,'ABAEA00','ABAE000','위탁사업비','','Y','2017-12-27');
INSERT INTO code_master VALUES(81,'ABAEA01','ABAEA00','공급가액','','Y','2017-12-27');
INSERT INTO code_master VALUES(82,'ABAEA02','ABAEA00','부가가치세','','Y','2017-12-27');
INSERT INTO code_master VALUES(83,'ABAF000','ABA0000','부가가치세','','Y','2017-12-27');
INSERT INTO code_master VALUES(84,'ABAFA00','ABAF000','부가가치세','','Y','2017-12-27');
INSERT INTO code_master VALUES(85,'ABAFA01','ABAFA00','부가가치세','','Y','2017-12-27');
INSERT INTO code_master VALUES(86,'ABAFA02','ABAFA00','예수부가가치세','','Y','2017-12-27');
INSERT INTO code_master VALUES(87,'ABB0000','AB00000','경상운영비','','Y','2017-12-27');
INSERT INTO code_master VALUES(88,'ABBA000','ABB0000','미지급금','','Y','2017-12-27');
INSERT INTO code_master VALUES(89,'ABBAA00','ABBA000','차량유지비','','Y','2017-12-27');
INSERT INTO code_master VALUES(90,'ABBAA01','ABBAA00','임차료','','Y','2017-12-27');
INSERT INTO code_master VALUES(91,'ABBAA02','ABBAA00','유류대','','Y','2017-12-27');
INSERT INTO code_master VALUES(92,'ABBAA03','ABBAA00','차량수리/소모품비','','Y','2017-12-27');
INSERT INTO code_master VALUES(93,'ABBAA04','ABBAA00','차량관리비','','Y','2017-12-27');
INSERT INTO code_master VALUES(94,'ABBAB00','ABBA000','복리후생비','','Y','2017-12-27');
INSERT INTO code_master VALUES(95,'ABBAB01','ABBAB00','작업복(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(96,'ABBAB02','ABBAB00','현장안전용품(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(97,'ABBAB03','ABBAB00','회식비','','Y','2017-12-27');
INSERT INTO code_master VALUES(98,'ABBAB04','ABBAB00','건강검진비','','Y','2017-12-27');
INSERT INTO code_master VALUES(99,'ABBAB05','ABBAB00','기타(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(100,'ABBAC00','ABBA000','소모품비','','Y','2017-12-27');
INSERT INTO code_master VALUES(101,'ABBAC01','ABBAC00','사무용품','','Y','2017-12-27');
INSERT INTO code_master VALUES(102,'ABBAC02','ABBAC00','컴퓨터/주변기기 소모품(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(103,'ABBAC03','ABBAC00','기타 소모품(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(104,'ABBAD00','ABBA000','비품비','','Y','2017-12-27');
INSERT INTO code_master VALUES(105,'ABBAD01','ABBAD00','시스템 테스트장비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(106,'ABBAD02','ABBAD00','사무기기(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(107,'ABBAD03','ABBAD00','사무용가구(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(108,'ABBAE00','ABBA000','접대비','','Y','2017-12-27');
INSERT INTO code_master VALUES(109,'ABBAE01','ABBAE00','접대비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(110,'ABBAF00','ABBA000','광고선전비','','Y','2017-12-27');
INSERT INTO code_master VALUES(111,'ABBAF01','ABBAF00','홈페이지제작비','','Y','2017-12-27');
INSERT INTO code_master VALUES(112,'ABBAG00','ABBA000','통신비','','Y','2017-12-27');
INSERT INTO code_master VALUES(113,'ABBAG01','ABBAG00','우편료','','Y','2017-12-27');
INSERT INTO code_master VALUES(114,'ABBAG02','ABBAG00','택배비','','Y','2017-12-27');
INSERT INTO code_master VALUES(115,'ABBAG03','ABBAG00','전화요금','','Y','2017-12-27');
INSERT INTO code_master VALUES(116,'ABBAH00','ABBA000','수도광열비','','Y','2017-12-27');
INSERT INTO code_master VALUES(117,'ABBAH01','ABBAH00','수도/전기료','','Y','2017-12-27');
INSERT INTO code_master VALUES(118,'ABBAH02','ABBAH00','도시가스비','','Y','2017-12-27');
INSERT INTO code_master VALUES(119,'ABBAI00','ABBA000','관리비','','Y','2017-12-27');
INSERT INTO code_master VALUES(120,'ABBAI01','ABBAI00','사무실관리비','','Y','2017-12-27');
INSERT INTO code_master VALUES(121,'ABBAI02','ABBAI00','세무회계관리(기장)비','','Y','2017-12-27');
INSERT INTO code_master VALUES(122,'ABBAI03','ABBAI00','보안/방범관리비','','Y','2017-12-27');
INSERT INTO code_master VALUES(123,'ABBAI04','ABBAI00','기타관리비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(124,'ABBAJ00','ABBA000','수선비','','Y','2017-12-27');
INSERT INTO code_master VALUES(125,'ABBAJ01','ABBAJ00','수선비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(126,'ABBAK00','ABBA000','보관료','','Y','2017-12-27');
INSERT INTO code_master VALUES(127,'ABBAK01','ABBAK00','보관료(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(128,'ABBAL00','ABBA000','세금','','Y','2017-12-27');
INSERT INTO code_master VALUES(129,'ABBAL01','ABBAL00','부가가치세','','Y','2017-12-27');
INSERT INTO code_master VALUES(130,'ABBAL02','ABBAL00','주민세','','Y','2017-12-27');
INSERT INTO code_master VALUES(131,'ABBAL03','ABBAL00','면허세','','Y','2017-12-27');
INSERT INTO code_master VALUES(132,'ABBAL04','ABBAL00','법인세','','Y','2017-12-27');
INSERT INTO code_master VALUES(133,'ABBAL05','ABBAL00','갑근세','','Y','2017-12-27');
INSERT INTO code_master VALUES(134,'ABBAL06','ABBAL00','취득세','','Y','2017-12-27');
INSERT INTO code_master VALUES(135,'ABBAL07','ABBAL00','고용보험료','','Y','2017-12-27');
INSERT INTO code_master VALUES(136,'ABBAL08','ABBAL00','국민연금','','Y','2017-12-27');
INSERT INTO code_master VALUES(137,'ABBAL09','ABBAL00','건강보험료','','Y','2017-12-27');
INSERT INTO code_master VALUES(138,'ABBAL10','ABBAL00','요양보험료','','Y','2017-12-27');
INSERT INTO code_master VALUES(139,'ABBAL11','ABBAL00','산재보험료','','Y','2017-12-27');
INSERT INTO code_master VALUES(140,'ABBAL12','ABBAL00','기타세금(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(141,'ABBAM00','ABBA000','여비교통비','','Y','2017-12-27');
INSERT INTO code_master VALUES(142,'ABBAM01','ABBAM00','통행료(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(143,'ABBAM02','ABBAM00','운임(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(144,'ABBAM03','ABBAM00','일비','','Y','2017-12-27');
INSERT INTO code_master VALUES(145,'ABBAM04','ABBAM00','식비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(146,'ABBAM05','ABBAM00','숙박비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(147,'ABBAN00','ABBA000','보험료','','Y','2017-12-27');
INSERT INTO code_master VALUES(148,'ABBAN01','ABBAN00','보증보험료(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(149,'ABBAN02','ABBAN00','상해보험료(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(150,'ABBAN03','ABBAN00','기타보험료(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(151,'ABBAO00','ABBA000','수용비/수수료','','Y','2017-12-27');
INSERT INTO code_master VALUES(152,'ABBAO01','ABBAO00','도서제작비','','Y','2017-12-27');
INSERT INTO code_master VALUES(153,'ABBAO02','ABBAO00','도면/도서 복사비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(154,'ABBAO03','ABBAO00','수입인지대(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(155,'ABBAO04','ABBAO00','수수료(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(156,'ABBB000','ABB0000','경상운영비','','Y','2017-12-27');
INSERT INTO code_master VALUES(157,'ABBBA00','ABBB000','급여','','Y','2017-12-27');
INSERT INTO code_master VALUES(158,'ABBBA01','ABBBA00','임원급여','','Y','2017-12-27');
INSERT INTO code_master VALUES(159,'ABBBA02','ABBBA00','직원급여','','Y','2017-12-27');
INSERT INTO code_master VALUES(160,'ABBBA03','ABBBA00','계약직급여','','Y','2017-12-27');
INSERT INTO code_master VALUES(161,'ABBBA04','ABBBA00','현장보조인부','','Y','2017-12-27');
INSERT INTO code_master VALUES(162,'ABBBA05','ABBBA00','기타급여(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(163,'ABBBB00','ABBB000','퇴직급여','','Y','2017-12-27');
INSERT INTO code_master VALUES(164,'ABBBB01','ABBBB00','퇴직급여(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(165,'ABBBC00','ABBB000','자문비','','Y','2017-12-27');
INSERT INTO code_master VALUES(166,'ABBBC01','ABBBC00','교수/박사/특급기술자','','Y','2017-12-27');
INSERT INTO code_master VALUES(167,'ABBBC02','ABBBC00','고급기술자','','Y','2017-12-27');
INSERT INTO code_master VALUES(168,'ABBBD00','ABBB000','복리후생비','','Y','2017-12-27');
INSERT INTO code_master VALUES(169,'ABBBD01','ABBBD00','작업복(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(170,'ABBBD02','ABBBD00','현장안전용품(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(171,'ABBBD03','ABBBD00','회식비','','Y','2017-12-27');
INSERT INTO code_master VALUES(172,'ABBBD04','ABBBD00','건강진단비','','Y','2017-12-27');
INSERT INTO code_master VALUES(173,'ABBBD05','ABBBD00','기타(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(174,'ABBBE00','ABBB000','임차료','','Y','2017-12-27');
INSERT INTO code_master VALUES(175,'ABBBE01','ABBBE00','사무실임차료(월세)','','Y','2017-12-27');
INSERT INTO code_master VALUES(176,'ABBBE02','ABBBE00','사무실전세보증금','','Y','2017-12-27');
INSERT INTO code_master VALUES(177,'ABBBF00','ABBB000','세금','','Y','2017-12-27');
INSERT INTO code_master VALUES(178,'ABBBF01','ABBBF00','부가가치세','','Y','2017-12-27');
INSERT INTO code_master VALUES(179,'ABBBF02','ABBBF00','주민세','','Y','2017-12-27');
INSERT INTO code_master VALUES(180,'ABBBF03','ABBBF00','면허세','','Y','2017-12-27');
INSERT INTO code_master VALUES(181,'ABBBF04','ABBBF00','법인세','','Y','2017-12-27');
INSERT INTO code_master VALUES(182,'ABBBF05','ABBBF00','갑근세','','Y','2017-12-27');
INSERT INTO code_master VALUES(183,'ABBBF06','ABBBF00','취득세','','Y','2017-12-27');
INSERT INTO code_master VALUES(184,'ABBBF07','ABBBF00','고용보험료','','Y','2017-12-27');
INSERT INTO code_master VALUES(185,'ABBBF08','ABBBF00','국민연금','','Y','2017-12-27');
INSERT INTO code_master VALUES(186,'ABBBF09','ABBBF00','건강보험료','','Y','2017-12-27');
INSERT INTO code_master VALUES(187,'ABBBF10','ABBBF00','요양보험료','','Y','2017-12-27');
INSERT INTO code_master VALUES(188,'ABBBF11','ABBBF00','산재보험료','','Y','2017-12-27');
INSERT INTO code_master VALUES(189,'ABBBF12','ABBBF00','기타세금(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(190,'ABBBG00','ABBB000','여비교통비','','Y','2017-12-27');
INSERT INTO code_master VALUES(191,'ABBBG01','ABBBG00','통행료(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(192,'ABBBG02','ABBBG00','운임(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(193,'ABBBG03','ABBBG00','일비','','Y','2017-12-27');
INSERT INTO code_master VALUES(194,'ABBBG04','ABBBG00','식비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(195,'ABBBG05','ABBBG00','숙박비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(196,'ABBBH00','ABBB000','차량유지비','','Y','2017-12-27');
INSERT INTO code_master VALUES(197,'ABBBH01','ABBBH00','임차료','','Y','2017-12-27');
INSERT INTO code_master VALUES(198,'ABBBH02','ABBBH00','유류대','','Y','2017-12-27');
INSERT INTO code_master VALUES(199,'ABBBH03','ABBBH00','차량수리/소모품비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(200,'ABBBH04','ABBBH00','차량관리비','','Y','2017-12-27');
INSERT INTO code_master VALUES(201,'ABBBI00','ABBB000','소모품비','','Y','2017-12-27');
INSERT INTO code_master VALUES(202,'ABBBI01','ABBBI00','사무용품','','Y','2017-12-27');
INSERT INTO code_master VALUES(203,'ABBBI02','ABBBI00','컴퓨터/주변기기 소모품(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(204,'ABBBI03','ABBBI00','기타소모품(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(205,'ABBBJ00','ABBB000','비품비','','Y','2017-12-27');
INSERT INTO code_master VALUES(206,'ABBBJ01','ABBBJ00','테스트장비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(207,'ABBBJ02','ABBBJ00','사무기기(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(208,'ABBBJ03','ABBBJ00','사무용가구(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(209,'ABBBK00','ABBB000','접대비','','Y','2017-12-27');
INSERT INTO code_master VALUES(210,'ABBBK01','ABBBK00','접대비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(211,'ABBBL00','ABBB000','연구비','','Y','2017-12-27');
INSERT INTO code_master VALUES(212,'ABBBL01','ABBBL00','연구비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(213,'ABBBM00','ABBB000','경상연구개발비','','Y','2017-12-27');
INSERT INTO code_master VALUES(214,'ABBBM01','ABBBM00','유류대','','Y','2017-12-27');
INSERT INTO code_master VALUES(215,'ABBBM02','ABBBM00','기타(외주비)','','Y','2017-12-27');
INSERT INTO code_master VALUES(216,'ABBBN00','ABBB000','광고선전비','','Y','2017-12-27');
INSERT INTO code_master VALUES(217,'ABBBN01','ABBBN00','홈페이지제작비','','Y','2017-12-27');
INSERT INTO code_master VALUES(218,'ABBBO00','ABBB000','통신비','','Y','2017-12-27');
INSERT INTO code_master VALUES(219,'ABBBO01','ABBBO00','우편료','','Y','2017-12-27');
INSERT INTO code_master VALUES(220,'ABBBO02','ABBBO00','택배료','','Y','2017-12-27');
INSERT INTO code_master VALUES(221,'ABBBO03','ABBBO00','전화요금','','Y','2017-12-27');
INSERT INTO code_master VALUES(222,'ABBBP00','ABBB000','수도광열비','','Y','2017-12-27');
INSERT INTO code_master VALUES(223,'ABBBP01','ABBBP00','수도/전기료','','Y','2017-12-27');
INSERT INTO code_master VALUES(224,'ABBBP02','ABBBP00','도시가스비','','Y','2017-12-27');
INSERT INTO code_master VALUES(225,'ABBBQ00','ABBB000','관리비','','Y','2017-12-27');
INSERT INTO code_master VALUES(226,'ABBBQ01','ABBBQ00','사무실관리비','','Y','2017-12-27');
INSERT INTO code_master VALUES(227,'ABBBQ02','ABBBQ00','세무회계관리(기장)비','','Y','2017-12-27');
INSERT INTO code_master VALUES(228,'ABBBQ03','ABBBQ00','보안/방범관리비','','Y','2017-12-27');
INSERT INTO code_master VALUES(229,'ABBBQ04','ABBBQ00','기타관리비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(230,'ABBBR00','ABBB000','수선비','','Y','2017-12-27');
INSERT INTO code_master VALUES(231,'ABBBR01','ABBBR00','수선비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(232,'ABBBS00','ABBB000','보험료','','Y','2017-12-27');
INSERT INTO code_master VALUES(233,'ABBBS01','ABBBS00','보증보험료(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(234,'ABBBS02','ABBBS00','상해보험료(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(235,'ABBBS03','ABBBS00','기타보험료(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(236,'ABBBT00','ABBB000','보관료','','Y','2017-12-27');
INSERT INTO code_master VALUES(237,'ABBBT01','ABBBT00','보관료(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(238,'ABBBU00','ABBB000','대손상각비','','Y','2017-12-27');
INSERT INTO code_master VALUES(239,'ABBBU01','ABBBU00','대손상각비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(240,'ABBBV00','ABBB000','감가상각비','','Y','2017-12-27');
INSERT INTO code_master VALUES(241,'ABBBV01','ABBBV00','감가상각비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(242,'ABBBW00','ABBB000','수용비/수수료','','Y','2017-12-27');
INSERT INTO code_master VALUES(243,'ABBBW01','ABBBW00','도서제작비','','Y','2017-12-27');
INSERT INTO code_master VALUES(244,'ABBBW02','ABBBW00','도면/도서 복사비(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(245,'ABBBW03','ABBBW00','수입인지대(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(246,'ABBBW04','ABBBW00','수수료(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(247,'ABBC000','ABB0000','연구개발 사업비','','Y','2017-12-27');
INSERT INTO code_master VALUES(248,'ABBCA00','ABBC000','경상연구 개발비','','Y','2017-12-27');
INSERT INTO code_master VALUES(249,'ABBCA01','ABBCA00','관리비(직접입력 예:토너/용지/전산 소모품/공CD-R)','','Y','2017-12-27');
INSERT INTO code_master VALUES(250,'ABBCA02','ABBCA00','여비(직접입력 예:워크샾/현지조사)','','Y','2017-12-27');
INSERT INTO code_master VALUES(251,'ABBCA03','ABBCA00','수용비/수수료(직접입력 예:복사/공공요금/수수료/제세공과금)','','Y','2017-12-27');
INSERT INTO code_master VALUES(252,'ABBCA04','ABBCA00','정보 활동비(직접입력 예:세미나 개최/참석)','','Y','2017-12-27');
INSERT INTO code_master VALUES(253,'ABBCA05','ABBCA00','전문가 자문비','','Y','2017-12-27');
INSERT INTO code_master VALUES(254,'ABBCA06','ABBCA00','연구 활동비(연구원 인센티브)','','Y','2017-12-27');
INSERT INTO code_master VALUES(255,'ABBCA07','ABBCA00','연구실 안전관리비','','Y','2017-12-27');
INSERT INTO code_master VALUES(256,'ABBCA08','ABBCA00','지적재산권 출원/등록비','','Y','2017-12-27');
INSERT INTO code_master VALUES(257,'ABBCA09','ABBCA00','기타(직접입력)','','Y','2017-12-27');
INSERT INTO code_master VALUES(258,'ABC0000','AB00000','영업외비용','','Y','2017-12-27');
INSERT INTO code_master VALUES(259,'ABCA000','ABC0000','영업외비용','','Y','2017-12-27');