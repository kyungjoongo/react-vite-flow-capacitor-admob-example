const admin = require('firebase-admin')
let serAccount = require('./service-account-file.json')

admin.initializeApp({
    credential: admin.credential.cert(serAccount),
    //credential: applicationDefault()
})

let target_token = 'fDmgDYtITw-QuSt7F3m6Ya:APA91bHgQ7UdHt80HqRD9nY3jZa2abzsGJDZChi_Idne51Io5I_PI7-fxr2_0nS67qlgSnwujzPAsd3URcanyKwgWI_3WDMmfuuNGZSXKUABYefpWlOfe45x1rFi7nNio0-cWqpxkzN_'


let payload = {
    data: {
        title: '고경준 천재님이십니다sdlfksldkflsdkf______테스트 데이터 발송asdasdasdasdasdasadasd',
        body: '데이터가 잘 가나요?',
    },
    notification: {
        title: 'My Title__푸시메세지입니ㅏㄷsdlkflsdkflkdsflk!33333',
        body : 'TEST'
    }
}

// admin.messaging().send(message).then(function (response) {
//     console.log('Successfully sent message: : ', response)
// }).catch(function (err) {
//     console.log('Error Sending message!!! : ', err)
// })

admin.messaging().sendToDevice(target_token, payload).then(res => {
    console.log("Successfully===>", res);
}).catch(e => {

    console.log("sdlkflsdkf===>", e.toString())
})