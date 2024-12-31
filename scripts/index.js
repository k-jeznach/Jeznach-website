let commitX = 120;
let commitY = 50;

const careerCommits = [
  { id: 4, company: "Intel Corporation", position: "Cloud/Embedded Software Development Engineer", date: "Nov 2023 - Now", x: commitX, y: commitY },
  { id: 3, company: "ISMA Controlli", position: "Embedded Software Engineer", date: "Sep 2023 - Oct 2023", x: commitX, y: commitY += 100 },
  { id: 2, company: "Intel Corporation", position: "Cloud/Embedded Software Development Engineer", date: "Nov 2021 - Aug 2022", x: commitX, y: commitY += 100 },
  { id: 1, company: "Security and Defense Technologies Center at GUT", position: "Embedded Software Engineer", date: "Jun 2020 - Nov 2021", x: commitX, y: commitY += 100 },
];

const svg = document.getElementById("commit-graph");

// Create a tooltip element and add it to the document body
const tooltip = document.createElement("div");
tooltip.classList.add("tooltip");
document.body.appendChild(tooltip);

// Draw branches (connecting lines between commits)
for (let i = 0; i < careerCommits.length - 1; i++) {
  const start = careerCommits[i];
  const end = careerCommits[i + 1];

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", start.x);
  line.setAttribute("y1", start.y);
  line.setAttribute("x2", end.x);
  line.setAttribute("y2", end.y);
  line.classList.add("commit-branch");

  if (i === 0) {
    const futureLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    futureLine.setAttribute("x1", start.x);
    futureLine.setAttribute("y1", start.y);
    futureLine.setAttribute("x2", end.x);
    futureLine.setAttribute("y2", start.y - 50);
    futureLine.classList.add("commit-future");
    svg.appendChild(futureLine);
  }

  svg.appendChild(line);
}

// Draw commit nodes
careerCommits.forEach((commit) => {
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", commit.x);
  circle.setAttribute("cy", commit.y);
  circle.setAttribute("r", 10);
  circle.classList.add("commit-node");

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", commit.x + 15);
  text.setAttribute("y", commit.y + 5);
  text.classList.add("commit-label");
  text.textContent = commit.company;

  svg.appendChild(circle);
  svg.appendChild(text);

  // Show tooltip and hide label on hover
  circle.addEventListener("mouseenter", (event) => {
    const cx = parseFloat(circle.getAttribute("cx"));
    const cy = parseFloat(circle.getAttribute("cy"));
    const svgBBox = svg.getBoundingClientRect();

    text.style.display = "none";

    // Update tooltip content and position
    tooltip.textContent = `${commit.company} - ${commit.position} (${commit.date})`;
    tooltip.style.left = `${cx + 35}px`; // Position the tooltip next to the circle
    tooltip.style.top = `${cy + svgBBox.top - 20}px`;  // Slight offset for better appearance
    tooltip.style.display = "block";    // Show tooltip

    console.log(`sbgx: ${svgBBox.left}, svgy: ${svgBBox.top}`);
    console.log(`cx: ${cx}, cy: ${cy}`);
  });

  // Hide tooltip and show label on mouse leave
  circle.addEventListener("mouseleave", () => {
    text.style.display = "block";
    tooltip.style.display = "none"; // Hide tooltip
  });
});
