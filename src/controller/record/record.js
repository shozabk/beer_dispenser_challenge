const Record = require("../../model/record");

module.exports.getRevenue = async (req, res) => {
  const result = await Record.aggregate([
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$revenue" },
      },
    },
  ]).exec();

  const record = await Record.find();

  res.status(201).json({ total_revenue: result[0].totalAmount, record });
};
