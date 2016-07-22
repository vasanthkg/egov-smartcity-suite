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

$subTypeOfWorkId = 0;
$ExceptionalUOMs = "";
$schemeId = "";
$subSchemeId = 0;
var sorMsArray=new Array(200);
var nonSorMsArray=new Array(200);
var headstart="<!--only for validity head start -->";
var headend="<!--only for validity head end -->";
var tailstart="<!--only for validity tail start -->";
var tailend="<!--only for validity tail end -->";


var hint='<a href="#" class="hintanchor" title="@fulldescription@"><i class="fa fa-question-circle" aria-hidden="true"></i></a>';
$(document).ready(function(){
	if($('#estimateNumber').val() != '') {
		$('.disablefield').attr('disabled', 'disabled');
	}
	$subTypeOfWorkId = $('#subTypeOfWorkValue').val();
	$ExceptionalUOMs = $('#exceptionaluoms').val();  
	$schemeId = $('#schemeValue').val();
	$subSchemeId = $('#subSchemeValue').val();
	getSubSchemsBySchemeId($schemeId);
	var nameOfWork = $('#nameOfWork').val();
	$('#workName').val(nameOfWork);
	$('#fund').trigger('change');
	$('#parentCategory').trigger('blur');
	var workCategory = $('#workCategory').val();
	if(workCategory != undefined && workCategory != '') {
		$('#workCategory').val($('#workCategory').val().replace(/_/g, ' '));
	}
	var beneficiary = $('#beneficiary').val(); 
	if(beneficiary != undefined) {
		$('#beneficiary').val($('#beneficiary').val().replace(/_/g, '/'));
	}
	$( "input[name$='percentage']" ).each(function() {
		var value = $(this).val();
		if(value != 0)
			$(this).val(parseFloat(value).toFixed(2));
	});

	if($('#natureOfWork').val() != '') {
		$('.alert-danger').hide();
	} else {
		$('.alert-danger').show();
	}
	$mode = $("#mode").val();
	$('#Cancel').prop('type',"hidden");
	if($mode === 'edit')
		$('#Cancel').prop('type',"submit");
	if($mode == '') {
		$("#latlonDiv").hide(); 
	} else if($mode == 'view' || $mode == '') {
		$(".input-group-addon").hide();
		if($("#latitude").val() != '' && $("#longitude").val() != '') {
			$("#latlonDiv").show();
		} else 
			$("#latlonDiv").hide();
	} else if($mode == 'edit') {
		if($("#latitude").val() != '' && $("#longitude").val() != '') {
			$("#latlonDiv").show();
		} else 
			$("#latlonDiv").hide();
	}

	$locationAppConfig = $('#locationAppConfig').val();
	if($locationAppConfig == 'true') {
		$('#spanlocation').show();
	} else 
		$('#spanlocation').hide();

	$isServiceVATRequired = $('#isServiceVATRequired').val();

	if($isServiceVATRequired == 'true') {
		//For Sor Screen
		$('#serviceVatHeader').removeAttr('hidden');
		$('#vatAmountHeader').removeAttr('hidden');
		$('.serviceTaxPerc').removeAttr('hidden');
		$('.vatAmount').removeAttr('hidden');
		$('.emptytd').removeAttr('hidden');
		$('.serviceVatAmt').removeAttr('hidden');

		//For Non-Sor Screen
		$('#nonSorServiceVatHeader').removeAttr('hidden');
		$('#nonSorVatAmountHeader').removeAttr('hidden');
		$('.nonSorServiceTaxPerc').removeAttr('hidden');
		$('.nonSorVatAmount').removeAttr('hidden');
		$('.emptytd').removeAttr('hidden');
		$('.nonSorServiceVatAmt').removeAttr('hidden');
	}

	$('#natureOfWork').click(function() {
		if($('#natureOfWork').val() != '') {
			$('.alert-danger').hide();
		} else {
			$('.alert-danger').show();
		}
	});

	$('#addnonSorRow').click(function() {
		if(ismsheetOpen())
		{
			bootbox.alert("Measurement Sheet is open Please close it first");
			return ;
		}
		var hiddenRowCount = $("#tblNonSor tbody tr:hidden[id='nonSorRow']").length;
		if(hiddenRowCount == 0) {
			var key = $("#tblNonSor tbody tr:visible[id='nonSorRow']").length;
			addRow('tblNonSor', 'nonSorRow');
			resetIndexes();
			$('#activityid_' + key).val('');
			$('#nonSorId_' + key).val('');
			$('#nonSorDesc_' + key).val('');
			$('#nonSorUom_' + key).val('');
			$('#nonSorRate_' + key).val('');
			$('#nonSorEstimateRate_' + key).val('');
			$('#nonSorQuantity_' + key).val('');
			$('#nonSorQuantity_' + key).removeAttr('readonly');
			$('.nonSorAmount_' + key).html('');
			$('#nonSorServiceTaxPerc_' + key).val('');
			$('.nonSorVatAmt_' + key).html('');
			$('.nonSorTotal_' + key).html('');
			document.getElementById('nonSorActivities['+key+'].mstd').innerHTML=""; 
			document.getElementById('nonSorActivities['+key+'].mspresent').value="0"; 

			generateSlno();
		} else {
			var key = 0;
			$('#nonSorDesc_' + key).attr('required', 'required');
			$('#nonSorUom_' + key).attr('required', 'required');
			$('#nonSorEstimateRate_' + key).attr('required', 'required');
			$('#nonSorQuantity_' + key).attr('required', 'required');
			$('#nonSorQuantity_' + key).removeAttr('readonly');
			$('.nonSorEstimateRate').val('');
			$('.nonSorRate').val('');
			$('.nonSorQuantity').val('');
			$('.nonSorServiceTaxPerc').val('');
			$('#nonSorMessage').attr('hidden', 'true');
			$('#nonSorRow').removeAttr('hidden');
			$('#nonSorRow').removeAttr('nonsorinvisible');
			document.getElementById('nonSorActivities['+key+'].mstd').innerHTML=""; 
			document.getElementById('nonSorActivities['+key+'].mspresent').value="0"; 
		}
	});

	var sorSearch = new Bloodhound({
		datumTokenizer: function (datum) {
			return Bloodhound.tokenizers.whitespace(datum.value);
		},
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		remote: {
			url: '/egworks/abstractestimate/ajaxsor-byschedulecategories?code=',
			replace: function (url, query) {
				var scheduleCategories = $('#scheduleCategory').val();
				var estimateDate = $('#estimateDate').val();
				if(scheduleCategories == null)
					bootbox.alert($('#msgschedulecategory').val());
				if(estimateDate == "" || estimateDate == null)
					bootbox.alert($('#msgestimatedate').val());
				return url + query + '&scheduleCategories=' + scheduleCategories + "&estimateDate=" + estimateDate;
			},
			filter: function (data) {
				return $.map(data, function (ct) {
					return {
						id: ct.id,
						code: ct.code,
						description: ct.description,
						uom: ct.uom.uom,
						uomid: ct.uom.id,
						estimateRate: parseFloat(ct.sorRate).toFixed(2),
						summary: ct.summary,
						categoryCode: ct.scheduleCategory.code,
						displayResult: ct.code+' : '+ct.summary+' : '+ct.scheduleCategory.code 
					};
				});
			}
		}
	});

	sorSearch.initialize();
	var sorSearch_typeahead = $('#sorSearch').typeahead({
		hint : true,
		highlight : true,
		minLength : 2
	}, {
		displayKey : 'displayResult',
		source : sorSearch.ttAdapter()
	}).on('typeahead:selected', function (event, data) {

		if(ismsheetOpen())
		{
			bootbox.alert("Measurement Sheet is open Please close it first");
			return ;
		}
		var flag = false;
		$('.sorhiddenid').each(function() {
			if($(this).val() == data.id) {
				flag = true;
			}
		});
		if(flag) {
			bootbox.alert($('#erroradded').val(), function() {
				$('#sorSearch').val('');
			});
		}
		else {
			var hiddenRowCount = $("#tblsor > tbody > tr:hidden[id='sorRow']").length;
			var key = $("#tblsor > tbody > tr:visible[id='sorRow']").length;
			if(hiddenRowCount == 0) {
				addRow('tblsor', 'sorRow');
				resetIndexes();
				$('#soractivityid_' + key).val('');
				$('#quantity_' + key).val('');
				$('#quantity_' + key).removeAttr('readonly');
				$('.amount_' + key).html('');
				$('#vat_' + key).val('');
				$('.vatAmount_' + key).html('');
				$('.total_' + key).html('');
				document.getElementById('sorActivities['+key+'].mstd').innerHTML=""; 
				document.getElementById('sorActivities['+key+'].mspresent').value="0"; 
				//generateSorSno();
			} else {
				$('#quantity_0').val('');
				$('#quantity_0').removeAttr('readonly');
				$('#vat_0').val('');
				key = 0;
				$('#message').attr('hidden', 'true');;
				$('#sorRow').removeAttr('hidden');
				$('#sorRow').removeAttr('sorinvisible');
				document.getElementById('sorActivities[0].mstd').innerHTML=""; 
				document.getElementById('sorActivities[0].mspresent').value="0"; 
			}

			$.each(data, function(id, val) {
				if(id == "id")
					$('#' + id + "_" + key).val(val);
				else if(id == "uomid")
					$('#sorUomid_' + key).val(val);
				else if(id == 'description') {
					$('.' + id + "_" + key).html(hint.replace(/@fulldescription@/g, val));
				} else if(id == 'estimateRate') {
					if(val != null) {
						$('.' + id + "_" + key).html(val);
						$('#' + id + "_" + key).val(val);
						//$('#rate_' + key).val(val);
					} else {
						$('.' + id + "_" + key).html(0);
						$('#' + id + "_" + key).val(0);
						//$('#rate_' + key).val(0);
					}
				}else
					$('.' + id + "_" + key).html(val);
			});
			$('#rate_' + key).val(getUnitRate($('.uom_' + key).html(),$('#estimateRate_' + key).val()));

		}
		$('#sorSearch').typeahead('val','');
	});


	var ward = new Bloodhound({
		datumTokenizer: function (datum) {
			return Bloodhound.tokenizers.whitespace(datum.value);
		},
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		remote: {
			url: '/egworks/lineestimate/ajax-getward?name=%QUERY',
			filter: function (data) {
				return $.map(data, function (ct) {
					return {
						name: '' + ct.boundaryNum + '',
						value: ct.id
					};
				});
			}
		}
	});

	ward.initialize();
	var ward_typeahead = $('#wardInput').typeahead({
		hint : false,
		highlight : false,
		minLength : 1
	}, {
		displayKey : 'name',
		source : ward.ttAdapter(),
	});

	typeaheadWithEventsHandling(ward_typeahead,
	'#ward');

	var $rowId = 0;
	var index = 0;
	$(document).on('click', '#tblassetdetails tbody tr', function() {
		$rowId = $(this).find('span[id$="sno"]');
		index = $rowId.text() - 1;
		var status = getStatusForNatureOfWork($("#natureOfWork option:selected" ).text());
		if(status != '') {
			window.open("/egassets/assetmaster/asset-showSearchPage.action?rowId="+index+"&assetStatus="+status,"",
			"height=600,width=1200,scrollbars=yes,left=0,top=0,status=yes");
		} else {
			bootbox.alert("No Asset can be link for selected nature of work");
		}
	});

	var currentState = $('#currentState').val();
	if(currentState == 'Technical Sanctioned') {
		$('#approverDetailHeading').hide();

		$('#approvalDepartment').removeAttr('required');
		$('#approvalDesignation').removeAttr('required');
		$('#approvalPosition').removeAttr('required');
	}

	calculateEstimateAmountTotal();
	calculateVatAmountTotal();
	total();

	calculateNonSorEstimateAmountTotal();
	calculateNonSorVatAmountTotal();
	nonSorTotal();

	generateSorSno();
	generateSlno();


	resetAddedOverheads();
	calculateOverheadTotalAmount();
	$('#isOverheadValuesLoading').val('false');
});

