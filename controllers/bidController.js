export const create = async (req, res) => {
  const { id, bidValue } = req.body;

  //Find the target which need to make new bid
  const bidTarget = await CollectionModel.findById(id);
  if (!bidTarget) return res.json({ message: 'Thing you try to find does not exist' });

  //Create new bid in bidHistory
  bidTarget.bidHistory.push({
    author: req.userId,
    price: bidValue,
  });

  //Save new bid
  bidTarget.save();

  res.json(bidTarget);
};
