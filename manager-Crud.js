/*Manager login */
function mngrLogin(mngrId){
    console.log(mngrId);
    fetch("http://localhost:7474/LoginManager/"+mngrId,)
    .then(response=>{
        console.log(response);
        window.location.replace("/managerbasic.html");
    })

}

/*View All Employees */
function empprofile(){

    fetch("http://localhost:7474/profile")
    .then(response=>response.jason())
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
                </tr>`;
            }
            profileform +=`</tbody></table>`;
            document.getElementById("profileInfo")=profileform;
    })
    .catch(error=>console.error(error));
   
    
}
/*View an employee */