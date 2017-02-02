<%--
  ~ eGov suite of products aim to improve the internal efficiency,transparency,
  ~      accountability and the service delivery of the government  organizations.
  ~
  ~       Copyright (C) 2016  eGovernments Foundation
  ~
  ~       The updated version of eGov suite of products as by eGovernments Foundation
  ~       is available at http://www.egovernments.org
  ~
  ~       This program is free software: you can redistribute it and/or modify
  ~       it under the terms of the GNU General Public License as published by
  ~       the Free Software Foundation, either version 3 of the License, or
  ~       any later version.
  ~
  ~       This program is distributed in the hope that it will be useful,
  ~       but WITHOUT ANY WARRANTY; without even the implied warranty of
  ~       MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  ~       GNU General Public License for more details.
  ~
  ~       You should have received a copy of the GNU General Public License
  ~       along with this program. If not, see http://www.gnu.org/licenses/ or
  ~       http://www.gnu.org/licenses/gpl.html .
  ~
  ~       In addition to the terms of the GPL license to be adhered to in using this
  ~       program, the following additional terms are to be complied with:
  ~
  ~           1) All versions of this program, verbatim or modified must carry this
  ~              Legal Notice.
  ~
  ~           2) Any misrepresentation of the origin of the material is prohibited. It
  ~              is required that all modified versions of this material be marked in
  ~              reasonable ways as different from the original version.
  ~
  ~           3) This license does not grant any rights to any user of the program
  ~              with regards to rights under trademark law for use of the trade names
  ~              or trademarks of eGovernments Foundation.
  ~
  ~     In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
  --%>
<%@ taglib uri="/WEB-INF/taglibs/cdn.tld" prefix="cdn"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<style>
      .position_alert{
        position:fixed;z-index:9999;top:85px;right:20px;background:#F2DEDE;padding:10px 20px;border-radius: 5px;
      }
</style>
<form:form id="contractorAdvanceForm" class="form-horizontal form-groups-bordered" modelAttribute="contractorAdvanceRequisition" role="form" action="" method="post" enctype="multipart/form-data">
	<input type="hidden" id="defaultDepartmentId" value="${defaultDepartmentId }" />
	<input id="cancelConfirm" type="hidden" value="<spring:message code="msg.cancel.arf.confirm" />" />
	<input id="errorAdvanceExceeded" type="hidden" value="<spring:message code="error.advance.exceeded" />" />
	<input id="errorAdvanceZero" type="hidden" value="<spring:message code="error.creditordebitamount.zero" />" />
	<input type="hidden" name="id" id="id" value="${contractorAdvanceRequisition.id }" /> 
	<input type="hidden" name="mode" id="mode" value="${mode }" />
	<input type="hidden" name="totalPartBillsAmount" id="totalPartBillsAmount" value="${totalPartBillsAmount }" />
	<input type="hidden"  name="workOrderEstimate" id="workOrderEstimate" value="${contractorAdvanceRequisition.workOrderEstimate.id}" />
	<div class="position_alert">
		<form:hidden path="advanceRequisitionAmount" id="advanceRequisitionAmount" value='${contractorAdvanceRequisition.advanceRequisitionAmount}'/>
		<spring:message	code="lbl.advance.amount" /> : &#8377 <span id="advanceAmount"><c:out value="${contractorAdvanceRequisition.advanceRequisitionAmount }" default="0.0"></c:out></span>
	</div>
	<div class="new-page-header"><spring:message code="title.contractoradvance.update" /></div>
	<div>
		<spring:hasBindErrors name="contractorAdvanceRequisition">
       		<div class="alert alert-danger col-md-10 col-md-offset-1">
	      			<form:errors path="*" cssClass="error-msg add-margin" /><br/>
	      	</div>
       	</spring:hasBindErrors>
       </div>
	<div class="panel-body">
		<jsp:include page="contractoradvance-header.jsp"/>
		<c:if test="${mode == 'edit'}">
			<jsp:include page="contractoradvance-details.jsp"/>
		</c:if>
		<c:if test="${mode == 'view' }">
			<jsp:include page="contractoradvance-detailsview.jsp"/>
		</c:if>
	</div>
	<jsp:include page="../common/uploaddocuments.jsp"/>
	<c:if test="${!workflowHistory.isEmpty() }">
		<jsp:include page="../common/commonworkflowhistory-view.jsp"></jsp:include>
	</c:if>
	<jsp:include page="../common/commonworkflowmatrix.jsp"/>
	<div class="buttonbottom" align="center">
		<jsp:include page="../common/commonworkflowmatrix-button.jsp" />
	</div>
</form:form>  
	
<script src="<cdn:url value='/resources/js/contractoradvance/contractoradvance.js?rnd=${app_release_no}'/>"></script>
<script src="<cdn:url value='/resources/global/js/egov/inbox.js?rnd=${app_release_no}' context='/egi'/>"></script>