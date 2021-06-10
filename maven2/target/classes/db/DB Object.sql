
CREATE OR REPLACE FUNCTION FN_GET_CODE_NM(IN_CODE VARCHAR2)RETURN VARCHAR2 IS OUT_CODE_NM VARCHAR2(100);
/*CREATE OR REPLACE FUNCTION FN_GET_CODE_NM(IN_CODE CODE_MASTER.CODE%TYPE)RETURN VARCHAR2 IS OUT_CODE_NM CODE_MASTER.COM_KOR%TYPE;*/

/******************************************************************************
   NAME:            FN_GET_CODE_NM
   DISCRIPTION:     CODE_MASTER 테이블의 코드명 리턴
******************************************************************************/

BEGIN

    SELECT COM_KOR
    INTO OUT_CODE_NM
    FROM CODE_MASTER
    WHERE CODE = IN_CODE;

    RETURN OUT_CODE_NM;
   
END FN_GET_CODE_NM;
/


CREATE PUBLIC DATABASE LINK LINK_LIME1
 CONNECT TO LIME1
 IDENTIFIED BY LIME1
  USING '(DESCRIPTION =   
                (ADDRESS_LIST =   
                  (ADDRESS = (PROTOCOL = TCP)(HOST=192.168.0.74)(PORT = 1521))  
                )  
                (CONNECT_DATA =   
                  (SERVICE_NAME = XE)  
                )  
              )'
;


CREATE OR REPLACE FORCE VIEW VW_ACCOUNT_TB
(
    ACCOUNT_SEQ,
    PROFIT_COST,
    PROFIT_COST_NM,
    BIG_GROUP,
    BIG_GROUP_NM,
    MIDDLE_GROUP,
    MIDDLE_GROUP_NM,
    SMALL_GROUP,
    SMALL_GROUP_NM,
    DETAIL_GROUP,
    DETAIL_GROUP_NM,
    COMMENTS,
    TRANSACTION_MONEY,
    TRANSACTION_DATE,
    WRITER,
    REG_DATE
)
AS
    SELECT ACCOUNT_SEQ,
           PROFIT_COST,
           FN_GET_CODE_NM (PROFIT_COST)                 PROFIT_COST_NM,
           BIG_GROUP,
           FN_GET_CODE_NM (BIG_GROUP)                   BIG_GROUP_NM,
           MIDDLE_GROUP,
           FN_GET_CODE_NM (MIDDLE_GROUP)                AS MIDDLE_GROUP_NM,
           SMALL_GROUP,
           FN_GET_CODE_NM (SMALL_GROUP)                 AS SMALL_GROUP_NM,
           DETAIL_GROUP,
           FN_GET_CODE_NM (DETAIL_GROUP)                AS DETAIL_GROUP_NM,
           COMMENTS,
           TRANSACTION_MONEY,
           TO_CHAR (TRANSACTION_DATE, 'YYYY-MM-DD')     AS TRANSACTION_DATE,
           WRITER,
           TO_CHAR (REG_DATE, 'YYYY-MM-DD')             AS REG_DATE
      FROM ACCOUNT_TB
      WITH READ ONLY;
