async function loadIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    console.log(data);

    displayIssues(data.data);
}

loadIssues();

function displayIssues(issues) {

    const container = document.getElementById("issueContainer");
    container.innerHTML = "";

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

        // priority কে lowercase এ convert করুন
        const priority = issue.priority.toLowerCase();

        // border color logic based on priority
        const borderColor =
            (priority === "high" || priority === "medium")
                ? "border-green-500"
                : "border-purple-500";

        // status icon logic based on priority
        const statusIcon =
            (priority === "high" || priority === "medium")
                ? "assets/Open-Status.png"
                : "assets/closed-status.png";

        // badge color logic based on priority
        const badgeClass =
            priority === "high"
                ? "badge badge-soft badge-error text-[#EF4444]"
                : priority === "medium"
                    ? "badge badge-soft badge-warning text-[#F59E0B]"
                    : "badge badge-ghost text-[#9CA3AF]";

        // labels থেকে dynamically badges তৈরি করুন
        const labelsBadges = issue.labels
            .map(label => {

                const labelLower = label.toLowerCase();
                const badgeColor = labelColorMap[labelLower] || "badge-neutral";

                let iconHTML = `<i class="fa-solid fa-tag text-xs"></i>`; // default

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

        <h3 class="font-semibold mt-2">
            ${issue.title}
        </h3>

        <p class="text-gray-500 text-sm mt-1">
            ${issue.description}
        </p>

        <div class="flex gap-2 mt-3 flex-wrap">
            ${labelsBadges}
        </div>

        <div class="text-xs text-gray-400 mt-4">
            <p>#${issue.id} by ${issue.author}</p>
            <p>${issue.createdAt}</p>
        </div>
        `;

        container.appendChild(card);

    });
}