const mongoose = require("mongoose")
const Schema = mongoose.Schema
const randomize = require('randomatic');

const BillSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  bill_date: {
    type: Date,
    required: true
  },
  paid_date: {
    type: Date,
    required: true,
  },
  unit_consumed: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})

const Bill = mongoose.model('Bill', BillSchema, 'bill')

exports.schema = Bill

exports.add = async (bodyData) => {
  let addData = {
    id: randomize('0', 10),
    bill_date: new Date(bodyData.bill_date),
    paid_date: new Date(bodyData.paid_date),
    unit_consumed: bodyData.unit_consumed,
    amount: bodyData.amount
  }
  const data = await Bill.create(addData)
  return data
}

exports.get = async (id) => {
  let data;
  if (id) {
    data = await Bill.findOne({ id: id })
  }
  return data
}

exports.update = async (id, bodyData) => {
  let data;
  if (bodyData && id) {
    data = await Bill.findOneAndUpdate({ id: id }, { ...bodyData }, { new: true })
  }
  return data
}

exports.delete = async (id) => {
  let data;
  if (id) {
    data = await Bill.findOneAndDelete({ id: id })
  }
  return data
}