$overheadRowCount = 0;
$('#addOverheadRow').click(function() { 
	addRow('overheadTable','overheadRow');
});

function getRow(obj) {
	if(!obj)return null;
	tag = obj.nodeName.toUpperCase();
	while(tag != 'BODY'){
		if (tag == 'TR') return obj;
		obj=obj.parentNode ;
		tag = obj.nodeName.toUpperCase();
	}
	return null;
}

var addedOverheads = new Array();

function deleteOverheadRow(obj) {
	var rIndex = getRow(obj).rowIndex;
	var rowcount=jQuery("#overheadTable tbody tr").length;
	if(rowcount<=1) {
		bootbox.alert("This row can not be deleted");
		return false;
	} else {
		//calculating Overhead TotalAmount
		var total = $("#overheadTotalAmount").html();
		if(total==null || total=="")
			total = 0;
		var amount = document.getElementById('tempOverheadValues['+ (rIndex-1) + '].amount').value;
		if(amount==null || amount=="")
			amount = 0;
		total = eval(total) - eval(amount);
		$("#overheadTotalAmount").html(total);

		deleteRow("overheadTable",obj);

		resetAddedOverheads();
		calculateOverheadTotalAmount();
		return true;
	}

}

function recalculateOverheads(){
	var resultLength = jQuery('#overheadTable tr').length-1;
	var index;
	var workValue = $('#workValue').val();
	for (var i = 0; i < resultLength; i++) {
		index = i;
		var percentage = document.getElementById('tempOverheadValues['
				+ index + '].percentage').value;
		var amount = document.getElementById('tempOverheadValues['
				+ index + '].amount');
		if(percentage!="")
			amount.value = ((workValue*percentage)/100).toFixed(2);
		calculateOverheadTotalAmount();
	}
}

function resetAddedOverheads(){
	addedOverheads = new Array();
	var resultLength = jQuery('#overheadTable tr').length-1;
	var index;
	for (var i = 0; i < resultLength; i++) {
		index = i;
		var overheadvalue = document.getElementById('tempOverheadValues['
				+ index + '].name').value;
		if(overheadvalue!="")
			addedOverheads.push(overheadvalue);
		else{
			document.getElementById('tempOverheadValues['+ index + '].percentage').value = "";
			document.getElementById('tempOverheadValues['+ index + '].amount').value = 0;
			calculateOverheadTotalAmount();
		}
	}
}

function getPercentageOrLumpsumByOverhead(overhead) {
	if(overhead.value==""){
		resetAddedOverheads();
	}else
		if(addedOverheads.indexOf(overhead.value) == -1) {
			if($('#isOverheadValuesLoading').val() == 'false')
				resetAddedOverheads();
			var objName = overhead.name;
			var index =objName.substring(objName.indexOf("[")+1,objName.indexOf("]")); 
			var workValue = $('#workValue').val();
			if (overhead.value != '') {
				$.ajax({
					url : '/egworks/abstractestimate/getpercentageorlumpsumbyoverheadid',
					type : "get",
					data : {
						overheadId : overhead.value
					},
					success : function(data, textStatus, jqXHR) {
						document.getElementById('tempOverheadValues['+ index + '].overhead.id').value = data.overhead.id;
						if(data.percentage>0){
							document.getElementById('tempOverheadValues['+ index + '].percentage').value = data.percentage;
							document.getElementById('tempOverheadValues['+ index + '].amount').value = ((workValue*data.percentage)/100).toFixed(2);
						}else{
							document.getElementById('tempOverheadValues['+ index + '].percentage').value = "";
							document.getElementById('tempOverheadValues['+ index + '].amount').value = data.lumpsumAmount;
						}
						calculateOverheadTotalAmount();
					},
					error : function(jqXHR, textStatus, errorThrown) {
						bootbox.alert("Error while get Percentage or Lumpsum By Overhead ");
					}
				});
			}else{
				document.getElementById('tempOverheadValues['+ index + '].percentage').value = "";
				document.getElementById('tempOverheadValues['+ index + '].amount').value = 0;
				calculateOverheadTotalAmount();
			}
		}else{
			var index =overhead.name.substring(overhead.name.indexOf("[")+1,overhead.name.indexOf("]")); 
			document.getElementById('tempOverheadValues['+ index + '].percentage').value = "";
			document.getElementById('tempOverheadValues['+ index + '].amount').value = 0;
			overhead.value= "";
			calculateOverheadTotalAmount();
			bootbox.alert("The overhead is already added");
			resetAddedOverheads();
		}

}

function calculateOverheadTotalAmount(){
	var resultLength = jQuery('#overheadTable tr').length-1;
	var index;
	var total = 0;
	for (var i = 0; i < resultLength; i++) {
		index = i;
		var amount = document.getElementById('tempOverheadValues['
				+ index + '].amount').value;
		if(amount==null || amount=="")
			amount = 0;
		total = eval(total) + eval(amount);
	}

	$("#overheadTotalAmount").html(parseFloat(total).toFixed(2));
	calculateEstimateValue();
}

function addMultiyearEstimate() {
	var tbl = document.getElementById('multiYeaeEstimateTbl');
	var rowO = tbl.rows.length;
	if(document.getElementById('yearEstimateRow') != null)
	{
		//get Next Row Index to Generate
		var nextIdx = tbl.rows.length;
		var sno = 1;
		sno = nextIdx + 1;
		//validate status variable for exiting function
		var isValid=1;//for default have success value 0  

		//validate existing rows in table
		jQuery("#tblyearestimate tbody tr").find('input, select').each(function(){
			if((jQuery(this).data('optional') === 0) && (!jQuery(this).val()))
			{
				//console.log('calling :)');
				jQuery(this).focus();
				bootbox.alert(jQuery(this).data('errormsg'));
				isValid=0;//set validation failure
				return false;
			}
		});

		if (isValid === 0) {
			return false;
		}
		// Generate all textboxes Id and name with new index
		jQuery("#yearEstimateRow").clone().find("input, select ,span,textarea").each(function() {

			if($(this).is('span')) {
				jQuery(this).text(sno);
				sno++;
			} else {
				jQuery(this).attr({
					'id': function(_, id) { 
						return id.replace('[0]', '['+ nextIdx +']'); 
					},
					'name': function(_, name) { 
						return name.replace('[0]', '['+ nextIdx +']'); 
					},
					'data-idx' : function(_,dataIdx)
					{
						return nextIdx;
					}

				}).val(''); 
			}
			if($(this).is('input')){
				$(this).val(0);
			}

		}).end().appendTo("#multiYeaeEstimateTbl");

	}

}

function deleteMultiYearEstimate(obj) {

	rIndex = getRow(obj).rowIndex - 1;
	var tbl=document.getElementById('multiYeaeEstimateTbl');
	var rowo=tbl.rows.length;
	if(rowo<=1)
	{
		bootbox.alert("This row cannot be deleted");
		return false;
	}
	else
	{	
		tbl.deleteRow(rIndex);	

		//starting index for table fields
		var idx=0;

		//regenerate index existing inputs in table row
		$("#tblyearestimate tbody tr").each(function() {
			$(this).find("input, select, span,textarea").each(function() {
				if(!$(this).is('span')) {
					$(this).attr({
						'id': function(_, id) {  
							return id.replace(/\[.\]/g, '['+ idx +']'); 
						},
						'name': function(_, name) {
							return name.replace(/\[.\]/g, '['+ idx +']'); 
						},
					});
				}
				else{
					$(this).text((idx+1));
				}
			});

			idx++;

		});

		calculatePercentage('#estimateTotal', '.inputYearEstimatePercentage');

		return true;
	}	

}

function generateSorSno()
{
	var idx=1;
	$(".spansorslno").each(function(){
		$(this).text(idx);
		idx++;
	});
}

function deleteSor(obj) {
	var rIndex = getRow(obj).rowIndex;
	var id = $(getRow(obj)).children('td:first').children('input:first').val();
	//To get all the deleted rows id
	var aIndex = rIndex - 1;
	if(!$("#removedActivityIds").val()==""){
		$("#removedActivityIds").val($("#removedActivityIds").val()+",");
	}
	$("#removedActivityIds").val($("#removedActivityIds").val()+id);

	var tbl=document.getElementById('tblsor');	
	var rowcount=$("#tblsor > tbody >tr").length;
	if(rowcount==2) {
		var rowId = $(obj).attr('class').split('_').pop();
		$('#soractivityid_' + rowId).val('');
		$('.sorhiddenid').val('');
		$('#quantity_' + rowId).val('');
		$('.amount_' + rowId).html('');
		$('#vat_' + rowId).val('');
		$('.vatAmount_' + rowId).html('');
		$('.total_' + rowId).html('');
		$('#sorRow').attr('hidden', 'true');
		$('#sorRow').attr('sorinvisible', 'true');
		$('#message').removeAttr('hidden');
	} else {
		deleteRow('tblsor',obj);
	}
	resetIndexes();
	//starting index for table fields
	generateSorSno();
	calculateEstimateAmountTotal();
	calculateVatAmountTotal();
	total();
	return true;
}

function calculateEstimateAmount(currentObj) {
	rowcount = $(currentObj).attr('id').split('_').pop();
	var rate = parseFloat($('#rate_' + rowcount).val().trim());
	var amount = parseFloat($(currentObj).val() * rate).toFixed(2);
	var vatAmount = parseFloat(($('#vat_' + rowcount).val() * amount) / 100).toFixed(2);
	$('.amount_' + rowcount).html(amount);
	$('.vatAmount_' + rowcount).html(vatAmount);
	$('.total_' + rowcount).html(parseFloat(parseFloat(amount) + parseFloat(vatAmount)).toFixed(2));
	calculateEstimateAmountTotal();
	calculateVatAmountTotal();
	total();
}

