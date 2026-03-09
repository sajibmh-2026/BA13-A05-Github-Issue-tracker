let allIssues = [];

async function loadIssues() {
    const container = document.getElementById("issueContainer");
    const spinner = document.getElementById("loadingSpinner");

    try {
        spinner.classList.remove('hidden');
        container.classList.add('hidden');

        
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await res.json();

        console.log(data);

        allIssues = data.data;

        displayIssues(allIssues);
        updateIssueCount(allIssues);

        spinner.classList.add('hidden');
        container.classList.remove('hidden');

    } catch (error) {
        console.error("Error loading issues:", error);


        spinner.classList.add('hidden');
        container.classList.remove('hidden');
        container.innerHTML = `
            <div class="col-span-4 text-center py-10">
                <p class="text-red-500">Failed to load issues. Please try again.</p>
            </div>
        `;
    }
}

loadIssues();

function displayIssues(issues) {
    const container = document.getElementById("issueContainer");
    container.innerHTML = ""; 

    
    if (issues.length === 0) {
        container.innerHTML = `
            <div class="col-span-4 text-center py-10">
                <p class="text-gray-500">No issues found.</p>
            </div>
        `;
        return;
    }

    // Label color mapping
    const labelColorMap = {
        "bug": "badge-error",
        "enhancement": "badge-success",
        "help wanted": "badge-warning",
        "good first issue": "badge-info",
        "documentation": "badge-secondary"
    };

    issues.forEach(issue => {
        const card = document.createElement("div");
        const priority = issue.priority.toLowerCase();

        // border color logic based on STATUS
        const borderColor =
            issue.status === "open"
                ? "border-green-500"
                : "border-purple-500";

        // status icon logic
        const statusIcon =
            issue.status === "open"
                ? "assets/Open-Status.png"
                : "assets/closed-status.png";

        // badge color logic based on priority
        const badgeClass =
            priority === "high"
                ? "badge badge-soft badge-error text-[#EF4444]"
                : priority === "medium"
                    ? "badge badge-soft badge-warning text-[#F59E0B]"
                    : "badge badge-ghost text-[#9CA3AF]";

        // labels dynamically badges 
        const labelsBadges = issue.labels
            .map(label => {
                const labelLower = label.toLowerCase();
                const badgeColor = labelColorMap[labelLower] || "badge-neutral";

                let iconHTML = `<i class="fa-solid fa-tag text-xs"></i>`;

                if (labelLower === "bug") {
                    iconHTML = `<i class="fa-solid fa-bug text-xs"></i>`;
                } else if (labelLower === "enhancement") {
                    iconHTML = `<i class="fa-solid fa-wand-magic-sparkles text-xs"></i>`;
                } else if (labelLower === "help wanted") {
                    iconHTML = `<img src="assets/vector.png" class="w-4 h-4 object-contain" alt="help"/>`;
                } else if (labelLower === "good first issue") {
                    iconHTML = `<i class="fa-solid fa-star text-xs"></i>`;
                } else if (labelLower === "documentation") {
                    iconHTML = `<i class="fa-solid fa-book text-xs"></i>`;
                }

                return `
                    <span class="badge ${badgeColor} badge-outline flex items-center gap-1">
                        ${iconHTML}
                        ${label}
                    </span>
                `;
            })
            .join("");

        card.className = `card bg-base-100 shadow p-4 border-t-4 ${borderColor}`;

        card.innerHTML = `
            <div class="flex justify-between items-center">
                <img src="${statusIcon}" class="w-5 h-5 object-contain"/>
                <span class="badge ${badgeClass}">${issue.priority}</span>
            </div>

            <h3 class="font-semibold mt-2">${issue.title}</h3>

            <p class="text-gray-500 text-sm mt-1">${issue.description}</p>

            <div class="flex gap-2 mt-3 flex-wrap">
                ${labelsBadges}
            </div>

            <div class="text-xs text-gray-400 mt-4">
                <p>#${issue.id} by ${issue.author}</p>
                <p>${issue.createdAt}</p>
            </div>
        `;

        card.addEventListener("click", () => {
            openIssueModal(issue.id);
        });

        container.appendChild(card);
    });
}

// Issue count update function
function updateIssueCount(issues) {
    const countIssue = document.getElementById("issueCount");
    countIssue.innerText = issues.length;
}

