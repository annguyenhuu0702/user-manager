import React from "react";
import { Row, Col, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./__userItem.scss";
import { useDispatch } from "react-redux";
import {
  changeModalTitle,
  setUserEditing,
  showModal,
} from "../../redux/actions";

const UserItem = ({ listUser }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    console.log(id);
  };

  const handleEditModal = (item) => {
    dispatch(showModal());
    dispatch(changeModalTitle("Edit user"));
    dispatch(setUserEditing(item));
    // console.log(item);
  };
  return (
    <Row>
      {listUser &&
        listUser.map((item) => {
          return (
            <Col
              xs={12}
              md={8}
              lg={6}
              className="user-item"
              key={Math.random()}
            >
              <Card>
                <p>Name: {item.name}</p>
                <p>Sex: {item.sex}</p>
                <p>Phone number: {item.phoneNumber} </p>
                <p>Address: {item.address}</p>
                <div className="icon">
                  <div
                    className="icon-edit"
                    onClick={() => {
                      handleEditModal(item);
                    }}
                  >
                    <EditOutlined />
                  </div>
                  <div
                    className="icon-delete"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    <DeleteOutlined />
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
    </Row>
  );
};

export default UserItem;
