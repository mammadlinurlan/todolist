import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { faXmark } from '@fortawesome/free-solid-svg-icons'


export const ToDoList = ({text, onDelete}) => {


        return(
            <div className="toDoList" style={{width:'287px'}}>
            <p>{text}</p>
            <FontAwesomeIcon icon={faXmark} onClick={onDelete} style={{cursor: "pointer"}}/>
            </div>
        )


}