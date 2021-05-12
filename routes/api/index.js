const router = require("..")

const router = require("express").Router();
const bookRoute = require("./books");

router.use("/books", bookRoute);

module.exports = router;
