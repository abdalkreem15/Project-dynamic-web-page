// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {

    // --- DOM Elements ---
    // Select the main element to append new sections
    const mainElement = document.querySelector('main');
    // Find the empty ul element where the navigation links will be added
    const navList = document.getElementById('navbar__list');


    // --- Dynamic Comments Section Creation ---
    // Create the comments section dynamically
    const commentSection = document.createElement('section');
    commentSection.id = 'section-comments'; // Unique ID for the comments section
    // Match the data-nav attribute to the actual section heading text for navigation
    commentSection.dataset.nav = 'Leave a Comment'; // Navigation text

    const commentContainer = document.createElement('div');
    commentContainer.classList.add('landing__container'); // Use existing container style

    const commentHeading = document.createElement('h2');
    commentHeading.textContent = 'Leave a Comment'; // This is the section heading

    // Create the comment form elements
    const commentForm = document.createElement('form');
    commentForm.id = 'comment-form'; // ID for the form
    commentForm.classList.add('comment-form'); // Class for styling

    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.textContent = 'Name:';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'name';
    nameInput.name = 'name';
    nameInput.required = true; // Make name required

    const emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email');
    emailLabel.textContent = 'Email:';
    const emailInput = document.createElement('input');
    emailInput.type = 'email'; // Use email type for basic validation
    emailInput.id = 'email';
    emailInput.name = 'email';
    emailInput.required = true; // Make email required

    const commentLabel = document.createElement('label');
    commentLabel.setAttribute('for', 'comment');
    commentLabel.textContent = 'Comment:';
    const commentTextarea = document.createElement('textarea');
    commentTextarea.id = 'comment';
    commentTextarea.name = 'comment';
    commentTextarea.rows = 4;
    commentTextarea.required = true; // Make comment required

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Post Comment';

    // Error Message Area for form validation
    const errorMessage = document.createElement('p');
    errorMessage.id = 'error-message';
    errorMessage.classList.add('error-message'); // Class for styling and hiding/showing


    // Comments Display Area
    const commentsDisplay = document.createElement('div');
    commentsDisplay.id = 'comments-display';
    commentsDisplay.classList.add('comments-display'); // Class for styling

    const commentsHeading = document.createElement('h3');
    commentsHeading.textContent = 'Comments:';
    commentsDisplay.appendChild(commentsHeading);


    // Assemble the comment form
    commentForm.appendChild(nameLabel);
    commentForm.appendChild(nameInput);
    commentForm.appendChild(emailLabel);
    commentForm.appendChild(emailInput);
    commentForm.appendChild(commentLabel);
    commentForm.appendChild(commentTextarea);
    commentForm.appendChild(submitButton);
    commentForm.appendChild(errorMessage); // Add error message area to form

    // Assemble the comments section
    commentContainer.appendChild(commentHeading);
    commentContainer.appendChild(commentForm);
    commentContainer.appendChild(commentsDisplay);
    commentSection.appendChild(commentContainer);

    // Append the new comments section to the main element
    mainElement.appendChild(commentSection);


    // --- Navigation Bar Building ---
    // Select ALL sections, including the dynamically added comment section
    const sections = document.querySelectorAll('section');

    // Clear existing nav items before rebuilding (important if script runs multiple times)
    navList.innerHTML = '';

    // Iterate through each section and build the navigation links
    sections.forEach(section => {
        const sectionId = section.id;
        const sectionNav = section.dataset.nav; // Get text from data-nav attribute
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = `#${sectionId}`; // Link to the section ID
        anchor.textContent = sectionNav; // Set link text (matches data-nav)
        anchor.classList.add('menu__link'); // Add existing menu link style
        anchor.classList.add('nav-link'); // Add a class for easier selection later
        listItem.appendChild(anchor);
        navList.appendChild(listItem); // Append list item to the navigation list
    });


    // --- Smooth Scrolling ---
    // Select all the navigation anchor links that were just created
    const navLinks = document.querySelectorAll('.nav-link');

    // Add a click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default jump to the anchor link target

            // Get the target section's ID from the link's href attribute
            const href = this.getAttribute('href');
            const targetId = href.substring(1); // Remove the '#' character

            // Find the corresponding section element by its ID
            const targetSection = document.getElementById(targetId);

            // If the target section exists, scroll to it smoothly
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth' // Enable smooth scrolling animation
                });
            }
        });
    });


    // --- Active State ---

    // Function to determine if a section is currently in the viewport
    // A section is considered active if its top edge is within the upper half of the viewport
    // AND its bottom edge is still visible (below the very top of the viewport).
    function isSectionInView(section) {
        const viewportHeight = window.innerHeight;
        const rect = section.getBoundingClientRect();
        const rectTop = rect.top;
        const rectBottom = rect.bottom;

        // Check if the top of the section is above the middle of the viewport
        // AND the bottom of the section is below the very top of the viewport.
        return rectTop < viewportHeight / 2 && rectBottom > 0;
    }

    // Function to add/remove the 'active' class based on section visibility
    // Also updates the active state of the corresponding navigation link.
    function setActiveSection() {
        // Re-select sections in case the DOM structure changes after initial load
        const currentSections = document.querySelectorAll('section');
        const allNavLinks = document.querySelectorAll('.nav-link'); // Re-select nav links

        currentSections.forEach(section => {
            const sectionId = section.id;
            // Find the corresponding navigation link for this section
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (isSectionInView(section)) {
                // Add 'active' class to the section if it's in view
                section.classList.add('active');
                // Add 'active-nav' class to the corresponding nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active-nav');
                }
            } else {
                // Remove 'active' class from the section if it's not in view
                section.classList.remove('active');
                // Remove 'active-nav' class from the corresponding nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.remove('active-nav');
                }
            }
        });

        // Optional: Ensure only one nav link is active at a time
        // This loop can help ensure only the truly active section's link is highlighted.
        allNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            // Check if the linked section is currently in view
            if (targetSection && isSectionInView(targetSection)) {
                link.classList.add('active-nav');
            } else {
                link.classList.remove('active-nav');
            }
        });
    }

    // Create an event listener to run the function when the user scrolls the page
    window.addEventListener('scroll', setActiveSection);

    // Run the function once on page load to set the initial active section
    setActiveSection();


    // --- Comment Form Logic ---

    // Add event listener for form submission
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission (page reload)

        // Get input values and trim whitespace
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const comment = commentTextarea.value.trim();

        // Basic Validation: Check if fields are empty
        if (name === '' || email === '' || comment === '') {
            errorMessage.textContent = 'Please fill in all fields.';
            // Use class to show error message (style defined in CSS)
            errorMessage.classList.add('show-error');
            return; // Stop the function if validation fails
        }

        // Simple Email Format Validation: Check if email includes '@'
        if (!email.includes('@')) {
            errorMessage.textContent = 'Please enter a valid email address.';
            // Use class to show error message (style defined in CSS)
            errorMessage.classList.add('show-error');
            return; // Stop the function if validation fails
        }

        // If validation passes, clear error message
        // Use class to hide error message
        errorMessage.classList.remove('show-error');
        errorMessage.textContent = ''; // Clear error text

        // Create a new element to display the comment
        const newComment = document.createElement('div');
        newComment.classList.add('comment'); // Add class for styling individual comments

        // Create elements for author, email, and comment text
        const commentAuthor = document.createElement('p');
        commentAuthor.classList.add('comment-author');
        commentAuthor.textContent = `Name: ${name}`; // Display name

        const commentEmail = document.createElement('p');
        commentEmail.classList.add('comment-email'); // Add class for styling (optional)
        commentEmail.textContent = `Email: ${email}`; // Display email

        const commentText = document.createElement('p');
        commentText.classList.add('comment-text');
        commentText.textContent = `Comment: ${comment}`; // Display comment text

        // Append the author, email, and text elements to the new comment div
        newComment.appendChild(commentAuthor);
        newComment.appendChild(commentEmail);
        newComment.appendChild(commentText);

        // Append the new comment div to the comments display area
        commentsDisplay.appendChild(newComment);

        // Clear the form input fields using the form.reset() method
        commentForm.reset();

        // Optional: Scroll to the comments section after submitting a comment
        commentSection.scrollIntoView({ behavior: 'smooth' });
    });
});