function calculateVatAmount(currentObj) {
	rowcount = $(currentObj).attr('id').split('_').pop();
	var estimatedAmount = parseFloat($('.amount_' + rowcount).html().trim());
	var vatAmount = parseFloat(($(currentObj).val() * estimatedAmount) / 100).toFixed(2);
	$('.vatAmount_' + rowcount).html(vatAmount);
	$('.total_' + rowcount).html(parseFloat(parseFloat(estimatedAmount) + parseFloat(vatAmount)).toFixed(2));
	calculateVatAmountTotal();
	total();
}

function calculateEstimateAmountTotal() {
	var total = 0;
	$('.amount').each(function() {
		if($(this).html().trim() != "")
			total = parseFloat(parseFloat(total) + parseFloat($(this).html().replace(',', ''))).toFixed(2);
	});
	$('#sorEstimateTotal').html(total);
}

function calculateVatAmountTotal() {
	var total = 0;
	$('.vatAmt').each(function() {
		if($(this).html().trim() != "")
			total = parseFloat(parseFloat(total) + parseFloat($(this).html().replace(',', ''))).toFixed(2);
	});
	$('#serviceVatAmtTotal').html(total);
}

function total() {
	var total = 0.0;
	$('.total').each(function() {
		if($(this).html().trim() != "")
			total = parseFloat(parseFloat(total) + parseFloat($(this).html().replace(',', ''))).toFixed(2);
	});
	$('#sorTotal').html(total);
	calculateEstimateValue();
}

function generateSlno()
{
	var idx=1;
	$(".spannonsorslno").each(function(){
		$(this).text(idx);
		idx++;
	});
}

function deleteNonSor(obj) {
	var rIndex = getRow(obj).rowIndex;

	var id = $(getRow(obj)).children('td:first').children('input:first').val();
	//To get all the deleted rows id
	var aIndex = rIndex - 1;
	if(!$("#removedActivityIds").val()==""){
		$("#removedActivityIds").val($("#removedActivityIds").val()+",");
	}
	$("#removedActivityIds").val($("#removedActivityIds").val()+id);

	var rowId = $(obj).attr('class').split('_').pop();
	var rowcount=$("#tblNonSor tbody tr").length;

	if(rowcount==2) {
		$('#activityid_' + rowId).val('');
		$('#nonSorId_' + rowId).val('');
		$('#nonSorId_' + rowId).val('');
		$('#nonSorDesc_' + rowId).val('');
		$('#nonSorUom_' + rowId).val('');
		$('#nonSorEstimateRate_' + rowId).val('');
		$('#nonSorRate_' + rowId).val('');
		$('#nonSorQuantity_' + rowId).val('');
		$('.nonSorAmount_' + rowId).html('');
		$('#nonSorServiceTaxPerc_' + rowId).val('');
		$('.nonSorVatAmount_' + rowId).html('');
		$('.nonSorTotal_' + rowId).html('');
		$('#nonSorRow').attr('hidden', 'true');
		$('#nonSorRow').attr('nonsorinvisible', 'true');
		$('#nonSorMessage').removeAttr('hidden');
	} else {
		deleteRow('tblNonSor',obj);
	}
	resetIndexes();
	//starting index for table fields
	generateSlno();

	calculateNonSorEstimateAmountTotal();
	calculateNonSorVatAmountTotal();
	nonSorTotal();
	return true;
}

function resetIndexes() {
	var idx = 0;

	//regenerate index existing inputs in table row
	$(".sorRow").each(function() {
		$(this).find("input,button, select,textarea,td,tbody,tr,table, errors, span, input:hidden").each(function() {


			if (!$(this).is('span')) {
				$(this).attr({
					'name' : function(_, name) {
						console.log(name);
						if(name)
							{
							return name= name.replace(/sorActivities\[.\]/g, "sorActivities["+idx+"]");
							return name.replace(/_\d+/,"_"+idx);
							}
					},
					'id' : function(_, id) {
						console.log(id);
						if(id)
							{
							id= id.replace(/sorActivities\[.\]/g, "sorActivities["+idx+"]");
							return id.replace(/_\d+/,"_"+idx);
							}
							
					},
					'data-idx' : function(_, dataIdx) {
						return idx;
					}
				});
			} else {
				$(this).attr({
					'class' : function(_, name) {
						console.log(name);
						if(name)
							{
							name= name.replace(/sorActivities\[.\]/g, "sorActivities["+idx+"]");
						return	name=name.replace(/_\d+/,"_"+idx);
							
							}
					},
					'id' : function(_, id) {
						if(id)
						{
							console.log(id);
							id= id.replace(/sorActivities\[.\]/g, "sorActivities["+idx+"]");
							return id.replace(/_\d+/,"_"+idx);
						}
					}
				});
			}
		});
		idx++;
	});

	idx = 0;

	$(".nonSorRow").each(function() {
		$(this).find("input,button, select,textarea,td,tbody,tr,table, errors, span, input:hidden").each(function() {

			if (!$(this).is('span')) {
				$(this).attr({
					'name' : function(_, name) {
						if(name)
							return name.replace(/nonSorActivities\[.\]/g, "nonSorActivities["+idx+"]");
					},
					'id' : function(_, id) {
						if(id)
							return id.replace(/nonSorActivities\[.\]/g, "nonSorActivities["+idx+"]");
					},
					'data-idx' : function(_, dataIdx) {
						return idx;
					}
				});
			} else {
				$(this).attr({
					'class' : function(_, name) {
						if(name)
							return name.replace(/nonSorActivities\[.\]/g, "nonSorActivities["+idx+"]");
					},
					'id' : function(_, id) {
						if(id)
							{	
							id= id.replace(/nonSorActivities\[.\]/g, "nonSorActivities["+idx+"]");
							return id.replace(/_\d+/,"_"+idx);
								}
					}
				});
			}
		});
		idx++;
	});
}

function calculateNonSorEstimateAmount(currentObj) {
	var rowcount = $(currentObj).attr('id').split('_').pop();
	var description = $('#nonSorDesc_' + rowcount).val();
	var uom = $('#nonSorUom_' + rowcount).val();
	var flag = false;
	if(description == '') {
		bootbox.alert($('#errordescription').val());
		$('#nonSorDesc_' + rowcount).val('');
		flag = true;
	}
	if(!flag && uom == '') {
		bootbox.alert($('#erroruom').val());
		$('#nonSorUom_' + rowcount).val('');
		$('.nonSorAmount_' + rowcount).html('');
		$('.nonSorVatAmount_' + rowcount).html('');
		$('.nonSorTotal_' + rowcount).html('');
		calculateNonSorEstimateAmountTotal();
		calculateNonSorVatAmountTotal();
		nonSorTotal();
		flag = true;
	}
	if(!flag) {
		var estimateRate = $('#nonSorEstimateRate_' + rowcount).val();
		var unitRate;
		if(estimateRate == "")
			unitRate = 0.0;
		else{
			unitRate = getUnitRate($('#nonSorUom_' + rowcount).find(":selected").text().split(" -- ")[1],estimateRate);
			$('#nonSorRate_' + rowcount).val(unitRate);
		}
		var quantity = $('#nonSorQuantity_' + rowcount).val();
		if(quantity == "")
			quantity = 0.0;
		var amount = parseFloat(parseFloat(quantity) * parseFloat(unitRate)).toFixed(2);
		var vatAmount = parseFloat(($('#nonSorServiceTaxPerc_' + rowcount).val() * amount) / 100).toFixed(2);
		$('.nonSorAmount_' + rowcount).html(amount);
		$('.nonSorVatAmount_' + rowcount).html(vatAmount);
		$('.nonSorTotal_' + rowcount).html(parseFloat(parseFloat(amount) + parseFloat(vatAmount)).toFixed(2));
		calculateNonSorEstimateAmountTotal();
		calculateNonSorVatAmountTotal();
		nonSorTotal();
	}
}

function calculateNonSorVatAmount(currentObj) {
	var rowcount = $(currentObj).attr('id').split('_').pop();
	var estimatedAmount = $('.nonSorAmount_' + rowcount).html();
	if(estimatedAmount == "")
		estimatedAmount = 0.0;
	var serviceTaxPerc = $('#nonSorServiceTaxPerc_' + rowcount).val();
	if(serviceTaxPerc == "")
		serviceTaxPerc = 0.0;
	var vatAmount = parseFloat((serviceTaxPerc * estimatedAmount) / 100).toFixed(2);
	$('.nonSorVatAmount_' + rowcount).html(vatAmount);
	$('.nonSorTotal_' + rowcount).html(parseFloat(parseFloat(estimatedAmount) + parseFloat(vatAmount)).toFixed(2));
	calculateNonSorVatAmountTotal();
	nonSorTotal();
}

function calculateNonSorEstimateAmountTotal() {
	var total = 0;
	$('.nonsoramount').each(function() {
		if($(this).html().trim() != "")
			total = parseFloat(parseFloat(total) + parseFloat($(this).html().replace(',', ''))).toFixed(2);
	});
	$('#nonSorEstimateTotal').html(total);
}

function calculateNonSorVatAmountTotal() {
	var total = 0;
	$('.nonSorVatAmt').each(function() {
		if($(this).html().trim() != "")
			total = parseFloat(parseFloat(total) + parseFloat($(this).html().replace(',', ''))).toFixed(2);
	});
	$('#nonSorServiceVatAmtTotal').html(total);
}

function nonSorTotal() {
	var total = 0.0;
	$('.nonSorTotal').each(function() {
		if($(this).html().trim() != "")
			total = parseFloat(parseFloat(total) + parseFloat($(this).html().replace(',', ''))).toFixed(2);
	});
	$('#nonSorTotal').html(total);
	calculateEstimateValue();
}

function calculateEstimateValue() {
	var sorTotal = $('#sorTotal').html();
	var nonSorTotal = $('#nonSorTotal').html();
	var overheadTotal = $('#overheadTotalAmount').html();
	if(sorTotal == '')
		sorTotal = 0.0;
	if(nonSorTotal == '')
		nonSorTotal = 0.0;

	var workValue = parseFloat(parseFloat(sorTotal) + parseFloat(nonSorTotal) ).toFixed(2);
	var estimateValue =  parseFloat(parseFloat(workValue) + parseFloat(overheadTotal)).toFixed(2)
	$('#estimateValue').val(estimateValue);
	$('#workValue').val(workValue);
	$('#estimateValueTotal').html(estimateValue);
}


function validateInput(object) {
	var valid = /^[1-9](\d{0,9})(\.\d{0,2})?$/.test($(object).val()),
	val = $(object).val();

	if(!valid){
		//console.log("Invalid input!");
		$(object).val(val.substring(0, val.length - 1));
	}
}

