/* Login as an employee*/
function employeeLogin(empId){
    console.log(empId);
    fetch("http://localhost:7474/loginEmp/"+empId,)
    .then(response=>{
        console.log(response);
        window.location.replace("/empbasic.html");
    })

}

/*Manager login */

function mngrLogin(mngrId){
    console.log(mngrId);
    fetch("http://localhost:7474/LoginManager/"+mngrId,)
    .then(response=>{
        console.log(response);
        window.location.replace("/managerbasic.html");
    })

}
/* Fetch an employee details */
function empprofile(empId){

    fetch("http://localhost:7474/profile/"+empId)
    .then(response=>response.json())
    .then(responseJason=>{
        console.log(responseJason);
        let profileform=`<table class="table-stripped">
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Manager Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>UserName</th>
                    <th>Password</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>`;
            for(let emp of responseJason){
                profileform +=`<tr>
                            <td>${emp.EmpId}</td>
                            <td>${emp.MngrId}</td>
                            <td>${emp.EmpFirstName}</td>
                            <td>${emp.EmpLastName}</td>
                            <td>${emp.EmpUserName}</td>
                            <td>${emp.EmpPassword}</td>
                            <td><button 
                            type="button" 
                            class="btn btn-danger"
                            onclick="updateProfile(${emp.EmpUserName}, ${emp.EmpPassword})">Update Profile</button></td>

                </tr>`;
            }
            profileform +=`</tbody></table>`;
            document.getElementById("profileInfo")=profileform;
    })
    .catch(error=>console.error(error));
   
    
}
/* update Profile */
function updateProfileForm(){
    let updateForm= `<div class="container">
    <form>
        <div class="mb-3 mt-3">
            <label for="eUserName" class="form-label">User Name</label>
            <input type="text" class="form-control" id="eUserName" placeholder="Enter user name" name="EmpUserName">
        </div>
        <div class="mb-3 mt-3">
            <label for="ePassword" class="form-label">Existing Password:</label>
            <input type="text" class="form-control" id="ePassword" placeholder="Enter existing password" name="EmpPassword">
        </div>
        <div class="mb-3 mt-3">
            <label for="newPassword" class="form-label">New Password:</label>
            <input type="text" class="form-control" id="newPassword" placeholder="Enter new password" name="empNewPassword">
        </div>
        
        <button type="button" class="btn btn-primary" onclick="updateProfile()">Update  </button>
    </form>
</div>
`;
document.getElementById("profileInfo").innerHTML= updateForm;
}



function updateProfile(){
    let updateInfo= {
        EmpUserName: document.getElementById("eUserName").value,
        EmpPassword: document.getElementById("ePassword").value,
        empNewPassword: document.getElementById("newPassword").value,
        
    }
    fetch("http://localhost:7474/updateemp",{
        method:'put',// update profile
        body: JSON.stringify(updateInfo)
    })
    .then(response=>empprofile(empId));
}



