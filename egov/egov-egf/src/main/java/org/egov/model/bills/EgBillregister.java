/*******************************************************************************
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
 * 	1) All versions of this program, verbatim or modified must carry this 
 * 	   Legal Notice.
 * 
 * 	2) Any misrepresentation of the origin of the material is prohibited. It 
 * 	   is required that all modified versions of this material be marked in 
 * 	   reasonable ways as different from the original version.
 * 
 * 	3) This license does not grant any rights to any user of the program 
 * 	   with regards to rights under trademark law for use of the trade names 
 * 	   or trademarks of eGovernments Foundation.
 * 
 *   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 ******************************************************************************/
package org.egov.model.bills;

// Generated Jul 19, 2007 2:41:17 PM by Hibernate Tools 3.2.0.b9

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.egov.commons.EgwStatus;
import org.egov.infra.admin.master.entity.User;
import org.egov.infra.workflow.entity.StateAware;
import org.egov.infstr.annotation.Search;
import org.hibernate.validator.constraints.Length;

/**
 * EgBillregister generated by hbm2java
 */
/**
 * @author EGOV
 *
 */
public class EgBillregister extends StateAware implements java.io.Serializable {

	private Long id;

	private String billnumber;

	private Date billdate;

	private BigDecimal billamount;

	private BigDecimal fieldid;

	private String billstatus;

	private String narration;

	private BigDecimal passedamount;

	private String billtype;

	private String expendituretype;

	private BigDecimal advanceadjusted;

	/*private BigDecimal createdby;

	private Date createddate;

	private BigDecimal lastmodifiedby;

	private Date lastmodifieddate;
*/
	private String zone;

	private String division;

	private String workordernumber;

	private String billapprovalstatus;

	private Boolean isactive;

	private Date billpasseddate;

	private Date workorderdate;
	
	private EgwStatus status;
	
	private EgBillregistermis egBillregistermis;	
	
	private String worksdetailId;
	private User approver;
	private Date approvedOn;
	
	private Set<EgBilldetails> egBilldetailes = new HashSet<EgBilldetails>(0);

	/**
	 * @return the worksdetail
	 */
	public String getWorksdetailId() {
		return worksdetailId;
	}

	/**
	 * @param worksdetail the worksdetail to set
	 */
	public void setWorksdetailId(String worksdetail) {     
		this.worksdetailId = worksdetail;
	}

	public EgBillregister() {   
	}

	public EgBillregister(String billnumber, Date billdate,
			BigDecimal billamount, String billstatus, String expendituretype,
			BigDecimal createdby, Date createddate) {
		this.billnumber = billnumber;
		this.billdate = billdate;
		this.billamount = billamount;
		this.billstatus = billstatus;
		this.expendituretype = expendituretype;
		//this.createdby = createdby;
		//this.createddate = createddate;
	}

