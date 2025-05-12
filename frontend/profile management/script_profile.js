<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Account Deletion - KPI System</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    {/* Path from frontend/profile management/ to frontend/kpi management/ */}
    <link rel="stylesheet" href="../kpi_management/style_kpi_manager.css">
    {/* Link to its own CSS if needed, e.g., del_profile.css */}
    <link rel="stylesheet" href="del_profile.css">
    <style>
        /* Basic dark theme adjustments if not fully covered by external CSS */
        .del-profile-card .card-header { background-color: #dc3545; color: white; }
        .del-profile-card label { color: #b9bbbe; }
        .form-control { background-color: #2c2f33; color: #dcddde; border-color: #222427;}
        .form-control:focus { background-color: #2c2f33; color: #dcddde; border-color: #0069d9; }
        .form-check-input { /* Ensure checkbox is visible on dark theme */
            filter: invert(1) hue-rotate(180deg); /* A simple way to make default checkbox visible */
        }
        .form-check-input:checked {
            background-color: #007bff; /* Or your primary color */
            border-color: #007bff;
        }
         hr { border-top: 1px solid #2f3136; }
    </style>
</head>
<body>
    <!-- NAVBAR - Paths relative to frontend/profile management/del_profile.html -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4 shadow-sm">
        <div class="container-fluid">
            <a class="navbar-brand font-weight-bold" href="../index.html">KPI Management System</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        {/* Path from frontend/profile management/ to frontend/dashboard summary/ */}
                        <a class="nav-link" href="../dashboard%20summary/dashboard_summary.html"><i class="fas fa-tachometer-alt mr-1"></i>Dashboard</a>
                    </li>
                    <li class="nav-item">
                        {/* Path from frontend/profile management/ to frontend/kpi management/ */}
                        <a class="nav-link" href="../kpi%20management/kpi_manager_view.html"><i class="fas fa-list-alt mr-1"></i>Manage KPIs</a>
                    </li>
                    <li class="nav-item active"> {/* Profile section is active */}
                        <a class="nav-link" href="../profile/profile.html"><i class="fas fa-user-circle mr-1"></i>Profile</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../general/logout.html"><i class="fas fa-sign-out-alt mr-1"></i>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container mt-5 mb-5">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div class="card del-profile-card shadow-sm">
                    <div class="card-header text-center">
                        <h3 class="mb-0">Permanently Delete Account</h3>
                    </div>
                    <div class="card-body p-4">
                        <p class="lead text-warning"><strong>Warning:</strong> This action is irreversible and will permanently delete your account and all associated data.</p>
                        <p>We're sorry to see you go. If you are absolutely sure you want to proceed, please confirm by typing your email address below.</p>
                        
                        <form id="confirmDeleteForm" novalidate>
                            <div class="form-group mt-4">
                                <label for="confirmEmailDelete">Your Email Address (<span id="userEmailForDeleteConfirmation" class="font-italic">your.email@example.com</span>):</label>
                                <input type="email" class="form-control" id="confirmEmailDeleteInput" placeholder="Type your email to confirm" required>
                                <div class="invalid-feedback">Please enter your email to confirm.</div>
                                <div class="invalid-feedback text-danger" id="emailMismatchError" style="display:none;">The entered email does not match your account email.</div>
                            </div>

                            <div class="form-group form-check mt-3">
                                <input type="checkbox" class="form-check-input" id="understandConsequences" required>
                                <label class="form-check-label" for="understandConsequences">I understand that this action is permanent and cannot be undone.</label>
                                 <div class="invalid-feedback">You must acknowledge this to proceed.</div>
                            </div>

                            <hr class="mt-4">
                            <div class="d-flex justify-content-between align-items-center">
                                {/* MODIFIED BUTTON HERE */}
                                <a href="../dashboard%20summary/dashboard_summary.html" class="btn btn-outline-secondary">
                                    <i class="fas fa-arrow-left mr-2"></i>Back to Dashboard
                                </a>
                                <button type="submit" class="btn btn-danger" id="finalDeleteBtn">
                                    <i class="fas fa-trash-alt mr-2"></i>Yes, Delete My Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
         <footer class="text-center text-muted mt-5 py-3">
            <p class="mb-0">© <span id="currentYear"></span> KPI Management System</p>
        </footer>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="script_profile.js"></script>
    <script>
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        // JavaScript in script_profile.js will handle fetching the user's actual email
        // for display and comparison in the form.
        // Example (should be in script_profile.js within DOMContentLoaded):
        // const userActualEmail = localStorage.getItem('userEmail') || 'your.email@example.com';
        // const emailSpan = document.getElementById('userEmailForDeleteConfirmation');
        // if (emailSpan) {
        //    emailSpan.textContent = userActualEmail;
        // }
    </script>
</body>
</html>