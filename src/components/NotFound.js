import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import "../App.css";

function NotFound() {
  return (
    <div className='not-found text-center'>
        <img src="images/404NotFound.jpeg" alt="404" />
        <Link to="/"><Button>Login</Button></Link>
    </div>
  )
}

export default NotFound;