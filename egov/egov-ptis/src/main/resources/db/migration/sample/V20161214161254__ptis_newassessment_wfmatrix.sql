---New Assessment

delete from eg_wf_matrix where objecttype = 'PropertyImpl' and additionalrule='NEW ASSESSMENT';

INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:NEW', NULL, NULL, 'Senior Assistant,Junior Assistant', 'NEW ASSESSMENT', 'Create:Assistant Approved', 'Bill Collector Approval Pending', 'Bill Collector', 'Assistant Approved', 'Create', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Assistant Approved', NULL, 'Bill Collector Approval Pending', 'Bill Collector', 'NEW ASSESSMENT', 'Create:Bill Collector Approved', 'UD Revenue Inspector Approval Pending', 'UD Revenue Inspector', 'Bill Collector Approved', 'Forward,Reject', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Bill Collector Approved', NULL, 'UD Revenue Inspector Approval Pending', 'UD Revenue Inspector', 'NEW ASSESSMENT', 'Create:UD Revenue Inspector Approved', 'Revenue Officer Approval Pending', 'Revenue officer', 'UD Revenue Inspector Approved', 'Forward,Reject', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:UD Revenue Inspector Approved', NULL, 'Revenue Officer Approval Pending', 'Revenue officer', 'NEW ASSESSMENT', 'Create:Revenue Officer Approved', NULL, 'Assistant Commissioner,Zonal Commissioner,Deputy Commissioner,Additional Commissioner,Commissioner','Revenue Officer Approved', 'Forward,Reject', NULL, NULL, '2015-04-01', '2099-04-01');

--Revenue Officer
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Revenue Officer Approved', NULL, 'Assistant Commissioner Approval Pending', 'Assistant Commissioner', 'NEW ASSESSMENT', 'Create:Assistant Commissioner Approved', 'Digital Signature Pending', 'Zonal Commissioner,Deputy Commissioner,Additional Commissioner,Commissioner','Assistant Commissioner Approved', 'Forward,Approve,Reject', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Revenue Officer Approved', NULL, 'Zonal Commissioner Approval Pending', 'Zonal Commissioner', 'NEW ASSESSMENT', 'Create:Zonal Commissioner Approved', 'Digital Signature Pending', 'Deputy Commissioner,Additional Commissioner,Commissioner','Assistant Commissioner Approved', 'Forward,Approve,Reject', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Revenue Officer Approved', NULL, 'Deputy Commissioner Approval Pending', 'Deputy Commissioner', 'NEW ASSESSMENT', 'Create:Deputy Commissioner Approved', 'Digital Signature Pending', 'Additional Commissioner,Commissioner','Deputy Commissioner Approved', 'Forward,Approve,Reject', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Revenue Officer Approved', NULL, 'Additional Commissioner Approval Pending', 'Additional Commissioner', 'NEW ASSESSMENT', 'Create:Additional Commissioner Approved', 'Digital Signature Pending', 'Commissioner','Additional Commissioner Approved', 'Forward,Approve,Reject', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Revenue Officer Approved', NULL, 'Commissioner Approval Pending', 'Commissioner', 'NEW ASSESSMENT', 'Create:Commissioner Approved', 'Digital Signature Pending', 'Commissioner','Commissioner Approved', 'Approve,Reject', NULL, NULL, '2015-04-01', '2099-04-01');


--Assistant Commissioner
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Assistant Commissioner Approved', NULL, 'Zonal Commissioner Approval Pending', 'Zonal Commissioner', 'NEW ASSESSMENT', 'Create:Zonal Commissioner Approved', 'Digital Signature Pending', 'Deputy Commissioner,Additional Commissioner,Commissioner','Assistant Commissioner Approved', 'Forward,Approve,Reject', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Assistant Commissioner Approved', NULL, 'Digital Signature Pending', 'Zonal Commissioner', 'NEW ASSESSMENT', 'Create:Zonal Commissioner Approved', NULL, 'Deputy Commissioner,Additional Commissioner,Commissioner',NULL, 'Forward,Preview,Sign', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Assistant Commissioner Approved', NULL, 'Deputy Commissioner Approval Pending', 'Deputy Commissioner', 'NEW ASSESSMENT', 'Create:Deputy Commissioner Approved', 'Digital Signature Pending', 'Additional Commissioner,Commissioner','Deputy Commissioner Approved', 'Forward,Approve,Reject', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Assistant Commissioner Approved', NULL, 'Digital Signature Pending', 'Deputy Commissioner', 'NEW ASSESSMENT', 'Create:Deputy Commissioner Approved', NULL, 'Additional Commissioner,Commissioner',NULL, 'Forward,Preview,Sign', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Assistant Commissioner Approved', NULL, 'Additional Commissioner Approval Pending', 'Additional Commissioner', 'NEW ASSESSMENT', 'Create:Additional Commissioner Approved', 'Digital Signature Pending', 'Commissioner','Additional Commissioner Approved', 'Forward,Approve,Reject', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Assistant Commissioner Approved', NULL, 'Digital Signature Pending', 'Assistant Commissioner', 'NEW ASSESSMENT', 'Create:Assistant Commissioner Approved', NULL, 'Zonal Commissioner,Deputy Commissioner,Additional Commissioner,Commissioner',NULL, 'Forward,Preview,Sign', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Assistant Commissioner Approved', NULL, 'Commissioner Approval Pending', 'Commissioner', 'NEW ASSESSMENT', 'Create:Commissioner Approved', 'Digital Signature Pending', 'Commissioner','Commissioner Approved', 'Forward,Approve,Reject', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Assistant Commissioner Approved', NULL, 'Digital Signature Pending', 'Additional Commissioner', 'NEW ASSESSMENT', 'Create:Additional Commissioner Approved', NULL, 'Commissioner',NULL, 'Forward,Preview,Sign', NULL, NULL, '2015-04-01', '2099-04-01');

