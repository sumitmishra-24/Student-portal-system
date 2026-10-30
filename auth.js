// ============================================================================
// STUDENT PORTAL - AUTHENTICATION MODULE (auth.js)
// ============================================================================
// This script handles all authentication actions:
// 1. Student Login (index.html)
// 2. Student Signup with Full Name and Student ID (signup.html)
// 3. Password Reset Request (forgot-password.html)
// 4. Set New Password (reset-password.html)
// 5. Automatic redirect to dashboard for already-authenticated users
//
// Designed to be clean, modular, and beginner-friendly.
// ============================================================================

/**
 * Displays user-friendly status or error messages below forms.
 * @param {string} elementId - The ID of the message container element (<p>)
 * @param {string} text - Message text to display
 * @param {'error' | 'success' | 'info'} type - Type of message for color coding
 */
function displayMessage(elementId, text, type = "info") {
  const messageElement = document.getElementById(elementId);
  if (!messageElement) return;

  messageElement.textContent = text;

  if (type === "error") {
    messageElement.style.color = "#dc2626"; // Crimson red for errors
  } else if (type === "success") {
    messageElement.style.color = "#16a34a"; // Green for success
  } else {
    messageElement.style.color = "#2563eb"; // Blue for general information
  }
}

/**
 * Checks if a user is already logged in with an active session.
 * If yes, automatically redirects them away from public auth pages to the dashboard.
 */
async function redirectIfLoggedIn() {
  if (!window.supabaseClient || !window.isSupabaseConfigured || !window.isSupabaseConfigured()) {
    return;
  }

  try {
    const {
      data: { session }
    } = await window.supabaseClient.auth.getSession();

    if (session) {
      console.log("Active session detected. Redirecting to dashboard...");
      window.location.replace("dashboard.html");
    }
  } catch (error) {
    console.error("Error checking session status:", error);
  }
}

// ============================================================================
// 1. LOGIN FORM HANDLER (index.html)
// ============================================================================
const loginForm = document.getElementById("login-form");

if (loginForm) {
  // If student is already logged in, send them straight to the dashboard
  redirectIfLoggedIn();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitButton = loginForm.querySelector('button[type="submit"]');

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Check if Supabase keys have been configured in supabase-config.js
    if (!window.isSupabaseConfigured || !window.isSupabaseConfigured()) {
      displayMessage(
        "message",
        "Please add your Supabase URL and Anon Key in supabase-config.js to enable login.",
        "error"
      );
      return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Basic frontend validation
    if (!email || !password) {
      displayMessage("message", "Please enter both your email address and password.", "error");
      return;
    }

    // Disable button & indicate loading state to prevent duplicate submissions
    const originalBtnText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Logging in...";
    displayMessage("message", "");

    try {
      // Authenticate student with Supabase Auth
      const { data, error } = await window.supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        // Display friendly error message (e.g. Invalid login credentials, Email not confirmed)
        displayMessage("message", error.message, "error");
        submitButton.disabled = false;
        submitButton.textContent = originalBtnText;
        return;
      }

      // Login successful!
      if (data.session) {
        displayMessage("message", "Login successful! Redirecting to dashboard...", "success");

        // Redirect user to dashboard
        setTimeout(() => {
          window.location.replace("dashboard.html");
        }, 1000);
      }
    } catch (err) {
      console.error("Unexpected login error:", err);
      displayMessage("message", "An unexpected error occurred. Please try again.", "error");
      submitButton.disabled = false;
      submitButton.textContent = originalBtnText;
    }
  });

  // Keep fallback link functionality for signup link if needed
  const signupLink = document.getElementById("signup-link");
  if (signupLink) {
    signupLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "signup.html";
    });
  }
}

// ============================================================================
// 2. SIGNUP FORM HANDLER (signup.html)
// ============================================================================
const signupForm = document.getElementById("signup-form");

if (signupForm) {
  // If student is already logged in, send them straight to the dashboard
  redirectIfLoggedIn();

  const fullNameInput = document.getElementById("full-name");
  const studentIdInput = document.getElementById("student-id");
  const emailInput = document.getElementById("signup-email");
  const passwordInput = document.getElementById("signup-password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const submitButton = signupForm.querySelector('button[type="submit"]');

  signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!window.isSupabaseConfigured || !window.isSupabaseConfigured()) {
      displayMessage(
        "signup-message",
        "Please add your Supabase URL and Anon Key in supabase-config.js to enable signup.",
        "error"
      );
      return;
    }

    const fullName = fullNameInput ? fullNameInput.value.trim() : "";
    const studentId = studentIdInput ? studentIdInput.value.trim() : "";
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validation checks
    if (!email || !password || !confirmPassword) {
      displayMessage("signup-message", "Please fill in all required fields.", "error");
      return;
    }

    if (password !== confirmPassword) {
      displayMessage("signup-message", "Passwords do not match. Please re-enter.", "error");
      return;
    }

    if (password.length < 8) {
      displayMessage(
        "signup-message",
        "Password must be at least 8 characters in length.",
        "error"
      );
      return;
    }

    // Set loading state
    const originalBtnText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Creating Account...";
    displayMessage("signup-message", "");

    try {
      // Register student with Supabase Auth
      // Full name and Student ID are saved into user_metadata
      const { data, error } = await window.supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
            student_id: studentId
          }
        }
      });

      if (error) {
        displayMessage("signup-message", error.message, "error");
        submitButton.disabled = false;
        submitButton.textContent = originalBtnText;
        return;
      }

      // Check registration result:
      // Case A: Email confirmation is disabled in Supabase project -> session is created immediately
      if (data.session) {
        displayMessage(
          "signup-message",
          "Account created successfully! Redirecting to dashboard...",
          "success"
        );
        setTimeout(() => {
          window.location.replace("dashboard.html");
        }, 1200);
      }
      // Case B: Email confirmation is enabled in Supabase project (default) -> user must verify email
      else if (data.user) {
        displayMessage(
          "signup-message",
          "Registration successful! Please check your email to confirm your account before logging in.",
          "success"
        );
        signupForm.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalBtnText;
      }
    } catch (err) {
      console.error("Unexpected signup error:", err);
      displayMessage("signup-message", "An unexpected error occurred. Please try again.", "error");
      submitButton.disabled = false;
      submitButton.textContent = originalBtnText;
    }
  });
}

