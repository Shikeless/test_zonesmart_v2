import React from "react";
import { DropdownItem } from "reactstrap";

export const DropdownComponent = props => {
  function handleClick() {
    props.getCategories(props.data);
  }
  return <DropdownItem onClick={handleClick}>{props.data.name}</DropdownItem>;
};
