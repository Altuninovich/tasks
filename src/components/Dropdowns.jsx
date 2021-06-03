import React from 'react';
import {DropdownButton, Dropdown } from 'react-bootstrap';

export const DropdownsList = (props) => {
     
    const {dropdownValue, setDropdownValue, setNewTaskStatus} = props

    const hendleSelectDropdown = (key, e) => {
        console.log(e.target.outerText, key)
        setDropdownValue(e.target.outerText)
        setNewTaskStatus(key)
    }
    
    return (
        <DropdownButton size="sm" variant="secondary" title={dropdownValue}>
        <Dropdown.Item onSelect={hendleSelectDropdown} eventKey="0">задача не выполнена</Dropdown.Item>
        <Dropdown.Item onSelect={hendleSelectDropdown} eventKey="1">задача не выполнена, отредактирована админом</Dropdown.Item>
        <Dropdown.Item onSelect={hendleSelectDropdown} eventKey="10">задача выполнена</Dropdown.Item>
        <Dropdown.Item onSelect={hendleSelectDropdown} eventKey="11">задача отредактирована админом и выполнена</Dropdown.Item>
      </DropdownButton>
    )
}