const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // This is important!

global.DEBUG = true;

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/userTree", async (req, res) => {
    try {
        // await actorsDal.addActor(req.body.firstName, req.body.lastName);
        res.send(req.body.numbers);
    } catch {
        // log this error to an error log file.
        res.render("503");
    }
});

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`);
});
