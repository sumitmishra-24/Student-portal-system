# Student Portal System - Supabase Authentication

This project is a Student Portal System built with HTML, CSS, and vanilla JavaScript, integrated with Supabase Authentication.

---

## 📁 Project Structure

```text
Student_portal_System/
├── index.html            # Login page (public)
├── signup.html           # Student registration page (public)
├── forgot-password.html  # Password recovery request page (public)
├── reset-password.html   # New password setup page (public)
├── dashboard.html        # Main student dashboard (protected)
├── courses.html          # Enrolled courses page (protected)
├── Attendance.html       # Attendance tracking page (protected)
├── results.html          # Academic results page (protected)
├── profile.html          # Student profile page (protected)
│
├── supabase-config.js    # Supabase credentials & client initialization
├── auth.js               # Login, signup, and password reset logic
├── auth-guard.js         # Protected route guard, session check & logout
├── script.js             # General portal script
│
├── style.css             # Styles for login, signup, forgot-password, reset-password
└── dashboard.css         # Styles for dashboard, sidebar, courses, results, profile
```

---

## ⚙️ How to Configure Supabase Authentication

1. **Create / Open Supabase Project**:
   - Go to [Supabase](https://supabase.com) and create or open your project.

2. **Obtain API Credentials**:
   - Go to **Project Settings** (gear icon) -> **API**.
   - Copy the **Project URL** (e.g. `https://your-project.supabase.co`).
   - Copy the **anon / public** key under *Project API keys*.
   - ⚠️ **NEVER** use or expose the `service_role` key in frontend code.

3. **Add Credentials to `supabase-config.js`**:
   Open `supabase-config.js` and update:
   ```javascript
   const SUPABASE_URL = "https://your-project-id.supabase.co";
   const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
   ```

4. **Configure Email Auth Settings in Supabase**:
   - In Supabase Dashboard, go to **Authentication** -> **Providers** -> **Email**.
   - Ensure **Enable Email provider** is turned **ON**.
   - (Optional) Toggle **Confirm email**:
     - If **ON**, students must click the email confirmation link before their first login.
     - If **OFF**, students are logged in immediately upon registration.

---

## 🔗 Redirect URLs to Add in Supabase

In your Supabase Dashboard:
1. Navigate to **Authentication** -> **URL Configuration**.
2. Under **Site URL**, set your primary URL (e.g., `http://localhost:5500` or `http://127.0.0.1:5500` or your deployed URL).
3. Under **Redirect URLs**, click **Add URL** and add:
   - `http://localhost:5500/reset-password.html` (or your local port, e.g. `http://127.0.0.1:5500/reset-password.html`)
   - `http://localhost:5500/dashboard.html`
   - `http://localhost:5500/**` (wildcard for local development)

---

## 🧪 Testing Features

### 1. Test Student Signup
- Open `signup.html` in your browser (preferably via a local server such as Live Server: `http://localhost:5500/signup.html`).
- Enter Full Name, Student ID, Email, and Password (min 8 characters).
- Click **Create Account**.
- If Email Confirmation is enabled in Supabase, check your inbox and verify your email.

### 2. Test Student Login
- Open `index.html`.
- Enter your registered email and password.
- Click **Login**.
- You will be redirected to `dashboard.html`.

### 3. Test Protected Pages & Session Persistence
- Open any protected page directly (`dashboard.html`, `courses.html`, `Attendance.html`, `results.html`, `profile.html`).
- While logged in, you can browse freely, and your student name/avatar will be displayed.
- Refresh the browser: the session remains active (persistent login via Supabase session storage).
- Open an incognito / private browser window and try navigating directly to `dashboard.html`: you will be redirected to `index.html`.

### 4. Test Logout
- On any protected page, click **Logout** in the left sidebar.
- Your session will be terminated and you will be redirected to `index.html`.
- Pressing the browser back button will redirect you back to `index.html`.

### 5. Test Forgot Password & Reset Password
- Open `forgot-password.html`.
- Enter your registered email and submit.
- Open the reset email received from Supabase and click the recovery link.
- You will be redirected to `reset-password.html`.
- Enter your new password and click **Update Password**.
- Once updated, log in with your new password on `index.html`.
