document.addEventListener('DOMContentLoaded', function() {
    const addReminderBtn = document.getElementById('add-reminder-btn');
    const reminderList = document.getElementById('reminders');
    let reminders = JSON.parse(localStorage.getItem('reminders')) || [];

   
    function loadReminders() {
        reminderList.innerHTML = '';
        reminders.forEach((reminder, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <span>${reminder.name}</span> - 
                    ${reminder.dosage} at ${reminder.time}
                </div>
                <button class="delete-btn" data-id="${index}">❌ Delete</button>
            `;
            reminderList.appendChild(li);
            checkReminderTime(reminder);
        });
    }

  
    addReminderBtn.addEventListener('click', function() {
        const medName = document.getElementById('med-name').value;
        const medTime = document.getElementById('med-time').value;
        const medDosage = document.getElementById('med-dosage').value;

        if (!medName || !medTime || !medDosage) {
            alert('Please fill all fields!');
            return;
        }

        const newReminder = {
            name: medName,
            time: medTime,
            dosage: medDosage
        };

        reminders.push(newReminder);
        localStorage.setItem('reminders', JSON.stringify(reminders));
        loadReminders();

      
        document.getElementById('med-name').value = '';
        document.getElementById('med-time').value = '';
        document.getElementById('med-dosage').value = '';
    });

   
    reminderList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-id');
            reminders.splice(index, 1);
            localStorage.setItem('reminders', JSON.stringify(reminders));
            loadReminders();
        }
    });

   
    function checkReminderTime(reminder) {
        const now = new Date();
        const [hours, minutes] = reminder.time.split(':');
        const reminderTime = new Date();
        reminderTime.setHours(hours, minutes, 0, 0);

        const timeDiff = reminderTime - now;
        if (timeDiff > 0 && timeDiff <= 60000) { 
            setTimeout(() => {
                alert(`⏰ REMINDER: Take ${reminder.dosage} of ${reminder.name} now!`);
            }, timeDiff);
        }
    }

  
    setInterval(() => {
        reminders.forEach(checkReminderTime);
    }, 60000);

  
    loadReminders();
});