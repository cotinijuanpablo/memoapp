const router = require("express").Router();

router.get("/health", (req, res, next) => {
    res.send(200);
});

router.use("/tasks", require("./tasks.js"));
//router.use("/reminders", require("./reminders.js"));

module.exports = router;