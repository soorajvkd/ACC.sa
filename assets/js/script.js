document.addEventListener("DOMContentLoaded", function () {
  const menuCheckbox = document.querySelector("#menu");
  const mobileHeader = document.querySelector(".mobile-header");
  const mobileMenuLinks = document.querySelectorAll(".mobile-header .lists a");
  const allMenuLinks = document.querySelectorAll(".lists a"); // All header menu links
  const dropdownToggles = document.querySelectorAll(".dropdown-here > a"); // Links that toggle dropdowns

  // Function to toggle the "active" class based on checkbox state
  function toggleMenu() {
    if (menuCheckbox.checked) {
      mobileHeader.classList.add("active");
    } else {
      mobileHeader.classList.remove("active");
    }
  }

  // Event listener for checkbox toggle
  menuCheckbox.addEventListener("change", toggleMenu);

  // Function to uncheck the checkbox and remove the "active" class on resize
  function handleResize() {
    if (window.innerWidth > 880) {
      menuCheckbox.checked = false;
      mobileHeader.classList.remove("active");
    }
  }

  // Event listener for window resize
  window.addEventListener("resize", handleResize);

  // Event listener for closing the mobile menu when any link is clicked
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Check if the clicked link is not part of a dropdown
      const isDropdownLink = Array.from(dropdownToggles).some(
        (toggle) => toggle === e.target || toggle.contains(e.target)
      );

      // If not part of a dropdown, close the mobile menu
      if (!isDropdownLink) {
        menuCheckbox.checked = false;
        mobileHeader.classList.remove("active");
      }
    });
  });

  // Initial check on page load
  handleResize();
});
$(document).ready(function () {
  // Function to start animation when section is in view
  function startCounterAnimation(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        $("#start .counter:not(.animated)").each(function () {
          var $this = $(this),
            countTo = $this.attr("data-count");

          $({ countNum: $this.text() }).animate(
            {
              countNum: countTo,
            },
            {
              duration: 3000,
              easing: "linear",
              step: function () {
                $this.text(Math.floor(this.countNum));
              },
              complete: function () {
                $this.text(this.countNum);
                //alert('finished');
              },
            }
          );
          $this.addClass("animated"); // Mark the counter as animated to avoid repetition  animate?
        });

        // Unobserve the target once animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }

  // Create an intersection observer
  const observer = new IntersectionObserver(startCounterAnimation, {
    threshold: 0.5,
  });

  // Observe the counting section
  observer.observe(document.querySelector("#start"));
});

// toggle products and language

document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dropdown-here");

  dropdowns.forEach((dropdown) => {
    const dropdownContainer = dropdown.querySelector(
      ".dropdown-container, .language-dropdown-container"
    );

    // Hover for desktop
    dropdown.addEventListener("mouseenter", () => {
      dropdownContainer.style.display = "block";
    });

    dropdown.addEventListener("mouseleave", () => {
      dropdownContainer.style.display = "none";
    });

    // Click for mobile
    dropdown
      .querySelector("a, .language-button")
      .addEventListener("click", (e) => {
        e.preventDefault();
        // const isDisplayed = dropdownContainer.style.display === "block";
        // dropdownContainer.style.display = isDisplayed ? "none" : "block";
        dropdownContainer.classList.toggle("show");
      });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    dropdowns.forEach((dropdown) => {
      const dropdownContainer = dropdown.querySelector(
        ".dropdown-container, .language-dropdown-container"
      );
      if (!dropdown.contains(e.target)) {
        dropdownContainer.style.display = "none";
      }
    });
  });
});

// for email modal and submission
// Get elements
const downloadBtn = document.getElementById("downloadBtn");
const modal = document.getElementById("emailModal");
const closeBtn = document.querySelector(".close");
const emailForm = document.getElementById("emailForm");

// Show the modal when "Download Brochure" button is clicked
downloadBtn.onclick = function () {
  modal.style.display = "block";
};

// Close the modal when "x" is clicked
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// Close modal if clicked outside of modal content
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Handle email form submission
emailForm.onsubmit = function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;

  // Send email to backend (simulated here)
  console.log("Email submitted:", email);

  // Here, you'd typically make an AJAX request to send the email to the server
  // For example:
  // fetch('/send-brochure', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ email: email }),
  // }).then(response => response.json())
  // .then(data => {
  //   console.log('Success:', data);
  // }).catch((error) => {
  //   console.error('Error:', error);
  // });

  alert("The brochure has been sent to your email!");

  // Close the modal after submission
  modal.style.display = "none";
};
