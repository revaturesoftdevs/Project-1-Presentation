/**
 *  Manager - Login
 */
function mngrLogin() {
  let newMngr = {
    mgrId: 0,
    mgrUserName: document.getElementById("userName1").value,
    mgrPassword: document.getElementById("password1").value,
    mgrFirstName: "",
    mgrLastName: "",
  };
  fetch("http://localhost:7474/loginManager", {
    method: "post",
    body: JSON.stringify(newMngr),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.mgrId != 0) {
        sessionStorage.setItem("user", responseJson.mgrId);
        window.location.replace("/managerbasic.html");
      } else {
        alert("login failed");
      }
    })
    .catch((error) => console.log(error));
}

/**
 *  Manager - Get Session Object
 */
function getUserInfo() {
  let manager = sessionStorage.getItem("user");
}

/**
 *  Manager - View All Resolved Reimbursements
 */
function resolvedReim() {
  let manager = sessionStorage.getItem("user");

  fetch("http://localhost:7474/ResolvedReimbursements/" + manager)
    .then((response) => response.json())
    .then((responseJson) => {
      let resolvedReq = `<div class="container"><table class="table table-bordered ">
                    <thead class="thead-dark myTable">
                        <tr>
                            <th scope="col">Reimbursement Id</th>
                            <th scope="col">Employee Id</th>
                            <th scope="col">Manager Id</th>
                            <th scope="col">Reimbursement Description</th>
                            <th scope="col">Reimbursement Amount</th>
                            <th scope="col">Reimbursement Status</th>
                        </tr>
                    </thead>
                    <tbody class="myTbody">`;
      for (let req of responseJson) {
        resolvedReq += `<tr>
                                    <td>${req.reimbursementId}</td>
                                    <td>${req.empId}</td>
                                    <td>${req.mgrId}</td>
                                    <td>${req.reimbursementDesc}</td>
                                    <td>${req.reimbursementAmt}</td>
                                    <td>${req.reimbursementStatus}</td>
                                    </tr>`;
      }
      resolvedReq += `</tbody></table></div>`;

      document.getElementById("profileInfo").innerHTML = resolvedReq;
    });
}

/**
 *  Manager - View All Pending Reimbursements
 */
function pendingReim() {
  let manager = sessionStorage.getItem("user");
  let count = 0;

  fetch("http://localhost:7474/PendingReimbursements/" + manager)
    .then((response) => response.json())
    .then((responseJson) => {
      let pendingreq = `<table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Reimbursement Id</th>
                                    <th>Employee Id</th>
                                    <th>Manager Id</th>
                                    <th> Reimbursement Description</th>
                                    <th>Reimbursement Amount</th>
                                    <th>Reimbursement Status</th>
                                </tr>
                            </thead>
                            <tbody>`;
      for (let req of responseJson) {
        pendingreq += `<tr>
                    <td>${req.reimbursementId}</td>
                    <td>${req.empId}</td>
                    <td>${req.mgrId}</td>
                    <td>${req.reimbursementDesc}</td>
                    <td>${req.reimbursementAmt}</td>
                    <td>${req.reimbursementStatus}</td>
                    <td><button type="submit" class="btn btn-primary" onClick="approved(${req.empId},${req.reimbursementId})">Approve</button></td>
                    <td><button type="submit" class="btn btn-danger" onClick="denied(${req.empId},${req.reimbursementId})">Deny</button></td>
                </tr>`;
        count++;
      }
      pendingreq += `</tbody></table>`;
      document.getElementById("profileInfo").innerHTML = pendingreq;
      if (count == 0) {
        window.location.replace("/managerbasic.html");
        window.alert("You Currently have No Pending Reimbursements ");
      }
    });
}

/**
 *  Manager - Approve Reimbursement
 */
function approved(empId, remId) {
  fetch("http://localhost:7474/approveReimbursement/" + empId + "/" + remId, {
    method: "put",
  })
    .then((response) => {
      pendingReim();
    })
    .catch((error) => console.log(error));
}

