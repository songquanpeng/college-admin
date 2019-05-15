const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

module.exports = {
    record: function record(req, res, next) {
        let time = new Date().toLocaleString();
        let userType = "unknown";
        let userID = "unknown";
        let ip = req.ip;
        if(ip.startsWith("::ffff:")){
            ip = ip.substr(7);
        }
        if (req.session.user !== undefined) {
            userType = req.session.user.userType;
            userID = req.session.user.userID;
        }
        console.log(time+" "+userType+" "+userID+" "+ip);
        db.run('INSERT INTO system_log (time, userType, userID, ip) VALUES (?, ?, ?, ?)', time, userType, userID, ip, (error)=>{
            if(error){
                console.error(error.message);
            }
        });
        next();
    }
};