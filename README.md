# Student Portal System

A web-based Student Portal System built with **HTML, CSS, JavaScript, and Supabase Authentication**. It provides students with a simple interface to access their dashboard, courses, attendance, academic results, and profile.

## Overview

The Student Portal System is designed to provide a centralized interface where students can securely sign in and view their academic information.

The project currently includes a responsive frontend and Supabase-powered authentication with email verification and password recovery.

## Features

### Authentication
- Student registration with full name, student ID, email, and password.
- Secure email and password login using Supabase.
- Email verification after registration.
- Forgot password and password reset functionality.
- Persistent login sessions.
- Logout functionality.

### Student Dashboard
- Personalized student welcome message.
- Overview of enrolled courses.
- Academic progress summary.

### Student Portal Pages
- **Dashboard:** Overview of student activities.
- **My Courses:** View enrolled courses and progress.
- **Attendance:** View subject-wise attendance.
- **Results:** View academic performance and marks.
- **My Profile:** View student information.

### Security
- Protected pages accessible only to authenticated users.
- Automatic redirection to the login page when no valid session exists.
- Supabase-managed authentication sessions.
- Frontend uses the Supabase Publishable Key, never the Secret Key.

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Frontend functionality |
| Supabase Auth | User authentication |
| Git & GitHub | Version control |

## Project Structure

```text
Student_portal_System/
│
├── index.html
├── signup.html
├── forgot-password.html
├── reset-password.html
│
├── dashboard.html
├── courses.html
├── attendance.html
├── results.html
├── profile.html
│
├── supabase-config.js
├── auth.js
├── auth-guard.js
├── script.js
│
├── style.css
├── dashboard.css
├── university-bg.jpeg
├── student-photo.jpg
│
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the Project

```bash
cd Student_portal_System
```

Open the folder in VS Code or Antigravity.

### 3. Configure Supabase

Create a free project at [Supabase](https://supabase.com/).

In your Supabase project, navigate to **Project Settings → API Keys**.

Obtain:

- Project URL
- Publishable Key (`sb_publishable_...`)

Open `supabase-config.js` and configure:

```javascript
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_PUBLISHABLE_KEY";
```

**Security note:** Never put your Supabase Secret Key or legacy `service_role` key in frontend code or commit them to GitHub.

### 4. Configure Email Authentication

In the Supabase Dashboard:

1. Open Authentication → Sign In / Providers.
2. Select Email.
3. Enable the Email provider.
4. Keep Confirm Email enabled to require email verification.
5. Set the minimum password length to 8 characters.

### 5. Configure Redirect URLs

Navigate to **Authentication → URL Configuration**.

For local development, configure:

**Site URL**

```text
http://127.0.0.1:5500
```

**Redirect URLs**

```text
http://127.0.0.1:5500/**
```

For deployment, add your actual production website URL and required redirect paths.

### 6. Run the Project

Use the VS Code Live Server extension.

1. Open `index.html`.
2. Right-click and select **Open with Live Server**.
3. Open the local URL in your browser.

Example:

```text
http://127.0.0.1:5500/index.html
```

Do not open the HTML files directly using the `file://` protocol. Authentication redirects require an HTTP or HTTPS origin.

## Testing the Application

### Student Registration
1. Open `signup.html`.
2. Enter your full name, student ID, email, and password.
3. Click Create Account.
4. Verify your email using the link sent by Supabase.

### Student Login
1. Open `index.html`.
2. Enter your registered email and password.
3. Click Login.
4. You should be redirected to the dashboard.

### Protected Pages
Try accessing these pages without an authenticated session:

- `dashboard.html`
- `courses.html`
- `attendance.html`
- `results.html`
- `profile.html`

Unauthenticated visitors should be redirected to the login page.

### Logout
Click Logout from the sidebar. Your Supabase session should be cleared and you should return to the login page.

### Password Recovery
1. Open `forgot-password.html`.
2. Enter your registered email.
3. Open the password recovery email.
4. Follow the recovery link.
5. Set a new password on `reset-password.html`.
6. Log in using your new password.

## Current Project Limitations

- Course, attendance, and result information currently uses static demonstration data.
- Student authentication is connected to Supabase.
- Academic records are not yet stored in Supabase database tables.
- Student profile information currently uses authentication metadata and some static frontend content.

## Future Improvements

- Store student records in Supabase PostgreSQL.
- Implement database tables for courses, attendance, and results.
- Add Row Level Security (RLS) policies.
- Add student profile editing.
- Add profile image uploads using Supabase Storage.
- Build an admin dashboard for managing student records.

## Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is available for educational and learning purposes.