/**
 *  Manager - Deny Reimbursement
 */
function denied(empId, remId) {
  fetch("http://localhost:7474/denyReimbursement/" + empId + "/" + remId, {
    method: "put",
  })
    .then((response) => {
      pendingReim();
    })
    .catch((error) => console.log(error));
}

/**
 *  Manager - View All Employees
 */
function getAllEmployees() {
  let manager = sessionStorage.getItem("user");
  fetch("http://localhost:7474/AllEmployees/" + manager)
    .then((response) => response.json())
    .then((responseJson) => {
      let empTableData = `<div class="container"><table class="table table-striped">
                                    <thead class="thead-dark myTable">
                                    <tr>
                                    <th scope="col">Employee Id</th>
                                    <th scope="col">Manager Id</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">UserName</th>
                                    <th scope="col">An Employee</th>
                                    </tr>
                                    </thead>
                                    <tbody>`;
      for (let emp of responseJson) {
        empTableData += `<tr>
                                    <td>${emp.empId}</td>
                                    <td>${emp.mgrId}</td>
                                    <td>${emp.empFirstName}</td>
                                    <td>${emp.empLastName}</td>
                                    <td>${emp.empUserName}</td>
                                    <td><button 
                                    type="button" 
                                    class="btn btn-danger"
                                    onclick="viewEmp(${emp.empId})">View Employee</button></td>
                                          </tr>`;
      }
      empTableData += `</tbody></table></div>`;
      document.getElementById("profileInfo").innerHTML = empTableData;
    })
    .catch((error) => console.log(error));
}

/**
 *  Manager - View Individual Employee Details
 */
function viewEmp(empId) {
  let manager = sessionStorage.getItem("user");

  fetch(
    "http://localhost:7474/IndividualReimbursements/" + manager + "/" + empId
  )
    .then((response) => response.json())
    .then((responseJson) => {
      let profileform = `<div class="container"><table class="table table-stripped">
                    <thead class="thead-dark myTable">
                        <tr><th scope="col">Reimbursement Id</td>
                            <th scope="col">Employee Id</th>
                            <th scope="col">Manager Id</th>
                            <th scope="col">Reimbursement Description</th>
                            <th scope="col">Reimbursement Amount</th>
                            <th scope="col">Status</th>                         
                        </tr>
                    </thead>
                    <tbody>`;
      for (let emp of responseJson) {
        profileform += `<tr>
                        <td>${emp.reimbursementId}</td>
                        <td>${emp.empId}</td>
                        <td>${emp.mgrId}</td>
                        <td>${emp.reimbursementDesc}</td>
                        <td>${emp.reimbursementAmt}</td>
                        <td>${emp.reimbursementStatus}</td>
                        
                        </tr>`;
      }
      profileform += `</tbody></table></div>`;
      document.getElementById("profileInfo").innerHTML = profileform;
    })
    .catch((error) => console.log(error));
}

/**
 *  Manager - Log Out
 */
function logoutMngr() {
  sessionStorage.removeItem("user");
  window.location.replace("/index.html");
}

/**
 *  HELP - Contributors to Project 1 - Reimbursement System
 */
function needHelp() {
  let helpUser = `<table class="table table-striped">
    <thead>
    <tr>
        <th>Developers</th>
        <th>Role</th>
        <th>Contact us</th>
    </tr>
    </thead>
        <tbody>
            <tr>
                <td>Anil Kumar</td>
                <td>Full Stack Developer</td>
                <td>Revature Class</td>
            </tr>
            <tr>
                <td>Berly</td>
                <td>Full Stack Developer</td>
                <td>Revature Class</td>
            </tr>
            <tr>
                <td>Joshua</td>
                <td>Full Stack Developer</td>
                <td>Revature Class</td>
            </tr>
            <tr>
                <td>Goldendeep Kaur</td>
                <td>Full Stack Developer</td>
                <td>Revature Class</td>
            </tr>
    </tbody>`;
  helpUser += `</table>`;
  document.getElementById("profileInfo").innerHTML = helpUser;
}
