import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'


function Employee({ name, role, email, id, setEmployees, employees, setDeleteArr, activeAll, setActiveAll, deleteArr}) {

  const [disabled, setDisabled] = useState("disabled");
  const [active, setActive] = useState(false);
  const [value, setValue] = useState({
    name: name,
    email: email,
    role: role
  });


  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValue({ ...value, [name]: value });
  }

  useEffect(()=>{
    if(activeAll){
      setActive(true);
    }
    if(active){
      setDeleteArr(current => [...current, id]);
    }
  },[active, activeAll])

  const editEmplHandler = (e) =>{
    setDisabled(!disabled);
  }
  const deleteEmplHandler = (e) =>{
    setEmployees(current=>
      current.filter((empl)=>{
        return empl.id!==id;
      }),
    );
  }
  const handleCheckbox = ()=>{
    if(activeAll){
      setActiveAll(!activeAll);
    }
    setActive(!active);
  }

  return (
    <tr className="Employee" style={{backgroundColor: active? 'grey' : ''}}>
      <td><input type="checkbox" onChange={handleCheckbox} checked={active} /></td>
      <td>
        <input disabled={disabled} type="text" name='name' id='name' value={value.name} onChange={inputHandler} />
      </td>
      <td>
        <input disabled={disabled} type="text" name='email' id='email' value={value.email} onChange={inputHandler} />
      </td>
      <td className='role-emplyee'>
        <input disabled={disabled} type="text" name='role' id='role' value={value.role} onChange={inputHandler} />
      </td>
      <td className="edit-delete-icons">
        <FontAwesomeIcon className='icons' icon={faEdit} onClick={editEmplHandler} />
        <FontAwesomeIcon color='#f88379' className='icons' icon={faTrashCan} onClick={deleteEmplHandler} />
      </td>
    </tr>
  );
}

export default Employee;