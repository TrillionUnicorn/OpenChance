# 📱 OpenChance Flutter App

**Mobile application for OpenChance platform - iOS and Android**

---

## 🎯 Overview

OpenChance Flutter App is a **production-ready mobile application** for:
- iOS (App Store)
- Android (Google Play Store)

---

## ✨ Features

### Core Features
- ✅ User authentication
- ✅ Browse challenges
- ✅ Submit applications
- ✅ Real-time messaging
- ✅ Payment processing
- ✅ User profiles
- ✅ Notifications
- ✅ Search functionality

### Platform Features
- ✅ Dark mode support
- ✅ Offline support
- ✅ Push notifications
- ✅ Biometric authentication
- ✅ Deep linking
- ✅ Share functionality
- ✅ Image upload
- ✅ Video support

---

## 🛠 Tech Stack

- **Framework:** Flutter 3.13+
- **Language:** Dart 3.0+
- **State Management:** Riverpod
- **Navigation:** GoRouter
- **API:** Dio + Retrofit
- **Local Storage:** Hive
- **Authentication:** Firebase Auth + Clerk
- **Payments:** Stripe Flutter
- **Analytics:** Firebase Analytics
- **Notifications:** Firebase Messaging

---

## 🚀 Getting Started

### Prerequisites
- Flutter 3.13+
- Dart 3.0+
- Xcode 14+ (for iOS)
- Android Studio (for Android)
- CocoaPods (for iOS dependencies)

### Installation

```bash
# Clone repository
git clone https://github.com/TrillionUnicorn/OpenChance.git
cd OpenChance/mobile/flutter_app

# Get dependencies
flutter pub get

# Generate code
flutter pub run build_runner build

# Run app
flutter run
```

---

## 📱 Building for Production

### iOS

```bash
# Build for iOS
flutter build ios --release

# Create IPA
cd ios
xcodebuild -workspace Runner.xcworkspace \
  -scheme Runner \
  -configuration Release \
  -derivedDataPath build \
  -archivePath build/Runner.xcarchive \
  archive

xcodebuild -exportArchive \
  -archivePath build/Runner.xcarchive \
  -exportOptionsPlist ExportOptions.plist \
  -exportPath build/ios/ipa
```

### Android

```bash
# Build for Android
flutter build apk --release

# Build AAB for Play Store
flutter build appbundle --release
```

---

## 📦 App Store Assets

### Required Assets

#### iOS App Store
- App Icon (1024x1024)
- Screenshots (5-10 per language)
- Preview video (optional)
- App description
- Keywords
- Support URL
- Privacy policy URL

#### Google Play Store
- App Icon (512x512)
- Feature graphic (1024x500)
- Screenshots (2-8 per language)
- Preview video (optional)
- App description
- Short description
- Keywords
- Support URL
- Privacy policy URL

### Asset Locations
```
mobile/flutter_app/
├── assets/
│   ├── app_store/
│   │   ├── ios/
│   │   │   ├── icon.png
│   │   │   ├── screenshots/
│   │   │   └── preview_video.mp4
│   │   └── android/
│   │       ├── icon.png
│   │       ├── feature_graphic.png
│   │       ├── screenshots/
│   │       └── preview_video.mp4
│   └── images/
```

---

## 📸 Screenshots

### iOS Screenshots
- Home screen
- Challenge list
- Challenge detail
- Application form
- Messages
- Profile
- Settings

### Android Screenshots
- Home screen
- Challenge list
- Challenge detail
- Application form
- Messages
- Profile
- Settings

---

## 🎨 Design

- **Design System:** Material Design 3
- **Color Scheme:** Indigo primary, Green accent
- **Typography:** Poppins font family
- **Spacing:** 8px grid system
- **Animations:** Smooth transitions

---

## 🔐 Security

- ✅ Secure storage for tokens
- ✅ Biometric authentication
- ✅ SSL pinning
- ✅ Encrypted local storage
- ✅ Secure API communication
- ✅ Input validation
- ✅ Error handling

---

## 📊 Performance

- ✅ Optimized bundle size
- ✅ Fast startup time
- ✅ Smooth animations
- ✅ Efficient memory usage
- ✅ Battery optimization
- ✅ Network optimization

---

## 🧪 Testing

```bash
# Run unit tests
flutter test

# Run integration tests
flutter test integration_test

# Generate coverage
flutter test --coverage
```

---

## 📝 Localization

Supported languages:
- English (en_US)
- Spanish (es_ES) - Coming soon
- French (fr_FR) - Coming soon
- German (de_DE) - Coming soon

---

## 🚀 Deployment

### App Store (iOS)
1. Build IPA
2. Upload to App Store Connect
3. Fill in app information
4. Submit for review
5. Wait for approval (1-3 days)

### Google Play Store (Android)
1. Build AAB
2. Upload to Google Play Console
3. Fill in app information
4. Submit for review
5. Wait for approval (1-3 hours)

---

## 📞 Support

- **Documentation:** https://docs.openchance.com
- **Issues:** https://github.com/TrillionUnicorn/OpenChance/issues
- **Email:** support@openchance.com

---

**Status:** ✅ Production Ready  
**Version:** 1.0.0  
**Last Updated:** October 16, 2025

