/**
 *  Employee - Login 
 */
function employeeLogin() {
  let newEmp = {
    empId: 0,
    empUserName: document.getElementById("userName").value,
    empPassword: document.getElementById("passwordEmp").value,
    empFirstName: "",
    empLastName: "",
    mgrId: "",
  };
  fetch("http://localhost:7474/loginEmp", {
    method: "post",
    body: JSON.stringify(newEmp),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      sessionStorage.setItem("employee", responseJson.empId);
      if (responseJson.empId != 0) {
        window.location.replace("/empbasic.html");
      } else {
        alert("login failed");
      }
    })
    .catch((error) => console.log(error));
}

/**
 *  Employee - Get Session Object
 */
function getEmpInfo() {
  let empId = sessionStorage.getItem("employee");
}

/**
 *  Employee - View Resolved Reimbursements
 */
function resolvedReimEmp() {
  let empId = sessionStorage.getItem("employee");
  fetch("http://localhost:7474/EmpResolvedReimbursements/" + empId)
    .then((response) => response.json())
    .then((responseJson) => {
      let resolvedReq = `<table class="table table-bordered">
                    <thead class="thead-danger myTable">
                        <tr>
                            <th scope="col">Reimbursement Id</th>
                            <th scope="col">Employee Id</th>
                            <th scope="col">Manager Id</th>
                            <th scope="col">Reimbursement Description</th>
                            <th scope="col">Reimbursement Amount</th>
                            <th scope="col">Reimbursement Status</th>
                        </tr>
                    </thead>
                    <tbody>`;
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
      resolvedReq += `</tbody></table>`;
      document.getElementById("profileInfo").innerHTML = resolvedReq;
    });
}

/**
 *  Employee - View Pending Reimbursements
 */
function pendingReimEmp() {
  let empId = sessionStorage.getItem("employee");
  fetch("http://localhost:7474/EmpPendingReimbursements/" + empId)
    .then((response) => response.json())
    .then((responseJson) => {
      let pendingreq = `<table class="table table-bordered ">
                    <thead class="thead-danger myTable">
                        <tr>
                            <th scope="col">Reimbursement Id</th>
                            <th scope="col">Employee Id</th>
                            <th scope="col">Manager Id</th>
                            <th scope="col">Reimbursement Description</th>
                            <th scope="col">Reimbursement Amount</th>
                            <th scope="col">Reimbursement Status</th>
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
                                    </tr>`;
      }
      pendingreq += `</tbody></table>`;
      document.getElementById("profileInfo").innerHTML = pendingreq;
    });
}

/**
 *  Employee - Create Reimbursement Form
 */
function createForm() {
  let reimbursementForm = `
    <div class="mb-3">
      <label for="employeeId" class="form-label">Employee Id:</label>
      <input type="number" class="form-control" id="eId" placeholder="Enter an Employee Id" name="eId">
    </div>
    <div class="mb-3">
      <label for="employeeId" class="form-label">Manager Id:</label>
      <input type="number" class="form-control" id="mId" placeholder="Enter a Manager Id" name="mId">
    </div>
    <div class="mb-3">
    <label for="reimbursementDesc" class="form-label">Reimbursement Description:</label>
    <input type="text" class="form-control" id="rDesc" placeholder="Description of Rembursement" name="rDesc">
  </div>
  <div class="mb-3">
  <label for="amount" class="form-label">Reimbursement Amount:</label>
  <input type="number" class="form-control" id="rAmount" placeholder="Enter an Amount" name="rAmount">
  </div>
  <div class="mb-3">
  <label for="amount" class="form-label">Reimbursement Status:</label>
  <input type="text" class="form-control" id="rStatus"  name="rPending" value="pending" readonly>
  </div>
  
    <button type="submit" class="btn btn-primary" onClick="addReimbursement()">Submit Request</button>
  </form>`;

  document.getElementById("profileInfo").innerHTML = reimbursementForm;
}