	public EgBillregister(  String billnumber,
			Date billdate, BigDecimal billamount, BigDecimal fieldid,
			String billstatus, String narration, BigDecimal passedamount,
			String billtype, String expendituretype,
			BigDecimal advanceadjusted, BigDecimal createdby, Date createddate,
			BigDecimal lastmodifiedby, Date lastmodifieddate, String zone,
			String division, String workordernumber, String billapprovalstatus,
			Boolean isactive, Date billpasseddate, Date workorderdate,
			EgBillregistermis egBillregistermis,Set<EgBilldetails> egBilldetailes,EgwStatus status) {
		this.billnumber = billnumber;
		this.billdate = billdate;
		this.billamount = billamount;
		this.fieldid = fieldid;
		this.billstatus = billstatus;
		this.narration = narration;
		this.passedamount = passedamount;
		this.billtype = billtype;
		this.expendituretype = expendituretype;
		this.advanceadjusted = advanceadjusted;
	//	this.createdby = createdby;
	//	this.createddate = createddate;
	//	this.lastmodifiedby = lastmodifiedby;
	//	this.lastmodifieddate = lastmodifieddate;
		this.zone = zone;
		this.division = division;
		this.workordernumber = workordernumber;
		this.billapprovalstatus = billapprovalstatus;
		this.isactive = isactive;
		this.billpasseddate = billpasseddate;
		this.workorderdate = workorderdate;
		this.egBillregistermis = egBillregistermis;
		this.egBilldetailes = egBilldetailes ;
		this.status = status;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	@Search(searchOp = Search.Operator.contains)
	public String getBillnumber() {
		return this.billnumber;
	}

	public void setBillnumber(String billnumber) {
		this.billnumber = billnumber;
	}
	@Search(searchOp = Search.Operator.between)
	public Date getBilldate() {
		return this.billdate;
	}
	
	public void setBilldate(Date billdate) {
		this.billdate = billdate;
	}

	public BigDecimal getBillamount() {
		return this.billamount;
	}

	public void setBillamount(BigDecimal billamount) {
		this.billamount = billamount;
	}

	public BigDecimal getFieldid() {
		return this.fieldid;
	}

	public void setFieldid(BigDecimal fieldid) {
		this.fieldid = fieldid;
	}

	public String getBillstatus() {
		return this.billstatus;
	}

	public void setBillstatus(String billstatus) {
		this.billstatus = billstatus;
	}
	@Length(max=1024,message="Max 1024 characters are allowed for narration")
	public String getNarration() {
		return this.narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}

	public BigDecimal getPassedamount() {
		return this.passedamount;
	}

	public void setPassedamount(BigDecimal passedamount) {
		this.passedamount = passedamount;
	}

	public String getBilltype() {
		return this.billtype;
	}

	public void setBilltype(String billtype) {
		this.billtype = billtype;
	}

	public String getExpendituretype() {
		return this.expendituretype;
	}

	public void setExpendituretype(String expendituretype) {
		this.expendituretype = expendituretype;
	}

	public BigDecimal getAdvanceadjusted() {
		return this.advanceadjusted;
	}

	public void setAdvanceadjusted(BigDecimal advanceadjusted) {
		this.advanceadjusted = advanceadjusted;
	}

/*	public BigDecimal getCreatedby() {
		return this.createdby;
	}

	public void setCreatedby(BigDecimal createdby) {
		this.createdby = createdby;
	}

	public Date getCreateddate() {
		return this.createddate;
	}

	public void setCreateddate(Date createddate) {
		this.createddate = createddate;
	}

	public BigDecimal getLastmodifiedby() {
		return this.lastmodifiedby;
	}

	public void setLastmodifiedby(BigDecimal lastmodifiedby) {
		this.lastmodifiedby = lastmodifiedby;
	}

	public Date getLastmodifieddate() {
		return this.lastmodifieddate;
	}

	public void setLastmodifieddate(Date lastmodifieddate) {
		this.lastmodifieddate = lastmodifieddate;
	}
*/
	public String getZone() {
		return this.zone;
	}

	public void setZone(String zone) {
		this.zone = zone;
	}

	public String getDivision() {
		return this.division;
	}

	public void setDivision(String division) {
		this.division = division;
	}

	public String getWorkordernumber() {
		return this.workordernumber;
	}

	public void setWorkordernumber(String workordernumber) {
		this.workordernumber = workordernumber;
	}

	public String getBillapprovalstatus() {
		return this.billapprovalstatus;
	}

	public void setBillapprovalstatus(String billapprovalstatus) {
		this.billapprovalstatus = billapprovalstatus;
	}

	public Boolean getIsactive() {
		return this.isactive;
	}

	public void setIsactive(Boolean isactive) {
		this.isactive = isactive;
	}

	public Date getBillpasseddate() {
		return this.billpasseddate;
	}

	public void setBillpasseddate(Date billpasseddate) {
		this.billpasseddate = billpasseddate;
	}

	public Date getWorkorderdate() {
		return this.workorderdate;
	}

	public void setWorkorderdate(Date workorderdate) {
		this.workorderdate = workorderdate;
	}

	public EgBillregistermis getEgBillregistermis() {
		return this.egBillregistermis;
	}

	public void setEgBillregistermis(EgBillregistermis egBillregistermis) {
		this.egBillregistermis = egBillregistermis;
	}

	public Set<EgBilldetails> getEgBilldetailes() {
		return egBilldetailes;
	}

	public void setEgBilldetailes(Set<EgBilldetails> egBilldetailes) {
		this.egBilldetailes = egBilldetailes;
	}
	public void addEgBilldetailes(EgBilldetails egBilldetail)
	{			
		//System.out.println("adding egbilldetails to billregister"+egBilldetail);
		getEgBilldetailes().add(egBilldetail);
	}

	public EgwStatus getStatus() {
		return status;
	}

	public void setStatus(EgwStatus status) {
		this.status = status;
	}
	
	
	public String getStateDetails() {
		return this.getBillnumber();
	}

	public User getApprover() {
		return approver;
	}

	public void setApprover(User approver) {
		this.approver = approver;
	}

	public Date getApprovedOn() {
		return approvedOn;
	}

	public void setApprovedOn(Date approvedOn) {
		this.approvedOn = approvedOn;
	}
	public void removeEgBilldetailes(EgBilldetails egBilldetail)
	{			
		if(egBilldetail!=null)
		getEgBilldetailes().remove(egBilldetail);
	}

}
