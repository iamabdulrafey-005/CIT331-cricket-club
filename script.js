const form = document.getElementById("registrationForm");
const registrationsList = document.getElementById("registrations");
const message = document.getElementById("message");
const clearButton = document.getElementById("clearButton");

function showRegistrations() {
    const registrations = JSON.parse(localStorage.getItem("cricketRegistrations")) || [];

    registrationsList.innerHTML = "";

    if (registrations.length === 0) {
        const item = document.createElement("li");
        item.textContent = "No registrations yet.";
        registrationsList.appendChild(item);
        return;
    }

    registrations.forEach(function(registration) {
        const item = document.createElement("li");
        item.textContent =
            registration.name + " - " +
            registration.email + " - " +
            registration.phone + " - " +
            registration.event + " - Heard from: " +
            registration.referral;
        registrationsList.appendChild(item);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const registration = {
        name: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        event: document.getElementById("event").value,
        referral: document.querySelector('input[name="referral"]:checked').value
    };

    const registrations = JSON.parse(localStorage.getItem("cricketRegistrations")) || [];
    registrations.push(registration);

    localStorage.setItem("cricketRegistrations", JSON.stringify(registrations));
    console.log(localStorage.getItem("cricketRegistrations"));

    message.textContent = "Registration saved successfully!";
    form.reset();
    showRegistrations();
});

clearButton.addEventListener("click", function() {
    localStorage.removeItem("cricketRegistrations");
    message.textContent = "All registrations have been cleared.";
    showRegistrations();
});

showRegistrations();
