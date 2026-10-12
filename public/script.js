
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMahfKZgbpmRQDWmovU2X5TmGLC62Zrag",
    authDomain: "jager-week4-day1.firebaseapp.com",
    projectId: "jager-week4-day1",
    storageBucket: "jager-week4-day1.firebasestorage.app",
    messagingSenderId: "112666126781",
    appId: "1:112666126781:web:717c96f4da9b6d90bf8ad4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Retrieve projects from Firestore
async function loadProjects() {
    const container = document.getElementById("firestore-projects");

    if (!container) {
        console.error("Could not find the firestore-projects element.");
        return;
    }

    try {
        const snapshot = await getDocs(collection(db, "projects"));

        container.replaceChildren();

        if (snapshot.empty) {
            container.textContent = "No projects found.";
            return;
        }

        snapshot.forEach((doc) => {
            const project = doc.data();

            const projectDiv = document.createElement("div");
            projectDiv.className = "project";

            const title = document.createElement("h3");
            title.textContent = project.title || "Untitled project";

            const description = document.createElement("p");
            description.textContent = project.description || "";

            projectDiv.appendChild(title);
            projectDiv.appendChild(description);
            container.appendChild(projectDiv);
        });

    } catch (error) {
        console.error("Error loading projects:", error);
        container.textContent = "Unable to load projects.";
    }
}

loadProjects();
