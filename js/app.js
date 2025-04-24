document.addEventListener('DOMContentLoaded', function () {

    // Task 1: Find all of the sections
    // Select all elements with the tag 'section' and store them in a NodeList (which is array-like)
    const sections = document.querySelectorAll('section');


    // Task 2: Build the navigation bar
    // Find the empty ul element where the navigation links will be added
    const navList = document.getElementById('navbar__list');

    // Iterate through each section found
    sections.forEach(section => {
        // Get the id and the data-nav attribute from the current section
        const sectionId = section.id;
        const sectionNav = section.dataset.nav; // .dataset gives access to data attributes

        // Create a new list item (<li>)
        const listItem = document.createElement('li');

        // Create a new anchor tag (<a>)
        const anchor = document.createElement('a');
        // Set the href attribute to link to the section's id
        anchor.href = `#${sectionId}`;
        // Set the text content of the anchor to the value of the data-nav attribute
        anchor.textContent = sectionNav;
        // Add the 'menu__link' class for styling (based on your CSS)
        anchor.classList.add('menu__link');
        // Add a class for future use if needed, like 'nav-link'
        anchor.classList.add('nav-link');


        // Append the anchor tag to the list item
        listItem.appendChild(anchor);

        // Append the list item to the navigation list (the ul element)
        navList.appendChild(listItem);
    });
    // step 3: Add Smooth Scrolling

    // Task 1: Add an event listener to the nav bar items
    // select all the a tags that were just created in the navlist
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            // Task 2: Override any default behavior
            // Prevent the default jump to the anchor link target
            event.preventDefault();

            // Task 3: Add a smooth scrolling method to your listener function
            // Get the href attribute from the clicked link (e.g., '#section1')
            const href = this.getAttribute('href');
            // Extract the section ID by removing the '#' character
            const targetId = href.substring(1);

            // Find the corresponding section element using its ID
            const targetSection = document.getElementById(targetId);

            // Use scrollIntoView() with the 'smooth' behavior option
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth' // Enable smooth scrolling
                });
            }
        });
    });

    // Step 4: Add an Active State

    // Task 1 & 2 combined: Function to determine if a section is in the "active" window
    // A section is considered active if its top is within the upper half of the viewport
    // and its bottom is still visible.
    function isSectionInView(section) {
        const viewportHeight = window.innerHeight;
        const rect = section.getBoundingClientRect();
        const rectTop = rect.top;
        const rectBottom = rect.bottom;

        // Check if the top of the section is above the middle of the viewport
        // AND the bottom of the section is below the very top of the viewport.
        // This means the section is visible and its top edge is in the upper half of the screen.
        return rectTop < viewportHeight / 2 && rectBottom > 0;
    }

    // Task 3 & 4 combined: Write a function to add/remove a class and create an event listener
    function setActiveSection() {
        sections.forEach(section => {
            // Get the corresponding navigation link for this section
            const sectionId = section.id;
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (isSectionInView(section)) {
                // Add 'active' class to the section if it's in view
                section.classList.add('active');
                // Optional: Add an active class to the corresponding nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active-nav'); // You might need to add CSS for '.active-nav'
                }
            } else {
                // Remove 'active' class from the section if it's not in view
                section.classList.remove('active');
                // Optional: Remove active class from the corresponding nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.remove('active-nav');
                }
            }
        });
    }

    // Create an event listener to run the function when the user scrolls the page
    window.addEventListener('scroll', setActiveSection);

    // Optional: Run the function once on page load to set the initial active section
    setActiveSection();

    // Step 5: Add comment section
    // Select the main element to append new sections
    const mainElement = document.querySelector('main');

    // --- Step 5: Add a Comment Form ---
    // Task 1: Create a Comments section on the page dynamically
    const commentSection = document.createElement('section');
    commentSection.id = 'section-comments'; // Unique ID for the comments section
    commentSection.dataset.nav = 'Comments'; // Navigation text

    const commentContainer = document.createElement('div');
    commentContainer.classList.add('landing__container'); // Use existing container style

    const commentHeading = document.createElement('h2');
    commentHeading.textContent = 'Leave a Comment';

    // Task 2: Add a comment form
    const commentForm = document.createElement('form');
    commentForm.id = 'comment-form'; // ID for the form
    commentForm.classList.add('comment-form'); // Class for styling

    // Name Input
    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.textContent = 'Name:';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'name';
    nameInput.name = 'name';
    nameInput.required = true; // Make name required

    // Email Input
    const emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email');
    emailLabel.textContent = 'Email:';
    const emailInput = document.createElement('input');
    emailInput.type = 'email'; // Use email type for basic validation
    emailInput.id = 'email';
    emailInput.name = 'email';
    emailInput.required = true; // Make email required

    // Comment Input (Textarea)
    const commentLabel = document.createElement('label');
    commentLabel.setAttribute('for', 'comment');
    commentLabel.textContent = 'Comment:';
    const commentTextarea = document.createElement('textarea');
    commentTextarea.id = 'comment';
    commentTextarea.name = 'comment';
    commentTextarea.rows = 4;
    commentTextarea.required = true; // Make comment required

    // Submit Button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Post Comment';

    // Error Message Area
    const errorMessage = document.createElement('p');
    errorMessage.id = 'error-message';
    errorMessage.classList.add('error-message'); // Class for styling
    errorMessage.style.color = 'red'; // Basic inline style, can be moved to CSS
    errorMessage.style.display = 'none'; // Hide initially

    // Comments Display Area
    const commentsDisplay = document.createElement('div');
    commentsDisplay.id = 'comments-display';
    commentsDisplay.classList.add('comments-display'); // Class for styling

    const commentsHeading = document.createElement('h3');
    commentsHeading.textContent = 'Comments:';
    commentsDisplay.appendChild(commentsHeading);


    // Append form elements to the form
    commentForm.appendChild(nameLabel);
    commentForm.appendChild(nameInput);
    commentForm.appendChild(emailLabel);
    commentForm.appendChild(emailInput);
    commentForm.appendChild(commentLabel);
    commentForm.appendChild(commentTextarea);
    commentForm.appendChild(submitButton);
    commentForm.appendChild(errorMessage); // Add error message area to form

    // Append heading, form, and comments display to the container
    commentContainer.appendChild(commentHeading);
    commentContainer.appendChild(commentForm);
    commentContainer.appendChild(commentsDisplay);

    // Append the container to the section
    commentSection.appendChild(commentContainer);

    // Append the new comments section to the main element
    mainElement.appendChild(commentSection);

    // 3: Use JavaScript to append the comments to the page ---

    // Add event listener for form submission
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get input values
        const name = nameInput.value.trim(); // Use trim() to remove leading/trailing whitespace
        const email = emailInput.value.trim();
        const comment = commentTextarea.value.trim();

        // Basic Validation
        if (name === '' || email === '' || comment === '') {
            errorMessage.textContent = 'Please fill in all fields.';
            errorMessage.style.display = 'block'; // Show error message
            return; // Stop the function
        }

        // Simple email format validation (checks for '@')
        if (!email.includes('@')) {
             errorMessage.textContent = 'Please enter a valid email address.';
             errorMessage.style.display = 'block';
             return;
        }


        // If validation passes, clear error message
        errorMessage.style.display = 'none';
        errorMessage.textContent = ''; // Clear error text

        // Create a new element to display the comment
        const newComment = document.createElement('div');
        newComment.classList.add('comment'); // Class for styling individual comments

        const commentAuthor = document.createElement('p');
        commentAuthor.classList.add('comment-author');
        commentAuthor.textContent = `Name: ${name}`; // Display name

        const commentEmail = document.createElement('p'); // Create paragraph for email
        commentEmail.classList.add('comment-email'); // Add class for styling (optional)
        commentEmail.textContent = `Email: ${email}`; // Display email

        const commentText = document.createElement('p');
        commentText.classList.add('comment-text');
        commentText.textContent = `Comment: ${comment}`; // Display comment text

        // Append the author, email, and text elements to the new comment div
        newComment.appendChild(commentAuthor);
        newComment.appendChild(commentEmail); // Append the email element
        newComment.appendChild(commentText);


        // Append the new comment div (now containing author, email, and text) to the comments display area
        commentsDisplay.appendChild(newComment); // This line appends the comment

        // Clear the form input fields
        commentForm.reset(); // A convenient method to reset the form

        // Optional: Scroll to the comments section after submitting a comment
        commentSection.scrollIntoView({ behavior: 'smooth' });
    });
});
