**Multiplayer NEET Quiz Game**

This project is a multiplayer NEET (National Eligibility cum Entrance Test) quiz game built using SQL databases and Node.js backend with WebSocket integration. With a repository of 100 NEET-related questions stored in a SQL database, this interactive quiz game allows multiple players to compete against each other in real-time.

**Key Features:**

- **SQL Database:** Utilizes a SQL database to store a repository of 100 NEET questions, categorized by subject and difficulty level.

- **Node.js Backend:** Employs Node.js as the backend framework, providing a scalable architecture for handling user requests, managing game sessions, and interacting with the SQL database.

- **WebSocket Integration:** Implements WebSocket for real-time communication between players and the server, enabling seamless multiplayer interaction during the quiz sessions.

- **Multiplayer Gameplay:** Allows multiple players to join a quiz session simultaneously and compete against each other to answer NEET-related questions within a specified time limit.

- **Scoring System:** Tracks players' scores based on the correctness and speed of their answers, providing instant feedback and displaying the leaderboard in real-time.

- **Dynamic Question Selection:** Randomly selects questions from the SQL database for each quiz session, ensuring variety and unpredictability in gameplay.

**Usage:**

1. **Join Quiz Session:** Players can join a quiz session by accessing the game through a web browser.
  
2. **Answer Questions:** Once the quiz session starts, players are presented with NEET-related questions and must choose the correct answer from the multiple-choice options.
  
3. **Compete in Real-time:** Players compete against each other to answer questions accurately and quickly, earning points based on their performance.
  
4. **View Leaderboard:** A real-time leaderboard displays players' scores and rankings throughout the quiz session.
  
5. **End of Session:** The quiz session concludes after a predefined number of questions or a specified time limit, and the final scores are displayed.

**Dependencies:**

- Node.js
- SQL database MySQL
- WebSocket library (e.g., Socket.IO)

**Installation:**

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up the SQL database and import the provided schema containing the NEET questions.
4. Configure database connection settings in the Node.js backend.
5. Run the application using `npm start`.

**Contributing:**

Contributions are welcome! Feel free to open issues or submit pull requests to enhance the functionality, add new features, or address any bugs.

