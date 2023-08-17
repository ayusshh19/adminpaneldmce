import express from 'express'
import cors from 'cors'
import con from './connection/dbconnect.js'
import News from './routes/news.js'

const app = express();

app.use(cors())
app.use(News)

con.connect(function (err) {
    if (err) throw err;
    console.log("connection successful!!");
});

app.get("/", (req, res) => {
    // console.log(req)
    res.json({ message: "test server" });
});

app.listen(8080, () => {
    console.log(`Server is running on port 8080.`);
});