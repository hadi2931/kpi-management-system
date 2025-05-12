// script_logout.js

(function() {
    console.log("Logout script started.");

    // --- Perform Logout Actions (Simulation) ---

    // 1. Clear sensitive user-related data from localStorage
    //    In our case, the only potentially shared/sensitive data we simulated storing
    //    was the list of KPIs. If we had stored user info, clear that too.
    try {
        console.log("Attempting to clear simulated session data (sampleKpis)...");
        localStorage.removeItem('sampleKpis');
        // Example: If you stored user info, uncomment below
        // localStorage.removeItem('userInfo');
        // localStorage.removeItem('authToken');
        console.log("Simulated session data cleared from localStorage.");

        // You could also use sessionStorage if you stored data there.
        // sessionStorage.clear();

    } catch (e) {
        console.error("Error clearing local storage during logout:", e);
        // Log the error, but proceed with redirection anyway.
    }

    // 2. Redirect to the login page
    //    (Make sure you have a login.html page)
    const loginPageUrl = 'login.html'; // <<< CHANGE THIS if your login page has a different name/path
    console.log(`Redirecting to ${loginPageUrl}...`);

    // Use replace to prevent the user from hitting the back button and returning to the logout page
    // A short delay allows the "Logging out..." message to be seen briefly.
    setTimeout(() => {
        window.location.replace(loginPageUrl);
    }, 500); // 500ms delay

})(); // Immediately invoke the function