# Admin Login Implementation Plan

## Goal Description

Implement a quick admin login page at `/admin` with default credentials to allow the user to access the application without Google Sign-In. This involves adding backend support for custom JWT authentication and a frontend login interface.

## User Review Required

> [!IMPORTANT]
> A `JWT_SECRET` will be added to `server/.env`. Ensure this key is kept secure in production.

## Proposed Changes

### Server (`server/`)

#### [NEW] Dependency

- `jsonwebtoken`: For generating and verifying admin session tokens.

#### [MODIFY] `.env`

- Add `JWT_SECRET` variable.

#### [MODIFY] `src/middlewares/auth.js`

- Update `authMiddleware` to verify both Google ID tokens and custom JWTs.
- If the token is a valid custom JWT, populate `req.user` with admin details.

#### [MODIFY] `src/controllers/authController.js`

- Add `adminLogin` function:
  - Verify hardcoded credentials (`admin` / `memmart2026`).
  - Ensure an admin user exists in the database (create if not).
  - Generate and return a JWT signed with `JWT_SECRET`.
  - Return user data matching the `LoginResponse` format.

#### [MODIFY] `src/routes/authRoutes.js`

- Add `POST /admin-login` route pointing to `authController.adminLogin`.

### Client (`client/`)

#### [NEW] `app/admin/page.tsx`

- Create a login page component.
- Include a form for username and password.
- On submit, call the `adminLogin` service.
- On success, store the token and redirect to `/dashboard`.

#### [MODIFY] `services/authService.ts`

- Add `adminLogin(username, password)` function to call the backend endpoint.

## Verification Plan

### Manual Verification

1.  **Server Setup**:
    - Build and restart the server to apply changes.
2.  **Admin Login**:
    - Navigate to `http://localhost:3000/admin`.
    - Enter `username: admin` and `password: memmart2026`.
    - Click Login.
    - Verify redirection to `/dashboard`.
    - refresh the page to ensure the session persists.
3.  **Regular Login**:
    - Verify that Google Sign-In still works (if possible without breaking current session).
