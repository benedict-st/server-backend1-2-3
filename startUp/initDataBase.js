const Categorys = require("../models/Categorys");
const categorysMock = require("../mock/categorys.json");
module.exports = async () => {
  const categorys = await Categorys.find();
  if (categorys.length !== categorysMock.length) {
    await createInitialEntity(Categorys, categorysMock);
  }
};
async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