function validateQuantityInput(object) {
	var valid = /^[0-9](\d{0,9})(\.\d{0,4})?$/.test($(object).val()),
	val = $(object).val();

	if(!valid){
		//console.log("Invalid input!");
		$(object).val(val.substring(0, val.length - 1));
	}
}


function validateOverheads(){
	var resultLength = jQuery('#overheadTable tr').length-1;
	var index;
	for (var i = 0; i < resultLength; i++) {
		index = i;
		var overheadvalue = document.getElementById('tempOverheadValues['
				+ index + '].name').value;
		var amount = document.getElementById('tempOverheadValues['
				+ index + '].amount').value;
		if(overheadvalue!=""){
			if(amount=="" || amount<=0){
				document.getElementById('tempOverheadValues['+ index + '].amount').focus();
				bootbox.alert("Amount is requried for overheads line:  "+(index+1));
				return false;
			}
		}
	}
	return true;
}

$('#parentCategory').blur(function(){
	if ($('#parentCategory').val() === '') {
		$('#category').empty();
		$('#category').append($('<option>').text('Select from below').attr('value', ''));
		return;
	} else {
		$.ajax({
			type: "GET",
			url: "/egworks/lineestimate/getsubtypeofwork",
			cache: true,
			dataType: "json",
			data:{'id' : $('#parentCategory').val()}
		}).done(function(value) {
			//console.log(value);
			$('#category').empty();
			$('#category').append($("<option value=''>Select from below</option>"));
			$.each(value, function(index, val) {
				var selected="";
				if($subTypeOfWorkId)
				{
					if($subTypeOfWorkId==val.id)
					{
						selected="selected";
					}
				}
				$('#category').append($('<option '+ selected +'>').text(val.description).attr('value', val.id));
			});
		});
	}
});

var templateCode = new Bloodhound({
	datumTokenizer: function (datum) {
		return Bloodhound.tokenizers.whitespace(datum.value);
	},
	queryTokenizer: Bloodhound.tokenizers.whitespace,
	remote: {
		url: '/egworks/abstractestimate/ajaxestimatetemplatebycode?code=%QUERY', 
		filter: function (data) {
			return $.map(data, function (ct) {
				return {
					code: ct.code,
					id:ct.id
				};
			});
		}
	}
});

templateCode.initialize();
var templateCode_typeahead = $('#templateCode').typeahead({
	hint : true,
	highlight : true,
	minLength : 3
}, {
	displayKey : 'code',
	source : templateCode.ttAdapter()
}).on('typeahead:selected typeahead:autocompleted', function(event, data){            
	$("#templateId").val(data.id);   
});
$('#templateCode').blur(function() {

});

$('#searchTemplate').click(function() {
	var templateCode = $('#templateCode').val();
	var typeOfWork =$('#parentCategory').val();
	var subTypeOfWork = $('#category').val();
	if(templateCode=="")
		window.open("/egworks/estimate/estimateTemplate-search.action?sourcePage=searchForEstimate&typeOfWork="+typeOfWork+"&subTypeOfWork="+subTypeOfWork,'', 'height=650,width=980,scrollbars=yes,left=0,top=0,status=yes');
	else{
		var templateId = $('#templateId').val();
		var sorHiddenRowCount = $("#tblsor tbody tr:hidden[id='sorRow']").length;
		var nonSorHiddenRowCount = $("#tblNonSor tbody tr:hidden[id='nonSorRow']").length;
		if(templateId!="" && (sorHiddenRowCount !=1 || nonSorHiddenRowCount!=1)){ 
			var ans=confirm($("#estimateTemplateConfirmMsg").val());	
			if(ans) {
				clearActivities();
				getActivitiesForTemplate(templateId);
			}
			else {
				return false;		
			}
		}else{
			getActivitiesForTemplate(templateId);
		}
	}

});


function resetTemplate(id){
	var sorHiddenRowCount = $("#tblsor tbody tr:hidden[id='sorRow']").length;
	var nonSorHiddenRowCount = $("#tblNonSor tbody tr:hidden[id='nonSorRow']").length;
	if(id!="" && (sorHiddenRowCount !=1 || nonSorHiddenRowCount!=1)){ 
		var ans=confirm($("#estimateTemplateConfirmMsg").val());	
		if(ans) {
			clearActivities();
			getActivitiesForTemplate(id);
		}
		else {
			return false;		
		}
	}
	else{
		getActivitiesForTemplate(id);
	}
}

function clearActivities(){
	$('.soractivityid').each(function() {
		if($(this).val() != "") {
			var id = $(this).val();
			if(!$("#removedActivityIds").val()==""){
				$("#removedActivityIds").val($("#removedActivityIds").val()+",");
			}
			$("#removedActivityIds").val($("#removedActivityIds").val()+id);
		}
	});
	$('.activityid').each(function() {
		if($(this).val() != "") {
			var id = $(this).val();
			if(!$("#removedActivityIds").val()==""){
				$("#removedActivityIds").val($("#removedActivityIds").val()+",");
			}
			$("#removedActivityIds").val($("#removedActivityIds").val()+id);
		}
	});
	var hiddenRowCount = $("#tblsor tbody tr:hidden[id='sorRow']").length;
	if(hiddenRowCount == 0) {
		var sorrowcount = jQuery("#tblsor > tbody > tr").length;
		var sortbl=document.getElementById('tblsor');
		for(rowcount=2;rowcount<=sorrowcount;rowcount++){
			resetIndexes();
			if(rowcount==2) {
				$('.soractivityid').val('');
				$('.sorhiddenid').val('');
				$('#quantity_0').val('');
				$('#quantity_0').removeAttr('readonly');
				$('.amount_0').html('');
				$('#vat_0').val('');
				$('.vatAmount_0').html('');
				$('.total_0').html('');
				$('.code_0').html('');
				$('.summary_0').html('');
				$('.uom_0').html('');
				$('.rate_0').html('');
				$('.description_0').html('');
				$('.mstd').html('');
				$('.mspresent').val('0');
				$('#sorRow').prop("hidden",true);
				$('#sorRow').attr('sorinvisible', 'true');

			} else {
				sortbl.deleteRow(3);
			}
		}
	}

	hiddenRowCount = $("#tblNonSor tbody tr:hidden[id='nonSorRow']").length;
	if(hiddenRowCount == 0) {
		var nonsorrowcount = jQuery("#tblNonSor > tbody > tr").length;
		var nonsortbl=document.getElementById('tblNonSor');
		for(rowcount=2;rowcount<=nonsorrowcount;rowcount++){
			if(rowcount==2) {
				$('.activityid').val('');
				$('.nonSorId').val('');
				$('.nonSorDesc').val('');
				$('.nonSorUom').val('');
				$('.nonSorEstimateRate').val('');
				$('.nonSorRate').val('');
				$('.nonSorQuantity').val('');
				$('.nonSorQuantity').removeAttr('readonly');
				$('.nonsoramount').html('');
				$('.nonSorServiceTaxPerc').val('');
				$('.nonSorVatAmt').html('');
				$('.nonSorTotal').html('');
				$('.mstd').html('');
				$('.mspresent').val('0');
				$('#nonSorRow').prop("hidden",true);
				$('#nonSorRow').attr('nonsorinvisible', 'true');
				$('#nonSorMessage').removeAttr("hidden");
			} else {
				nonsortbl.deleteRow(3);
			}
		}
		resetIndexes();
	}
}

function getActivitiesForTemplate(id){
	var nonSorCheck  = false;
	$.ajax({
		url: "/egworks/abstractestimate/ajaxgetestimatetemplatebyid/"+id,     
		type: "GET",
		dataType: "json",
		success: function (estimateTemplateActivities) {
			var sorCount = 0;
			var nonSorCount = 0;
			$.each(estimateTemplateActivities, function(index,estimateTemplateActivity){

				if(index==0){
					$('#message').prop("hidden",true);
					$('#sorRow').removeAttr("hidden");
					$('#sorRow').removeAttr('sorinvisible');
				}else{
					if(estimateTemplateActivity.schedule != null){
						var key = $("#tblsor tbody tr:visible[id='sorRow']").length - 1;
						addRow('tblsor', 'sorRow');
						resetIndexes();
						$('#soractivityid_' + key).val('');
						$('#quantity_' + key).val('');
						$('#quantity_' + key).removeAttr('readonly');
						$('.amount_' + key).html('');
						$('#vat_' + key).val('');
						$('.vatAmount_' + key).html('');
						$('.total_' + key).html('');
						document.getElementById('sorActivities['+key+'].mstd').innerHTML=""; 
						document.getElementById('sorActivities['+key+'].mspresent').value="0"; 
						generateSorSno();	
					}else{
						if(!nonSorCheck){
							$('#nonSorMessage').prop("hidden",true);
							$('#nonSorRow').removeAttr("hidden");
							$('#nonSorRow').removeAttr('nonsorinvisible');
						}
						if(nonSorCheck) {
							var key = $("#tblNonSor tbody tr:visible[id='nonSorRow']").length;
							addRow('tblNonSor', 'nonSorRow');
							resetIndexes();
							$('#activityid_' + key).val('');
							$('#nonSorId_' + key).val('');
							$('#nonSorDesc_' + key).val('');
							$('#nonSorUom_' + key).val('');
							$('#nonSorRate_' + key).val('');
							$('#nonSorEstimateRate_' + key).val('');
							$('#nonSorQuantity_' + key).val('');
							$('#nonSorQuantity_' + key).removeAttr('readonly');
							$('.nonSorAmount_' + key).html('');
							$('#nonSorServiceTaxPerc_' + key).val('');
							$('.nonSorVatAmt_' + key).html('');
							$('.nonSorTotal_' + key).html('');
							document.getElementById('sorActivities['+key+'].mstd').innerHTML=""; 
							document.getElementById('sorActivities['+key+'].mspresent').value="0"; 
							generateSlno();
						}
						nonSorCheck = true;
					}
				}
				if(estimateTemplateActivity.schedule != null){
					$('#id_'+sorCount).val(estimateTemplateActivity.schedule.id);
					$('.code_'+sorCount).html(estimateTemplateActivity.schedule.code);
					$('.summary_'+sorCount).html(estimateTemplateActivity.schedule.summary);
					$('.description_'+sorCount).html(hint.replace(/@fulldescription@/g, estimateTemplateActivity.schedule.description));
					$('.uom_'+sorCount).html(estimateTemplateActivity.schedule.uom.uom);
					$('#sorUomid_'+sorCount).val(estimateTemplateActivity.schedule.uom.id);
					document.getElementById('sorActivities['+sorCount+'].mstd').innerHTML=""; 
					document.getElementById('sorActivities['+sorCount+'].mspresent').value="0"; 
					if(estimateTemplateActivity.schedule.sorRate!=null) {
						$('.estimateRate_'+sorCount).html(estimateTemplateActivity.schedule.sorRate);
						$('#rate_'+sorCount).val(getUnitRate(estimateTemplateActivity.schedule.uom.uom, estimateTemplateActivity.schedule.sorRate));
						$('#estimateRate_'+sorCount).val(estimateTemplateActivity.schedule.sorRate);
					}
					else {
						$('.estimateRate_'+sorCount).html(0);
						$('#rate_'+sorCount).val(0);
						$('#estimateRate_'+sorCount).val(0);
					}
					sorCount++;
				}else{
					$('#nonSorDesc_'+nonSorCount).val(estimateTemplateActivity.nonSor.description);
					$('#nonSorUom_'+nonSorCount).val(estimateTemplateActivity.uom.id);
					$('#nonSorUomid_'+nonSorCount).val(estimateTemplateActivity.uom.id);
					$('#nonSorEstimateRate_'+nonSorCount).val(estimateTemplateActivity.rate.formattedString);
					$('#nonSorRate_'+nonSorCount).val(getUnitRate(estimateTemplateActivity.uom.uom,estimateTemplateActivity.rate));
					document.getElementById('nonSorActivities['+nonSorCount+'].mstd').innerHTML=""; 
					document.getElementById('nonSorActivities['+nonSorCount+'].mspresent').value="0"; 
					nonSorCount++;
				}
				resetIndexes();
			});
		}, 
		error: function (response) {
			//console.log("failed");
		}
	});

	resetIndexes();
	calculateEstimateAmountTotal();
	calculateVatAmountTotal();
	total();
	calculateNonSorEstimateAmountTotal();
	calculateNonSorVatAmountTotal();
	nonSorTotal();
}

