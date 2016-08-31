ALTER TABLE EGW_MEASUREMENTSHEET ADD COLUMN PARENT BIGINT;
ALTER TABLE EGW_MEASUREMENTSHEET ADD CONSTRAINT FK_MEASUREMENTSHEET_PARENT FOREIGN KEY (PARENT) REFERENCES EGW_MEASUREMENTSHEET (ID);

--rollback ALTER TABLE EGW_MEASUREMENTSHEET DROP COLUMN PARENT;