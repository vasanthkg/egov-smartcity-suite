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
package org.egov.works.web.controller.letterofacceptance;

import java.util.ArrayList;
import java.util.List;

import org.egov.works.letterofacceptance.entity.SearchRequestContractor;
import org.egov.works.letterofacceptance.entity.SearchRequestLetterOfAcceptance;
import org.egov.works.letterofacceptance.service.LetterOfAcceptanceService;
import org.egov.works.master.service.ContractorService;
import org.egov.works.models.masters.Contractor;
import org.egov.works.models.masters.ContractorDetail;
import org.egov.works.web.adaptor.LetterOfAcceptanceForMilestoneJSONAdaptor;
import org.egov.works.web.adaptor.SearchContractorJsonAdaptor;
import org.egov.works.web.adaptor.SearchLetterOfAcceptanceForOfflineStatusJsonAdaptor;
import org.egov.works.web.adaptor.SearchLetterOfAcceptanceJsonAdaptor;
import org.egov.works.web.adaptor.SearchLetterOfAcceptanceToCancelJson;
import org.egov.works.web.adaptor.SearchLetterOfAcceptanceToCreateContractorBillJson;
import org.egov.works.workorder.entity.WorkOrder;
import org.egov.works.workorder.entity.WorkOrderEstimate;
import org.egov.works.workorder.service.WorkOrderEstimateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Controller
@RequestMapping(value = "/letterofacceptance")
public class AjaxLetterOfAcceptanceController {
    @Autowired
    private ContractorService contractorService;

    @Autowired
    private LetterOfAcceptanceService letterOfAcceptanceService;

    @Autowired
    private SearchLetterOfAcceptanceJsonAdaptor searchLetterOfAcceptanceJsonAdaptor;

    @Autowired
    private SearchContractorJsonAdaptor searchContractorJsonAdaptor;

    @Autowired
    private SearchLetterOfAcceptanceToCreateContractorBillJson searchLetterOfAcceptanceToCreateContractorBillJson;

    @Autowired
    private SearchLetterOfAcceptanceToCancelJson searchLetterOfAcceptanceToCancelJson;

    @Autowired
    private LetterOfAcceptanceForMilestoneJSONAdaptor letterOfAcceptanceForMilestoneJSONAdaptor;

    @Autowired
    private ResourceBundleMessageSource messageSource;

    @Autowired
    private WorkOrderEstimateService workOrderEstimateService;

    @Autowired
    private SearchLetterOfAcceptanceForOfflineStatusJsonAdaptor searchLetterOfAcceptanceForOfflineStatusJsonAdaptor;

