package com.wevotereactnative;

import com.facebook.FacebookSdk;
import com.facebook.react.ReactActivity;
import android.content.Intent;
//import com.psykar.cookiemanager.CookieManagerPackage;

public class MainActivity extends ReactActivity {

    // WeVote Native see:  https://www.npmjs.com/package/react-native-fbsdk
    // Also see: https://developers.facebook.com/docs/android/getting-started/
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "WeVoteReactNative";
    }
}
