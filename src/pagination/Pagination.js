import React from 'react'
import './Pagination.css'
import { Button } from "react-bootstrap";


const Pagination = (props) => {
  // init
  const { currentPage, maxPageLimit, minPageLimit, totalPages} = props;

  
    // build page numbers list based on total number of pages
    const pages = [];
    for(let i=1 ; i<=totalPages; i++){
        pages.push(i);
    }

    const handlePrevClick = ()=>{
        props.onPrevClick();
    }

    const handleNextClick = ()=>{
        props.onNextClick();
    }

    const handlePageClick = (e)=>{
        props.onPageChange(Number(e.target.id));
    }

    const pageNumbers = pages.map(page => {

        if(page <= maxPageLimit  && page > minPageLimit) {
            return(
        <li key={page} id={page} onClick={handlePageClick} 
            className={currentPage===page ? 'active' : null}>
            {page}
        </li>
            );
        }else{
            return null;
        }
    }
   
 );

    // page ellipses
    let pageIncrementEllipses = null;
    if(pages.length > maxPageLimit){
        pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>
    }
    let pageDecremenEllipses = null;
    if(minPageLimit >=1){
        pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li> 
    }

    return (
        <div className="main">
            <ul className="pageNumbers d-flex"> 
               <li>
                   <Button onClick={handlePrevClick} disabled={currentPage === pages[0]}>Prev</Button>
               </li>
               <div className='num-page d-flex justify-content-around align-items-center'>
               {pageDecremenEllipses}
                {pageNumbers}
               {pageIncrementEllipses}
               </div>
                <li>
                   <Button onClick={handleNextClick} disabled={currentPage === pages[pages.length - 1]}>Next</Button>
               </li>
            </ul>
        </div>
    )
}

export default Pagination