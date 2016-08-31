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
package org.egov.works.web.controller.revisionestimate;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.egov.infra.exception.ApplicationRuntimeException;
import org.egov.works.abstractestimate.entity.Activity;
import org.egov.works.revisionestimate.entity.RevisionAbstractEstimate;
import org.egov.works.revisionestimate.entity.SearchRevisionEstimate;
import org.egov.works.revisionestimate.entity.enums.RevisionType;
import org.egov.works.revisionestimate.service.RevisionEstimateService;
import org.egov.works.web.adaptor.RevisionEstimateJsonAdaptor;
import org.egov.works.web.adaptor.SearchActivityJsonAdaptor;
import org.egov.works.workorder.entity.WorkOrderEstimate;
import org.egov.works.workorder.service.WorkOrderEstimateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

@Controller
@RequestMapping(value = "/revisionestimate")
public class AjaxRevisionEstimateController {

    @Autowired
    private RevisionEstimateService revisionEstimateService;

    @Autowired
    private RevisionEstimateJsonAdaptor revisionEstimateJsonAdaptor;

    @Autowired
    private SearchActivityJsonAdaptor searchActivityJsonAdaptor;

    @Autowired
    private WorkOrderEstimateService workOrderEstimateService;

    @Autowired
    private MessageSource messageSource;

    @RequestMapping(value = "/getrevisionestimatesbynumber", method = RequestMethod.GET)
    public @ResponseBody List<String> findAbstractEstimateNumbersForAbstractEstimate(
            @RequestParam final String revisionEstimateNumber) {
        return revisionEstimateService.getRevisionEstimateByEstimateNumberLike(revisionEstimateNumber);
    }

    @RequestMapping(value = "/ajaxsearch", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE)
    public @ResponseBody String searchRevisionEstimates(
            @ModelAttribute final SearchRevisionEstimate searchRevisionEstimate, final Model model) {
        final List<SearchRevisionEstimate> searchRevisionEstimates = revisionEstimateService
                .searchRevisionEstimates(searchRevisionEstimate);
        final String result = new StringBuilder("{ \"data\":").append(toJson(searchRevisionEstimates)).append("}")
                .toString();
        return result;
    }

    public Object toJson(final Object object) {
        final GsonBuilder gsonBuilder = new GsonBuilder();
        final Gson gson = gsonBuilder.registerTypeAdapter(SearchRevisionEstimate.class, revisionEstimateJsonAdaptor)
                .create();
        final String json = gson.toJson(object);
        return json;
    }

    @RequestMapping(value = "/ajax-searchactivities", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE)
    public @ResponseBody String searchActivities(final HttpServletRequest request) {
        final Long workOrderEstimateId = Long.parseLong(request.getParameter("workOrderEstimateId"));
        final String description = request.getParameter("description");
        final String itemCode = request.getParameter("itemCode");
        final String sorType = request.getParameter("sorType");
        final WorkOrderEstimate workOrderEstimate = workOrderEstimateService
                .getWorkOrderEstimateById(workOrderEstimateId);
        final List<Activity> activities = revisionEstimateService
                .searchActivities(workOrderEstimate.getEstimate().getId(), sorType);
        final List<Activity> activityList = new ArrayList<Activity>();
        // TODO re factor this code to handle via criteria
        if (description != null && !description.equals(""))
            for (final Activity act : activities)
                if (act.getSchedule() != null
                        && act.getSchedule().getDescription().toLowerCase().contains(description.toLowerCase())
                        || act.getNonSor() != null
                                && act.getNonSor().getDescription().toLowerCase().contains(description.toLowerCase()))
                    activityList.add(act);

        if (!activityList.isEmpty()) {
            activities.clear();
            activities.addAll(activityList);
        }

        if (itemCode != null && !itemCode.equals("")) {
            activityList.clear();
            for (final Activity act : activities)
                if (act.getSchedule() != null
                        && act.getSchedule().getCode().toLowerCase().contains(itemCode.toLowerCase()))
                    activityList.add(act);
        }

        if (!activityList.isEmpty()) {
            activities.clear();
            activities.addAll(activityList);
        }

        final List<Activity> updatedActivities = mergeChangedQuantities(activities);

        final String result = new StringBuilder("{ \"data\":").append(toSearchActivityResultJson(updatedActivities))
                .append("}").toString();
        return result;
    }

