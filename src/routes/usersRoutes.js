const router = require("express").Router();

const UserController = require("../controllers/userController");

router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUser);
router.post("/", UserController.createUser);
router.patch("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
