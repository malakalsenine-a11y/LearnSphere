const myCoursesContainer = document.getElementById("myCoursesContainer");
const statsContainer = document.getElementById("statsContainer");
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
  statsContainer.innerHTML = "";

  if (enrolledCourses.length === 0) {
    myCoursesContainer.innerHTML = `
      <div class="col-12 text-center">
        <div class="alert alert-info">
          <p class="mb-3">You haven't enrolled in any courses yet.</p>
          <a href="courses.html" class="btn btn-primary">Browse Courses</a>
        </div>
      </div>
    `;
    return;
  }

  displayStats();

  enrolledCourses.forEach((course) => {
    const score = localStorage.getItem(`quizScore_${course.id}`);
    const numericScore = score !== null ? parseInt(score) : 0;
    const progress = (numericScore / 5) * 100;

    let progressClass = "bg-danger";
    if (progress >= 80) {
      progressClass = "bg-success";
    } else if (progress >= 40) {
      progressClass = "bg-warning";
    }

const stars = generateStars(course.rating);

    myCoursesContainer.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold">${course.title}</h5>
            <p><strong>Instructor:</strong> ${course.instructor}</p>
            <p><strong>Category:</strong> ${course.category}</p>
            <p><strong>Level:</strong> ${course.level}</p>
            <p class="text-warning fw-semibold stars">${stars} (${course.rating})</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Students:</strong> ${course.studentsCount}</p>
            <p class="fw-bold text-primary">$${course.price}</p>

            <p class="mt-2 mb-1">
              <strong>Quiz Score:</strong> 
              ${score !== null ? `<span class="text-success">${score}/5</span>` : `<span class="text-muted">Not attempted yet</span>`}
            </p>

            <p class="mb-1"><strong>Progress:</strong> ${progress}%</p>
            <div class="progress mb-3" style="height: 10px;">
              <div class="progress-bar ${progressClass}" role="progressbar" style="width: ${progress}%"></div>
            </div>

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

// ===== Display Summary Stats =====
function displayStats() {
  const totalEnrolled = enrolledCourses.length;

  let completedCourses = 0;
  let totalScore = 0;
  let attemptedCount = 0;

  enrolledCourses.forEach((course) => {
    const score = localStorage.getItem(`quizScore_${course.id}`);

    if (score !== null) {
      const numericScore = parseInt(score);
      totalScore += numericScore;
      attemptedCount++;

      if (numericScore === 5) {
        completedCourses++;
      }
    }
  });

  const averageScore = attemptedCount > 0 ? (totalScore / attemptedCount).toFixed(1) : 0;

  statsContainer.innerHTML = `
    <div class="col-md-4">
      <div class="card text-center shadow-sm border-0 p-4">
        <h5 class="fw-bold">Total Enrolled</h5>
        <p class="display-6 text-primary mb-0">${totalEnrolled}</p>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card text-center shadow-sm border-0 p-4">
        <h5 class="fw-bold">Completed Courses</h5>
        <p class="display-6 text-success mb-0">${completedCourses}</p>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card text-center shadow-sm border-0 p-4">
        <h5 class="fw-bold">Average Quiz Score</h5>
        <p class="display-6 text-warning mb-0">${averageScore}/5</p>
      </div>
    </div>
  `;
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