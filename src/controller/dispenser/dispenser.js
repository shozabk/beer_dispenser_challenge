const Dispenser = require('../../model/dispenser')
const Record = require('../../model/record')
const { BEER_PRICE } = require('../../utils/config')

module.exports.createDispenser = async (req, res) => {
  const { flow_volume } = req.body
  const dispenser = new Dispenser({
    status: 'closed',
    flow_Volume: flow_volume,
    pouringEndTime: null,
    pouringStartTime: null,
    counter: 0,
  })
  const saveDispenser = await dispenser.save()
  res.status(201).json(saveDispenser)
}

module.exports.openCloseTap = async (req, res) => {
  try {
    const { id } = req.params
    const dispenser = await Dispenser.findById(id)
    const { status, pouringStartTime, flow_Volume, counter } = dispenser
    if (status === 'closed') {
      const dispenserUpdate = await Dispenser.findByIdAndUpdate(id, {
        status: 'open',
        pouringStartTime: new Date(),
      })

      if (dispenserUpdate) res.json({ status: 'open' })
    } else {
      const endTime = new Date()

      const timeDiffMilliseconds = endTime - pouringStartTime
      const pouringTimeSeconds = Math.floor(timeDiffMilliseconds / 1000)
      const pricePerLiter = BEER_PRICE // Change this to the actual price per liter

      const totalLiters = (flow_Volume * pouringTimeSeconds).toFixed(2)
      const totalRevenue = (totalLiters * pricePerLiter).toFixed(2)

      const transactions = {
        pouringTimeSeconds,
        amount: totalRevenue,
      }

      const updatedDispenser = await Dispenser.findByIdAndUpdate(id, {
        status: 'closed',
        pouringEndTime: endTime,
        counter: counter + 1,
      })
      const record = new Record({
        use_time: pouringTimeSeconds,
        revenue: totalRevenue,
        dispenser: id,
      })

      await record.save()
      if (updatedDispenser) res.json({ status: 'closed', transactions })
    }
  } catch {
    res.json({ error: 'something went wrong' })
  }
}
