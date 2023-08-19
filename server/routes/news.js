import express from 'express'
import con from '../connection/dbconnect.js'
import bodyParser from 'body-parser'
import multer from 'multer'
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
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
    console.log(file) 
    con.query(sql, [title, link, desc, imp, expiry, file, dept], (err, result) => {
        if (err) {
            res.json(err)
        } else {
            console.log("1 record successfully inserted into db");
            res.json({"msg":result})
        }

    });
});

router.put("/api/news/archievenews", (req, res) => {
    const reqbody = req.body
    console.log(reqbody)
    const postid=reqbody.id
    const sql = 'UPDATE `dmcesite2021_news` SET `archived` = ? WHERE `sr` = ? '
    con.query(sql, [1,postid], (err, result) => {
        if (err) {
            res.json(err)
        } else {
            console.log("1 record successfully updated into db");
            res.json({"msg":result})
        }

    });
});

router.delete("/api/news/deletenews", (req, res) => {
    const reqbody = req.body
    const postid=reqbody.id
    const sql = 'DELETE FROM `dmcesite2021_news` WHERE `sr` = ?'
    con.query(sql, [postid], (err, result) => {
        if (err) {
            res.json(err)
        } else {
            console.log("1 record successfully deleted from db");
            res.json({"msg":result})
        }

    });
});


export default router;