function getSchemsByFundId(fundId) {
	if ($('#fund').val() === '') {
		$('#scheme').empty();
		$('#scheme').append($('<option>').text('Select from below').attr('value', ''));
		$('#subScheme').empty();
		$('#subScheme').append($('<option>').text('Select from below').attr('value', ''));
		return;
	} else {

		$.ajax({
			method : "GET",
			url : "/egworks/lineestimate/getschemesbyfundid",
			data : {
				fundId : $('#fund').val()
			},
			async : true
		}).done(
				function(response) {
					$('#scheme').empty();
					$('#scheme').append($("<option value=''>Select from below</option>"));
					var output = '<option value="">Select from below</option>';
					$.each(response, function(index, value) {
						var selected="";
						if($schemeId)
						{
							if($schemeId==value.id)
							{
								selected="selected";
							}
						}
						$('#scheme').append($('<option '+ selected +'>').text(value.name).attr('value', value.id));
					});
				});

	}
}

function getSubSchemsBySchemeId(schemeId) {
	if (schemeId === '') {
		$('#subScheme').empty();
		$('#subScheme').append($('<option>').text('Select from below').attr('value', ''));
		return;
	} else {
		$.ajax({
			url: "/egworks/lineestimate/getsubschemesbyschemeid/"+schemeId,     
			type: "GET",
			dataType: "json",
			success: function (response) {
				$('#subScheme').empty();
				$('#subScheme').append($("<option value=''>Select from below</option>"));
				var responseObj = JSON.parse(response);
				$.each(responseObj, function(index, value) {
					$('#subScheme').append($('<option>').text(responseObj[index].name).attr('value', responseObj[index].id));
					$('#subScheme').val($subSchemeId);
				});
			}, 
			error: function (response) { 
				//console.log("failed");
			}
		});
	}
}


$(document).on('blur', '.inputYearEstimatePercentage', function(e){
	calculatePercentage('#estimateTotal', '.inputYearEstimatePercentage');
});

$(document).on('paste', '.inputYearEstimatePercentage', function(e){
	calculatePercentage('#estimateTotal', '.inputYearEstimatePercentage');
});

function calculatePercentage(displayElem, classname)
{
	var percentage=0;
	$(classname).each(function(idx, elem){
		if($(elem).val()){
			percentage = percentage + parseFloat($(elem).val());
			if(percentage > 100) {
				bootbox.alert("Total percentage should not be greater than 100 ");
				$(elem).val("");
			} else
				$(displayElem).text(percentage);
		}
	});
}

$(document).on('change', '.dropdownYear', function(e){
	validateDuplicateYear();
});

function validateDuplicateYear()
{

	var isValidationSuccess=true;
	var selectedYearCollection=[];

	$(".dropdownYear").each(function(idx, elem){

		var selectedYear=jQuery(this).find("option:selected").text();

		if(selectedYearCollection.indexOf(selectedYear) === -1)
		{
			selectedYearCollection.push(selectedYear);
		}
		else
		{
			//duplicate value handling statement
			isValidationSuccess=false;
			$(this).prop('selectedIndex', 0);
			bootbox.alert("The year "+ selectedYear +" already selected!");
			return false;
		}
	});

	return isValidationSuccess;

}

function viewLineEstimate(id) {
	window.open("/egworks/lineestimate/view/" + id, '', 'height=650,width=980,scrollbars=yes,left=0,top=0,status=yes');
}

function viewLOA(id) {
	window.open("/egworks/letterofacceptance/view/" + id, '', 'height=650,width=980,scrollbars=yes,left=0,top=0,status=yes');
}

function validateQuantity() {
	$( "input[name$='quantity']" ).on("keyup", function(){
		var valid = /^[1-9](\d{0,9})(\.\d{0,2})?$/.test(this.value),
		val = this.value;

		if(!valid){
			//console.log("Invalid input!");
			this.value = val.substring(0, val.length - 1);
		}
	});
}

function updateUom(obj) {
	var rowId = $(obj).attr('id').split('_').pop();
	$('#nonSorUomid_' + rowId).val($(obj).val());
	$('#nonSorUomid_' + rowId).val($(obj).val());
	$('#nonSorEstimateRate_' + rowId).val("");
	$('#nonSorQuantity_' + rowId).val("");
	calculateNonSorEstimateAmount($('#nonSorQuantity_' + rowId));
}

$(document).on('click', '#tblassetdetails tbody tr', function() {
	$inputHiddenAssetId = $(this).find('input[name$="asset.id"]');
	if($inputHiddenAssetId.val())
	{
		assetId = $inputHiddenAssetId.val();
		var url = "/egassets/assetmaster/asset-showform.action?id="+assetId+"&userMode=view";
		window.open(url,'', 'height=650,width=980,scrollbars=yes,status=yes'); 
	}
});

function update(data)
{
	var index = 0;
	var isValid = 1;
	jQuery("#assetDetailRow").clone().find("input:hidden").each(function() {
		var assetId = $('input[name="assetValues['+ index +'].asset.id"]').val();
		if(data.id == assetId) {
			isValid = 0;
			return false;
		}
		index++;
	});
	if(isValid == 1) {
		$('span[id="assetname['+ data.rowidx +']"]').html(data.name);
		$('span[id="assetcode['+ data.rowidx +']"]').html(data.code);
		$('input[name="assetValues['+ data.rowidx +'].asset.code"]').val(data.code);
		$('input[name="assetValues['+ data.rowidx +'].asset.name"]').val(data.name);
		$('input[name="assetValues['+ data.rowidx +'].asset.id"]').val(data.id);
	} else {
		bootbox.alert("Selected Asset details already added");
	}
}


function getStatusForNatureOfWork(name) {
	if(name=='Deposit Works' || name=='Deposit Works')
		return '';
	else
		return 'Created&assetStatus=CWIP&assetStatus=Capitalized&assetStatus=Revaluated';
}

function addAssetDetails() {
	var tbl = document.getElementById('tblassetdetails');
	var rowO = tbl.rows.length;
	if(document.getElementById('assetDetailRow') != null)
	{
		//get Next Row Index to Generate
		var nextIdx = tbl.rows.length-1;
		var sno = 1;
		sno = nextIdx + 1;
		//validate status variable for exiting function
		var isValid=1;//for default have success value 0  

		//validate existing rows in table
		jQuery("#assetDetailsTbl tbody tr").find("input:hidden").each(function() {
			if((jQuery(this).data('optional') === 0) && (jQuery(this).val()))
			{
				//console.log('calling :)');
				jQuery(this).focus();
				bootbox.alert("Please enter value for the row");
				isValid=0;//set validation failure
				return false;
			}
		});

		if (isValid === 0) {
			return false;
		}

		jQuery("#assetDetailRow").clone().find("input:hidden, span, button").each(function() {

			if($(this).attr("id"))
			{
				$(this).attr({
					'id': function(_, id) { 
						return id.replace(/\[.\]/g, '['+ nextIdx +']'); 
					}});
				$(this).html('');
				$(this).val('');
			}

			if($(this).attr("name"))
			{
				$(this).attr({
					'name': function(_, name) {
						return name.replace(/\[.\]/g, '['+ nextIdx +']'); 
					}});
			}

			if($(this).attr("data-idx"))
			{
				$(this).attr({
					'data-idx' : function(_,dataIdx)
					{
						return nextIdx;
					}
				});

			}

			if($(this)[0].hasAttribute("data-sno"))
			{
				$(this).text((nextIdx+1));
			}



		}).end().appendTo("#assetDetailsTbl");
	}
}

function deleteAssetDetail(obj) {
	rIndex = getRow(obj).rowIndex - 1;
	var tbl=document.getElementById('assetDetailsTbl');
	var rowo=tbl.rows.length;
	if(rowo<=1)
	{
		bootbox.alert("This row cannot be deleted");
		return false;
	}
	else
	{	
		tbl.deleteRow(rIndex);	

		//starting index for table fields
		var idx=0;

		//regenerate index existing inputs in table row
		$("#tblassetdetails tbody tr").each(function() {

			$spanSNo=$(this).find('span[data-sno]');
			if($spanSNo)
			{
				$spanSNo.text((idx+1));
			}
			$(this).find("input, select, span, button").each(function() {

				if($(this).attr("id"))
				{
					$(this).attr({
						'id': function(_, id) {  
							return id.replace(/\[.\]/g, '['+ idx +']'); 
						}});
				}

				if($(this).attr("name"))
				{
					$(this).attr({
						'name': function(_, name) {
							return name.replace(/\[.\]/g, '['+ idx +']'); 
						}});
				}

				if($(this).attr("data-idx"))
				{
					$(this).attr({
						'data-idx' : function(_,dataIdx)
						{
							return idx;
						}
					});
				}
			});
			idx++;
		});
		return true;
	}	

}

function changeColor(tableRow, highLight)
{
	if (highLight)
	{
		tableRow.style.backgroundColor = '#dcfac9';
	}
	else
	{
		tableRow.style.backgroundColor = 'white';
	}
}

