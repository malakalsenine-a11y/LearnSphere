const courseDetails = document.getElementById("courseDetails");
const quizForm = document.getElementById("quizForm");
const submitQuizBtn = document.getElementById("submitQuiz");
const quizResult = document.getElementById("quizResult");
const countBadge = document.getElementById("count");
const toggleBtn = document.getElementById("toggle_btn");

// ===== Get Course ID from URL =====
const params = new URLSearchParams(window.location.search);
const courseId = parseInt(params.get("id"));

let currentCourse = null;

// ===== Fetch Data =====
fetch("./data/data.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Could not load course data");
    }
    return res.json();
  })
  .then((data) => {
    const course = data.courses.find((c) => c.id === courseId);

    if (!course) {
      courseDetails.innerHTML = `
        <div class="alert alert-danger text-center">
          Course not found.
        </div>
      `;
      return;
    }

    currentCourse = course;
    displayCourseDetails(course);
    displayQuiz(course.quiz);
    updateNavbarCount();
    applySavedTheme();
  })
  .catch((error) => {
    console.error("Error loading course details:", error);
    courseDetails.innerHTML = `
      <div class="alert alert-danger text-center">
        Error loading course details.
      </div>
    `;
  });

// ===== Display Course Details =====
function displayCourseDetails(course) {
const stars = generateStars(course.rating);

  courseDetails.innerHTML = `
    <div class="card shadow-sm border-0 p-4">
      <h2 class="fw-bold mb-3">${course.title}</h2>
      <p><strong>Instructor:</strong> ${course.instructor}</p>
      <p><strong>Category:</strong> ${course.category}</p>
      <p><strong>Level:</strong> ${course.level}</p>
      <p><strong>Rating:</strong> <span class="text-warning stars">${stars} (${course.rating})</span></p>
      <p><strong>Duration:</strong> ${course.duration}</p>
      <p><strong>Students:</strong> ${course.studentsCount}</p>
      <p><strong>Price:</strong> <span class="text-primary fw-bold">$${course.price}</span></p>

      <hr />

      <h4 class="fw-bold mb-3">Topics Covered</h4>
      <ul class="list-group">
        ${course.topics.map(topic => `<li class="list-group-item">${topic}</li>`).join("")}
      </ul>
    </div>
  `;
}

// ===== Display Quiz =====
function displayQuiz(quiz) {
  if (!quiz || quiz.length === 0) {
    quizForm.innerHTML = `<p class="text-muted">No quiz available for this course.</p>`;
    submitQuizBtn.style.display = "none";
    return;
  }

  quizForm.innerHTML = "";

  quiz.forEach((q, index) => {
    quizForm.innerHTML += `
      <div class="mb-4">
        <h5>${index + 1}. ${q.question}</h5>
        ${q.options.map(option => `
          <div class="form-check">
            <input class="form-check-input" type="radio" name="question${index}" value="${option}">
            <label class="form-check-label">${option}</label>
          </div>
        `).join("")}
      </div>
    `;
  });
}

function generateStars(rating) {
  let starsHTML = "";
  const fullStars = Math.floor(rating);

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      starsHTML += `<i class="fa-solid fa-star"></i>`;
    } else {
      starsHTML += `<i class="fa-regular fa-star"></i>`;
    }
  }

  return starsHTML;
}

// ===== Quiz Result =====
submitQuizBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (!currentCourse) return;

  let score = 0;

  currentCourse.quiz.forEach((q, index) => {
    const selected = document.querySelector(`input[name="question${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  quizResult.innerHTML = `
    You scored <span class="text-success">${score}</span> out of 
    <span class="text-primary">${currentCourse.quiz.length}</span>
  `;

  // Save score in localStorage
  localStorage.setItem(`quizScore_${currentCourse.id}`, score);

  submitQuizBtn.disabled = true;
submitQuizBtn.textContent = "Quiz Submitted ✓";

});

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