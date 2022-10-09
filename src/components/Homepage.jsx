import React, { useState, useEffect } from "react";
import Employee from "./Employee"
import Pagination from "./Pagination";
import axios from 'axios';

function Homepage() {

  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [emplPerPage, setEmplPerPage] = useState(10);
  const [deleteArr, setDeleteArr] = useState([]);
  const [allActive, setAllActive] = useState(false);

  const getEmployeeData = async () => {
    try {
      const data = await axios.get(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`);
      setEmployees(data.data);
    } catch (err) {
      console.log(err);
    }
  }
  const searchEmplHandler=(e)=>{
    const value = e.target.value.toLowerCase();
    setEmployees(employees=>
      employees.filter((empl)=>{
        return empl.name.toLowerCase().match(new RegExp(value, 'g')) || empl.role.toLowerCase().match(new RegExp(value, 'g')) || empl.email.toLowerCase().match(new RegExp(value, 'g'));
      }),
    );
  }

  const lastEmplIndex = currentPage*emplPerPage;
  const firstEmplIndex = lastEmplIndex - emplPerPage;
  const currentEmpl = employees.slice(firstEmplIndex, lastEmplIndex);

  useEffect(() => {
    getEmployeeData();
  }, []);

  
  const deleteEmployeesHandler = ()=>{
    setEmployees(current=>
      current.filter((empl)=>{
        return !deleteArr.includes(empl);
      })
    );
    console.log(deleteArr);
  }


  return (
    <div className="Homepage">
      <div className="searchbox">
        <input type="text" placeholder="Search by name, email or role" onChange={searchEmplHandler} />
      </div>
      <div className="table-div">
        <table>
            <tr className="table-head">
              <th className="checkbox"><input type="checkbox" onChange={()=>setAllActive(!allActive)} /></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          <tbody>
            {currentEmpl?.map((empl) => {

              const { id, name, email, role } = empl;
              return (
                <Employee allActive={allActive} setDeleteArr={setDeleteArr} key={id} id={id} name={name} email={email} role={role} setEmployees={setEmployees} />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pages-deletebtn">
        <div className="btn-div">
          <button onClick={deleteEmployeesHandler}>Delete Selected</button>
        </div>
        <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalEmpl={employees.length} emplPerPage={emplPerPage}  /> 
        <div>

        </div>
      </div>
    </div>
  );
}

export default Homepage;