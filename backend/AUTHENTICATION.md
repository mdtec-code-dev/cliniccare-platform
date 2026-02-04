# 🔐 Authentication System

## Overview
JWT-based authentication system with role-based access control (RBAC) for the ClinicCare Platform.

## Features

### 1. Login with JWT
- Email/password authentication
- Returns access and refresh tokens
- Access token lifetime: 15 minutes
- Refresh token lifetime: 7 days

**Endpoint:** `POST /api/auth/login/`

```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "Juan",
    "last_name": "Pérez",
    "role": "doctor"
  }
}
```

### 2. Refresh Token
- Automatically rotate tokens for security
- Invalidate old refresh tokens after rotation
- Extend session without re-login

**Endpoint:** `POST /api/auth/refresh/`

```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### 3. User Registration
- Self-registration with email validation
- Password confirmation
- Role assignment

**Endpoint:** `POST /api/auth/register/`

```json
{
  "email": "newuser@example.com",
  "first_name": "Carlos",
  "last_name": "García",
  "password": "secure_password",
  "password_confirm": "secure_password",
  "role": "patient"
}
```

### 4. Basic Roles

| Role | Permission Level | Use Case |
|------|-----------------|----------|
| **admin** | Full access | Platform administrators |
| **doctor** | Patient data access | Medical professionals |
| **staff** | Limited patient data | Clinical staff |
| **patient** | Own data only | End users |

### Role-Based Endpoints

#### Admin Only
- `GET /api/users/` - List all users
- `GET /api/users/{id}/` - User details
- User management endpoints

#### All Authenticated Users
- `GET /api/auth/me/` - Current user profile
- `PATCH /api/auth/me/` - Update profile

#### Doctor/Staff
- Patient data endpoints (based on appointments)

#### Patient
- Own appointment/record access

## Implementation

### Configuration

```python
# settings.py
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}
```

### Usage in Views

```python
from rest_framework.permissions import IsAuthenticated
from auth.permissions import IsAdmin, IsDoctor

class SomeView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    
    def get(self, request):
        user_role = request.user.role
        # ...
```

### JWT Claims

Tokens include:
- `sub` - User ID
- `email` - User email
- `role` - User role
- `exp` - Expiration time
- `iat` - Issued at time

## Security Best Practices

1. **Store tokens securely** - Use httpOnly cookies or secure storage
2. **HTTPS only** - Always use HTTPS in production
3. **Refresh token rotation** - Old tokens are invalidated after refresh
4. **Password requirements** - Minimum 8 characters
5. **CORS configuration** - Restrict to trusted domains

## Database Models

### User Model

```
- id (UUID)
- email (unique)
- first_name
- last_name
- role (choices: admin, doctor, staff, patient)
- is_active
- created_at
- updated_at
```

## API Reference

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/auth/login/` | User login | No |
| POST | `/api/auth/refresh/` | Refresh access token | No |
| POST | `/api/auth/register/` | Register new user | No |
| GET | `/api/auth/me/` | Current user profile | Yes |
| PATCH | `/api/auth/me/` | Update user profile | Yes |
| GET | `/api/users/` | List users (admin) | Yes (Admin) |
| GET | `/api/users/{id}/` | User details (admin) | Yes (Admin) |

## Next Steps

1. Setup PostgreSQL database
2. Run migrations: `python manage.py migrate`
3. Create superuser: `python manage.py createsuperuser`
4. Configure environment variables
5. Test endpoints with Postman/curl
6. Integrate with frontend (Next.js)
