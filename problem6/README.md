### Activity Score System Description

1. Introduction:
    This system is designed to calculate activity scores for users when they perform actions on an application.

2. Purpose:
    - Encourage users to engage and use the application frequently.
    - Track user activity levels to assess their level of engagement with the application.
    - Use activity scores to implement incentive and reward policies for users.

3. System Flow
    3.1: User performs an action on the frontend.
    3.2: Frontend sends a request to the backend API.
         - The request includes information about the action (GET, POST, PUT, DELETE, UPDATE...) performed and the user ID.
    3.3: Backend API processes the request.
         - Authenticates user information and the action performed.
         - Returns data to the correct user if the user is valid.
         - Accesses the MySQL database to retrieve the user's current activity score.
         - Increases the user's activity score by 1.
         - Updates the new activity score to the MySQL database.
         - Returns new list tops score.
    3.4: Frontend displays the new activity score to the user.

4. System Architecture
    - The system is divided into three main layers:
      1. Presentation Layer: Provides the user interface for users to perform actions and display activity scores.
      2. Business Logic Layer: Handles activity score calculation logic, including information validation, database access, and score updates.
      3. Data Access Layer: Interacts with the MySQL database to access and manipulate activity score data.

5. Key Features
    - Calculate activity scores for users as they perform actions.
    - Display the user's current activity points.
    - Store the user's activity score history.
    - Provide an API for managing activity scores (add, delete, update).