--시퀀스생성
CREATE SEQUENCE POLY_SEQ
INCREMENT BY 1 
START WITH 1 
MINVALUE 1 
MAXVALUE 9999999999 
NOCYCLE 
NOCACHE;
--시퀀스생성
CREATE SEQUENCE PRODUCT_SEQ
INCREMENT BY 1 
START WITH 1 
MINVALUE 1 
MAXVALUE 9999999999 
NOCYCLE 
NOCACHE;


--USER_TAB 더미데이터

insert into USER_TAB
(polyNo, poly_id, product_info, reg_info, contract_period, start_date, end_date,register_pay,standard_pay,status)
VALUES(POLY_SEQ.nextval, '112', '여행자보험','상해치료비', ,2,'20230101','20261201',50000,1000,'1');
insert into USER_TAB
(polyNo, poly_id, product_info, reg_info, contract_period, start_date, end_date,register_pay,standard_pay,status)
VALUES(POLY_SEQ.nextval, '113','여행자보험1', '상해치료비1',2,'20230101','20261201',50000,1000,'1');
insert into USER_TAB
(polyNo, poly_id, product_info, reg_info, contract_period, start_date, end_date,register_pay,standard_pay,status)
VALUES(POLY_SEQ.nextval, '114','여행자보험2', '상해치료비2',2,'20230101','20261201',50000,1000,'1');
insert into USER_TAB
(polyNo, poly_id, product_info, reg_info, contract_period, start_date, end_date,register_pay,standard_pay,status)
VALUES(POLY_SEQ.nextval, '115','여행자보험3', '상해치료비3',2,'20230101','20261201',50000,1000,'1');
insert into USER_TAB
(polyNo, poly_id, product_info, reg_info, contract_period, start_date, end_date,register_pay,standard_pay,status)
VALUES(POLY_SEQ.nextval, '116','여행자보험4', '상해치료비4',2,'20230101','20261201',50000,1000,'1');


--USER_TAB테이블 생성
create table USER_TAB(
polyNo NUMBER(10) NOT NULL,
poly_id VARCHAR2(10) NOT NULL PRIMARY KEY,
product_info VARCHAR2(500),
reg_info VARCHAR2(500),
contract_period NUMBER(2) NOT NULL,
start_date VARCHAR2(8) NOT NULL,
end_date VARCHAR2(8) NOT NULL,
register_pay NUMBER(8) NOT NULL,
standard_pay NUMBER(8) NOT NULL,
status VARCHAR2(50) -- 1 : 정상유지 2:청약철회 9:기간만료
)
;

--PRODUCT_TAB 더미데이터
insert into PRODUCT_TAB(productNo,polyId, reg_info, contract_period, register_pay, standard_pay)
VALUES(PRODUCT_SEQ.nextval, '112', '상해치료비',  2,50000,1000);
insert into PRODUCT_TAB(productNo,polyId, reg_info, contract_period, register_pay, standard_pay)
VALUES(PRODUCT_SEQ.nextval, '113', '전체손실',  2,50000,1000);
insert into PRODUCT_TAB(productNo,polyId, reg_info, contract_period, register_pay, standard_pay)
VALUES(PRODUCT_SEQ.nextval, '114','부분손실',  2,50000,1000);
insert into PRODUCT_TAB(productNo,polyId, reg_info, contract_period, register_pay, standard_pay)
VALUES(PRODUCT_SEQ.nextval, '115','항공지연연착보상금',  2,50000,1000);
insert into PRODUCT_TAB(productNo,polyId, reg_info, contract_period, register_pay, standard_pay)
VALUES(PRODUCT_SEQ.nextval,'116', '입원',  2,50000,1000);

create table PRODUCT_TAB(
productNo NUMBER(10) NOT NULL, 
polyId VARCHAR2(10) NOT NULL PRIMARY KEY,
reg_info VARCHAR2(500),
contract_period NUMBER(2) NOT NULL,
register_pay NUMBER(8) NOT NULL,
standard_pay NUMBER(8) NOT NULL--,
--CONSTRAINT polyId_fk foreign key(polyId) references USER_TAB ()

);

