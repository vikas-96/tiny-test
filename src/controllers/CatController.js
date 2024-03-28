const Cat = require("../../models/cat");

exports.getAllCat = async (req, res) => {
  try {
    const cats = await Cat.findAll();
    if (!cats) {
      return res.status(404).json({
        message: "Cat not found",
      });
    }
    return res.status(200).json({
      data: cats,
    });
  } catch (err) {
    return res.status(200).json({
      message: err.message,
    });
  }
};

exports.CreateCat = async (req, res) => {
  try {
    let { catname, catage, catcolor } = req.body;
    await Cat.sequelize.transaction().then(async (t) => {
      Cat.create(
        {
          catname,
          catage,
          catcolor,
        },
        { transaction: t }
      )
        .then((resp) => {
          if (!resp) {
            return res.status(500).json({
              message: "Cat not found",
            });
          }
          t.commit();
          return res.status(201).json({
            message: "Cat created successfully",
          });
        })
        .catch((err) => {
          t.rollback();
          return res.status(500).json({
            message: err.message,
          });
        });
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.UpdateCat = async (req, res) => {
  try {
    const id = req.params.id;
    const { catname, catage, catcolor } = req.body;
    const updateCat = await Cat.update(
      {
        catname,
        catage,
        catcolor,
      },
      { where: { id: id } }
    );
    if (updateCat == 0) {
      return res.status(404).json({
        message: "record not found",
      });
    }
    return res.status(201).json({
      message: "Cat updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.DeleteCat = async (req, res) => {
  try {
    const id = req.params.id;
    const updateCat = await Cat.destroy({ where: { id: id } });
    if (updateCat == 0) {
      return res.status(404).json({
        message: "record not found",
      });
    }
    return res.status(201).json({
      message: "Cat deleted successfully",
    });
  } catch (err) {}
};