    @RequestMapping(value = "/ajaxcontractors-loa", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Contractor> findContractorsByCodeOrName(@RequestParam final String name) {
        return contractorService.getContractorsByCodeOrName(name);
    }

    @RequestMapping(value = "/ajaxsearch-loa", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE)
    public @ResponseBody String ajaxSearch(final Model model,
            @ModelAttribute final SearchRequestLetterOfAcceptance searchRequestLetterOfAcceptance) {
        final List<WorkOrder> searchLoaList = letterOfAcceptanceService.searchLetterOfAcceptance(searchRequestLetterOfAcceptance);
        final String result = new StringBuilder("{ \"data\":").append(toSearchLetterOfAcceptanceJson(searchLoaList))
                .append("}").toString();
        return result;
    }

    public Object toSearchLetterOfAcceptanceJson(final Object object) {
        final GsonBuilder gsonBuilder = new GsonBuilder();
        final Gson gson = gsonBuilder.registerTypeAdapter(WorkOrder.class, searchLetterOfAcceptanceJsonAdaptor).create();
        final String json = gson.toJson(object);
        return json;
    }

    @RequestMapping(value = "/ajaxestimatenumbers", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> findEstimateNumbersForLOA(@RequestParam final String name) {
        return letterOfAcceptanceService.findLoaEstimateNumbers(name);
    }

    @RequestMapping(value = "/ajaxloanumber", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> findLoaNumbers(@RequestParam final String name) {
        return letterOfAcceptanceService.getWorkOrderByNumber(name);
    }

    @RequestMapping(value = "/ajaxsearchcontractors-loaforcontractorbill", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> findLoaContractorforContractorBill(@RequestParam final String name) {
        return letterOfAcceptanceService.findDistinctContractorsInWorkOrderByCodeOrName(name);
    }

    @RequestMapping(value = "/ajaxsearch-loaforcontractorbill", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE)
    public @ResponseBody String ajaxSearchForContractorBill(final Model model,
            @ModelAttribute final SearchRequestLetterOfAcceptance searchRequestLetterOfAcceptance) {
        final List<WorkOrderEstimate> searchWorkOrderEstimateList = letterOfAcceptanceService
                .searchLetterOfAcceptanceForContractorBill(searchRequestLetterOfAcceptance);
        final String result = new StringBuilder("{ \"data\":")
                .append(toSearchLetterOfAcceptanceToCreateContractorBillJson(searchWorkOrderEstimateList))
                .append("}").toString();
        return result;
    }

    public Object toSearchLetterOfAcceptanceToCreateContractorBillJson(final Object object) {
        final GsonBuilder gsonBuilder = new GsonBuilder();
        final Gson gson = gsonBuilder
                .registerTypeAdapter(WorkOrderEstimate.class, searchLetterOfAcceptanceToCreateContractorBillJson)
                .create();
        final String json = gson.toJson(object);
        return json;
    }

    @RequestMapping(value = "/ajaxestimatenumbers-contractorbill", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> findEstimateNumbersForContractorBill(@RequestParam final String estimateNumber) {
        return letterOfAcceptanceService.getApprovedEstimateNumbersForCreateContractorBill(estimateNumber);
    }

    @RequestMapping(value = "/ajaxloanumber-contractorbill", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> findLoaNumbersForContractorBill(@RequestParam final String workOrderNumber) {
        return letterOfAcceptanceService.getApprovedWorkOrdersForCreateContractorBill(workOrderNumber);
    }

    @RequestMapping(value = "/ajaxsearchcontractors-loa", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> findLoaContractor(@RequestParam final String contractorname) {
        return letterOfAcceptanceService.getApprovedContractorsForCreateContractorBill(contractorname);
    }

    @RequestMapping(value = "/ajaxvalidate-createcontractorbill", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Boolean validateWorkOrderNumberForCreateContractorBill(
            @RequestParam("workOrderId") final Long workOrderId) {
        return letterOfAcceptanceService.validateContractorBillInWorkflowForWorkorder(workOrderId);
    }

    @RequestMapping(value = "/ajaxcontractorsbycode-loa", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Contractor> findContractorsByCode(@RequestParam final String name) {
        return contractorService.getContractorsByCode(name);
    }

    @RequestMapping(value = "/ajax-contractorsforloa", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE)
    public @ResponseBody String ajaxContractorSearch(final Model model,
            @ModelAttribute final SearchRequestContractor searchRequestContractor) {
        final List<ContractorDetail> contractorDetails = letterOfAcceptanceService
                .searchContractorDetails(searchRequestContractor);
        final List<Contractor> contractors = new ArrayList<Contractor>();
        for (final ContractorDetail cd : contractorDetails)
            if (!contractors.contains(cd.getContractor()))
                contractors.add(cd.getContractor());
        final String result = new StringBuilder("{ \"data\":").append(toSearchContractorJson(contractors))
                .append("}").toString();
        return result;
    }

    public Object toSearchContractorJson(final Object object) {
        final GsonBuilder gsonBuilder = new GsonBuilder();
        final Gson gson = gsonBuilder.registerTypeAdapter(Contractor.class, searchContractorJsonAdaptor).create();
        final String json = gson.toJson(object);
        return json;
    }

    @RequestMapping(value = "/ajaxsearch-loanumber", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> findApprovedLoaNumbers(@RequestParam final String workOrderNumber) {
        return letterOfAcceptanceService.findLoaWorkOrderNumberForMilestone(workOrderNumber);
    }

    @RequestMapping(value = "/ajaxworkidentificationnumber-milestone", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> findworkIdNumbersForLoa(@RequestParam final String code) {
        return letterOfAcceptanceService.findWorkIdentificationNumbersToCreateMilestone(code);
    }

    @RequestMapping(value = "/ajaxsearch-loaformilestone", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE)
    public @ResponseBody String showSearchLoaToCreateMilestone(
            @ModelAttribute final SearchRequestLetterOfAcceptance searchRequestLetterOfAcceptance) {
        final List<WorkOrderEstimate> workOrderEstimate = letterOfAcceptanceService
                .getLoaForCreateMilestone(searchRequestLetterOfAcceptance);
        final String result = new StringBuilder("{ \"data\":").append(toSearchLOAForCreateMilestoneJson(workOrderEstimate))
                .append("}").toString();
        return result;
    }

    public Object toSearchLOAForCreateMilestoneJson(final Object object) {
        final GsonBuilder gsonBuilder = new GsonBuilder();
        final Gson gson = gsonBuilder.registerTypeAdapter(WorkOrderEstimate.class, letterOfAcceptanceForMilestoneJSONAdaptor)
                .create();
        final String json = gson.toJson(object);
        return json;
    }

    @RequestMapping(value = "/ajaxsearch-loatomodify", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE)
    public @ResponseBody String ajaxSearchLoaToModify(final Model model,
            @ModelAttribute final SearchRequestLetterOfAcceptance searchRequestLetterOfAcceptance) {
        final List<WorkOrder> searchLoaList = letterOfAcceptanceService
                .searchLetterOfAcceptanceToModify(searchRequestLetterOfAcceptance);
        final String result = new StringBuilder("{ \"data\":").append(toSearchLetterOfAcceptanceJson(searchLoaList))
                .append("}").toString();
        return result;
    }

    @RequestMapping(value = "/cancel/ajax-search", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE)
    public @ResponseBody String searchLOAsToCancel(final Model model,
            @ModelAttribute final SearchRequestLetterOfAcceptance searchRequestLetterOfAcceptance) {
        final List<WorkOrder> workOrders = letterOfAcceptanceService
                .searchLOAsToCancel(searchRequestLetterOfAcceptance);
        final String result = new StringBuilder("{ \"data\":")
                .append(toSearchLOAsToCancelJson(workOrders))
                .append("}").toString();
        return result;
    }

    public Object toSearchLOAsToCancelJson(final Object object) {
        final GsonBuilder gsonBuilder = new GsonBuilder();
        final Gson gson = gsonBuilder.registerTypeAdapter(WorkOrder.class, searchLetterOfAcceptanceToCancelJson)
                .create();
        final String json = gson.toJson(object);
        return json;
    }

    @RequestMapping(value = "/ajaxworkidentificationnumbers-loatocancel", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> findWorkIdNumbersToCancelLOA(@RequestParam final String code) {
        return letterOfAcceptanceService.findWorkIdentificationNumbersToSearchLOAToCancel(code);
    }

    @RequestMapping(value = "/ajaxcontractors-loatocancel", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> findContractorsToCancelLOA(@RequestParam final String code) {
        return letterOfAcceptanceService.findContractorsToSearchLOAToCancel(code);
    }

    @RequestMapping(value = "/ajax-checkifbillscreated", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String checkIfBillsCreated(@RequestParam final Long id) {
        final String billNumbers = letterOfAcceptanceService.checkIfBillsCreated(id);
        final String message = messageSource.getMessage("error.loa.bills.created", new String[] { billNumbers }, null);
        if (billNumbers.equals(""))
            return "";

        return message;
    }

    @RequestMapping(value = "/ajaxworkorder-mbheader", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> findWorkOrderForMBHeader(@RequestParam final String workOrderNo) {
        return workOrderEstimateService.findWorkOrderForMBHeader(workOrderNo);
    }

    @RequestMapping(value = "/ajaxsearch-loatosetofflinestatus", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE)
    public @ResponseBody String ajaxSearchLoaToSetOfflineStatus(final Model model,
            @ModelAttribute final SearchRequestLetterOfAcceptance searchRequestLetterOfAcceptance) {
        final List<WorkOrderEstimate> searchLoaList = letterOfAcceptanceService
                .searchLetterOfAcceptanceForOfflineStatus(searchRequestLetterOfAcceptance);
        final String result = new StringBuilder("{ \"data\":")
                .append(toSearchLetterOfAcceptanceJsonToSetOfflineStatus(searchLoaList))
                .append("}").toString();
        return result;
    }

    public Object toSearchLetterOfAcceptanceJsonToSetOfflineStatus(final Object object) {
        final GsonBuilder gsonBuilder = new GsonBuilder();
        final Gson gson = gsonBuilder
                .registerTypeAdapter(WorkOrderEstimate.class, searchLetterOfAcceptanceForOfflineStatusJsonAdaptor).create();
        final String json = gson.toJson(object);
        return json;
    }

    @RequestMapping(value = "/ajaxestimatenumbers-loa", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<String> findApprovedEstimateNumbersForLOA(@RequestParam final String estimateNumber) {
        return workOrderEstimateService.getEstimateNumbersForApprovedLoa(estimateNumber);
    }
}
