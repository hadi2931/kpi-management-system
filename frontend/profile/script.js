
let user = {
    name: "Test",
    email: "test@google.com",
    role: "user",
    password: "test123"
  };
  
  //Display user profile on load
  //window.onload = function () {
    //if (user) {
      //document.getElementById("displayName").innerText = user.name;
      //document.getElementById("displayEmail").innerText = user.email;
      //document.getElementById("displayRole").innerText = user.role;
    //}
  //};
  
  function displayUser() {
    document.getElementById("displayName").textContent = user.name;
    document.getElementById("displayEmail").textContent = user.email;
    document.getElementById("displayRole").textContent = user.role;
  }

  //Show update details form
  function showUpdateForm() {
    document.getElementById("updateForm").style.display = "block";
    document.getElementById("passwordForm").style.display = "none";
  }
  
  //Show password update form
  function showPasswordForm() {
    document.getElementById("passwordForm").style.display = "block";
    document.getElementById("updateForm").style.display = "none";
  }
  
  //Save updated user details
  function updateDetails() {
    const name = document.getElementById("newName").value;
    const email = document.getElementById("newEmail").value;
  
    if (name) user.name = name;
    if (email) user.email = email;

    displayUser();
    showMessage("Details updated successfully.");
    document.getElementById("updateForm").style.display = "none";
  }
  
  //Save new password
  function updatePassword() {
    const newPass = document.getElementById("newPassword").value;
    if (newPass.length < 6) {
      showMessage("Password must be at least 6 characters.", false);
      return;
    }
    user.password = newPass;
    showMessage("Password updated successfully.");
    document.getElementById("passwordForm").style.display = "none";
  }
  
  //Delete user account
  function deleteAccount() {
    user = null;
    document.getElementById("profileInfo").innerHTML = "<p>User account has been deleted.</p>";
    document.querySelector(".btn-group").style.display = "none";
    document.getElementById("updateForm").style.display = "none";
    document.getElementById("passwordForm").style.display = "none";
    showMessage("Account deleted successfully.", false);
  }
  
  //Show message
  function showMessage(text, success = true) {
    const msg = document.getElementById("messageBox");
    msg.style.display = "block";
    msg.style.backgroundColor = success ? "#d4edda" : "#f8d7da";
    msg.style.color = success ? "#155724" : "#721c24";
    msg.innerText = text;
  }

  window.onload = displayUser;
  