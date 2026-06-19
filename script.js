// Sidebar Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// Converter Tab Navigation
document.querySelectorAll('.converter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.converter-tab').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.converter-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.converter).classList.add('active');
    });
});

// ==================== CALCULATOR ====================
let calcDisplay = document.getElementById('calc-display');
let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;
let calcHistory = JSON.parse(localStorage.getItem('calcHistory')) || [];
let fullExpression = '';

function updateDisplay() {
    let displayValue = currentInput;
    if (operator !== null && previousInput !== '') {
        if (shouldResetDisplay) {
            displayValue = `${previousInput}${operator}`;
        } else {
            displayValue = `${previousInput}${operator}${currentInput}`;
        }
    }
    calcDisplay.value = displayValue;
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
        fullExpression = num;
    } else {
        if (currentInput === '0' && num !== '.') {
            currentInput = num;
            fullExpression = num;
        } else if (num === '.' && currentInput.includes('.')) {
            return;
        } else {
            currentInput += num;
            fullExpression += num;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        // Calculate intermediate result without saving to history
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;
        
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('Erro: Divisão por zero!');
                    clearCalculator();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        
        currentInput = result.toString();
        if (currentInput.includes('.') && currentInput.split('.')[1].length > 8) {
            currentInput = parseFloat(currentInput).toFixed(8).toString();
        }
        fullExpression = currentInput;
    }
    
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;
    fullExpression += op;
    updateDisplay();
}

function calculate() {
    if (operator === null || shouldResetDisplay) return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Erro: Divisão por zero!');
                clearCalculator();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // Save to history (only when equals is clicked)
    calcHistory.unshift({
        expression: fullExpression,
        result: result,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 20 calculations
    if (calcHistory.length > 20) {
        calcHistory = calcHistory.slice(0, 20);
    }
    
    localStorage.setItem('calcHistory', JSON.stringify(calcHistory));
    renderCalculatorHistory();

    currentInput = result.toString();
    fullExpression = currentInput;
    if (currentInput.includes('.') && currentInput.split('.')[1].length > 8) {
        currentInput = parseFloat(currentInput).toFixed(8).toString();
        fullExpression = currentInput;
    }
    operator = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    fullExpression = '0';
    updateDisplay();
}

function backspace() {
    if (currentInput.length === 1) {
        currentInput = '0';
        fullExpression = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
        fullExpression = fullExpression.slice(0, -1);
    }
    updateDisplay();
}

function renderCalculatorHistory() {
    const historyList = document.getElementById('calc-history-list');
    historyList.innerHTML = '';
    
    calcHistory.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.innerHTML = `
            <span class="history-expression">${escapeHtml(item.expression)}</span>
            <span class="history-result">= ${item.result}</span>
        `;
        li.onclick = () => loadFromHistory(item.result);
        historyList.appendChild(li);
    });
}

function clearCalculatorHistory() {
    calcHistory = [];
    localStorage.setItem('calcHistory', JSON.stringify(calcHistory));
    renderCalculatorHistory();
}

