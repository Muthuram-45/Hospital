const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");

const usersFile = "./sample.json";
const appointmentsFile = "./appointments.json";

const app = express();
const port = 8000;



app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],

}));
app.use(express.json());
app.use(bodyParser.json());

// Utility function to read a JSON file
const readFile = (file) => {
    try {
        return JSON.parse(fs.readFileSync(file, "utf8"));
    } catch (error) {
        return [];
    }
};

// Utility function to write to a JSON file
const writeFile = (file, data, res, successMessage) => {
    fs.writeFile(file, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        return res.json({ message: successMessage, data });
    });
};

// Display all users
app.get("/users", (req, res) => {
    const users = readFile(usersFile);
    res.json(users);
});

// Add a new user
app.post("/users", (req, res) => {
    const { name, phonenumber, city } = req.body;
    if (!name || !phonenumber || !city) {
        return res.status(400).json({ message: "All fields are required." });
    }
    const users = readFile(usersFile);
    const newUser = { id: Date.now(), name, phonenumber, city };
    users.push(newUser);
    writeFile(usersFile, users, res, "User added successfully");
});

// Update a user
app.patch("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, phonenumber, city } = req.body;
    const users = readFile(usersFile);
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "User not found." });
    }
    users[index] = { id, name, phonenumber, city };
    writeFile(usersFile, users, res, "User updated successfully");
});

// Delete a user
app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    let users = readFile(usersFile);
    users = users.filter((user) => user.id !== id);
    writeFile(usersFile, users, res, "User deleted successfully");
});

// Get all appointments
app.get("/appointments", (req, res) => {
    const appointments = readFile(appointmentsFile);
    res.json(appointments);
});

// Book an appointment
app.post("/appointments", (req, res) => {
    const { name, date, time, doctor, payment_id } = req.body;

    if (!name || !date || !time || !doctor || !payment_id) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const appointments = readFile(appointmentsFile);
    const newAppointment = { id: Date.now(), name, date, time, doctor, payment_id };
    appointments.push(newAppointment);

    writeFile(appointmentsFile, appointments, res, "Appointment booked successfully");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
