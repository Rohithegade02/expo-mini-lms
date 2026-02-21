# Expo Mini LMS 🎓

A performant, secure, and highly scalable Mini LMS application built with **React Native Expo**, **TypeScript**, and **NativeWind**. 

This repository was designed as an advanced demonstration of modern React Native development, tackling complex native and frontend challenges including bidirectional WebViews, offline-first mechanisms, biometric security locks, custom native API integrations, and robust state management.

---

## 🌟 Key Architectures & Feature Highlights

### 1. Authentication & Security (Advanced)
- **Token Management:** Authenticates scenarios securely via `expo-secure-store` handling token management (JWT + Refresh Tokens).
- **SSL Certificate Pinning:** Employs `react-native-ssl-public-key-pinning` to natively block "Man in The Middle" network proxy attacks.
- **Biometric App Lock:** Deep integration with `expo-local-authentication` locking the app globally utilizing FaceID/TouchID overlays stored persistently alongside global Auth states.

### 2. Formidable State Management
- **Zustand + MMKV / SecureStore:** State is globally managed precisely utilizing Zustand. Global store persistence natively maps structured objects to `react-native-mmkv` while isolating Auth tokens automatically down into SecureStore.
- **Normalized Store Structures:** The Course and Enrollments state leverages ID relational states (`courses`, `bookmarks{id}`, `progresses{id}`) preventing slow array mutations and achieving O(1) time complexity updates in React.

### 3. Highly Performant UI & Data Rendering
- **LegendList:** Replaced legacy `<FlatList>` with `@legendapp/list`, managing thousands of native complex instructor/course nodes without UI thread stutter bridging layout dimensions directly.
- **Responsive Theming:** Global UI structured seamlessly with **NativeWind v4** (Tailwind CSS) adopting dynamic intelligent Dark / Light modes across boundaries.
- **Image Caching:** All thumbnails utilize `expo-image` rendering engine caching network images natively under the hood saving bandwidth.

### 4. Resilient Network & Error Handling
- **API Interceptors & Exponent Backoff:** Natively intercepts `Axios` failing network requests and intelligently handles retry loops automatically using custom exponential backoffs to conquer race conditions.
- **Offline Resilience:** Subscribes to `expo-network` states mounting custom `OfflineBanner`s seamlessly to warn users if LTE/WIFI drops.
- **Global Error Boundaries & Telemetry:** Built with `react-error-boundary`. Deep integration with **Sentry** and **PostHog** strictly configured to natively log real-time crash traces, telemetry paths, and session replays dynamically bypassing Dev environments.

### 5. Smart Search (AI Integration)
- **Gemini Recommendations:** Beyond standard raw text matching, a custom AI bridge module securely integrates with local LLM models to inject "semantic smart search" results directly into local search hooks.

### 6. Embedded Content (WebView)
- Maps to a specific `CourseContentScreen` launching isolated instances of `react-native-webview` managing injected JS lifecycles allowing HTML content (local and live) to interact bidirectionally across the frontend bridge.

### 7. Native Background Systems
- **Notification Engines:** `expo-notifications` dynamically injects permissions securely. App features custom logical observers that wait for user goals (e.g. 5 Bookmarks) and inject Push-Triggers internally. Evaluates time structures to warn users of inactive streaks utilizing background loop detectors logic.

---

## 🛠️ Technology Stack Breakdown

| Category | Technology |
| :--- | :--- |
| **Framework** | Expo (SDK 54), React Native |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | NativeWind v4 (TailwindCSS) |
| **Navigation** | Expo Router (v6/v7 standard) |
| **State Management** | Zustand (Persistent via MMKV/SecureStore) |
| **API Client** | Axios (Custom Interceptors) |
| **Storage Utilities** | `react-native-mmkv`, `expo-secure-store` |
| **Form Validation** | `react-hook-form`, `zod` |
| **Advanced Native** | `expo-local-auth`, `expo-image`, `sentry`, `posthog` |
| **List Optimization** | `@legendapp/list` |

---

## 🚀 Setup Instructions

1. **Clone Repo & Install Dependencies**
```bash
git clone <your-repo-link>
cd expo-mini-lms
bun install 
```

2. **Environment Configuration**
Create a `.env.local` file at the root.

```bash
# Public Keys
EXPO_PUBLIC_API_URL=https://api.freeapi.app/api/v1
EXPO_PUBLIC_POSTHOG_API_KEY=YOUR_POSTHOG_KEY

# Sentry DSN mapped in layout
```

3. **Start Development**
```bash
# To launch local Expo Metro
bun run start

# To natively build and run on iOS Simulator/Device
bun run ios

# To natively build and run on Android Emulator
bun run android
```

---

## ⚠️ Known Issues / Limitations
1. **Mock Endpoints:** Due to strict LMS backend demands, mock API generators (`/public/randomproducts` and `randomusers`) were stitched together natively via asynchronous promises (`courseApi.getMappedCourses()`) to emulate a single standard "LMS Payload".
2. **WebView File URLs in Bare Builds**: Occasionally `WebView` loading static local HTML assets built natively into Expo may fail local pathing if not bundled explicitly via `metro-config.js` or `expo-asset`.
3. **Smart Search Costs:** Semantic AI searches utilizing Gemini / external bots may incur rate limits based on tokens heavily injected per search query if un-memoized rapidly.

---

## 📹 Demo & Visuals

*(Please link your walkthrough Video and Screenshots here)*
- **Demo Video:** `[link]`
- **Screenshots:** `[dir]`

## 📦 APK Build (Android Production)

To build the APK cleanly without using EAS, you may utilize local compiling:

```bash
# Generate the native Android folder if bare
npx expo prebuild --platform android

# CD into Android folder and build the release assemble
cd android
./gradlew assembleRelease
```
The resulting `.apk` will be outputted to `android/app/build/outputs/apk/release/app-release.apk`.
