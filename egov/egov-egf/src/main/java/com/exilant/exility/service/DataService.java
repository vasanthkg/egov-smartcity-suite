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
package com.exilant.exility.service;

/*
 * Gets a "read-only" connection to the database, and calls the job srvice
 * Programmers/designer have to ensure that the jobsteps in the job being called
 * use the connection only for read operaion. (or select operations)
 *
 * This class is either invoked direclty by the ServieAgent from the Web-Tier or it can be called
 *  by the corresponding SLSB
 */
import java.sql.Connection;

import org.apache.log4j.Logger;


import com.exilant.exility.common.DataCollection;
import com.exilant.exility.common.ExilServiceInterface;
import com.exilant.exility.dataservice.JobService;

public class DataService implements ExilServiceInterface{
	private static DataService singletonInstance;
	private static final Logger LOGGER = Logger.getLogger(DataService.class);
	public static DataService getService(){
		if(singletonInstance == null)singletonInstance = new DataService();
		return singletonInstance;
	}

	private DataService(){
		super();
	}


	public void doService(DataCollection dc)
	{
		Connection con = null;
		try{
			JobService jobService = JobService.getInstance();
			con = null;//This fix is for Phoenix Migration.EgovDatabaseManager.openConnection();
			//con.setReadOnly(true);
			jobService.doService(dc,con);

		}catch(Exception e){
			LOGGER.error("Inside doService"+e.getMessage(),e);
			dc.addMessage("exilDBError", e.toString());
		}finally{
			//This fix is for Phoenix Migration.EgovDatabaseManager.releaseConnection(con,null);
		}

		/*try{
			con.close();
		}catch (Exception e){
		}*/
	}

/*
	public static void main(String[] args)
	{
		DataService d = new DataService();
		DataCollection dc = new DataCollection();
		dc.addValue("serviceID","job1");
		d.doService(dc);
	}

*/
}