/**
 *  Employee - Create New Reimbursement
 */
function addReimbursement() {
  let newReimbursement = {
    reimbursementId: 0,
    empId: document.getElementById("eId").value,
    mgrId: document.getElementById("mId").value,
    reimbursementDesc: document.getElementById("rDesc").value,
    reimbursementAmt: document.getElementById("rAmount").value,
    reimbursementStatus: document.getElementById("rStatus").value,
  };
  fetch("http://localhost:7474/addReimbursement", {
    method: "post",
    body: JSON.stringify(newReimbursement), // converts JS object to JSON
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson) {
        alert("reimbursement has been added successfully!!!");
      } else {
        alert("Sorry, try again later..");
      }
      window.location.replace("/empbasic.html");
    })
    .catch((error) => console.log(error));
}

/**
 *  Employee - View Profile
 */
function empProfile() {
  let empId = sessionStorage.getItem("employee");
  fetch("http://localhost:7474/profile/" + empId)
    .then((response) => response.json())
    .then((responseJson) => {
      let profileform = `<div class="container"><table class="table table-stripped">
        <thead class="thead-dark myTable">
            <tr> <tr>
                <th scope="col">Employee Id</th>
                <th scope="col">Manager Id</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">UserName</th>
                <th scope="col">Password</th>
                <th>Edit</th>
            </tr>                         
            </tr>
        </thead>
        <tbody>`;

      profileform += `<tr>
            <td>${responseJson.empId}</td>
            <td>${responseJson.mgrId}</td>
            <td>${responseJson.empFirstName}</td>
            <td>${responseJson.empLastName}</td>
            <td>${responseJson.empUserName}</td>
            <td>${responseJson.empPassword}</td>   
            <td><button 
            type="button" 
            class="btn btn-danger"
            onclick="updateProfileForm(${responseJson.empId})">Edit Profile</button></td>
                                      
            </tr>`;

      profileform += `</tbody></table></div>`;

      document.getElementById("profileInfo").innerHTML = profileform;
    })
    .catch((error) => console.log(error));
}

/**
 *  Employee - Create Update Profile Form
 */
function updateProfileForm() {
  let updateForm = `<div class="container">
    <form>
        <div class="mb-3 mt-3">
            <label for="eFName" class="form-label">First Name:</label>
            <input type="text" class="form-control" id="eFName"  name="EmpFirstName">
         </div>
         <div class="mb-3 mt-3">
            <label for="eLName" class="form-label">Last Name:</label>
            <input type="text" class="form-control" id="eLName"  name="empLastName">
        </div>
        <div class="mb-3 mt-3">
            <label for="eUserName" class="form-label">User Name:</label>
            <input type="text" class="form-control" id="eUserName"  name="EmpUserName">
        </div>
        <div class="mb-3 mt-3">
            <label for="ePassword" class="form-label">Password:</label>
            <input type="text" class="form-control" id="ePassword" name="EmpPassword">
        </div>      
        <button type="button" class="btn btn-primary" onclick="updateProfile()">Update  </button>
    </form>
</div>
`;
  document.getElementById("profileInfo").innerHTML = updateForm;
}

/**
 *  Employee - Update Profile
 */
function updateProfile() {
  let empId = sessionStorage.getItem("employee");
  let updateInfo = {
    empFirstName: document.getElementById("eFName").value,
    empLastName: document.getElementById("eLName").value,
    empUserName: document.getElementById("eUserName").value,
    empPassword: document.getElementById("ePassword").value,
  };
  fetch("http://localhost:7474/UpdateEmp/" + empId, {
    method: "put",
    body: JSON.stringify(updateInfo),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson) {
        alert("Employee profile updated successfully!!!");
      } else {
        alert("Sorry, you need to provide valid details");
      }
      window.location.replace("/empbasic.html");
    })
    .catch((error) => console.log(error));
}

/**
 *  Employee - Log Out
 */
function logoutEmp() {
  sessionStorage.removeItem("employee");
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
