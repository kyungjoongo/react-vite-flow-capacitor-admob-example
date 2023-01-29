// @flow

//import { CapacitorConfig } from '';
//
const CapacitorConfig = require('@capacitor/cli')

const config: CapacitorConfig = {
    plugins: {
        CapacitorHttp: {
            enabled: true,
        },
    },
};

export default config;
