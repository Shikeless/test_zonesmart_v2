import React from "react";
import styles from "./Category.module.css";
import { Table } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

const ListElement = props => {
  function handleClick() {
    props.getProductInfo(props.data);
  }
  return (
    <>
      <tr onClick={handleClick}>
        <td>{props.data.name}</td>
      </tr>
    </>
  );
};

const Category = props => {
  const { list } = props;
  return (
    <>
      <div className={styles.table}>
        <Table striped>
          <tbody>
            {list.map((item, index) => (
              <ListElement
                key={index}
                data={item}
                getProductInfo={props.getProductInfo}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Category;
