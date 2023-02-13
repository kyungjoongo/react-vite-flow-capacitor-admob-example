// @flow

//import { CapacitorConfig } from '';
//
const CapacitorConfig = require('@capacitor/cli')

const config: CapacitorConfig = {
    plugins: {
        CapacitorHttp: {
            enabled: true,
        },
        PushNotifications: {
            presentationOptions: ["badge", "sound", "alert"],
        },

    },
};

export default config;
