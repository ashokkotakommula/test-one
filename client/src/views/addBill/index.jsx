import { useState } from "react";
import "./addBull.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function AddBill() {
  const [data, setData] = useState({
    bill_date: "",
    paid_date: "",
    unit_consumed: 0,
    amount: 0,
  });
  const [buttonText, setButtonText] = useState("Add Bill");
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    let editData = JSON.parse(localStorage.getItem("edit_data"));
    if (editData) {
      setData({
        bill_date: new Date(editData.bill_date).toISOString().substr(0, 10),
        paid_date: new Date(editData.paid_date).toISOString().substr(0, 10),
        unit_consumed: editData.unit_consumed,
        amount: editData.amount,
      });
      setButtonText("Update Bill");
    }
  }, []);

  const onDataChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (buttonText === "Update Bill") {
      let id = JSON.parse(localStorage.getItem("edit_data")).id;
      let postData = await axios.put(`/api/bill/${id}`, { ...data });
      if (postData.status === 200) {
        alert(postData.data.message);
      }
      localStorage.removeItem("edit_data")

      navigate("/")
      return
    }
    if (data.paid_date < data.bill_date) {
      setErrorText("Paid Date must be greater than bill date");
      return;
    } else {
      setErrorText("");
    }
    const postData = await axios.post("/api/bill/", data);
    if (postData.status === 200) {
      alert(postData.data.message);
    }
  };
  return (
    <div className="add_bill_layout">
      <h2> Electricity Record</h2>
      <div className="form_container">
        <form onSubmit={onSubmit} className="add_form">
          <label htmlFor="bill_date">Bill Date</label>
          <input
            type="date"
            value={data.bill_date}
            name="bill_date"
            onChange={onDataChange}
            required
          />
          <label htmlFor="paid_date">Paid Date</label>
          <input
            type="date"
            value={data.paid_date}
            name="paid_date"
            onChange={onDataChange}
            required
          />
          <label htmlFor="unit_consumed">Unit Consumed</label>
          <input
            type="number"
            value={data.unit_consumed}
            name="unit_consumed"
            onChange={onDataChange}
            required
            min={0}
          />
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            value={data.amount}
            name="amount"
            onChange={onDataChange}
            required
            min={0}
          />
          <button onClick={onSubmit}>{buttonText}</button>
        </form>
      </div>
      <p className="error_text">{errorText}</p>
    </div>
  );
}
