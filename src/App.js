import { DownloadOutlined } from "@ant-design/icons";
import { Button, Col, Pagination, Row } from "antd";
import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import ModalUser from "./components/Modal/ModalUser";
import UserItem from "./components/UserItem/UserItem";
import {
  changeModalTitle,
  changePage,
  fetchListUser,
  fetchTotalPage,
  setUserEditing,
  showModal,
} from "./redux/actions/index";
import "./__app.scss";

function App() {
  const openModal = useSelector((state) => state.modal.openModal);
  const listUser = useSelector((state) => state.user.listUser);
  const allUser = useSelector((state) => state.user.allUser);
  const page = allUser.page;

  const dispatch = useDispatch();

  const handleModal = () => {
    dispatch(showModal());
    dispatch(changeModalTitle("Add new user"));
    dispatch(setUserEditing(null));
  };

  const handlePagination = (_page) => {
    dispatch(changePage(_page));
  };

  const handleExportExcel = () => {
    let wb = XLSX.utils.book_new();
    // object dùng json_to__sheet
    // mảng dùng sheet_add_aoa
    let ws = XLSX.utils.json_to_sheet(allUser.items);
    XLSX.utils.book_append_sheet(wb, ws, "listUser");
    XLSX.writeFile(wb, "listUser.xlsx");
  };

  useEffect(() => {
    dispatch(fetchTotalPage({ limit: allUser.limit }));
  }, [dispatch, allUser.limit]);

  useEffect(() => {
    dispatch(fetchListUser({ page: allUser.page, limit: allUser.limit }));
  }, [allUser.limit, allUser.page, dispatch]);

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
          <Col span={12}>
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
          <Col span={12}>
            <div className="export-excel">
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={() => handleExportExcel()}
              >
                Excel
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <div className="list-user space">
        <UserItem listUser={listUser} />
      </div>
      {openModal && (
        <div className="modal-user">
          <ModalUser openModal={openModal} page={page} />
        </div>
      )}
      <div className="pagination space">
        <Pagination
          current={allUser.page}
          pageSize={allUser.limit}
          total={allUser.items.length}
          onChange={handlePagination}
        />
      </div>
    </>
  );
}

export default App;
