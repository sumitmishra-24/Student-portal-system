# Student Portal System

A responsive web-based Student Portal System built using HTML, CSS, JavaScript, and Supabase Authentication.

## Overview

Student Portal System provides a centralized interface where students can log in and access their academic information, including courses, attendance, results, and profile details.

**Live Demo:** https://sumit-student-portal-24.vercel.app

## Features

- Student registration and login
- Email verification and password recovery
- Secure authentication using Supabase
- Personalized student dashboard
- Course overview
- Attendance tracking interface
- Academic results page
- Student profile page
- Protected routes and session management
- Responsive user interface

## Screenshots

_Add screenshots of your application here._

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend functionality |
| Supabase | Authentication |
| Git & GitHub | Version control |
| Vercel | Deployment |

## Project Structure

```text
Student_portal_System/
├── index.html
├── signup.html
├── forgot-password.html
├── reset-password.html
├── dashboard.html
├── courses.html
├── attendance.html
├── results.html
├── profile.html
├── supabase-config.js
├── auth.js
├── auth-guard.js
├── script.js
├── style.css
├── dashboard.css
├── university-bg.jpeg
├── student-photo.jpg
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the Repository

```bash
git clone (https://github.com/sumitmishra-24/Student-portal-system.git)
cd Student_portal_System
```

### 2. Configure Supabase

Create a Supabase project and obtain:

- Project URL
- Publishable Key

Configure these values in `supabase-config.js`.

```javascript
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_PUBLISHABLE_KEY";
```

Enable Email Authentication and configure the appropriate Site URL and Redirect URLs in your Supabase project.

For local development, use your local server URL. For production, add your deployed Vercel domain.

**Security:** Never expose your Supabase Secret Key or `service_role` key in frontend code.

### 3. Run Locally

Open the project using VS Code Live Server or another local HTTP server.

## Current Limitations

- Course, attendance, and result information uses static demonstration data.
- Authentication is integrated with Supabase.
- Academic records are not yet connected to Supabase database tables.
- Some profile information is currently static.

## Future Improvements

- Supabase database integration for student records
- Course and attendance management
- Academic results management
- Row Level Security (RLS)
- Student profile editing
- Profile image uploads
- Admin dashboard

## License

This project is developed for educational and learning purposes.
