Feature: reqres

Scenario: API Validation
    Given a user visits reqres website
    When the user can see a list of api endpoints
    Then 1. GET | List Users
    Then 2. GET | Single User
    Then 3. GET | Single user not found
    Then 4. GET | List <Resource>
    Then 5. GET | Single <Resource>
    Then 6. GET | Single <Resource> Not Found
    Then 7. POST | Create
    Then 8. PUT | Update
    Then 9. PATCH | Update
    Then 10. DELETE | Delete
    Then 11. POST | Register - Successful
    Then 12. POST | Register - Unsuccessful
    Then 13. POST | Login - Successful
    Then 14. POST | Login - Unsuccessful
    Then 15. GET | Delayed Response