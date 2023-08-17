import express from 'express'
import con from '../connection/dbconnect.js'
import bodyParser from 'body-parser'
import multer from 'multer'
const upload = multer({ dest: './uploads/' })
const router = express.Router()

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());


router.get("/api/news/getnews", (req, res) => {
    const sql = 'select * from dmcesite2021_news WHERE archived=0 and dept= "admin" ORDER BY `timestamp` DESC'
    con.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data)
    })
})


router.post("/api/news/addnews", (req, res) => {
    const reqbody = req.body
    console.log(reqbody)

    // const { title, link, desc, imp, expiry, file, dept } = reqbody

    const title =reqbody.NewsTitle
    const link =reqbody.NewsLink?reqbody.NewsLink:null
    const desc =reqbody.newsDescription?reqbody.newsDescription:null
    const imp =reqbody.NewsImportant?1:0
    const expiry =reqbody.expiryDate?reqbody.expiryDate:null
    const file =reqbody.file?reqbody.file:null
    const dept= reqbody.dept
    const sql = 'INSERT INTO `dmcesite2021_news`(`news`, `link`,`description`,`expiry`,`fileLink`,`dept`,`important`) VALUES( ?,?,?,?,?,?,?)'
    con.query(sql, [title, link, desc, imp, expiry, file, dept], (err, result) => {
        if (err) {
            res.json(err)
        } else {
            console.log("1 record successfully inserted into db");
            res.json({"msg":result})
        }

    });
});





export default router;