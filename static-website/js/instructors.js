const instructorsContainer = document.getElementById("instructorsContainer");
const instructorSearch = document.getElementById("instructorSearch");
const countBadge = document.getElementById("count");
const toggleBtn = document.getElementById("toggle_btn");

let allInstructors = [];

// ===== Fetch Courses and Extract Instructors =====
fetch("./data/data.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Could not load instructors data");
    }
    return res.json();
  })
  .then((data) => {
    allInstructors = extractInstructors(data.courses);
    displayInstructors(allInstructors);
    updateNavbarCount();
    applySavedTheme();
  })
  .catch((error) => {
    console.error("Error loading instructors:", error);
    instructorsContainer.innerHTML = `
      <div class="col-12 text-center">
        <div class="alert alert-danger">
          Error loading instructors.
        </div>
      </div>
    `;
  });

// ===== Extract Unique Instructors =====
function extractInstructors(courses) {
  const instructorMap = {};

  courses.forEach((course) => {
    if (!instructorMap[course.instructor]) {
      instructorMap[course.instructor] = {
        name: course.instructor,
        category: course.category,
        coursesCount: 1,
        rating: course.rating,
        level: course.level
      };
    } else {
      instructorMap[course.instructor].coursesCount++;
    }
  });

  return Object.values(instructorMap);
}

// ===== Display Instructors =====
function displayInstructors(data) {
  instructorsContainer.innerHTML = "";

  if (data.length === 0) {
    instructorsContainer.innerHTML = `
      <div class="col-12 text-center">
        <div class="alert alert-warning">
          No instructors found.
        </div>
      </div>
    `;
    return;
  }

  data.forEach((instructor) => {
    const stars = generateStars(instructor.rating);

    instructorsContainer.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm border-0 text-center p-4">
          <div class="mb-3">
            <div class="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                 style="width: 80px; height: 80px; font-size: 30px;">
              <i class="fa-solid fa-user"></i>
            </div>
          </div>

          <h5 class="fw-bold">${instructor.name}</h5>
          <p class="text-muted mb-1">${instructor.category}</p>
          <p class="mb-1"><strong>Level:</strong> ${instructor.level}</p>
          <p class="mb-1"><strong>Courses:</strong> ${instructor.coursesCount}</p>
          <p class="text-warning fw-semibold stars">${stars} (${instructor.rating})</p>

          <a href="courses.html?instructor=${encodeURIComponent(instructor.name)}" 
   class="btn btn-outline-primary mt-3">
   View Courses
</a>
        </div>
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

// ===== Search Instructors =====
instructorSearch.addEventListener("keyup", function () {
  const value = this.value.toLowerCase().trim();

  const filtered = allInstructors.filter((instructor) =>
    instructor.name.toLowerCase().includes(value)
  );

  displayInstructors(filtered);
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