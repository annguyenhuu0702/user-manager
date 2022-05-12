import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Button, Col, Row } from "antd";
import ModalUser from "./components/Modal/ModalUser";
import UserItem from "./components/UserItem/UserItem";
import "./__app.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  changeModalTitle,
  fetchListUserSuccess,
  setUserEditing,
  showModal,
} from "./redux/actions/index";

function App() {
  const openModal = useSelector((state) => state.modal.openModal);
  const listUser = useSelector((state) => state.user.listUser);

  const dispatch = useDispatch();

  const handleModal = () => {
    dispatch(showModal());
    dispatch(changeModalTitle("Add new user"));
    dispatch(setUserEditing(null));
  };

  useEffect(() => {
    dispatch(fetchListUserSuccess());
  }, [dispatch]);

  return (
    <>
      <div className="title">
        <Row>
          <Col span={24}>
            <h1 align="middle">User management</h1>
          </Col>
        </Row>
      </div>
      <div className="btn-add space">
        <Row>
          <Col span={24}>
            <Button
              size="large"
              type="primary"
              onClick={() => {
                handleModal();
              }}
            >
              Add new user
            </Button>
          </Col>
        </Row>
      </div>
      <div className="list-user space">
        <UserItem listUser={listUser} />
      </div>
      {openModal && (
        <div className="modal-user">
          <ModalUser openModal={openModal} />
        </div>
      )}
    </>
  );
}

export default App;