    private List<Activity> mergeChangedQuantities(final List<Activity> activities) {
        final List<Activity> updatedActivities = new ArrayList<>();
        for (final Activity activity : activities)
            if (activity.getParent() == null)
                updatedActivities.add(activity);
            else if (updatedActivities.isEmpty())
                updatedActivities.add(activity);
            else
                for (final Activity act : updatedActivities)
                    if (act.getId().equals(activity.getParent().getId()))
                        if (activity.getRevisionType().equals(RevisionType.ADDITIONAL_QUANTITY))
                            act.setQuantity(act.getQuantity() + activity.getQuantity());
                        else
                            act.setQuantity(act.getQuantity() - activity.getQuantity());
        return updatedActivities;
    }

    public Object toSearchActivityResultJson(final Object object) {
        final GsonBuilder gsonBuilder = new GsonBuilder();
        final Gson gson = gsonBuilder.registerTypeAdapter(Activity.class, searchActivityJsonAdaptor).create();
        final String json = gson.toJson(object);
        return json;
    }

    @RequestMapping(value = "/ajaxsearchretocancel", method = RequestMethod.GET, produces = MediaType.TEXT_PLAIN_VALUE)
    public @ResponseBody List<String> searchREToCancel(final String estimateNumber) {
        return revisionEstimateService.findRENumbersToCancel(estimateNumber);
    }

    @RequestMapping(value = "/cancel/ajax-search", method = RequestMethod.POST, produces = MediaType.TEXT_PLAIN_VALUE)
    public @ResponseBody String searchRevisionEstimatesToCancel(
            @ModelAttribute final SearchRevisionEstimate searchRevisionEstimate, final Model model) {
        final List<SearchRevisionEstimate> searchRevisionEstimates = revisionEstimateService
                .searchRevisionEstimatesToCancel(searchRevisionEstimate);
        final String result = new StringBuilder("{ \"data\":").append(revisionEstimatesToJson(searchRevisionEstimates))
                .append("}").toString();
        return result;
    }

    public Object revisionEstimatesToJson(final Object object) {
        final GsonBuilder gsonBuilder = new GsonBuilder();
        final Gson gson = gsonBuilder.registerTypeAdapter(SearchRevisionEstimate.class, revisionEstimateJsonAdaptor)
                .create();
        final String json = gson.toJson(object);
        return json;
    }

    @RequestMapping(value = "/ajax-checkifdependantObjectscreated", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String checkIfBillsCreated(@RequestParam final Long reId) {
        String message = "";
        final RevisionAbstractEstimate revisionEstimate = revisionEstimateService.getRevisionEstimateById(reId);
        final WorkOrderEstimate workOrderEstimate = workOrderEstimateService
                .findWorkOrderByRevisionEstimateNumber(revisionEstimate.getEstimateNumber());
        final String mbRefNumbers = revisionEstimateService.checkIfMBCreatedForRE(workOrderEstimate);
        if (!mbRefNumbers.equals(""))
            message = messageSource.getMessage("error.re.mb.created", new String[] { mbRefNumbers }, null);
        else {
            final String revisionEstimates = revisionEstimateService
                    .getRevisionEstimatesGreaterThanCurrent(revisionEstimate.getParent().getId(),
                            revisionEstimate.getCreatedDate());
            if (!revisionEstimates.equals(""))
                message = messageSource.getMessage("error.reexists.greaterthancreateddate",
                        new String[] { revisionEstimates }, null);
        }
        return message;
    }

    @RequestMapping(value = "/validatere/{workOrderEstimateId}", method = RequestMethod.GET, produces = MediaType.TEXT_PLAIN_VALUE)
    public @ResponseBody String validateRevisionEstimate(@PathVariable final Long workOrderEstimateId,
            final HttpServletRequest request, final HttpServletResponse response) {
        final JsonObject jsonObject = new JsonObject();
        final WorkOrderEstimate workOrderEstimate = workOrderEstimateService.getWorkOrderEstimateById(workOrderEstimateId);
        revisionEstimateService.validateREInDrafts(workOrderEstimate.getEstimate().getId(), jsonObject, null);
        revisionEstimateService.validateREInWorkFlow(workOrderEstimate.getEstimate().getId(), jsonObject, null);
        if (jsonObject.toString().length() > 2) {
            sendAJAXResponse(jsonObject.toString(), response);
            return "";
        }
        return null;
    }

    protected void sendAJAXResponse(final String msg, final HttpServletResponse response) {
        try {
            final Writer httpResponseWriter = response.getWriter();
            IOUtils.write(msg, httpResponseWriter);
            IOUtils.closeQuietly(httpResponseWriter);
        } catch (final IOException e) {
            throw new ApplicationRuntimeException("error.validate.re");
        }
    }
}
