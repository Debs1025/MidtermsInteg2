## CozyClip Backend (Sprint)

Run:

```bash
npm install
npm run dev
```

Environment:

- APP_BASE_URL: Frontend base URL used in verification links (default: http://localhost:5173)
- PORT: Server port (default: 4000)

Endpoints:

- POST /auth/register
  - body: { firstName, lastName, email, password, confirmPassword, userType: "Student"|"Teacher"|"Parent", teacherCode? }
  - rules: password >= 8 chars, includes letters and numbers; teacher requires teacherCode
  - result: 201 with message, sends mock email link to console
  - sample:
    ```bash
    curl -X POST http://localhost:4000/auth/register \
      -H 'Content-Type: application/json' \
      -d '{
        "firstName":"Ada",
        "lastName":"Lovelace",
        "email":"ada@example.com",
        "password":"read1234",
        "confirmPassword":"read1234",
        "userType":"Teacher",
        "teacherCode":"CLASS-123"
      }'
    ```

- GET /auth/verify-email?token=...
  - marks user verified
  - token is logged in the console from the mock email service

- GET /home?userId=...
  - returns home screen data for verified users
  - sample:
    ```bash
    curl "http://localhost:4000/home?userId=<USER_ID>"
    ```

- GET /health
  - health check


