const bill = require("../model/bill")

exports.add = async (req, res) => {
  const incomingData = req.body;
  if (!incomingData) {
    return res.status(400).send({ message: "Data required" })
  }
  const data = await bill.add(incomingData)
  return res.status(200).send({ data: data, message: "Bill added successfully" })
}

exports.get = async (req, res) => {
  const id = req.params.id;
  const sort = req.query.sort;
  const limit = req.query.limit
  const skip = req.query.skip;
  let data;
  if (id) {
    data = await bill.get(id)
  } else {
    data = await bill.schema.find().sort({ bill_date: sort }).skip(skip).limit(limit)
  }
  return res.status(200).send({ data })
}

exports.update = async (req, res) => {
  const id = req.params.id;
  let data;
  if (id) {
    data = await bill.update(id, req.body)
  }
  return res.status(200).send({ data: data, message: "Bill updated successfully" })
}

exports.delete = async (req, res) => {
  const id = req.params.id;
  let data;
  if (id) {
    data = await bill.delete(id)
  }
  return res.status(200).send({ data: data, message: "Bill deleted successfully" })
}