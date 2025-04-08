document.getElementById("calculate-btn").addEventListener("click", function() {
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        document.getElementById("result").innerHTML = "Please enter valid height and weight!";
        document.getElementById("result").style.color = "#e74c3c";
        return;
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    let category, color;
    if (bmi < 18.5) {
        category = "Underweight";
        color = "#3498db";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Normal weight";
        color = "#2ecc71";
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = "Overweight";
        color = "#f39c12";
    } else {
        category = "Obese";
        color = "#e74c3c";
    }

    document.getElementById("result").innerHTML = `Your BMI is <span style="color: ${color}">${bmi}</span> (${category})`;
});
