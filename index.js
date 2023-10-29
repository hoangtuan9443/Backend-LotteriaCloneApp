const express = require('express')
const bodyParer = require('body-parser')
const app = express()
const router = express.Router()
const admin = require("firebase-admin");

const serviceAccount = require("./privateKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// const token = 'cCMG3ywoSy2xiZs5NCw0hJ:APA91bGE0WN6opY8tNzYsZNr7Jeb62jTvngXlVSJx46dgrOQgE5ZwfnB-fbtrUDLiRunW_YWxCcF8E78Lv473HtzdfbLs-g9wwHm4KTYhii6vAxW4ucuznIWneQxWHjTJpfiREX7Q2CP'
const port = 3000

app.use(bodyParer.json())
app.use('/', router)

router.post('/api/pushNotificationSuccess', (req, res, next) => {
    admin.messaging().send({
        notification: {
            "title": 'Đơn hàng mới',
            "body": `Đơn hàng ${req.body.id} của quý khách đã đặt thành công.`,
        },
        "android": {
            "notification": {
                "sound": "default"
            }
        }, 
        "apns": {
            "payload": {
                "aps": {
                    "sound": "default"
                }
            }
        },
        token: req.body.token
    }).then(res => console.log(JSON.stringify(res))).catch(err => console.log(JSON.stringify(err)))
    res.status(200).send('Notification have been sent')
})


app.listen(port, () => {
    console.log(`Server is started on port ${port}`)    
})