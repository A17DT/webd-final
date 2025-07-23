function switchTab(event, id) {
    document.querySelectorAll('.panel').forEach(panel =>
        panel.classList.remove('active-panel')
    );
    document.getElementById(id).classList.add('active-panel');

    document.querySelectorAll('.sidebar li').forEach(li => {
        li.classList.remove('active-tab')
    });
    event.target.classList.add('active-tab');
}
let currentCardIndex = 0;
const cards = document.querySelectorAll('.carousel .card');
const cardContainer = document.querySelector('.carousel');

function showCard(index) {
    const totalCards = cards.length;
    if (index < 0) index = 0;
    if (index >= totalCards) index = totalCards - 1;

    const card = cards[index];
    const cardWidth = card.offsetWidth + 30; 
    const scrollPos = card.offsetLeft - (cardContainer.offsetWidth / 2) + (cardWidth / 2);

    cardContainer.scrollTo({ left: scrollPos, behavior: 'smooth' });
    currentCardIndex = index;
}

function nextCard() {
    showCard(currentCardIndex + 1);
}

function prevCard() {
    showCard(currentCardIndex - 1);
}

window.addEventListener('load', () => {
    showCard(currentCardIndex);
});


let timerInterval = null;
let totalSeconds = 0;

const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const display = document.getElementById('timerDisplay');

function updateTimeFromInputs() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    updateDisplay();
}

function adjustTime(type, amount) {
    if (type === 'hours') {
        hoursInput.value = Math.max(0, parseInt(hoursInput.value) + amount);
    } else if (type === 'minutes') {
        let minutes = parseInt(minutesInput.value) + amount;
        if (minutes > 59) minutes = 59;
        if (minutes < 0) minutes = 0;
        minutesInput.value = minutes;
    } else if (type === 'seconds') {
        let seconds = parseInt(secondsInput.value) + amount;
        if (seconds > 59) seconds = 59;
        if (seconds < 0) seconds = 0;
        secondsInput.value = seconds;
    }
    updateTimeFromInputs();
}

function updateDisplay() {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
secondsInput.addEventListener('input', updateTimeFromInputs);
hoursInput.addEventListener('input', updateTimeFromInputs);
minutesInput.addEventListener('input', updateTimeFromInputs);

function startCustomTimer() {
    clearInterval(timerInterval);
    if (totalSeconds <= 0) {
        updateTimeFromInputs();
    }
    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            return;
        }
        totalSeconds--;
        updateDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    hoursInput.value = '0';
    minutesInput.value = '0';
    secondsInput.value = '0';
    updateTimeFromInputs();
}

const beepSound = document.getElementById('timerover');

function startCustomTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            return;
        }
        if (totalSeconds <= 5) {
            timerover.play();
        }

        totalSeconds--;
        updateDisplay();
    }, 1000);
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const normal = document.getElementById("normalTasks");
    const important = document.getElementById("importantTasks");
    const completed = document.getElementById("completedTasks");

    normal.innerHTML = "";
    important.innerHTML = "";
    completed.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.important) li.classList.add("important");
        if (task.completed) li.classList.add("completed");

        li.classList.add("pop");


        li.innerHTML = `
      <input type="checkbox" onchange="toggleComplete(${index})" ${task.completed ? "checked" : ""}>
      <span>${task.text}</span>
      <div>
        <button onclick="toggleImportant(${index})">⭐</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;

        if (task.completed) {
            completed.appendChild(li);
        } else if (task.important) {
            important.appendChild(li);
        } else {
            normal.appendChild(li);
        }
    });
}


function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    if (taskText !== "") {
        tasks.push({ text: taskText, important: false });
        input.value = "";
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleImportant(index) {
    tasks[index].important = !tasks[index].important;
    saveTasks();
    renderTasks();
}
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}
renderTasks();
function setMood(mood) {
    const buttons = document.querySelectorAll(".mood-buttons button");
    buttons.forEach(btn => btn.classList.remove("active-mood"));

    const selected = Array.from(buttons).find(btn => btn.innerText === mood.split(" ")[0]);
    if (selected) selected.classList.add("active-mood");

    const moodText = {
        "😴": "You need some rest",
        "😐": "meh",
        "😤": "mad",
        "😁": "happi happi happi",
        "😎": "SLAYYYY",
        "😭":"bery sad",
    };

    const msg = moodText[mood.split(" ")[0]] || "Feeling it!";
    document.getElementById("mood-message").innerText = msg;
}
const moodButtons = document.querySelectorAll('#moodChoices button');
let selectedMood = null;

moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        moodButtons.forEach(b => b.classList.remove('active-mood'));
        btn.classList.add('active-mood');
        selectedMood = btn.textContent;
    });
});

document.getElementById('saveMood').addEventListener('click', () => {
    const date = document.getElementById('moodDate').value;
    const journal = document.getElementById('journalEntry').value;
    const moodLogList = document.getElementById('moodLogList');

    if (!date || !selectedMood) {
        alert("Please choose a date and mood!");
        return;
    }

    const newLog = document.createElement('li');
    newLog.innerHTML = `
    <strong>${date}</strong>: ${selectedMood} <br>
    <em>${journal ? `"${journal}"` : ""}</em>
  `;
    moodLogList.appendChild(newLog);

    document.getElementById('journalEntry').value = '';
    selectedMood = null;
    moodButtons.forEach(b => b.classList.remove('active-mood'));
});
function showMoodLog() {
    const moodLogList = document.getElementById('moodLogList');
    moodLogList.innerHTML = '';

    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('mood-')) {
            const date = key.split('mood-')[1];
            const { mood, journal } = JSON.parse(localStorage.getItem(key));

            const entry = document.createElement('li');
            entry.innerHTML = `
        <strong>${date}</strong>: ${mood} <br>
        <em>${journal || 'No journal 📝'}</em>
      `;
            moodLogList.appendChild(entry);
        }
    });
}

document.getElementById('saveMood').addEventListener('click', function () {
    const moodDate = document.getElementById('moodDate').value;
    const journalText = document.getElementById('journalEntry').value.trim();
    const selectedMood = document.querySelector('.mood-buttons .active-mood');

    if (!moodDate || !selectedMood) return;

    const moodEmoji = selectedMood.textContent;
    const entry = document.createElement('li');


    entry.innerHTML = `
        <div class="entry-text">
            <span>${moodDate} – ${moodEmoji} – ${journalText || "No journal note 😶"}</span>
        </div>
        <button class="delete-entry" title="Delete Entry">🗑️</button>
    `;

    entry.querySelector('.delete-entry').addEventListener('click', () => {
        entry.remove();
    });

    document.getElementById('moodLogList').appendChild(entry);

    document.getElementById('journalEntry').value = '';
    document.querySelectorAll('.mood-buttons button').forEach(btn => btn.classList.remove('active-mood'));
});