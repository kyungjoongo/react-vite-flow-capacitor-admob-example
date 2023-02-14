const admin = require('firebase-admin')
let serAccount = require('./service-account-file.json')

admin.initializeApp({
    credential: admin.credential.cert(serAccount),
    //credential: applicationDefault()
})

let target_token = 'dClBIr1EQ_emkJolV1ylvC:APA91bGY_9Z3xAaQKxJYBnWB6mF1I0loIEyPs0XKAzVw3Smy3WFCBhzYzDxF4VcW6KkhS19RcYlg-6-3_--sF4Purj4xGO1UALSP73EuADK5q4tNpV992NLbFJIAYjOdhmnDfp2FY0gu'

let payload = {
    data: {
        title: '고경준 천재님이십니다sdlfksldkflsdkf______테스트 데이터 발송asdasdasdasdasdasadasd',
        body: '데이터가 잘 가나요?',
    },
    notification: {
        title: 'My Title__푸시메세지입니ㅏㄷsdlkflsdkflkdsflk!33333',
        body: 'TEST'
    },
    //condition: "!('anytopicyoudontwanttouse' in topics)"
    //condition: "'all' in topics || 'android' in topics || 'ios' in topics"

}

// admin.messaging().send(payload).then(function (response) {
//     console.log('Successfully sent message: : ', response)
// }).catch(function (err) {
//     console.log('Error Sending message!!! : ', err)
// })

admin.messaging().sendToDevice([target_token], payload).then(res => {
    console.log("Successfully===>", res);
}).catch(e => {

    console.log("sdlkflsdkf===>", e.toString())
})
