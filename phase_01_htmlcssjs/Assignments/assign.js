const students = [
  { id: 101, name: "Aman",  marks: 82, course: "Java"   },
  { id: 102, name: "Priya", marks: 95, course: "Python" },
  { id: 103, name: "Rahul", marks: 67, course: "Java"   },
  { id: 104, name: "Neha",  marks: 76, course: "Web"    },
  { id: 105, name: "Rohan", marks: 88, course: "Python" },
];

// ─────────────────────────────────────────────
// Task 1 – Add a Student (push)
// ─────────────────────────────────────────────
students.push({ id: 106, name: "Simran", marks: 91, course: "Java" });
console.log("Task 1 – After push:");
console.log(students);

// ─────────────────────────────────────────────
// Task 2 – Remove Last Student (pop)
// ─────────────────────────────────────────────
const removed = students.pop();
console.log("\nTask 2 – Removed student (pop):");
console.log(removed);

// ─────────────────────────────────────────────
// Task 3 – Add Student at Beginning (unshift)
// ─────────────────────────────────────────────
students.unshift({ id: 100, name: "Ankit", marks: 80, course: "Web" });
console.log("\nTask 3 – After unshift:");
console.log(students);

// ─────────────────────────────────────────────
// Task 4 – Remove First Student (shift)
// ─────────────────────────────────────────────
const first = students.shift();
console.log("\nTask 4 – Removed student (shift):");
console.log(first);

// ─────────────────────────────────────────────
// Task 5 – Update Array Using splice()
// ─────────────────────────────────────────────
const idx = students.findIndex(s => s.id === 103);
students.splice(idx, 1, { id: 107, name: "Karan", marks: 78, course: "Java" });
console.log("\nTask 5 – After splice (replace id 103 with Karan):");
console.log(students);

// ─────────────────────────────────────────────
// Task 6 – Create a New Array Using slice()
// ─────────────────────────────────────────────
const firstThree = students.slice(0, 3);
console.log("\nTask 6 – First three students (slice):");
console.log(firstThree);

// ─────────────────────────────────────────────
// Task 7 – Array Iteration (for...of)
// ─────────────────────────────────────────────
console.log("\nTask 7 – for...of:");
for (const s of students) {
  console.log(`${s.name} - ${s.course} - ${s.marks}`);
}

// ─────────────────────────────────────────────
// Task 8 – forEach()
// ─────────────────────────────────────────────
console.log("\nTask 8 – Names via forEach:");
students.forEach(s => console.log(s.name));

// ─────────────────────────────────────────────
// Task 9 – map()
// ─────────────────────────────────────────────
const names = students.map(s => s.name);
console.log("\nTask 9 – Names array via map:");
console.log(names);

// ─────────────────────────────────────────────
// Task 10 – filter()
// ─────────────────────────────────────────────
const highScorers = students.filter(s => s.marks >= 80);
console.log("\nTask 10 – Students with marks >= 80 (filter):");
console.log(highScorers);

// ─────────────────────────────────────────────
// Task 11 – reduce()
// ─────────────────────────────────────────────
const total = students.reduce((acc, s) => acc + s.marks, 0);
const average = total / students.length;
console.log("\nTask 11 – reduce:");
console.log(`Total Marks = ${total}`);
console.log(`Average = ${average}`);

// ─────────────────────────────────────────────
// Task 12 – sort()
// ─────────────────────────────────────────────
// Ascending
const ascending = [...students].sort((a, b) => a.marks - b.marks);
console.log("\nTask 12 – Marks Ascending:");
ascending.forEach(s => console.log(s.marks));

// Descending
const descending = [...students].sort((a, b) => b.marks - a.marks);
console.log("\nTask 12 – Marks Descending:");
descending.forEach(s => console.log(s.marks));