function loadFromHistory(value) {
    currentInput = value.toString();
    fullExpression = value.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

// Initialize calculator history
renderCalculatorHistory();

// ==================== PASSWORD GENERATOR ====================
function generatePassword() {
    const length = parseInt(document.getElementById('password-length').value);
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeLowercase = document.getElementById('include-lowercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;

    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
        alert('Selecione pelo menos uma opção de caractere');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    document.getElementById('password-output').value = password;
}

function copyPassword() {
    const passwordOutput = document.getElementById('password-output');
    if (passwordOutput.value) {
        navigator.clipboard.writeText(passwordOutput.value).then(() => {
            alert('Senha copiada para a área de transferência!');
        });
    }
}

function updateLengthValue() {
    const length = document.getElementById('password-length').value;
    document.getElementById('length-value').textContent = length;
}

// Generate initial password
generatePassword();

// ==================== UNIT CONVERTER ====================
// Length Converter
const lengthConversions = {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    mi: 1609.344,
    ft: 0.3048,
    in: 0.0254
};

function convertLength() {
    const value = parseFloat(document.getElementById('length-value').value);
    const from = document.getElementById('length-from').value;
    const to = document.getElementById('length-to').value;
    const resultElement = document.getElementById('length-result');

    if (isNaN(value)) {
        resultElement.textContent = 'Resultado: --';
        return;
    }

    const valueInMeters = value * lengthConversions[from];
    const result = valueInMeters / lengthConversions[to];
    resultElement.textContent = `Resultado: ${result.toFixed(4)} ${to}`;
}

// Weight Converter
const weightConversions = {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    lb: 0.453592,
    oz: 0.0283495
};

function convertWeight() {
    const value = parseFloat(document.getElementById('weight-value').value);
    const from = document.getElementById('weight-from').value;
    const to = document.getElementById('weight-to').value;
    const resultElement = document.getElementById('weight-result');

    if (isNaN(value)) {
        resultElement.textContent = 'Resultado: --';
        return;
    }

    const valueInKg = value * weightConversions[from];
    const result = valueInKg / weightConversions[to];
    resultElement.textContent = `Resultado: ${result.toFixed(4)} ${to}`;
}

// Volume Converter
const volumeConversions = {
    l: 1,
    ml: 0.001,
    gal: 3.78541,
    qt: 0.946353,
    pt: 0.473176
};

function convertVolume() {
    const value = parseFloat(document.getElementById('volume-value').value);
    const from = document.getElementById('volume-from').value;
    const to = document.getElementById('volume-to').value;
    const resultElement = document.getElementById('volume-result');

    if (isNaN(value)) {
        resultElement.textContent = 'Resultado: --';
        return;
    }

    const valueInLiters = value * volumeConversions[from];
    const result = valueInLiters / volumeConversions[to];
    resultElement.textContent = `Resultado: ${result.toFixed(4)} ${to}`;
}

// Unit Tab Navigation
document.querySelectorAll('.unit-tab').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.unit-tab').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.unit-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.unit).classList.add('active');
    });
});

// ==================== TEMPERATURE CONVERTER ====================
function convertTemperature() {
    const value = parseFloat(document.getElementById('temp-value').value);
    const from = document.getElementById('temp-from').value;
    const to = document.getElementById('temp-to').value;
    const resultElement = document.getElementById('temp-result');

    if (isNaN(value)) {
        resultElement.textContent = 'Resultado: --';
        return;
    }

    let celsius;
    
    // Convert to Celsius first
    switch (from) {
        case 'celsius':
            celsius = value;
            break;
        case 'fahrenheit':
            celsius = (value - 32) * 5 / 9;
            break;
        case 'kelvin':
            celsius = value - 273.15;
            break;
    }

    // Convert from Celsius to target
    let result;
    switch (to) {
        case 'celsius':
            result = celsius;
            break;
        case 'fahrenheit':
            result = (celsius * 9 / 5) + 32;
            break;
        case 'kelvin':
            result = celsius + 273.15;
            break;
    }

    resultElement.textContent = `Resultado: ${result.toFixed(2)} ${to === 'celsius' ? '°C' : to === 'fahrenheit' ? '°F' : 'K'}`;
}

// ==================== CURRENCY CONVERTER ====================
const exchangeRates = {
    BRL: 1,
    USD: 0.20,
    EUR: 0.18,
    GBP: 0.16
};

function convertCurrency() {
    const value = parseFloat(document.getElementById('currency-value').value);
    const from = document.getElementById('currency-from').value;
    const to = document.getElementById('currency-to').value;
    const resultElement = document.getElementById('currency-result');

    if (isNaN(value)) {
        resultElement.textContent = 'Resultado: --';
        return;
    }

    // Convert to BRL first, then to target
    const valueInBRL = value / exchangeRates[from];
    const result = valueInBRL * exchangeRates[to];

    resultElement.textContent = `Resultado: ${result.toFixed(2)} ${to}`;
}