function validateWorkFlowApprover(name) {
	document.getElementById("workFlowAction").value = name;
	var approverPosId = document.getElementById("approvalPosition");
	var button = document.getElementById("workFlowAction").value;

	var flag = true;

	if (button != null && button == 'Save') {
		$('#approvalDepartment').removeAttr('required');
		$('#approvalDesignation').removeAttr('required');
		$('#approvalPosition').removeAttr('required');
		$('#approvalComent').removeAttr('required');

		flag = validateSORDetails();

		if($('#abstractEstimate').valid()) {
			$('.nonSorEstimateRate').each(function() {
				if (parseFloat($(this).val()) <= 0)
					flag = false;
			});
			$('.estimateRate').each(function() {
				if (parseFloat($(this).html()) <= 0)
					flag = false;
			});
			if (!flag) {
				bootbox.alert($('#errorrateszero').val());
				return false;
			}

			$('.quantity').each(function() {
				if (parseFloat($(this).val()) <= 0)
					flag = false;
			});
			$('.nonSorQuantity').each(function() {
				if (parseFloat($(this).val()) <= 0)
					flag = false;
			});

			if (!flag) {
				bootbox.alert($('#errorquantityzero').val());
				return false;
			}
		}		
	}
	if (button != null && button == 'Approve') {
		$('#approvalComent').removeAttr('required');
	}
	if (button != null && button == 'Submit') {
		$('#approvalDepartment').attr('required', 'required');
		$('#approvalDesignation').attr('required', 'required');
		$('#approvalPosition').attr('required', 'required');
		$('#approvalComent').removeAttr('required');
	}
	if (button != null && button == 'Reject') {
		$('#approvalDepartment').removeAttr('required');
		$('#approvalDesignation').removeAttr('required');
		$('#approvalPosition').removeAttr('required');
		$('#approvalComent').attr('required', 'required');
	}
	if (button != null && button == 'Cancel') {
		$('#approvalDepartment').removeAttr('required');
		$('#approvalDesignation').removeAttr('required');
		$('#approvalPosition').removeAttr('required');
		$('#approvalComent').attr('required', 'required');

		if($("form").valid())
		{
			bootbox.confirm($('#cancelConfirm').val(), function(result) {
				if(!result) {
					bootbox.hideAll();
					return false;
				} else {
					validateSORDetails();
					document.forms[0].submit();
				}
			});
		}
		return false;
	}
	if (button != null && button == 'Forward') {
		$('#approvalDepartment').attr('required', 'required');
		$('#approvalDesignation').attr('required', 'required');
		$('#approvalPosition').attr('required', 'required');
		$('#approvalComent').removeAttr('required');

		var lineEstimateAmount = parseFloat($('#lineEstimateAmount').val());
		var estimateValue = parseFloat($('#estimateValueTotal').html());
		if(estimateValue > lineEstimateAmount) {
			var diff = estimateValue - lineEstimateAmount;
			bootbox.alert("Abstract estimate amount is Rs."+ diff +"/- more than the administrative sanctioned amount for this estimate , please create abstract estimate with less amount");
			return false;
		}

		var inVisibleSorCount = $("#tblsor tbody tr[sorinvisible='true']").length;
		var inVisibleNonSorCount = $("#tblNonSor tbody tr[nonsorinvisible='true']").length;
		if (inVisibleSorCount == 1 && inVisibleNonSorCount == 1) {
			bootbox.alert($('#errorsornonsor').val());
			return false;
		}

		$locationAppConfig = $('#locationAppConfig').val();
		if($locationAppConfig == 'true') {
			if($('#location').val() == '') {
				bootbox.alert($('#errorlocation').val());
				return false;
			}
		} else $('#spanlocation').hide();

		flag = validateSORDetails();

		if($('#abstractEstimate').valid()) {
			$('.nonSorEstimateRate').each(function() {
				if (parseFloat($(this).val()) <= 0)
					flag = false;
			});
			$('.estimateRate').each(function() {
				if (parseFloat($(this).html()) <= 0)
					flag = false;
			});
			if (!flag) {
				bootbox.alert($('#errorrateszero').val());
				return false;
			}

			$('.quantity').each(function() {
				if (parseFloat($(this).val()) <= 0)
					flag = false;
			});
			$('.nonSorQuantity').each(function() {
				if (parseFloat($(this).val()) <= 0)
					flag = false;
			});
			if (!flag) {
				bootbox.alert($('#errorquantityzero').val());
				return false;
			}
		}
	}

	if(flag) {
		document.forms[0].submit;
		return true;
	} else
		return false;
}

function validateSORDetails() {
	if($('#abstractEstimate').valid()) {
		var hiddenRowCount = $("#tblsor tbody tr[sorinvisible='true']").length;
		if(hiddenRowCount == 1) {
			var tbl=document.getElementById('tblsor');
			tbl.deleteRow(2);
		}

		hiddenRowCount = $("#tblNonSor tbody tr[nonsorinvisible='true']").length;
		if(hiddenRowCount == 1) {
			var tbl=document.getElementById('tblNonSor');
			tbl.deleteRow(2);
		}
		var overheadTableLength = jQuery('#overheadTable tr').length-1;
		if(overheadTableLength == 1){
			var overhead = document.getElementById('tempOverheadValues[0].overhead.id').value;
			if(overhead==""){
				var tbl=document.getElementById('overheadTable');
				tbl.deleteRow(1);
			}
		}
		var tbl=document.getElementById('tblassetdetails');
		var assetTableLength = jQuery('#tblassetdetails tr').length-1;
		for (var i = 0; i < assetTableLength; i++) {
			var assetname = document.getElementById('assetValues['+ i + '].asset.name').value;
			var assetcode = document.getElementById('assetValues['+ i + '].asset.code').value;
			if(assetname == "" && assetcode== ""){
				tbl.deleteRow(i+1);
			}
		}
		if(!validateOverheads())
			return false;
		$('.disablefield').removeAttr("disabled");
		return true;
	} else
		return false;
}

function viewBOQ() {
	var estimateId = $("#estimateId").val();
	window.open("/egworks/abstractestimate/viewBillOfQuantitiesXls/"+estimateId,"","height=600,width=1200,scrollbars=yes,left=0,top=0,status=yes");
}

function openMap()
{
	var params = [
	              'height='+screen.height,
	              'width='+screen.width,
	              'fullscreen=yes' 
	              ].join(',');
	var popup ;
	var  lat = document.getElementById("latitude").value ;
	var lon = document.getElementById("longitude").value ;
	var status = $("#statusCode").val();
	if(status==null || status=='' || status =='NEW' || status=='REJECTED')
	{
		if(lat!='' && lon!='')
		{
			popup = window.open('/egworks/abstractestimate/maps?mapMode=edit&latitude='+lat+'&longitude='+lon,'popup_window', params);
		}
		else
		{
			popup = window.open('/egworks/abstractestimate/maps?mapMode=edit','popup_window', params);	
		}
	}	
	else
	{
		if(lat!='' && lon!='')
		{
			popup = window.open('/egworks/abstractestimate/maps?mapMode=view&latitude='+lat+'&longitude='+lon,'popup_window', params);
		}
		else
			return;
	}	
	//popup.moveTo(0,0);
}

function addRow(tableName,rowName) {


	if (document.getElementById(rowName) != null) {
		// get Next Row Index to Generate
		var nextIdx = 0;
		var sno = 1;
		//nextIdx =document.getElementsByName("sorRow").length;
		nextIdx = jQuery("#"+tableName+" > tbody > tr").length-1;
		 
		//sno = nextIdx;

		//console.log('TABLE ->', tableName);

		//console.log('NEXT IDX ->', nextIdx);

		// Generate all textboxes Id and name with new index
		var $row;
		if(tableName.indexOf("overheadTable")>=0)
			{
			$row=jQuery("#"+tableName+" tr:eq(1)").clone();
			nextIdx=nextIdx+1;
			}else
				{
		var $row=jQuery("#"+tableName+" tr:eq(2)").clone();
				}

		$row.find("input,select, errors,button, span,textarea").each(function() {
			var classval = jQuery(this).attr('class');
			if (jQuery(this).data('server')) {
				jQuery(this).removeAttr('data-server');
			}
			if(classval == 'spansorslno') {
				jQuery(this).text(nextIdx+1);
			}
			
			if(classval == 'spansno') {
				jQuery(this).text(nextIdx+1);
			}

			if(classval == 'assetdetail') {
				$(this).html('');
				$(this).val(''); 
			} 
			jQuery(this).attr(
					{
						'name' : function(_, name) {
							if(!(jQuery(this).attr('name')===undefined))
								return name.replace(/\d+/, nextIdx); 
						},
						'id' : function(_, id) {
							if(!(jQuery(this).attr('id')===undefined))
								return id.replace(/\d+/, nextIdx); 
						},
						'class' : function(_, name) {
							if(!(jQuery(this).attr('class')===undefined))
								return name.replace(/\d+/, nextIdx); 
						}/*,
						'data-idx' : function(_,dataIdx)
						{
							return nextIdx++;
						}*/
					});
			// if element is static attribute hold values for next row, otherwise it will be reset
			if (!jQuery(this).data('static')) {
				jQuery(this).val('');
			}

		}).end().appendTo("#"+tableName+" > tbody");	

		//console.log($row.html());

		sno++;

	}
}

