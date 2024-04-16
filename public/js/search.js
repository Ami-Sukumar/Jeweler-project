function searchRedirect(event) {
  event.preventDefault(); // Prevent form submission

  console.log("running")

 const userInput = document.getElementById("searchInput").value.toLowerCase();
 fetch('/search', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({ userInput })
 })
 .then(response => {
   if (response.redirected) {
     window.location.href = response.url;
   }
 })
 .catch(error => {
   console.error('Error redirecting:', error);
 });
 return false; // Prevent form submission
}