// Filter function
function filterIssues(type, buttonId) {
    const spinner = document.getElementById("loadingSpinner");
    const container = document.getElementById("issueContainer");

    // ✅ Show spinner
    spinner.classList.remove('hidden');
    container.classList.add('hidden');

    // ✅ Simulate loading (optional)
    setTimeout(() => {
        let filtered;

        if (type === "open") {
            filtered = allIssues.filter(issue => issue.status === "open");
        } else if (type === "closed") {
            filtered = allIssues.filter(issue => issue.status === "closed");
        } else {
            filtered = allIssues;
        }

        // Button active logic
        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.remove("btn-primary");
        });
        document.getElementById(buttonId).classList.add("btn-primary");

        displayIssues(filtered);
        updateIssueCount(filtered);

        // ✅ Hide spinner
        spinner.classList.add('hidden');
        container.classList.remove('hidden');
    }, 300); // 300ms delay for smooth UX
}

// Search function
document.getElementById("searchInput").addEventListener("keyup", searchIssues);

async function searchIssues() {
    const searchText = document.getElementById("searchInput").value.trim();
    const spinner = document.getElementById("loadingSpinner");
    const container = document.getElementById("issueContainer");

    if (searchText === "") {
        displayIssues(allIssues);
        updateIssueCount(allIssues);
        return;
    }

    try {
        // ✅ Show spinner
        spinner.classList.remove('hidden');
        container.classList.add('hidden');

        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);
        const data = await res.json();
        const issues = data.data;

        displayIssues(issues);
        updateIssueCount(issues);

        // ✅ Hide spinner
        spinner.classList.add('hidden');
        container.classList.remove('hidden');

    } catch (error) {
        console.log("Search error:", error);
        spinner.classList.add('hidden');
        container.classList.remove('hidden');
    }
}

// Modal function
async function openIssueModal(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    const issue = data.data;

    document.getElementById("modalTitle").innerText = issue.title;
    document.getElementById("modalDescription").innerText = issue.description;
    document.getElementById("modalAuthor").innerText = issue.author;
    document.getElementById("modalDate").innerText = issue.createdAt;
    document.getElementById("modalAssignee").innerText = issue.author;

    const priority = issue.priority.toLowerCase();
    const priorityBadgeClass =
        priority === "high"
            ? "badge badge-soft badge-error text-[#EF4444]"
            : priority === "medium"
                ? "badge badge-soft badge-warning text-[#F59E0B]"
                : "badge badge-ghost text-[#9CA3AF]";

    const priorityElement = document.getElementById("modalPriority");
    priorityElement.className = priorityBadgeClass;
    priorityElement.innerText = issue.priority;

    const statusIcon =
        issue.status === "open"
            ? "assets/Open-Status.png"
            : "assets/closed-status.png";

    const statusElement = document.getElementById("modalStatus");
    statusElement.innerHTML = `
        <img src="${statusIcon}" class="w-5 h-5 object-contain inline-block mr-2"/>
        ${issue.status}
    `;

    const labelColorMap = {
        "bug": "badge-error",
        "enhancement": "badge-success",
        "help wanted": "badge-warning",
        "good first issue": "badge-info",
        "documentation": "badge-secondary"
    };

    const labelContainer = document.getElementById("modalLabels");
    labelContainer.innerHTML = "";

    issue.labels.forEach(label => {
        const labelLower = label.toLowerCase();
        const badgeColor = labelColorMap[labelLower] || "badge-neutral";

        let iconHTML = `<i class="fa-solid fa-tag text-xs"></i>`;

        if (labelLower === "bug") {
            iconHTML = `<i class="fa-solid fa-bug text-xs"></i>`;
        } else if (labelLower === "enhancement") {
            iconHTML = `<i class="fa-solid fa-wand-magic-sparkles text-xs"></i>`;
        } else if (labelLower === "documentation") {
            iconHTML = `<i class="fa-solid fa-book text-xs"></i>`;
        } else if (labelLower === "good first issue") {
            iconHTML = `<i class="fa-solid fa-star text-xs"></i>`;
        } else if (labelLower === "help wanted") {
            iconHTML = `<img src="assets/vector.png" class="w-4 h-4 object-contain" alt="help"/>`;
        }

        const badge = document.createElement("span");
        badge.className = `badge ${badgeColor} badge-outline flex items-center gap-1`;
        badge.innerHTML = `${iconHTML} ${label}`;
        labelContainer.appendChild(badge);
    });

    document.getElementById("issueModal").showModal();
}