----Zonal Commissioner
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Zonal Commissioner Approved', NULL, 'Digital Signature Pending', 'Deputy Commissioner', 'NEW ASSESSMENT', 'Create:Deputy Commissioner Approved', NULL, 'Additional Commissioner,Commissioner',NULL, 'Forward,Preview,Sign', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Zonal Commissioner Approved', NULL, 'Deputy Commissioner Approval Pending', 'Deputy Commissioner', 'NEW ASSESSMENT', 'Create:Deputy Commissioner Approved', 'Digital Signature Pending', 'Additional Commissioner,Commissioner',NULL, 'Forward,Approve,Reject', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Zonal Commissioner Approved', NULL, 'Digital Signature Pending', 'Additional Commissioner', 'NEW ASSESSMENT', 'Create:Additional Commissioner Approved', NULL, 'Commissioner',NULL, 'Forward,Preview,Sign', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Zonal Commissioner Approved', NULL, 'Additional Commissioner Approval Pending', 'Additional Commissioner', 'NEW ASSESSMENT', 'Create:Additional Commissioner Approved', 'Digital Signature Pending', 'Commissioner',NULL, 'Forward,Approve,Reject', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Zonal Commissioner Approved', NULL, 'Commissioner Approval Pending', 'Commissioner', 'NEW ASSESSMENT', 'Create:Commissioner Approved', 'Digital Signature Pending', 'Commissioner',NULL, 'Forward,Approve,Reject', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Zonal Commissioner Approved', NULL, 'Digital Signature Pending', 'Commissioner', 'NEW ASSESSMENT', 'Create:Commissioner Approved', NULL, 'Commissioner',NULL, 'Forward,Preview,Sign', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Zonal Commissioner Approved', NULL, 'Digital Signature Pending', 'Zonal Commissioner', 'NEW ASSESSMENT', 'Create:Zonal Commissioner Approved', NULL, 'Deputy Commissioner,Additional Commissioner,Commissioner',NULL, 'Forward,Preview,Sign', NULL, NULL, '2015-04-01', '2099-04-01');

----Deputy Commissioner
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Deputy Commissioner Approved', NULL, 'Additional Commissioner Approval Pending', 'Additional Commissioner', 'NEW ASSESSMENT', 'Create:Additional Commissioner Approved', 'Digital Signature Pending', 'Commissioner','Additional Commissioner Approved', 'Forward,Approve,Reject', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Deputy Commissioner Approved', NULL, 'Digital Signature Pending', 'Additional Commissioner', 'NEW ASSESSMENT', 'Create:Additional Commissioner Approved', NULL, 'Commissioner',NULL, 'Forward,Preview,Sign', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Deputy Commissioner Approved', NULL, 'Digital Signature Pending', 'Deputy Commissioner', 'NEW ASSESSMENT', 'Create:Deputy Commissioner Approved', NULL, 'Additional Commissioner,Commissioner',NULL, 'Forward,Preview,Sign', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Deputy Commissioner Approved', NULL, 'Commissioner Approval Pending', 'Commissioner', 'NEW ASSESSMENT', 'Create:Commissioner Approved', 'Digital Signature Pending', 'Commissioner','Commissioner Approved', 'Approve,Reject', NULL, NULL, '2015-04-01', '2099-04-01');


--Additional Commissioner
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Additional Commissioner Approved', NULL, 'Commissioner Approval Pending', 'Commissioner', 'NEW ASSESSMENT', 'Create:Commissioner Approved', 'Digital Signature Pending', 'Commissioner','Commissioner Approved', 'Approve,Reject', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Additional Commissioner Approved', NULL, 'Digital Signature Pending', 'Additional Commissioner', 'NEW ASSESSMENT', 'Create:Additional Commissioner Approved', NULL, 'Commissioner',NULL, 'Forward,Preview,Sign', NULL, NULL, '2015-04-01', '2099-04-01');

--Commissioner
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Commissioner Approved', NULL, 'Digital Signature Pending', 'Commissioner', 'NEW ASSESSMENT', 'Create:Digitally Signed', 'Notice Print Pending', NULL, NULL, 'Forward,Preview,Sign', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Digitally Signed', NULL, 'Notice Print Pending', 'Senior Assistant,Junior Assistant', 'NEW ASSESSMENT', 'Create:END', 'END', NULL, NULL, 'Generate Notice', NULL, NULL, '2015-04-01', '2099-04-01');

----Rejection and common
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Rejected', NULL, 'Assistant Approval Pending', 'Senior Assistant,Junior Assistant', 'NEW ASSESSMENT', 'Create:Assistant Approved', 'Bill Collector Approval Pending', 'Bill Collector', NULL, 'Forward,Reject', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Created', NULL, NULL, 'NULL', 'NEW ASSESSMENT', 'Create:NEW', 'Assistant approval pending', 'Senior Assistant,Junior Assistant', 'Assistant Approved', 'Forward', NULL, NULL, '2015-04-01', '2099-04-01');
INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate) VALUES (NEXTVAL('seq_eg_wf_matrix'), 'ANY', 'PropertyImpl', 'Create:Rejected', NULL, 'UD Revenue Inspector Approval Pending', 'UD Revenue Inspector', 'NEW ASSESSMENT', 'Create:UD Revenue Inspector Approved', 'Revenue Officer Approval Pending', 'Revenue officer', NULL, 'Forward,Reject', NULL, NULL, '2015-04-01', '2099-04-01');