// ==================== TIME CONVERTER ====================
function convertTime() {
    const value = parseFloat(document.getElementById('time-value').value);
    const from = document.getElementById('time-from').value;
    const to = document.getElementById('time-to').value;
    const resultElement = document.getElementById('time-result');

    if (isNaN(value)) {
        resultElement.textContent = 'Resultado: --';
        return;
    }

    // Convert to seconds first
    const secondsMap = {
        seconds: 1,
        minutes: 60,
        hours: 3600,
        days: 86400
    };

    const valueInSeconds = value * secondsMap[from];
    const result = valueInSeconds / secondsMap[to];

    resultElement.textContent = `Resultado: ${result.toFixed(4)} ${to}`;
}

// ==================== TO-DO LIST ====================
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    const todoCount = document.getElementById('todo-count');
    todoList.innerHTML = '';

    let filteredTodos = todos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todos.indexOf(todo)})">
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button onclick="deleteTodo(${todos.indexOf(todo)})">Excluir</button>
        `;
        todoList.appendChild(li);
    });

    const activeCount = todos.filter(todo => !todo.completed).length;
    todoCount.textContent = `${activeCount} tarefa${activeCount !== 1 ? 's' : ''} pendente${activeCount !== 1 ? 's' : ''}`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function addTodo() {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();

    if (text === '') return;

    todos.push({
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    });

    input.value = '';
    saveTodos();
    renderTodos();
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// ==================== STOPWATCH ====================
let stopwatchInterval = null;
let stopwatchStartTime = 0;
let stopwatchElapsedTime = 0;
let lapCount = 0;
let stopwatchHistory = JSON.parse(localStorage.getItem('stopwatchHistory')) || [];

function startStopwatch() {
    if (stopwatchInterval) return;
    
    stopwatchStartTime = Date.now() - stopwatchElapsedTime;
    stopwatchInterval = setInterval(updateStopwatch, 10);
    
    document.getElementById('start-btn').disabled = true;
    document.getElementById('stop-btn').disabled = false;
    document.getElementById('reset-btn').disabled = true;
    document.getElementById('lap-btn').disabled = false;
}

function stopStopwatch() {
    if (!stopwatchInterval) return;
    
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    
    // Save session to history
    if (stopwatchElapsedTime > 0) {
        stopwatchHistory.unshift({
            duration: stopwatchElapsedTime,
            timestamp: new Date().toISOString(),
            laps: lapCount
        });
        
        // Keep only last 20 sessions
        if (stopwatchHistory.length > 20) {
            stopwatchHistory = stopwatchHistory.slice(0, 20);
        }
        
        localStorage.setItem('stopwatchHistory', JSON.stringify(stopwatchHistory));
        renderStopwatchHistory();
    }
    
    document.getElementById('start-btn').disabled = false;
    document.getElementById('stop-btn').disabled = true;
    document.getElementById('reset-btn').disabled = false;
}

function resetStopwatch() {
    stopStopwatch();
    stopwatchElapsedTime = 0;
    lapCount = 0;
    
    document.getElementById('stopwatch-time').textContent = '00:00:00';
    document.getElementById('stopwatch-ms').textContent = '.000';
    document.getElementById('laps-list').innerHTML = '';
    
    document.getElementById('reset-btn').disabled = true;
    document.getElementById('lap-btn').disabled = true;
}

function lapStopwatch() {
    if (!stopwatchInterval) return;
    
    lapCount++;
    const lapTime = stopwatchElapsedTime;
    const formattedTime = formatStopwatchTime(lapTime);
    
    const lapsList = document.getElementById('laps-list');
    const li = document.createElement('li');
    li.textContent = `Volta ${lapCount}: ${formattedTime}`;
    lapsList.insertBefore(li, lapsList.firstChild);
}

function updateStopwatch() {
    stopwatchElapsedTime = Date.now() - stopwatchStartTime;
    const formattedTime = formatStopwatchTime(stopwatchElapsedTime);
    
    const timeParts = formattedTime.split('.');
    document.getElementById('stopwatch-time').textContent = timeParts[0];
    document.getElementById('stopwatch-ms').textContent = '.' + timeParts[1];
}

function formatStopwatchTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;
    
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds, 3)}`;
}

