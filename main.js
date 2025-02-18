function showMessage() {
    alert("Hello! You launched your local website successfully.");
}

function calculateSum() {
    let a = parseFloat(document.getElementById("num1").value);
    let b = parseFloat(document.getElementById("num2").value);
    let sum = a + b;
    document.getElementById("sumResult").innerText = "Sum: " + sum;
}