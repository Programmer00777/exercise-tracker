const exerciseForm = document.getElementById("exercise-form");

exerciseForm.addEventListener("submit", () => {
   const userID = document.getElementById("userID").value;
   exerciseForm.action = `/api/users/${userID}/exercises`;

   exerciseForm.submit();
});