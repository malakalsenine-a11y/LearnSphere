// ===== Get Instructor from URL =====
const params = new URLSearchParams(window.location.search);
const selectedInstructor = params.get("instructor");

let allCourses = [];
let selectedCategory = "All";

const coursesContainer = document.getElementById("coursesContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const levelFilter = document.getElementById("levelFilter");
const countBadge = document.getElementById("count");
const filterButtons = document.querySelectorAll(".filter-btn");

// ===== Fetch Data =====
fetch("./data/data.json")
  .then((res) => res.json())
 .then((data) => {
  allCourses = data.courses;

  // ⭐ فلترة حسب insrtuctor المطلوب من URL
  if (selectedInstructor) {
    allCourses = allCourses.filter(
      (course) => course.instructor === selectedInstructor
    );
  }

  displayCourses(allCourses);
  updateNavbarCount();
  applySavedTheme();
})
  .catch((error) => {
    console.error("Error loading courses:", error);
  });

// ===== Display Courses =====
function displayCourses(data) {
  coursesContainer.innerHTML = "";

  const enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];

  if (data.length === 0) {
    coursesContainer.innerHTML = `
      <div class="col-12 text-center">
        <p class="fs-5 text-muted">No courses found.</p>
      </div>
    `;
    return;
  }

  data.forEach((course) => {
    const isEnrolled = enrolled.some((item) => item.id === course.id);

const stars = generateStars(course.rating);

    const categoryColor = getCategoryColor(course.category);


    let enrollButton = "";

if (!course.available) {
  enrollButton = `
    <button class="btn btn-secondary" disabled>
      Coming Soon
    </button>
  `;
} else if (isEnrolled) {
  enrollButton = `
    <button class="btn btn-warning" disabled>
      Enrolled ✓
    </button>
  `;
} else {
  enrollButton = `
    <button class="btn btn-warning enroll-btn" data-id="${course.id}">
      Enroll
    </button>
  `;
}


    coursesContainer.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm border-0">
          <div class="card-header text-white fw-bold" style="background:${categoryColor}">
            ${course.category}
          </div>

          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold">${course.title}</h5>
            <p class="mb-1"><strong>Instructor:</strong> ${course.instructor}</p>

            <div class="mb-2">
              <span class="badge bg-secondary">${course.level}</span>
            </div>

            <p class="mb-1 text-warning fw-semibold stars">${stars} (${course.rating})</p>
            <p class="mb-1"><i class="fa-regular fa-clock"></i> ${course.duration}</p>
            <p class="mb-1"><i class="fa-solid fa-users"></i> ${course.studentsCount} students</p>
            <p class="fw-bold fs-5 text-primary">$${course.price}</p>

<div class="mt-auto d-grid gap-2">
  ${enrollButton}

  <a href="course-details.html?id=${course.id}" class="btn btn-outline-dark">
    View Details
  </a>
</div>
          </div>
        </div>
      </div>
    `;
  });

  addEnrollEvents();
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


// ===== Search + Filters + Sort =====
function applyFilters() {
  let filtered = [...allCourses];

  const searchValue = searchInput.value.toLowerCase().trim();
  const selectedLevel = levelFilter.value;
  const selectedSort = sortSelect.value;

  // Search
  filtered = filtered.filter((course) =>
    course.title.toLowerCase().includes(searchValue) ||
    course.instructor.toLowerCase().includes(searchValue)
  );

  // Category
  if (selectedCategory !== "All") {
    filtered = filtered.filter((course) => course.category === selectedCategory);
  }

  // Level
  if (selectedLevel !== "All") {
    filtered = filtered.filter((course) => course.level === selectedLevel);
  }

  // Sort
  if (selectedSort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (selectedSort === "priceLow") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "priceHigh") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (selectedSort === "duration") {
    filtered.sort((a, b) => convertDurationToMinutes(a.duration) - convertDurationToMinutes(b.duration));
  }

  displayCourses(filtered);
}

// ===== Duration Converter =====
function convertDurationToMinutes(duration) {
  const match = duration.match(/(\d+)h\s*(\d+)m/);
  if (!match) return 0;

  const hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  return hours * 60 + minutes;
}

// ===== Category Colors =====
function getCategoryColor(category) {
  switch (category) {
    case "Web Development":
      return "#6f42c1";
    case "Data Science":
      return "#0d6efd";
    case "Design":
      return "#d63384";
    case "Cybersecurity":
      return "#dc3545";
    case "Mobile Dev":
      return "#198754";
    case "DevOps":
      return "#fd7e14";
    default:
      return "#6c757d";
  }
}

// ===== Enroll Logic =====
function addEnrollEvents() {
  const enrollButtons = document.querySelectorAll(".enroll-btn");

  enrollButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const courseId = parseInt(this.dataset.id);
      const selectedCourse = allCourses.find((course) => course.id === courseId);

      let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];

      const alreadyEnrolled = enrolled.some((course) => course.id === courseId);

      if (!alreadyEnrolled) {
        enrolled.push(selectedCourse);
        localStorage.setItem("enrolled", JSON.stringify(enrolled));

        this.textContent = "Enrolled ✓";
        this.disabled = true;

        updateNavbarCount();
      }
    });
  });
}

// ===== Navbar Badge =====
function updateNavbarCount() {
  const enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];
  countBadge.textContent = enrolled.length;
}

// ===== Event Listeners =====
searchInput.addEventListener("keyup", applyFilters);
sortSelect.addEventListener("change", applyFilters);
levelFilter.addEventListener("change", applyFilters);

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    selectedCategory = this.dataset.category;
    applyFilters();
  });
});

// ===== Dark Mode =====
const toggleBtn = document.getElementById("toggle_btn");

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