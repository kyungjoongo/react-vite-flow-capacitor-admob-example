// @flow

import {makeAutoObservable} from "mobx";
import {AdMob, BannerAdPluginEvents, BannerAdPosition, BannerAdSize} from '@capacitor-community/admob';

type TypeCurrentUser = {
    accessToken: any,
    auth: any,
    displayName: any,
    email: any,
    emailVerified: any,
    isAnonymous: any,
    metadata: any,
    phoneNumber: any,
    photoURL: any,
    proactiveRefresh: any,
    providerData: any,
    providerId: any,
    reloadListener: any,
    reloadUserInfo: any,
    stsTokenManager: any,
    uid: any,
}

class SharedService {

    constructor() {
        makeAutoObservable(this)
    }

    counter = 0;

    incrementCounter() {
        this.counter++;
    }

    setCounter(value: any) {
        this.counter = value;
    }

    isAuthed = false;

    currentUser: TypeCurrentUser = {
        accessToken: '',
        auth: '',
        displayName: '',
        email: '',
        emailVerified: '',
        isAnonymous: '',
        metadata: '',
        phoneNumber: '',
        photoURL: '',
        proactiveRefresh: '',
        providerData: '',
        providerId: '',
        reloadListener: '',
        reloadUserInfo: '',
        stsTokenManager: '',
        uid: '',
    }

    resetCurrentUser() {
        this.currentUser = {
            accessToken: '',
            auth: '',
            displayName: '',
            email: '',
            emailVerified: '',
            isAnonymous: '',
            metadata: '',
            phoneNumber: '',
            photoURL: '',
            proactiveRefresh: '',
            providerData: '',
            providerId: '',
            reloadListener: '',
            reloadUserInfo: '',
            stsTokenManager: '',
            uid: '',
        }
    }

    setCurrentUser(valueMap: TypeCurrentUser) {
        this.currentUser = valueMap
    }

    results=[]


}

const sharedService = new SharedService();

export default sharedService;


export async function initializeAdmob(): Promise<void> {
    const {status} = await AdMob.trackingAuthorizationStatus();

    if (status === 'notDetermined') {
    }

    AdMob.initialize({
        requestTrackingAuthorization: true,
        //testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
        initializeForTesting: true,
    });
}

export async function showBanner(): Promise<void> {
    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
        // Subscribe Banner Event Listener
    });

    AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: any) => {
        // Subscribe Change Banner Size
    });

    const options: any = {
        adId: 'a-app-pub-6826082357124500/2123160297',
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: true
        // npa: true
    };
    await AdMob.showBanner(options);
}
