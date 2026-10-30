// ============================================================================
// STUDENT PORTAL - AUTH GUARD & SESSION PROTECTOR (auth-guard.js)
// ============================================================================
// This script protects restricted portal pages:
// - dashboard.html
// - courses.html
// - Attendance.html
// - results.html
// - profile.html
//
// Key Responsibilities:
// 1. Checks if student has an active session with Supabase.
// 2. Redirects unauthenticated visitors to index.html immediately.
// 3. Handles Student Logout securely when clicking the Logout link.
// 4. Populates the student's real name, ID, and email in the interface.
// 5. Prevents UI flickering by revealing content only after authentication is verified.
// ============================================================================

/**
 * Reveals the protected page content once authenticated.
 */
function revealPageContent() {
  document.body.classList.remove("auth-protected");
  document.body.style.visibility = "visible";
}

/**
 * Populates student details across topbars, welcome banners, and profile fields.
 * @param {object} user - The authenticated Supabase user object
 */
function populateStudentDetails(user) {
  if (!user) return;

  const metadata = user.user_metadata || {};
  const fullName = metadata.full_name || user.email.split("@")[0] || "Student";
  const studentId = metadata.student_id || "STU" + user.id.substring(0, 6).toUpperCase();
  const email = user.email || "student@example.com";
  const initial = fullName.charAt(0).toUpperCase();

  // 1. Update Topbar Avatar and Name (present on all protected pages)
  const topbarAvatar = document.querySelector(".topbar .avatar");
  if (topbarAvatar) {
    topbarAvatar.textContent = initial;
  }

  const topbarName = document.querySelector(".topbar .student-info span");
  if (topbarName) {
    topbarName.textContent = fullName;
  }

  // 2. Update Welcome Card heading (dashboard.html)
  const welcomeHeading = document.querySelector(".welcome-card h2");
  if (welcomeHeading && welcomeHeading.textContent.includes("Welcome back")) {
    welcomeHeading.textContent = `Welcome back, ${fullName}! 👋`;
  }

  // 3. Update Profile details (profile.html)
  const profileHeaderName = document.getElementById("profile-header-name");
  if (profileHeaderName) {
    profileHeaderName.textContent = fullName;
  }

  const profileFullName = document.getElementById("profile-full-name");
  if (profileFullName) {
    profileFullName.textContent = fullName;
  }

  const profileStudentId = document.getElementById("profile-student-id");
  if (profileStudentId) {
    profileStudentId.textContent = studentId;
  }

  const profileEmail = document.getElementById("profile-email");
  if (profileEmail) {
    profileEmail.textContent = email;
  }
}

/**
 * Attaches click event listeners to all Logout links on the page.
 */
function setupLogoutHandlers() {
  const logoutLinks = document.querySelectorAll(".logout-link");

  logoutLinks.forEach((link) => {
    link.addEventListener("click", async function (event) {
      event.preventDefault();

      // Show user feedback on the clicked link
      link.textContent = "Logging out...";

      try {
        if (
          window.supabaseClient &&
          window.isSupabaseConfigured &&
          window.isSupabaseConfigured()
        ) {
          // Sign out using the official Supabase method
          // This clears the stored JWT tokens from browser storage
          await window.supabaseClient.auth.signOut();
        }
      } catch (error) {
        console.error("Error signing out:", error);
      } finally {
        // Redirect back to login page
        window.location.replace("index.html");
      }
    });
  });
}

/**
 * Main authentication check: runs when the protected page is accessed.
 */
async function protectPage() {
  // If Supabase credentials haven't been entered yet, alert the developer and show page
  if (!window.isSupabaseConfigured || !window.isSupabaseConfigured()) {
    console.warn(
      "⚠️ Supabase is not configured yet. Protected page guard is paused for preview. Please add your credentials in supabase-config.js."
    );
    revealPageContent();
    setupLogoutHandlers();
    return;
  }

  try {
    // Retrieve current session from Supabase client
    const {
      data: { session },
      error
    } = await window.supabaseClient.auth.getSession();

    if (error || !session) {
      console.log("Unauthenticated access to protected page. Redirecting to login...");
      window.location.replace("index.html");
      return;
    }

    // Student is authenticated!
    // 1. Reveal page content
    revealPageContent();

    // 2. Populate their user details
    populateStudentDetails(session.user);

    // 3. Attach logout handlers
    setupLogoutHandlers();

    // 4. Listen for any session termination (e.g. logout in another tab or token invalidation)
    window.supabaseClient.auth.onAuthStateChange((event, newSession) => {
      if (event === "SIGNED_OUT" || !newSession) {
        window.location.replace("index.html");
      }
    });
  } catch (err) {
    console.error("Authentication verification error:", err);
    window.location.replace("index.html");
  }
}

// Execute protection check as early as possible
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", protectPage);
} else {
  protectPage();
}
