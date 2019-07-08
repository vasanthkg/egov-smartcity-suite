CREATE SEQUENCE SEQ_EGWTR_ESTIMATION_NOTICE;

CREATE TABLE EGWTR_ESTIMATION_NOTICE
(
	ID BIGINT NOT NULL, 
	CONNECTIONDETAILS BIGINT NOT NULL, -- CONNECTION DETAILS ID
	FILESTORE BIGINT, -- ESTIMATION NOTICE FILESTORE
	INSTALLMENT BIGINT, -- INSTALLMENT ID
	ESTIMATIONNUMBER character varying(18) NOT NULL,
	ESTIMATIONNOTICEDATE DATE,
	ISHISTORY boolean,
	CREATEDBY BIGINT NOT NULL,
	LASTMODIFIEDBY BIGINT NOT NULL,
	CREATEDDATE TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	LASTMODIFIEDDATE TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	ORDERNUMBER BIGINT,
	VERSION BIGINT DEFAULT 0,
	CONSTRAINT PK_ESTIMATION_NOTICE_ID PRIMARY KEY (ID),
	CONSTRAINT FK_ESTIMATION_NOTICE_CREATEDBY FOREIGN KEY (CREATEDBY) REFERENCES EG_USER (ID),
	CONSTRAINT FK_ESTIMATION_NOTICE_LASTMODBY FOREIGN KEY (LASTMODIFIEDBY) REFERENCES EG_USER (ID),
	CONSTRAINT FK_ESTIMATION_NOTICE_CONNDET FOREIGN KEY (CONNECTIONDETAILS) REFERENCES EGWTR_CONNECTIONDETAILS (ID),
	CONSTRAINT FK_ESTIMATION_NOTICE_FILESTORE FOREIGN KEY (FILESTORE) REFERENCES EG_FILESTOREMAP (ID),
	CONSTRAINT FK_ESTIMATION_NOTICE_INSTALLMENT FOREIGN KEY (INSTALLMENT) REFERENCES EG_INSTALLMENT_MASTER (ID)
);



CREATE INDEX idx_estnotice_conndet on EGWTR_ESTIMATION_NOTICE(CONNECTIONDETAILS);
CREATE INDEX idx_estnotice_filestore on EGWTR_ESTIMATION_NOTICE(FILESTORE);
CREATE INDEX idx_estnotice_installment on EGWTR_ESTIMATION_NOTICE(INSTALLMENT);
CREATE INDEX idx_estnotice_estnumber on EGWTR_ESTIMATION_NOTICE(ESTIMATIONNUMBER);
