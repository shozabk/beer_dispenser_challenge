const {
  openCloseTap,
  createDispenser,
} = require('../controller/dispenser/dispenser')
const { getRevenue } = require('../controller/record/record')

const Dispenser = require('../model/dispenser')
const Record = require('../model/record')

describe('beer dispenser demo testing', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should create a dispenser', async () => {
    const req = { body: { flow_volume: 0.05 } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    const saveMock = jest.fn().mockResolvedValue({
      _id: 'some_id',
      status: 'closed',
      flow_Volume: 0.05,
      pouringEndTime: null,
      pouringStartTime: null,
      counter: 0,
    })

    Dispenser.mockImplementation(() => ({
      save: saveMock,
    }))

    await createDispenser(req, res)

    expect(Dispenser).toHaveBeenCalledWith({
      status: 'closed',
      flow_Volume: 0.05,
      pouringEndTime: null,
      pouringStartTime: null,
      counter: 0,
    })
    expect(saveMock).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      _id: 'some_id',
      status: 'closed',
      flow_Volume: 0.05,
      pouringEndTime: null,
      pouringStartTime: null,
      counter: 0,
    })
  })

  it('should handle errors', async () => {
    const req = { body: { flow_volume: 0.05 } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    const saveMock = jest.fn().mockRejectedValue(new Error('Test error'))

    Dispenser.mockImplementation(() => ({
      save: saveMock,
    }))

    await createDispenser(req, res)

    expect(Dispenser).toHaveBeenCalledWith({
      status: 'closed',
      flow_Volume: 0.05,
      pouringEndTime: null,
      pouringStartTime: null,
      counter: 0,
    })
    expect(saveMock).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ error: 'something went wrong' })
  })
})
