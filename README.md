# TechDo ![ic_launcher](https://github.com/user-attachments/assets/859cf75e-63ce-4356-b194-caeb73a37162)


A modern React Native todo application with advanced features.

## 📋 Project Overview

TechDo is a task management application built with React Native, Firebase, and Redux. It offers a clean user interface and comprehensive task management features across iOS and Android platforms.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Yarn](https://yarnpkg.com/)
- [Watchman](https://facebook.github.io/watchman/docs/install.html) (for macOS/Linux)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [CocoaPods](https://cocoapods.org/) (for iOS dependencies)
- [JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) (for Android development)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/haris18896/Tech-Do
cd TechDo/TechDo
```

### 2. Install dependencies

```bash
yarn install
```

### 3. iOS Setup

Install CocoaPods dependencies:

```bash
cd ios
pod install
cd ..
```

### 4. Firebase Configuration

The app uses Firebase for authentication and data storage. You'll need to:
`NOTE: The below firebase configuration has already been added`

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Configure authentication and Firestore
3. Download the configuration files:
   - `GoogleService-Info.plist` for iOS
   - `google-services.json` for Android
4. Place these files in their respective directories:
   - iOS: `/ios/TechDo/GoogleService-Info.plist`
   - Android: `/android/app/google-services.json`

### 5. Running the App

#### iOS

```bash
# Run on iPhone simulator
yarn ios

# Run on iPhone-16 Pro Max simulator
yarn i-16

# Run on iPad simulator
yarn iPad
```

#### Android

```bash
# Run on Android emulator or connected device
yarn android
```

#### Run Metro Bundler separately

```bash
yarn start
```

#### Run on both platforms

```bash
yarn run-all
```

## 📱 App Features

- User authentication with Firebase
- Task management (create, update, delete)
- Task categorization and filtering
- Responsive design for various screen sizes

## 🧩 Project Structure

```
TechDo/
├── src/                  # Source code
│   ├── @core/            # Core functionality
│   ├── @types/           # TypeScript type definitions
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # Reusable UI components
│   ├── config/           # Configuration files
│   ├── navigation/       # Navigation setup
│   ├── screens/          # App screens
│   ├── styles/           # Global styles
│   └── utils/            # Utility functions
├── ios/                  # iOS native code
├── android/              # Android native code
```

## 🧹 Code Quality

```bash
# Format code
yarn format
```

## 💻 Development Workflow

1. Create a new branch for your feature/fix
2. Implement your changes
3. Format your code: `yarn format`
4. Submit a pull request

