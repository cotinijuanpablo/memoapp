const mainRouter = require("express").Router();

mainRouter.get("/health", (req, res, next) => {
    res.send(200);
});

mainRouter.use("/Notes", require("./notes.js"));
//router.use("/reminders", require("./reminders.js"));

module.exports = mainRouter;