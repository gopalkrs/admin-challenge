import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'

const Pagination = ({emplPerPage, totalEmpl, currentPage, setCurrentPage}) =>{
    let pages = [];

    for(let i=1; i<=Math.ceil(totalEmpl/emplPerPage); i++){
        pages.push(i);
    }
    const prevPageHandler = ()=>{
        if(currentPage===1){
            return;
        }
        setCurrentPage(currentPage-1);
    }
    const nextPageHandler = ()=>{
        if(currentPage===Math.ceil(totalEmpl/emplPerPage)){
            return;
        }
        setCurrentPage(currentPage+1);
    }
    return(
        <div className='Pagination'>
            <button onClick={()=> setCurrentPage(1)}><FontAwesomeIcon icon={faAnglesLeft} /></button>
            <button onClick={prevPageHandler}><FontAwesomeIcon icon={faAngleLeft} /></button>
            <p>{currentPage}</p>
            <button onClick={nextPageHandler}><FontAwesomeIcon icon={faAngleRight} /></button>
            <button onClick={()=> setCurrentPage(Math.ceil(totalEmpl/emplPerPage))}><FontAwesomeIcon icon={faAnglesRight} /></button>
        </div>
    );
}

export default Pagination;