export function localStorageHandler() {
  // This is handling local storage opt-out, checking for a local storage items that
  // are created by the site and erasing them after users click the text on the privacy page
  // indicating they want to opt out of local storage
  document.addEventListener("DOMContentLoaded", function () {
    function storageWipe(event: Event) {
      // Prevent the anchor from navigating and refreshing the page
      event.preventDefault?.();

      if (localStorage.getItem("theme") || localStorage.getItem("clickHist")) {
        localStorage.removeItem("theme");
        localStorage.removeItem("clickHist");
        // Display a popup that history was cleared.
        alert("Local storage history cleared.");
      } else {
        alert("No theme or click history data in Local Storage.");
      }
    }

    if (document && document.querySelector("#lsWipe")) {
			document.querySelector("#lsWipe")?.addEventListener("click", storageWipe, false);
    }
  });
}