function deleteRow(tableName,obj){
	if(ismsheetOpen())
	{
		bootbox.alert("Measurement Sheet is open Please close it first");
		return ;
	}
	var rIndex = getRow(obj).rowIndex;
	var id = jQuery(getRow(obj)).children('td:first').children('input:first').val();
	//To get all the deleted rows id
	var aIndex = rIndex - 1;
	var tbl=document.getElementById(tableName);	
	var rowcount=jQuery("#"+tableName+" > tbody > tr").length;
	if(rowcount<=1) {
		bootbox.alert("This row can not be deleted");
		return false;
	} else {
		tbl.deleteRow(rIndex);
		//starting index for table fields
		var idx= 0;
		var sno = 1;
		//regenerate index existing inputs in table row
		jQuery("#"+tableName+" > tbody > tr").each(function() {
			if(tableName=='tblsor')
			{
				jQuery(this).find("input,button, select,textarea,td,tbody,table, errors, span, input:hidden").each(function() {
					var classval = jQuery(this).attr('class');

					if(classval == 'spansno') {
						jQuery(this).text(sno);
						sno++;
					} else {
						jQuery(this).attr({
							'name': function(_, name) {
								if(!(jQuery(this).attr('name')===undefined))
									return name.replace(/sorActivities\[.\]/g, "sorActivities["+idx+"]"); 
							},
							'id': function(_, id) {
								if(!(jQuery(this).attr('id')===undefined))
									return id.replace(/sorActivities\[.\]/g, "sorActivities["+idx+"]"); 
							},
							'class' : function(_, name) {
								if(!(jQuery(this).attr('class')===undefined))
									return name.replace(/sorActivities\[.\]/g, "sorActivities["+idx+"]"); 
							},
							'data-idx' : function(_,dataIdx)
							{
								if(!(jQuery(this).attr('data-idx')===undefined))
									return idx;
							}
						});
					}
				});

				idx++;
			}
			else if( tableName=="tblNonSor")
			{
				jQuery(this).find("input, select,textarea,td,tbody,tr,table, errors, span, input:hidden").each(function() {
					var classval = jQuery(this).attr('class');

					if(classval == 'spansno') {
						jQuery(this).text(sno);
						sno++;
					} else {
						jQuery(this).attr({
							'name': function(_, name) {
								if(!(jQuery(this).attr('name')===undefined))
									return name.replace(/nonSorActivities\[.\]/g, "nonSorActivities["+idx+"]"); 
							},
							'id': function(_, id) {
								if(!(jQuery(this).attr('id')===undefined))
									return id.replace(/nonSorActivities\[.\]/g, "nonSorActivities["+idx+"]"); 
							},
							'class' : function(_, name) {
								if(!(jQuery(this).attr('class')===undefined))
									return name.replace(/nonSorActivities\[.\]/g, "nonSorActivities["+idx+"]"); 
							},
							'data-idx' : function(_,dataIdx)
							{
								if(!(jQuery(this).attr('data-idx')===undefined))
									return idx;
							}
						});
					}
				});

				idx++;




			}else
			{

				jQuery(this).find("input, select,button,textarea, errors, span, input:hidden").each(function() {
					var classval = jQuery(this).attr('class');

					if(classval == 'spansno') {
						jQuery(this).text(sno);
						sno++;
					} else {
						jQuery(this).attr({
							'name': function(_, name) {
								if(!(jQuery(this).attr('name')===undefined))
									return name.replace(/\[.\]/g, '['+ idx +']'); 
							},
							'id': function(_, id) {
								if(!(jQuery(this).attr('id')===undefined))
									return id.replace(/\[.\]/g, '['+ idx +']'); 
							},
							'class' : function(_, name) {
								if(!(jQuery(this).attr('class')===undefined))
									return name.replace(/\[.\]/g, '['+ idx +']'); 
							},
							'data-idx' : function(_,dataIdx)
							{
								if(!(jQuery(this).attr('data-idx')===undefined))
									return idx;
							}
						});
					}
				});

				idx++;
			}
		});
		return true;
	}
}

function getUnitRate(uom,estimateRate){
	var unitRate=0;
	var exceptionalUOMValues = $ExceptionalUOMs.split(':');
	var exceptionalUOMArray = $.makeArray( exceptionalUOMValues );
	$.map( exceptionalUOMArray, function( val, i ) {
		if(val.split(",")[0] == uom)
			unitRate = parseFloat( parseFloat(estimateRate) / parseFloat( val.split(",")[1] )).toFixed(2);
	});
	if(unitRate!=0)
		return unitRate;
	else
		return estimateRate;
}


function viewEstimatePDF() {
	var estimateId = $("#estimateId").val();
	window.open("/egworks/abstractestimate/abstractEstimatePDF/" + estimateId, "", "height=600,width=1200,scrollbars=yes,left=0,top=0,status=yes");
}
function addMSheet(obj)    
{
//	console.log("adding msheet for "+obj.id);
	var rowid=obj.id;
	sorId=rowid.split(".");
	var	sortable=sorId[0];


	var msfieldsName=rowid.replace("msadd","measurementSheetList");
	var   mscontent=document.getElementById(rowid.replace("msadd","mstd")).innerHTML;

	var   msopen=document.getElementById(rowid.replace("msadd","msopen")).value;
	if(msopen==1)
		return ;

	if(mscontent!='')
	{
		  if(mscontent.indexOf(headstart) >=0)
			  {
			  var head= mscontent.substring(mscontent.indexOf(headstart),mscontent.indexOf(headend));
			  var tail= mscontent.substring(mscontent.indexOf(tailstart),mscontent.indexOf(tailend));
			  mscontent= mscontent.replace(head,"");
			  mscontent= mscontent.replace(tail,"");
			  }
		
		var curRow = $(obj).closest('tr');
		var k= "<tr id=\""+sortable+".mstr\"><td colspan=\"9\">";
		mscontent=k+mscontent+"</td></tr>";
		curRow.after(mscontent);
		document.getElementById(rowid.replace("msadd","mstd")).innerHTML="";
		document.getElementById(rowid.replace("msadd","msopen")).value="1";
		var idx=sortable.substr(sortable.indexOf("["),sortable.indexOf("]"));
		
		if(sortable.indexOf("sorActivities") >= 0)
		{
			sorMsArray[idx]=mscontent;
		}
		else
		{
			nonSorMsArray[idx]=mscontent;
		}


	}else
	{

		var curRow = $(obj).closest('tr');
		var newrow= $('#msheaderrowtemplate').html();

		newrow=  newrow.replace(/msrowtemplate/g,'msrow'+sortable);
		newrow=  newrow.replace(/templatesorActivities\[0\]/g,sortable);
		document.getElementById(rowid.replace("msadd","msopen")).value="1";
		document.getElementById(rowid.replace("msadd","mspresent")).value="1";
		curRow.after(newrow);
		var idx=sortable.substr(sortable.indexOf("["),sortable.indexOf("]"));
		if(sortable.indexOf("sorActivities") >= 0)
		{
			sorMsArray[idx]="";
		}
		else
		{
			nonSorMsArray[idx]="";
		}

	}
	patternvalidation();
}

$(document).on('click','.hide-ms',function () {

	var sid=$(this).closest('tr').attr("id");
	var name=	sid.split(".")[0]
	var idx=name.substr(name.indexOf("["),name.indexOf("]"));
	if(sid.split(".")[0].indexOf("sorActivities") >= 0)
	{
		document.getElementById(sid.split(".")[0]+".mstd").innerHTML=sorMsArray[idx];
		if(sorMsArray[idx].length==0)
			document.getElementById(sid.split(".")[0]+".mspresent").value="0";
			
	}else
	{
		document.getElementById(sid.split(".")[0]+".mstd").innerHTML=nonSorMsArray[idx];
		if(nonSorMsArray[idx].length==0)
			document.getElementById(sid.split(".")[0]+".mspresent").value="0";
	}

	document.getElementById(sid.split(".")[0]+".msopen").value="0";
	
	var mstr=document.getElementById(sid.split(".")[0]+".mstr");
	$(mstr).remove();

	/*
	var mscontent="<tr id=\""+sid.split(".")[0]+".mstr\">";
	document.getElementsByName(sid.split(".")[0]+".quantity")[0].value=document.getElementById(sid.split(".")[0]+".msnet").innerHTML;
	var net=eval(document.getElementById(sid.split(".")[0]+".msnet").innerHTML);
	if(net==NaN ||net<=0)
	{
		alert("Net amount should be greater than 0");
		return false;
	}
	var qobj=document.getElementsByName(sid.split(".")[0]+".quantity")[0];
	if(!validateMsheet(qobj))
	{
		return false;
	}

	mscontent=document.getElementById(sid.split(".")[0]+".mstr").innerHTML;

	document.getElementById(sid.split(".")[0]+".mstr")
	document.getElementById(sid.split(".")[0]+".mstd")
	document.getElementById(sid.split(".")[0]+".mstd").innerHTML=mscontent;
	document.getElementById(sid.split(".")[0]+".msopen").value="0";
	var mstr=document.getElementById(sid.split(".")[0]+".mstr");
	$(mstr).remove();
	if(sid.split(".")[0].indexOf("sorActivities") >= 0)
	{
		calculateEstimateAmount(document.getElementsByName(sid.split(".")[0]+".quantity")[0]);
	}else
	{
		calculateNonSorEstimateAmount(document.getElementsByName(sid.split(".")[0]+".quantity")[0]);
	}
	var qobj=document.getElementsByName(sid.split(".")[0]+".quantity")[0];

	$(qobj).attr("readonly","readonly");*/
});



$(document).on('change','.runtime-update',function (e) {


	if($(this).is("input"))
	{
		//console.log('input value change triggered!');
		$(this).attr('value', $(this).val());
		//console.log('OnChange', $(this).attr('value'));
		findTotal(this);

	}
	else if($(this).is("select"))
	{
		//console.log('dropdown value change triggered!');
		$(this).find('option:selected').attr('selected', 'selected');
	}
	else if($(this).is("textarea"))
	{
		//console.log('dropdown value change triggered!');
		$(this).html($(this).val());
	}

	//$(this).closest('tr').hide();
});

/*$(document).on('click','.ms-submit',function () {

	var sid=$(this).attr("id");
	var mscontent="<tr id=\""+sid.split(".")[0]+".mstr\">";
});*/

$(document).on('click','.ms-submit',function () {

	var sid=$(this).attr("id");
	var mscontent="<tr id=\""+sid.split(".")[0]+".mstr\">";

	var net=eval(document.getElementById(sid.split(".")[0]+".msnet").innerHTML);
	if(net==NaN ||net<=0)
	{
		alert("Net amount should be greater than 0");
		return false;
	}
	var qobj1=document.getElementById(sid.split(".")[0]+".measurementSheetList[0].no");
	if(!validateMsheet(qobj1))
	{
		return false;
	}

	document.getElementsByName(sid.split(".")[0]+".quantity")[0].value=document.getElementById(sid.split(".")[0]+".msnet").innerHTML;
	mscontent=document.getElementById(sid.split(".")[0]+".mstr").innerHTML;
	document.getElementById(sid.split(".")[0]+".mstr")
	document.getElementById(sid.split(".")[0]+".mstd")
	document.getElementById(sid.split(".")[0]+".mstd").innerHTML=mscontent;
	document.getElementById(sid.split(".")[0]+".msopen").value="0";
	var mstr=document.getElementById(sid.split(".")[0]+".mstr");
	$(mstr).remove();
	var qobj=document.getElementsByName(sid.split(".")[0]+".quantity")[0];
	if(sid.split(".")[0].indexOf("sorActivities") >= 0)
	{
		calculateEstimateAmount(document.getElementsByName(sid.split(".")[0]+".quantity")[0]);
	}else
	{
		calculateNonSorEstimateAmount(document.getElementsByName(sid.split(".")[0]+".quantity")[0]);
	}
	$(qobj).attr("readonly","readonly");


})

function  deleteThisRow(obj) {
	var rIndex = getRow(obj).rowIndex;
	var tablename=$(obj).closest('table').attr('id');
	var tbl=document.getElementById( tablename);
	var rowcount=$(obj).closest('table').find('tr').length;
	//console.log(tbl);
	if(rowcount<=3) {
		bootbox.alert("This row can not be deleted");
		return false;
	} else {
		tbl.deleteRow(rIndex);
	}
	reindex(tablename);
	findNet(tbl);  

}