function padZero(num, length = 2) {
    return num.toString().padStart(length, '0');
}

function renderStopwatchHistory() {
    const historyList = document.getElementById('stopwatch-history-list');
    historyList.innerHTML = '';
    
    stopwatchHistory.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'history-item';
        const formattedTime = formatStopwatchTime(item.duration);
        const date = new Date(item.timestamp);
        li.innerHTML = `
            <span class="history-expression">${date.toLocaleDateString('pt-BR')} ${date.toLocaleTimeString('pt-BR')} (${item.laps} voltas)</span>
            <span class="history-result">${formattedTime}</span>
        `;
        historyList.appendChild(li);
    });
}

function clearStopwatchHistory() {
    stopwatchHistory = [];
    localStorage.setItem('stopwatchHistory', JSON.stringify(stopwatchHistory));
    renderStopwatchHistory();
}

// Initialize stopwatch history
renderStopwatchHistory();

// ==================== NOTES APP ====================
let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveNotesToStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    notes.forEach((note, index) => {
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';
        noteItem.innerHTML = `
            <div class="note-header">
                <span class="note-title">${escapeHtml(note.title)}</span>
                <span class="note-date">${note.updatedAt ? 'Atualizado: ' + new Date(note.updatedAt).toLocaleDateString('pt-BR') : new Date(note.createdAt).toLocaleDateString('pt-BR')}</span>
            </div>
            <div class="note-content">${escapeHtml(note.content)}</div>
            <div class="note-actions">
                <button class="edit-btn" onclick="editNote(${index})">Editar</button>
                <button class="delete-btn" onclick="deleteNote(${index})">Excluir</button>
            </div>
        `;
        notesList.appendChild(noteItem);
    });
}

function saveNote() {
    const titleInput = document.getElementById('note-title');
    const contentInput = document.getElementById('note-content');
    const editingIndex = parseInt(document.getElementById('note-editing-index').value);
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title === '' && content === '') {
        alert('Preencha pelo menos o título ou o conteúdo da nota');
        return;
    }

    if (editingIndex >= 0) {
        // Update existing note
        notes[editingIndex] = {
            ...notes[editingIndex],
            title: title || 'Sem título',
            content: content,
            updatedAt: new Date().toISOString()
        };
        cancelEditNote();
    } else {
        // Create new note
        notes.unshift({
            title: title || 'Sem título',
            content: content,
            createdAt: new Date().toISOString()
        });
        titleInput.value = '';
        contentInput.value = '';
    }
    
    saveNotesToStorage();
    renderNotes();
}

function editNote(index) {
    const note = notes[index];
    document.getElementById('note-title').value = note.title;
    document.getElementById('note-content').value = note.content;
    document.getElementById('note-editing-index').value = index;
    document.getElementById('cancel-edit-btn').style.display = 'flex';
    document.getElementById('note-title').focus();
}

function cancelEditNote() {
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';
    document.getElementById('note-editing-index').value = '-1';
    document.getElementById('cancel-edit-btn').style.display = 'none';
}

function deleteNote(index) {
    if (confirm('Tem certeza que deseja excluir esta nota?')) {
        notes.splice(index, 1);
        saveNotesToStorage();
        renderNotes();
    }
}

// Initialize notes
renderNotes();

// Initialize todos
renderTodos();
