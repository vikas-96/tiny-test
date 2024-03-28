const router = require("express").Router();
const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");
const CatController = require("../controllers/CatController");
const Auth = require("../middleware/auth");

router.post("/user", UserController.createUser);

router.post("/auth/login", AuthController.login);

router.get("/cat", Auth.isAuthenticated, CatController.getAllCat);
router.post("/cat", Auth.isAuthenticated, CatController.CreateCat);
router.put("/cat/:id([0-9]+)", Auth.isAuthenticated, CatController.UpdateCat);
router.delete(
  "/cat/:id([0-9]+)",
  Auth.isAuthenticated,
  CatController.DeleteCat
);

module.exports = router;
