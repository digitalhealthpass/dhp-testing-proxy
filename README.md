# dhp-testing-proxy

**Version 1.0, December 2022**

[↳ Introduction](#introduction)

[↳ Installation](#installation)

[↳ Prerequisites](#prerequisites)

[↳ Testing With the Proxy](#prerequisites)

[↳ Testing](#testing)

## Introduction

Merative<sup>®</sup> provides this application for [Digital Health Pass](https://www.ibm.com/products/digital-health-pass/ "Digital Health Pass") mobile wallet and verifier app testing on a local environment without requiring external cloud services.  This application services has a proxy for all mobile requests to DHP API.  Endpoint stubs are provided for the Verifier Configuration and Metering services.

[↑ Top](#readme)

## Installation

It is recommended to use [Node.js](https://nodejs.org/) v16

To install the dependencies and run the service perform the following from a command line.

```
cd dhp-testing-proxy
npm i
npm run start
```

[↑ Top](#readme)

## Prerequisites

### CouchDB
Download and install [CouchDB](https://couchdb.apache.org/).  After installation start CouchDB and you will be prompted to enter an admin user id and password.  Take note of these values since they will be required to form the required DHP API environment variable COUCHDB_URL.  e.g. http://admin:password@127.0.0.1:5984.

### DHP API
Clone the [DHP API](https://github.com/digitalhealthpass/dhp-api) repository.  Follow the README to configure the service then start it. 

### Postman
Download [Postman](https://www.postman.com/downloads/) then import the collection and environment from the DHP API postman folder (/dhp-api/postman). The following requests must be executed from the Postman collection.

- /Issuer/onboard issuer/Create DHP Issuer
- /Issuer/metadata/update DHP Issuer metadata
- /Schema/Create Schema/
- /Schema/Create VC login Schema
- /Credentials/Create qr Credential - This creates a QR code credential that can be scanned by the wallet or verifier app.
- /Credentials/Create VC Login Credential - This create a Verifier Configuration login QR code credential that must be scanned by the verifier app before scanning credentials.

### Android Wallet and Verifier

An Android device is required to be connected via a USB cable to run the apps from Android Studio. [Developer options and USB-debugging](https://developer.android.com/studio/debug/dev-options#:~:text=Enable%20developer%20options%20and%20USB%20debugging,-Figure%201.&text=To%20enable%20developer%20options%2C%20tap,Settings%20%3E%20About%20Phone%20%3E%20Build%20Number) must be enabled on the device.

- Download and install [Android Studio](https://developer.android.com/studio).
- Clone the [DHP Android](https://github.com/digitalhealthpass/dhp-android-app) repo and open it with Android Studio.
- Modify the code like [this](https://github.com/digitalhealthpass/dhp-android-app/tree/run-against-local-testing-proxy) branch demonstrates to add the IP address where DHP testing proxy is running.
- When the app initially starts you will be prompted with a list of environments.  Select the one added above.
- Switch the build variant in Android Studio to `walletQa` to run the wallet app.
- Switch the build variant in Android Studio to `verifyQa` to run the verifier app.

### iOS Wallet and Verifier

An iOS device is required to be connected via a USB cable to run the apps from xCode.

- Install [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) from the App Store.
- Clone the [DHP iOS App](https://github.com/digitalhealthpass/dhp-ios-app) repo and open it with Xcode.
- Modify the code like [this](https://github.com/digitalhealthpass/dhp-ios-app/compare/run-against-local-testing-proxy) branch demonstrates to add the IP address where DHP testing proxy is running.
- When the app initially starts you will be prompted with a list of environments.  Select the one added above.
- Switch the executing project to `Holder` to run the wallet app.
- Switch the executing project to `Verifier` to run the verifier app.

[↑ Top](#readme)

## Testing

Once the prerequisites are met follow these steps in order to test the mobile app against the testing proxy.

- Start DHP API.
```
cd dhp-api
npm run start
```

- Start DHP Testing Proxy.
```
cd dhp-testing-proxy
npm run start
```

- Android
	- Connect an Android device to the dev machine via a USB cable.
	- Select the appropriate build variant in Android Studio.
	- Press the play in button Android Studio.
	- Follow the instructions on the app ensuring you select the environment where the testing proxy is running.
	- Create QR codes from Postman and begin scanning.
	
-iOS
	- Connect an iOS device to the dev machine via a USB cable.
	- Select the appropriate project in Xcode.
	- Press the play in button Xcode.
	- Follow the instructions on the app ensuring you select the environment where the testing proxy is running.
	- Create QR codes from Postman and begin scanning.

[↑ Top](#readme)
