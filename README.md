# JAZARI

**A Joint System of AIs for Zonal Automation with Reporting & Insights**

JAZARI is an open-source, plugin-based management system designed to reduce the administrative and instructional workload on teachers. Currently focused on the classroom environment, it provides a suite of AI-powered tools that automate repetitive tasks, enhance teaching efficiency, and deliver meaningful insights.

The system is built with adaptability in mind. While the current version is optimized for classrooms, future releases will support multiple environments, with each environment featuring its own tailored layout and tools.

---

## Core System

The JAZARI Core is distributed as a Docker image and serves as the foundation of the platform. It includes:

- User and role management (Admin, Teachers, Students)
- Class and schedule management
- Plugin management system
- Environment configuration framework

**Download and setup instructions** are available on the official website:  
[https://jazari.netlify.app/](https://jazari.netlify.app/)

---

## Plugin Architecture

JAZARI follows a modular plugin-based design. Administrators can browse, download, and install plugins from the official marketplace. Users may also request new plugins or develop their own using provided templates.

The system is completely open source and free to use, modify, and distribute.

---

## Available Plugins

Six plugins have been developed to support teachers in the classroom environment:

### AERO – Automated Attendance
Uses the classroom camera or a connected webcam to capture a class snapshot. Employs face detection and recognition algorithms to mark attendance automatically, reducing the process to approximately 1-2 minutes.

### JAZ – Smart Lecture Assistant
A real-time AI assistant available during lectures. Teachers upload the lecture PDF, after which the system can answer questions based strictly on the provided material.

### ZENITH – AI Quiz Generator and Proctor
Generates web-based quizzes from lecture PDFs or topic lists. Quizzes can be shared via link or QR code. The system includes robust proctoring features, a live teacher dashboard with real-time scores, and the ability to end a quiz at any time. Detailed reports are generated after each quiz.

### ROBERTA – Student Attention Tracker
Uses camera input to monitor student attention levels during lectures. Currently in the research phase; accuracy may vary.

### IKARIS – AI Summarizer
Processes lecture PDFs to generate two types of summaries: a brief document and a comprehensive study guide (similar in style to NotebookLM).

### PRESENTA – AI Presentation Generator
Takes a lecture PDF or list of topics as input. Teachers can select a preferred style, after which the system generates HTML-based presentation slides that can be downloaded and used immediately.

---

## Getting Started

1. Visit the official website at [https://jazari.netlify.app/](https://jazari.netlify.app/) and download the Core System.
2. Follow the provided Docker installation instructions.
3. Access the admin dashboard to configure users, classes, and plugins.
4. Browse and install the desired plugins from the marketplace.

---

## Features

- Docker-based deployment for easy setup
- Modular plugin system
- Environment-aware interface (classroom-focused in current version)
- Open-source and free
- Extensible architecture for future environments

---

## Future Development

- Support for additional environments with environment-specific layouts
- Expanded plugin ecosystem
- Enhanced AI capabilities and reporting tools
- Community contributions and plugin templates

---

## Contributing

Contributions are welcome. Developers, educators, and researchers are encouraged to participate by:

- Reporting issues
- Suggesting new features or plugins
- Submitting pull requests
- Improving documentation

---

## License

JAZARI is released under the MIT License. It is free for both personal and commercial use.

---

## Links

- **Official Website**: [https://jazari.netlify.app/](https://jazari.netlify.app/)

---

**JAZARI** – Designed to relieve teachers and support effective education through intelligent automation.
