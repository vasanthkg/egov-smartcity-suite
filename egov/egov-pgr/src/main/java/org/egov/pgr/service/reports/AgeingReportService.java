/**
 * eGov suite of products aim to improve the internal efficiency,transparency,
   accountability and the service delivery of the government  organizations.

    Copyright (C) <2015>  eGovernments Foundation

    The updated version of eGov suite of products as by eGovernments Foundation
    is available at http://www.egovernments.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see http://www.gnu.org/licenses/ or
    http://www.gnu.org/licenses/gpl.html .

    In addition to the terms of the GPL license to be adhered to in using this
    program, the following additional terms are to be complied with:

        1) All versions of this program, verbatim or modified must carry this
           Legal Notice.

        2) Any misrepresentation of the origin of the material is prohibited. It
           is required that all modified versions of this material be marked in
           reasonable ways as different from the original version.

        3) This license does not grant any rights to any user of the program
           with regards to rights under trademark law for use of the trade names
           or trademarks of eGovernments Foundation.

  In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 */
package org.egov.pgr.service.reports;

import java.util.Date;

import org.egov.infstr.utils.HibernateUtil;
import org.hibernate.SQLQuery;
import org.joda.time.DateTime;
import org.joda.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class AgeingReportService {
    private static final Logger LOG = LoggerFactory.getLogger(AgeingReportService.class);
    private static final String COMPLAINTSTATUS_COMPLETED = "Completed";

    public SQLQuery getageingReportQuery(final DateTime fromDate, final DateTime toDate, final String typeofReport,
            final String complaintDateType, final String groupBy) {

        final StringBuffer query = new StringBuffer();

        if (groupBy != null && !"".equals(groupBy) && groupBy.equalsIgnoreCase("ByBoundary"))
            query.append("SELECT bndry.name as name, ");// TODO CHECK
        // DEPARTMENTWISE
        // OR ZONE WISE
        else
            query.append("SELECT dept.name as name, ");

        if (typeofReport != null && !"".equals(typeofReport)
                && typeofReport.equalsIgnoreCase(COMPLAINTSTATUS_COMPLETED))
            query.append(" COUNT(CASE WHEN date_part('day',(cd.createddate - state.createddate)) > :grtthn90 THEN 1 END) grtthn90, "
                    + " COUNT(CASE WHEN date_part('day',(cd.createddate - state.createddate)) BETWEEN :grtthn45 AND :lsthn90 THEN 1 END) btw45to90, "
                    + " COUNT(CASE WHEN date_part('day',(cd.createddate - state.createddate)) BETWEEN :grtthn15 AND :lsthn45 THEN 1 END) btw15to45, "
                    + " COUNT(CASE WHEN date_part('day',(cd.createddate - state.createddate)) BETWEEN :zero AND :lsthn15 THEN 1 END) lsthn15 "
                    + " FROM egpgr_complaintstatus cs  ,egpgr_complainttype ctype, eg_wf_states state, egpgr_complaint cd  ");
        else
            query.append(" COUNT(CASE WHEN cd.createddate < :grtthn90 THEN 1 END) grtthn90, "
                    + " COUNT(CASE WHEN cd.createddate BETWEEN :lsthn90 AND :grtthn45 THEN 1 END) btw45to90, "
                    + " COUNT(CASE WHEN cd.createddate BETWEEN :lsthn45 AND  :grtthn15 THEN 1 END) btw15to45, "
                    + " COUNT(CASE WHEN cd.createddate BETWEEN :lsthn15 AND :currdate THEN 1 END) lsthn15 "
                    + " FROM egpgr_complaintstatus cs  ,egpgr_complainttype ctype ,egpgr_complaint cd  ");

        if (groupBy != null && !"".equals(groupBy) && groupBy.equalsIgnoreCase("ByBoundary"))
            query.append("  left JOIN eg_boundary bndry on cd.location =bndry.id ");
        else
            query.append("  left JOIN eg_department dept on cd.department =dept.id ");

        buildWhereClause(fromDate, toDate, typeofReport, complaintDateType, query);

        if (groupBy != null && !"".equals(groupBy) && groupBy.equalsIgnoreCase("ByBoundary"))
            query.append("  group by bndry.name ");
        else
            query.append("  group by dept.name ");

        return setParameterForAgeingReport(query.toString(), typeofReport, fromDate, toDate, complaintDateType);
    }

    private void buildWhereClause(final DateTime fromDate, final DateTime toDate, final String typeofReport,
            final String complaintDateType, final StringBuffer query) {

        if (typeofReport != null && !"".equals(typeofReport)
                && typeofReport.equalsIgnoreCase(COMPLAINTSTATUS_COMPLETED)) {
            query.append(" WHERE  cd.state_id=state.id and  cd.status  = cs.id and cd.complainttype= ctype.id  ");
            query.append(" AND cs.name IN ('COMPLETED','REJECTED', 'WITHDRAWN','CLOSED') ");
        } else {
            query.append(" WHERE cd.status  = cs.id and cd.complainttype= ctype.id  ");
            query.append(" AND cs.name IN ('REGISTERED','FORWARDED', 'PROCESSING','REOPENED') ");
        }

        if (complaintDateType != null && complaintDateType.equals("lastsevendays"))
            query.append(" and cd.createddate >=   :fromDates ");
        else if (complaintDateType != null && complaintDateType.equals("lastthirtydays"))
            query.append(" and cd.createddate >=   :fromDates ");
        else if (complaintDateType != null && complaintDateType.equals("lastninetydays"))
            query.append(" and cd.createddate >=   :fromDates ");
        else if (fromDate != null && toDate != null)
            query.append(" and ( cd.createddate BETWEEN :fromDates and :toDates) ");
        else if (fromDate != null)
            query.append(" and cd.createddate >=   :fromDates ");
        else if (toDate != null)
            query.append(" and cd.createddate <=  :toDates ");
    }

    private SQLQuery setParameterForAgeingReport(final String querykey, final String typeofReport, final DateTime fromDate,
            final DateTime toDate, final String complaintDateType) {
        final SQLQuery qry = HibernateUtil.getCurrentSession().createSQLQuery(querykey);

        if (typeofReport != null && !"".equals(typeofReport)
                && typeofReport.equalsIgnoreCase(COMPLAINTSTATUS_COMPLETED)) {
            qry.setParameter("grtthn90", 90);
            qry.setParameter("lsthn90", 90);
            qry.setParameter("grtthn45", 45.0001);
            qry.setParameter("grtthn15", 15.0001);
            qry.setParameter("lsthn45", 45);
            qry.setParameter("lsthn15", 15);
            qry.setParameter("zero", 0);

        } else {

            qry.setParameter("grtthn90", getCurrentDateWithOutTime().minusDays(90).toDate());
            qry.setParameter("grtthn45", getCurrentDateWithOutTime().minusDays(46).toDate());
            qry.setParameter("lsthn90", getCurrentDateWithEndOfDayTime().minusDays(90).toDate());
            qry.setParameter("grtthn15", getCurrentDateWithOutTime().minusDays(16).toDate());
            qry.setParameter("lsthn45", getCurrentDateWithEndOfDayTime().minusDays(45).toDate());
            qry.setParameter("lsthn15", getCurrentDateWithOutTime().minusDays(15).toDate());
            qry.setParameter("currdate", getCurrentDateWithEndOfDayTime().toDate());
        }

        if (complaintDateType != null && complaintDateType.equals("lastsevendays"))
            qry.setParameter("fromDates", getCurrentDateWithOutTime().minusDays(7).toDate());
        else if (complaintDateType != null && complaintDateType.equals("lastthirtydays"))
            qry.setParameter("fromDates", getCurrentDateWithOutTime().minusDays(30).toDate());
        else if (complaintDateType != null && complaintDateType.equals("lastninetydays"))
            qry.setParameter("fromDates", getCurrentDateWithOutTime().minusDays(90).toDate());
        else if (fromDate != null && toDate != null) {
            qry.setParameter("fromDates", resetTimeByPassingDate(fromDate));
            qry.setParameter("toDates", getEndOfDayByDate(toDate));

        } else if (fromDate != null)
            qry.setParameter("fromDates", resetTimeByPassingDate(fromDate));
        else if (toDate != null)
            qry.setParameter("toDates", getEndOfDayByDate(toDate));
        return qry;
      }

    private Date getEndOfDayByDate(final DateTime fromDate) {
        return fromDate.withTime(23, 59, 59, 999).toDate();
    }

    private Date resetTimeByPassingDate(final DateTime fromDate) {
        return fromDate.withTime(0, 0, 0, 0).toDate();
    }

    private DateTime getCurrentDateWithOutTime() {
        return new LocalDateTime().withTime(0, 0, 0, 0).toDateTime();
    }

    private DateTime getCurrentDateWithEndOfDayTime() {
        return new LocalDateTime().withTime(23, 59, 59, 999).toDateTime();
    }

}
