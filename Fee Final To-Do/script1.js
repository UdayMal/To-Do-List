const taskInput = document.getElementById('taskInput');
        const addTaskBtn = document.getElementById('addTaskBtn');
        const taskList = document.getElementById('taskList');

        // Function to create a new task item
        function createTaskItem(taskText) {
            const taskItem = document.createElement('li');
            taskItem.classList.add('py-2', 'px-3', 'border-b', 'border-gray-200', 'flex', 'items-center', 'task-item');
            
            // Create checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('mr-2');
            taskItem.appendChild(checkbox);

            // Create task text
            const taskTextElement = document.createElement('span');
            taskTextElement.textContent = taskText;
            taskTextElement.classList.add('flex-grow');
            taskItem.appendChild(taskTextElement);

            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn', 'text-red-500', 'text-sm');
            taskItem.appendChild(deleteBtn);

            return taskItem;
        }

        // Function to add a new task
        function addTask(taskText) {
            const taskItem = createTaskItem(taskText);
            taskList.appendChild(taskItem);

            // Attach event listener for delete button
            taskItem.querySelector('.delete-btn').addEventListener('click', () => {
                taskItem.remove();
                updateLocalStorage();
            });

            // Attach event listener for checkbox
            taskItem.querySelector('input[type="checkbox"]').addEventListener('change', () => {
                if (taskItem.querySelector('input[type="checkbox"]').checked) {
                    taskItem.classList.add('line-through', 'text-gray-400');
                } else {
                    taskItem.classList.remove('line-through', 'text-gray-400');
                }
                updateLocalStorage();
            });
        }

        // Function to update local storage
        function updateLocalStorage() {
            const tasks = [];
            taskList.querySelectorAll('.task-item').forEach(taskItem => {
                tasks.push({
                    text: taskItem.querySelector('span').textContent,
                    completed: taskItem.querySelector('input[type="checkbox"]').checked
                });
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Event listener for add task button
        addTaskBtn.addEventListener('click', () => {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText);
                taskInput.value = '';
                updateLocalStorage();
            } else {
                alert('Please enter a task!');
            }
        });

        // Event listener for Enter key
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const taskText = taskInput.value.trim();
                if (taskText !== '') {
                    addTask(taskText);
                    taskInput.value = '';
                    updateLocalStorage();
                } else {
                    alert('Please enter a task!');
                }
            }
        });

        // Load tasks from local storage
        document.addEventListener('DOMContentLoaded', () => {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.forEach(task => {
                addTask(task.text);
                const taskItem = taskList.lastChild;
                if (task.completed) {
                    taskItem.querySelector('input[type="checkbox"]').checked = true;
                    taskItem.classList.add('line-through', 'text-gray-400');
                }
            });
        });


   