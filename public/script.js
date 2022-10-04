const exerciseForm = document.getElementById("exerciseForm");

exerciseForm.addEventListener("submit", () => {
   const userID = document.getElementById("userID").value;
   console.log(userID);
   exerciseForm.action = `/api/users/${userID}/exercises`;

   exerciseForm.submit();
});