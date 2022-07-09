import React, { memo } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";

const headings = [
  "S.No",
  "Bill Date",
  "Paid Date",
  "Unit Consumed",
  "Amount",
  "view",
  "Edit",
  "Delete",
];

function DashBoard() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [sortValue, setSortValue] = useState(-1);
  const [limitValue, setLimitValue] = useState(9);
  const [offset, setOffset] = useState(0);
  let navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(`/api/bill`);
      let a = data && data.data && data.data;
      if (a.data.length > 0) {
        setTotalCount(a.data.length);
        if (a.data.length > 9) {
          const newDataOne = await axios.get(
            `/api/bill?sort=${sortValue}&&skip=${offset}&&limit=${limitValue}`
          );
          setData(newDataOne.data);
        }
      }
    };

    getData();
  }, [sortValue, offset, limitValue]);
  const onEditTable = async (e, item) => {
    e.preventDefault();

    localStorage.setItem("edit_data", JSON.stringify(item));
    navigate(`${item.id}/edit`);
  };

  const onSort = (e) => {
    setSortValue(e.target.value);
  };

  const onViewRecord = async (e, item) => {
    e.preventDefault();

    const viewData = await axios.get(`/api/bill/${item.id}`);
    alert(JSON.stringify(viewData.data));
  };
  const onDeleteRecord = async (e, item) => {
    e.preventDefault();
    const deleteData = await axios.delete(`/api/bill/${item.id}`);
    if (deleteData.status === 200) {
      alert(deleteData.data.message);
    }
    window.location.reload();
  };
  const onNextPage = () => {
    setOffset(offset + 9);
    setLimitValue(limitValue + 9);
  };
  const onPrevPage = () => {
    setOffset(offset - 9);
    setLimitValue(limitValue - 9);
  };
  return (
    <div className="main_dashboard">
      <h1>Electricity Bill Record</h1>
      <div className="data_table">
        <div className="table_options">
          <div>
            <label>Sort By:</label>
            <select className="select_table" onChange={onSort}>
              <option value={-1}>Recent</option>
              <option value={1}>oldest</option>
            </select>
          </div>
          <div>
            <Link to="/addBill">Add New Bill</Link>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              {headings.map((item, idx) => (
                <th key={idx}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.data && data.data.length ? (
              data.data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{new Date(item.bill_date).toLocaleDateString()}</td>
                  <td>{new Date(item.paid_date).toLocaleDateString()}</td>
                  <td>{item.unit_consumed}</td>
                  <td>{item.amount}</td>
                  <td className="view_item">
                    <GrView onClick={(e) => onViewRecord(e, item)} />
                  </td>
                  <td className="edit_table">
                    <MdModeEditOutline onClick={(e) => onEditTable(e, item)} />
                  </td>
                  <td className="delete_table">
                    <MdDelete onClick={(e) => onDeleteRecord(e, item)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No Data Available</td>
              </tr>
            )}
          </tbody>
        </table>

        {totalCount > 9 && (
          <button className="next_page" onClick={onNextPage}>
            Next Page
          </button>
        )}
        {data && data.data && data.data.length < 9 && (
          <button className="next_page" onClick={onPrevPage}>
            Prev Page
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(DashBoard);
