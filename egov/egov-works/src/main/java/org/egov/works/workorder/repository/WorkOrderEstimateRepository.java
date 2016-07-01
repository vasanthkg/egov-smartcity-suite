/*
 * eGov suite of products aim to improve the internal efficiency,transparency,
 *    accountability and the service delivery of the government  organizations.
 *
 *     Copyright (C) <2015>  eGovernments Foundation
 *
 *     The updated version of eGov suite of products as by eGovernments Foundation
 *     is available at http://www.egovernments.org
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program. If not, see http://www.gnu.org/licenses/ or
 *     http://www.gnu.org/licenses/gpl.html .
 *
 *     In addition to the terms of the GPL license to be adhered to in using this
 *     program, the following additional terms are to be complied with:
 *
 *         1) All versions of this program, verbatim or modified must carry this
 *            Legal Notice.
 *
 *         2) Any misrepresentation of the origin of the material is prohibited. It
 *            is required that all modified versions of this material be marked in
 *            reasonable ways as different from the original version.
 *
 *         3) This license does not grant any rights to any user of the program
 *            with regards to rights under trademark law for use of the trade names
 *            or trademarks of eGovernments Foundation.
 *
 *   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 */
package org.egov.works.workorder.repository;

import java.util.List;

import org.egov.works.workorder.entity.WorkOrderEstimate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkOrderEstimateRepository extends JpaRepository<WorkOrderEstimate, Long> {

    WorkOrderEstimate findByWorkOrder_IdAndEstimate_IdAndWorkOrder_EgwStatus_Code(final Long workOrderId,
            final Long estimateId, final String status);

    WorkOrderEstimate findByEstimate_IdAndWorkOrder_EgwStatus_Code(final Long estimateId, final String status);

    WorkOrderEstimate findByWorkOrder_Id(final Long workOrderId);

    @Query("select distinct(woe.workOrder.workOrderNumber) from WorkOrderEstimate as woe where upper(woe.workOrder.workOrderNumber) like upper(:workOrderNumber) and  woe.workOrder.egwStatus.code =:workOrderStatus and not exists (select distinct(cbr.workOrderEstimate.workOrder) from ContractorBillRegister as cbr where woe.id = cbr.workOrderEstimate.id and upper(cbr.billstatus) != :billStatus and cbr.billtype = :billtype)")
    List<String> findWorkOrderNumbersToCreateMB(@Param("workOrderNumber") String workOrderNumber,
            @Param("workOrderStatus") String workOrderStatus, @Param("billStatus") String billStatus,
            @Param("billtype") String billtype);

    @Query("select distinct(cbr.workOrderEstimate.workOrder.workOrderNumber) from ContractorBillRegister as cbr where upper(cbr.billstatus) != :status and cbr.billtype = :billtype")
    List<String> getCancelledWorkOrderNumbersByBillType(@Param("status") String billstatus, @Param("billtype") String finalBill);

    @Query("select distinct(woe.workOrder.workOrderNumber) from WorkOrderEstimate as woe where upper(woe.workOrder.workOrderNumber) like upper(:workOrderNumber) and woe.workOrder.egwStatus.code in(:status1,:status2)")
    List<String> findWordOrderByStatus(@Param("workOrderNumber") String workOrderNumber, @Param("status1") String status1,
            @Param("status2") String status2);

    @Query("select distinct(woe.estimate.estimateNumber) from WorkOrderEstimate as woe where upper(woe.estimate.estimateNumber) like upper(:estimateNumber) and woe.workOrder.egwStatus.code in(:status1,:status2)")
    List<String> findEstimatesByWorkOrderStatus(@Param("estimateNumber") String estimateNumber, @Param("status1") String status1,
            @Param("status2") String status2);

    List<WorkOrderEstimate> findByEstimate_EstimateNumberContainingIgnoreCaseAndWorkOrder_EgwStatus_codeEquals(
            final String estimateNumber,
            final String statusCode);

}