function reindex(tableId)
{

	var idx=0;
	tbl=document.getElementById(tableId);
	////console.log($(tbl).html());

	$(tbl).find("tbody tr").each(function(e) {

		//console.log('for loop');
		$(this).find("input,select,textarea").each(function() {
			var classval = jQuery(this).attr('class');	
			if(classval.indexOf("spanslno") > -1) {
				jQuery(this).val(idx+1);
				$(this).attr('value', $(this).val());
			}

			$(this).attr({
				'name' : function(_, name) {
					if(name)
						return name.replace(/measurementSheetList\[.\]/g, "measurementSheetList["+idx+"]");
				},
				'id' : function(_, id) {
					if(id)
						return id.replace(/measurementSheetList\[.\]/g, "measurementSheetList["+idx+"]");
				},
				'data-idx' : function(_, dataIdx) {
					return idx;
				}
			});

		});
		idx++;
	});


}

$(document).on('click','.delete-ms',function () {

	$(this).closest('tr').hide();
})

$(document).on('click','.add-msrow',function () {
	var len=$(this).closest('table').find('tr').length;
	var msrowname= $(this).closest('table').attr('id');

	//var msrowname1=	msrowname.id;
	len=len-2;
	var msrownameid=msrowname.split(".")[0];
	var rep='measurementSheetList\['+len+'\]';

	//console.log(len+'===='+rep);
	var $newrow= "<tr>"+$('#msrowtemplate').html()+"</tr>";
	$newrow=  $newrow.replace(/templatesorActivities\[0\]/g,msrownameid);
	$newrow=  $newrow.replace(/measurementSheetList\[0\]/g,rep);
	$newrow=$newrow.replace('value="1"','value="'+(len+1)+'"');
	////console.log($newrow)
	$(this).closest('tr').before($newrow);

	patternvalidation();


})

function findTotal(obj)
{

	var name=obj.name.split(".");
	var lengthname=name[0]+'.'+name[1]+'.length';
	var no1,depthOrHeight1,width1,length1;
	var lent=$('input[id="'+lengthname+'"]');
	//console.log($(lent).attr('value'));
	var length=$(lent).attr('value');
	var no=$('input[id="'+name[0]+'.'+name[1]+'.no'+'"]').attr('value');
	var depthOrHeight=$('input[id="'+name[0]+'.'+name[1]+'.depthOrHeight'+'"]').attr('value');
	var width=$('input[id="'+name[0]+'.'+name[1]+'.width'+'"]').attr('value');

	if(isEmpty(length) && isEmpty(no) && isEmpty(depthOrHeight)  && isEmpty(width))
		$('input[id="'+name[0]+'.'+name[1]+'.quantity'+'"]').attr('value',0);
	else {
		if (length === undefined || length == '' || length == 0)
			length = 1;
		if (no === undefined || no == '' || no == 0)
			no = 1;
		if (depthOrHeight === undefined || depthOrHeight == '' || depthOrHeight == 0)
			depthOrHeight = 1;
		if (width === undefined || width == '' || width == 0)
			width = 1;

		$('input[id="'+name[0]+'.'+name[1]+'.quantity'+'"]').attr('value',parseFloat(length * no * width * depthOrHeight).toFixed(4));

	}
	var netObj=document.getElementById(name[0]+'.'+name[1]+'.quantity');
	$(netObj).attr('value', document.getElementById(name[0] + '.' + name[1] + '.quantity').value);
	var len=$(obj).closest('table').find('tbody').children.length;
	//console.log(len);
	findNet(netObj);
}

function isEmpty(str)
{
	if(!str)
	{
		return true;
	}
	else if(!str.trim()) {
		return true;
	}

	return false;
}


function findNet(obj)
{
	var len=$(obj).closest('table').find('tr').length;


	var name=obj.id.split(".");

	var sum=0;
	for(var i=0;i<len-2;i++)
	{
		var qname=name[0]+'.measurementSheetList['+i+'].quantity';
		var quantity=eval(document.getElementById(qname).value);
		var oname=name[0]+'.measurementSheetList['+i+'].identifier';
		var operationObj=document.getElementById(oname);
		var operation=operationObj.options[operationObj.selectedIndex].value;
		console.log(quantity+"---"+operation);
		if(quantity===undefined)
			quantity=0;
		if(quantity==NaN)
			quantity=0;
		if(quantity=='')
			quantity=0;
		if(operation=='A')
			sum=sum+quantity;
		else
			sum=sum-quantity;
	}
	//var fname=obj.name.split(".");
	var netName=name[0]+'.msnet';
	sum=parseFloat(sum).toFixed(4);
	//console.log(document.getElementById(netName).innerHTML);
	document.getElementById(netName).innerHTML=sum;


}

function closeAllViewmsheet()
{
	var open=false;
	$('.classmsopen').each(function (index)
			{

		if($( this ).val()==1)
		{
			var sid=$( this ).attr('id');
			var mscontent="<tr id=\""+sid.split(".")[0]+".mstr\">";
			mscontent=document.getElementById(sid.split(".")[0]+".mstr").innerHTML;
			document.getElementById(sid.split(".")[0]+".mstd").innerHTML=mscontent;
			document.getElementById(sid.split(".")[0]+".msopen").value="0";
			var mstr=document.getElementById(sid.split(".")[0]+".mstr");
			$(mstr).remove(); 
		}
			});
	
}
function openAllViewmsheet()
{
	var open=false;
	$('.classmsopen').each(function (index)
			{

		if($( this ).val()==0)
			
		{
			var sid=$( this ).attr('id');
			var	sortable=sid.split(".")[0];
			if(document.getElementById(sid.split(".")[0]+".mspresent").value==1)
			{
				
				var   mscontent=document.getElementById(sid.replace("msopen","mstd")).innerHTML;

				if(mscontent!='')
				{
					if(mscontent.indexOf(headstart) >=0)
					{
						var head= mscontent.substring(mscontent.indexOf(headstart),mscontent.indexOf(headend));
						var tail= mscontent.substring(mscontent.indexOf(tailstart),mscontent.indexOf(tailend));
						mscontent= mscontent.replace(head,"");
						mscontent= mscontent.replace(tail,"");
					}

					var curRow = $(this).closest('tr');
					var k= "<tr id=\""+sortable+".mstr\"><td colspan=\"9\">";
					mscontent=k+mscontent+"</td></tr>";
					curRow.after(mscontent);
					document.getElementById(sid.replace("msopen","mstd")).innerHTML="";
					$( this ).val(1);
				}

			}
		}

			});
	return open;	
}

function openAllmsheet()
{
	var open=false;
	$('.classmsopen').each(function (index)
			{

		if($( this ).val()==0)
			
		{
			var sid=$( this ).attr('id');
			var	sortable=sid.split(".")[0];
			if(document.getElementById(sid.split(".")[0]+".mspresent").value==1)
			{
				
				var   mscontent=document.getElementById(sid.replace("msopen","mstd")).innerHTML;

				if(mscontent!='')
				{
					if(mscontent.indexOf(headstart) >=0)
					{
						var head= mscontent.substring(mscontent.indexOf(headstart),mscontent.indexOf(headend));
						var tail= mscontent.substring(mscontent.indexOf(tailstart),mscontent.indexOf(tailend));
						mscontent= mscontent.replace(head,"");
						mscontent= mscontent.replace(tail,"");
					}

					var curRow = $(this).closest('tr');
					var k= "<tr id=\""+sortable+".mstr\"><td colspan=\"9\">";
					mscontent=k+mscontent+"</td></tr>";
					curRow.after(mscontent);
					document.getElementById(sid.replace("msopen","mstd")).innerHTML="";
					$( this ).val(1);
					var idx=sortable.substr(sortable.indexOf("["),sortable.indexOf("]"));
					
					if(sortable.indexOf("sorActivities") >= 0)
					{
						sorMsArray[idx]=mscontent;
					}
					else
					{
						nonSorMsArray[idx]=mscontent;
					}

					
				}

			}
		}

			});
	return open;	
}

function closeAllmsheet()
{
	var open=false;
	$('.classmsopen').each(function (index)
			{

		if($( this ).val()==1)
		{
			var sid=$( this ).attr('id');
			// var sid=k.closest('tr').attr("id");
			var mscontent="<tr id=\""+sid.split(".")[0]+".mstr\">";
			document.getElementsByName(sid.split(".")[0]+".quantity")[0].value=document.getElementById(sid.split(".")[0]+".msnet").innerHTML;

			mscontent=document.getElementById(sid.split(".")[0]+".mstr").innerHTML;

			document.getElementById(sid.split(".")[0]+".mstr")
			document.getElementById(sid.split(".")[0]+".mstd")
			document.getElementById(sid.split(".")[0]+".mstd").innerHTML=mscontent;
			document.getElementById(sid.split(".")[0]+".msopen").value="0";
			var mstr=document.getElementById(sid.split(".")[0]+".mstr");
			$(mstr).remove(); 
			var qobj=document.getElementsByName(sid.split(".")[0]+".quantity")[0];
			$(qobj).attr("readonly","readonly");
			if(sid.split(".")[0].indexOf("sorActivities") >= 0)
			{
				calculateEstimateAmount(document.getElementsByName(sid.split(".")[0]+".quantity")[0]);
			}else
			{
				calculateNonSorEstimateAmount(document.getElementsByName(sid.split(".")[0]+".quantity")[0]);
			}

		}
			});
	//console.log("mssheet open:"+open);
	return open;

}



function ismsheetOpen()
{
	var open=false;
	$('.classmsopen').each(function (index)
			{

		if($( this ).val()==1)
			open=true
			});
	//console.log("mssheet open:"+open);
	return open;
}

function validateMsheet(obj)
{

	var len=$(obj).closest('table').find('tr').length;


	var name=obj.id.split(".");

	var sum=0;
	for(var i=0;i<len-2;i++)
	{
		var qname=name[0]+'.measurementSheetList['+i+'].quantity';
		var no=eval(document.getElementById(name[0]+'.measurementSheetList['+i+'].no').value);
		var lent=eval(document.getElementById(name[0]+'.measurementSheetList['+i+'].length').value);
		var width=eval(document.getElementById(name[0]+'.measurementSheetList['+i+'].width').value);
		var depthorheight=eval(document.getElementById(name[0]+'.measurementSheetList['+i+'].depthOrHeight').value);

		if((no===undefined ||no==NaN) && (width===undefined ||width==NaN) && (lent===undefined ||lent==NaN) &&(depthorheight===undefined ||depthorheight==NaN) )
		{
			alert("Empty row is not allowed. Please delete the empty row");
			return false;
		}
		var desc=document.getElementById(name[0]+'.measurementSheetList['+i+'].remarks').value;

		if(desc===undefined )
		{
			alert("Remarks is Mandatory in Measurement Sheet.");
			return false;
		}else
		{
			desc=desc.trim();
			if(desc=='')
			{
				alert("Remarks is Mandatory in Measurement Sheet.");
				return false;
			}
		}


	}
	return true;

}