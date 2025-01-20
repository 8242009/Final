const habitNameInput = document.getElementById('habit-name');
const habitFrequencyInput = document.getElementById('habit-frequency');
const addHabitButton = document.getElementById('add-habit');
const habitList = document.getElementById('habit-list');
const reflectionNotes = document.getElementById('reflection-notes');
const saveReflectionButton = document.getElementById('save-reflection');
const reflectionList = document.getElementById('reflection-list');
const progressChartCanvas = document.getElementById('progress-chart');

let habits = [];
let reflections = [];
let chart;

function addHabit() {
    const habitName = habitNameInput.value.trim();
    const frequency = habitFrequencyInput.value;

    if (habitName === '') {
        alert('Please enter a habit name.');
        return;
    }

    if (habits.some(habit => habit.name === habitName)) {
        alert('This habit already exists!');
        return;
    }

    const habit = {
        name: habitName,
        frequency: frequency,
        streak: 0,
    };

    habits.push(habit);
    habitNameInput.value = '';
    renderHabits();
    updateChart();
}

function renderHabits() {
    const habitListContent = habits.map((habit, index) => `
        <div class="habit">
            <span>${habit.name} (${habit.frequency}) - Streak: ${habit.streak}</span>
            <button onclick="incrementStreak(${index})">Mark Done</button>
            <button onclick="deleteHabit(${index})">Delete</button>
        </div>
    `).join('');

    habitList.innerHTML = `<h2>My Habits</h2>${habitListContent || '<p>No habits added yet.</p>'}`;
}

function incrementStreak(index) {
    habits[index].streak++;
    renderHabits();
    updateChart();
}

function deleteHabit(index) {
    habits.splice(index, 1);
    renderHabits();
    updateChart();
}

function saveReflection() {
    const notes = reflectionNotes.value.trim();
    if (notes === '') {
        alert('Reflection cannot be empty.');
        return;
    }
    reflections.push(notes);
    reflectionNotes.value = '';
    renderReflections();
}

function renderReflections() {
    const reflectionListContent = reflections.map(note => `
        <div class="reflection-item">
            <p>${note}</p>
        </div>
    `).join('');

    reflectionList.innerHTML = reflectionListContent || '<p>No reflections saved yet.</p>';
}

function initializeChart() {
    const ctx = progressChartCanvas.getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: habits.map(habit => habit.name),
            datasets: [{
                label: 'Habit Streaks',
                data: habits.map(habit => habit.streak),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateChart() {
    if (!chart) {
        initializeChart();
    } else {
        chart.data.labels = habits.map(habit => habit.name);
        chart.data.datasets[0].data = habits.map(habit => habit.streak);
        chart.update();
    }
}

addHabitButton.addEventListener('click', addHabit);
saveReflectionButton.addEventListener('click', saveReflection);

initializeChart();
renderHabits();
renderReflections();
