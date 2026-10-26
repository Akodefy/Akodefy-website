# Firebase Setup Guide for HR Careers Management

This portal allows HR to add, edit, pause, and delete open job positions from `/admin` without touching any code. Changes reflect **instantly** in real time on the `/careers` page.

---

## 1. Create a Free Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** (e.g., name it `akodefy-portal`).
3. You can disable Google Analytics or leave it on, then click **Create project**.

---

## 2. Register Web App & Get Keys
1. In your project overview, click the **Web icon (`</>`)** to add an app.
2. Give it a nickname (e.g., `Akodefy Web`).
3. Click **Register app**.
4. Firebase will show you your `firebaseConfig`. Copy these values.
5. Create a file named `.env` in the project root (`d:\Akodefy\Projects\Akodefy\.env`) and paste:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=akodefy-portal.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=akodefy-portal
VITE_FIREBASE_STORAGE_BUCKET=akodefy-portal.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789...
VITE_FIREBASE_APP_ID=1:123456789:web:...
```

---

## 3. Enable Authentication for HR
1. In the Firebase console left menu, go to **Build** > **Authentication**.
2. Click **Get Started**.
3. Under the **Sign-in method** tab, click **Email/Password**.
4. Enable **Email/Password** and click **Save**.
5. Go to the **Users** tab and click **Add user**:
   * Enter HR's email (e.g., `hr@akodefy.com`) and a secure password.
   * HR will use these credentials to log into `/admin`.

---

## 4. Enable Cloud Firestore Database
1. In the left menu, go to **Build** > **Firestore Database**.
2. Click **Create database**.
3. Select a location close to you (e.g., `asia-south1` or `us-central1`).
4. Under **Security rules**, select **Start in production mode** (or test mode).
5. Go to the **Rules** tab in Firestore and paste these secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Anyone can read open positions (public careers page)
    // Only authenticated HR users can create, update, or delete positions
    match /careers_roles/{roleId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```
6. Click **Publish**.

---

## 5. How HR Uses the Portal
1. Open `http://localhost:5173/v1/admin` (or your live domain `https://akodefy.com/v1/admin`).
2. Log in with HR's email and password.
3. From now on:
   * Click **"Post New Role"** to add any new job openings.
   * Click the **eye icon** to toggle a job between "Live" and "Draft/Hidden".
   * Click the **pencil icon** to edit requirements, title, or description.
   * Click the **trash icon** to remove an opening.
