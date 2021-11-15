const express = require("express");

const movieController = require("./../controllers/movieController");

const router = express.Router(); // Creating Routers

router.route("/").get(movieController.getAll).post(movieController.createOne); // takes list of callback functions, separates them using REST parameters

router
    .route("/:id")
    .get(movieController.getOne)
    .patch(movieController.updateOne)
    .delete(movieController.deleteOne);

module.exports = router;