// ============================================================================
// 3. FORGOT PASSWORD REQUEST HANDLER (forgot-password.html)
// ============================================================================
const forgotPasswordForm = document.getElementById("forgot-password-form");

if (forgotPasswordForm) {
  redirectIfLoggedIn();

  const resetEmailInput = document.getElementById("reset-email");
  const submitButton = forgotPasswordForm.querySelector('button[type="submit"]');

  forgotPasswordForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!window.isSupabaseConfigured || !window.isSupabaseConfigured()) {
      displayMessage(
        "reset-message",
        "Please add your Supabase URL and Anon Key in supabase-config.js.",
        "error"
      );
      return;
    }

    const email = resetEmailInput.value.trim();

    if (!email) {
      displayMessage("reset-message", "Please enter your registered email address.", "error");
      return;
    }

    // Determine the dynamic URL for reset-password.html based on current location
    // e.g. http://localhost:5500/reset-password.html or http://127.0.0.1:8080/reset-password.html
    const origin =
      window.location.origin === "null" || !window.location.origin
        ? "http://localhost:5500"
        : window.location.origin;
    const pathParts = window.location.pathname.split("/");
    pathParts.pop(); // Remove forgot-password.html
    pathParts.push("reset-password.html");
    const resetRedirectUrl = `${origin}${pathParts.join("/")}`;

    const originalBtnText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Sending Reset Link...";
    displayMessage("reset-message", "");

    try {
      const { data, error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: resetRedirectUrl
      });

      if (error) {
        displayMessage("reset-message", error.message, "error");
        submitButton.disabled = false;
        submitButton.textContent = originalBtnText;
        return;
      }

      displayMessage(
        "reset-message",
        "Password reset link sent! Check your email inbox and click the link to reset your password.",
        "success"
      );
      forgotPasswordForm.reset();
      submitButton.disabled = false;
      submitButton.textContent = originalBtnText;
    } catch (err) {
      console.error("Unexpected reset password error:", err);
      displayMessage("reset-message", "Failed to send reset link. Please try again.", "error");
      submitButton.disabled = false;
      submitButton.textContent = originalBtnText;
    }
  });
}

// ============================================================================
// 4. SET NEW PASSWORD HANDLER (reset-password.html)
// ============================================================================
const resetPasswordForm = document.getElementById("reset-password-form");

if (resetPasswordForm) {
  const newPasswordInput = document.getElementById("new-password");
  const confirmNewPasswordInput = document.getElementById("confirm-new-password");
  const submitButton = resetPasswordForm.querySelector('button[type="submit"]');

  // Supabase automatically detects the recovery token from the URL
  // We can listen to auth state changes to confirm the recovery session
  if (window.supabaseClient && window.isSupabaseConfigured && window.isSupabaseConfigured()) {
    window.supabaseClient.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        console.log("Password recovery flow initiated from email link.");
      }
    });
  }

  resetPasswordForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!window.isSupabaseConfigured || !window.isSupabaseConfigured()) {
      displayMessage(
        "update-message",
        "Please add your Supabase URL and Anon Key in supabase-config.js.",
        "error"
      );
      return;
    }

    const newPassword = newPasswordInput.value;
    const confirmNewPassword = confirmNewPasswordInput.value;

    if (!newPassword || !confirmNewPassword) {
      displayMessage("update-message", "Please enter and confirm your new password.", "error");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      displayMessage("update-message", "Passwords do not match. Please re-enter.", "error");
      return;
    }

    if (newPassword.length < 8) {
      displayMessage(
        "update-message",
        "Password must be at least 8 characters long.",
        "error"
      );
      return;
    }

    const originalBtnText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Updating Password...";
    displayMessage("update-message", "");

    try {
      // Update student's password in Supabase Auth
      const { data, error } = await window.supabaseClient.auth.updateUser({
        password: newPassword
      });

      if (error) {
        displayMessage("update-message", error.message, "error");
        submitButton.disabled = false;
        submitButton.textContent = originalBtnText;
        return;
      }

      displayMessage(
        "update-message",
        "Password updated successfully! Redirecting to login page...",
        "success"
      );

      // Sign out to enforce fresh login with the new password
      setTimeout(async () => {
        try {
          await window.supabaseClient.auth.signOut();
        } catch (e) {
          // Ignore
        }
        window.location.replace("index.html");
      }, 1800);
    } catch (err) {
      console.error("Unexpected password update error:", err);
      displayMessage("update-message", "Failed to update password. Please try again.", "error");
      submitButton.disabled = false;
      submitButton.textContent = originalBtnText;
    }
  });
}
