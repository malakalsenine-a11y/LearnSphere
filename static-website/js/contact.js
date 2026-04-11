const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const messageError = document.getElementById("messageError");

const successMessage = document.getElementById("successMessage");
const countBadge = document.getElementById("count");
const toggleBtn = document.getElementById("toggle_btn");

// ===== Update Badge + Theme =====
updateNavbarCount();
applySavedTheme();

// ===== Contact Form Validation =====
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  clearErrors();

  let isValid = true;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput.value.trim();
  const message = messageInput.value.trim();

  // Name
  if (name === "") {
    nameError.textContent = "Full name is required.";
    isValid = false;
  }

  // Email
  if (email === "") {
    emailError.textContent = "Email is required.";
    isValid = false;
  } else if (!isValidEmail(email)) {
    emailError.textContent = "Please enter a valid email.";
    isValid = false;
  }

  // Subject
  if (subject === "") {
    subjectError.textContent = "Subject is required.";
    isValid = false;
  }

  // Message
  if (message === "") {
    messageError.textContent = "Message is required.";
    isValid = false;
  }

  if (isValid) {
    const newMessage = {
      name,
      email,
      subject,
      message,
      date: new Date().toLocaleString()
    };

  let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
messages.push(newMessage);
localStorage.setItem("contactMessages", JSON.stringify(messages));

successMessage.classList.remove("d-none");
contactForm.reset();

setTimeout(() => {
  successMessage.classList.add("d-none");
}, 3000);

} else {
  successMessage.classList.add("d-none");
}
});
// ===== Helpers =====
function clearErrors() {
  nameError.textContent = "";
  emailError.textContent = "";
  subjectError.textContent = "";
  messageError.textContent = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== Navbar Badge =====
function updateNavbarCount() {
  const enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];
  countBadge.textContent = enrolled.length;
}

// ===== Dark Mode =====
function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggleBtn.checked = true;
  } else {
    document.body.classList.remove("dark");
    toggleBtn.checked = false;
  }
}

toggleBtn.addEventListener("change", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});