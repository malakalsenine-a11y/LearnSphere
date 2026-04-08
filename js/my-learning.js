const myCoursesContainer = document.getElementById("myCoursesContainer");
const countBadge = document.getElementById("count");
const toggleBtn = document.getElementById("toggle_btn");

// ===== Load enrolled courses =====
let enrolledCourses = JSON.parse(localStorage.getItem("enrolled")) || [];

displayMyCourses();
updateNavbarCount();
applySavedTheme();

// ===== Display Enrolled Courses =====
function displayMyCourses() {
  myCoursesContainer.innerHTML = "";

  if (enrolledCourses.length === 0) {
    myCoursesContainer.innerHTML = `
      <div class="col-12 text-center">
        <div class="alert alert-info">
          You haven't enrolled in any courses yet.
        </div>
      </div>
    `;
    return;
  }

  enrolledCourses.forEach((course) => {
    const score = localStorage.getItem(`quizScore_${course.id}`);
    const stars = "★".repeat(Math.floor(course.rating)) + "☆".repeat(5 - Math.floor(course.rating));

    myCoursesContainer.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold">${course.title}</h5>
            <p><strong>Instructor:</strong> ${course.instructor}</p>
            <p><strong>Category:</strong> ${course.category}</p>
            <p><strong>Level:</strong> ${course.level}</p>
            <p class="text-warning fw-semibold">${stars} (${course.rating})</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Students:</strong> ${course.studentsCount}</p>
            <p class="fw-bold text-primary">$${course.price}</p>

            <p class="mt-2">
              <strong>Quiz Score:</strong> 
              ${score !== null ? `<span class="text-success">${score}</span>` : `<span class="text-muted">Not attempted yet</span>`}
            </p>

            <div class="mt-auto d-grid gap-2">
              <a href="course-details.html?id=${course.id}" class="btn btn-outline-primary">
                Continue Learning
              </a>

              <button class="btn btn-danger remove-btn" data-id="${course.id}">
                Remove Course
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  addRemoveEvents();
}

// ===== Remove Course =====
function addRemoveEvents() {
  const removeButtons = document.querySelectorAll(".remove-btn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const courseId = parseInt(this.dataset.id);

      enrolledCourses = enrolledCourses.filter((course) => course.id !== courseId);
      localStorage.setItem("enrolled", JSON.stringify(enrolledCourses));

      displayMyCourses();
      updateNavbarCount();
    });
  });
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