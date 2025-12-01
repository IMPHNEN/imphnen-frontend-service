# Hackathon Backoffice API Contract

## GET /api/v1/admin/dashboard

### Purpose

Single endpoint delivering aggregated metrics for the IMPHNEN x Kolosal.ai Hackathon dashboard.

### Authentication & Authorization

- Requires admin (backoffice) scope: e.g. `role=admin`
- 401 if unauthenticated, 403 if authenticated but lacking required scope.

### Examples

```
GET /api/v1/admin/dashboard
```

### Response Schema

```jsonc
{
  "data": {
    "total_participants": 1261,
    "total_teams": 206,
    "total_submissions": 0 // Total project submitted
  }
}
```

### Field Types

| Path                      | Type    | Notes                 |
| ------------------------- | ------- | --------------------- |
| `data.total_participants` | integer | >= 0                  |
| `data.total_teams`        | integer | >= 0                  |
| `data.total_submissions`  | integer | <= `data.total_teams` |

### Errors

| Status | Code             | Message                       | Notes                 |
| ------ | ---------------- | ----------------------------- | --------------------- |
| 401    | `unauthorized`   | `authentication required`     | Missing/invalid token |
| 403    | `forbidden`      | `insufficient permissions`    | Lacks required scope  |
| 429    | `rate_limited`   | `too many dashboard requests` | Rate limiting         |
| 500    | `internal_error` | `unexpected server error`     | Unhandled exception   |

---

## GET /api/v1/admin/users

### Purpose

Retrieve paginated list of hackathon participants with filtering, searching, and sorting capabilities for backoffice user management.

### Authentication & Authorization

- Requires admin (backoffice) scope: e.g. `role=admin`
- 401 if unauthenticated, 403 if authenticated but lacking required scope.

### Query Parameters

| Parameter    | Type    | Required | Default      | Description                                                   |
| ------------ | ------- | -------- | ------------ | ------------------------------------------------------------- |
| `page`       | integer | No       | 1            | Page number (1-based)                                         |
| `limit`      | integer | No       | 20           | Items per page (1-100)                                        |
| `search`     | string  | No       | -            | Search by name or location (case-insensitive)                 |
| `status`     | string  | No       | `all`        | Filter by status: `all`, `active`, `inactive`                 |
| `location`   | string  | No       | `all`        | Filter by location or `all`                                   |
| `skills`     | string  | No       | -            | Comma-separated skill filters                                 |
| `sort_by`    | string  | No       | `created_at` | Sort field: `fullname`, `location`, `is_active`, `created_at` |
| `sort_order` | string  | No       | `desc`       | Sort order: `asc`, `desc`                                     |

### Examples

```
GET /api/v1/admin/users
GET /api/v1/admin/users?page=2&limit=10
GET /api/v1/admin/users?search=john&status=active
GET /api/v1/admin/users?location=Jakarta&skills=Frontend Developer,UI/UX Designer
GET /api/v1/admin/users?sort_by=fullname&sort_order=asc
```

### Response Schema

```jsonc
{
  "data": {
    "users": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "avatar": "https://example.com/avatars/user1.jpg", // Optional
        "fullname": "Budi Santoso",
        "bio": "Passionate developer with 5+ years experience", // Optional
        "location": "Jakarta",
        "is_active": true,
        "skills": ["Frontend Developer", "UI/UX Designer"],
        "created_at": "2024-11-15T08:30:00Z",
        "updated_at": "2024-11-30T14:22:00Z"
      }
      // ... more users
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 15,
      "total_items": 287,
      "items_per_page": 20,
      "has_next": true,
      "has_prev": false
    },
    "filters": {
      "available_locations": ["Jakarta", "Bandung", "Surabaya", "Medan", "Yogyakarta"],
      "available_skills": ["Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer", "UI/UX Designer", "Product Manager", "Data Scientist", "Mobile Developer"]
    }
  }
}
```

### Field Types

| Path                      | Type    | Notes                          |
| ------------------------- | ------- | ------------------------------ |
| `data.users[].id`         | string  | UUID format                    |
| `data.users[].avatar`     | string  | URL, nullable                  |
| `data.users[].fullname`   | string  | Required, 1-100 chars          |
| `data.users[].bio`        | string  | Optional, max 500 chars        |
| `data.users[].location`   | string  | Required, from predefined list |
| `data.users[].is_active`  | boolean | Account status                 |
| `data.users[].skills`     | array   | Array of skill strings         |
| `data.users[].created_at` | string  | ISO 8601 timestamp             |
| `data.users[].updated_at` | string  | ISO 8601 timestamp             |
| `data.pagination.*`       | integer | Pagination metadata            |

---

## GET /api/v1/admin/users/{user_id}

### Purpose

Retrieve detailed information for a specific user by ID.

### Authentication & Authorization

- Requires admin (backoffice) scope: e.g. `role=admin`

### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `user_id` | string | Yes      | User UUID   |

### Examples

```
GET /api/v1/admin/users/550e8400-e29b-41d4-a716-446655440000
```

### Response Schema

```jsonc
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "avatar": "https://example.com/avatars/user1.jpg",
    "fullname": "Budi Santoso",
    "bio": "Passionate developer with 5+ years experience",
    "location": "Jakarta",
    "is_active": true,
    "skills": ["Frontend Developer", "UI/UX Designer"],
    "created_at": "2024-11-15T08:30:00Z",
    "updated_at": "2024-11-30T14:22:00Z"
  }
}
```

---

## POST /api/v1/admin/users

### Purpose

Create a new user account in the hackathon system.

### Authentication & Authorization

- Requires admin (backoffice) scope: e.g. `role=admin`

### Request Body Schema

```jsonc
{
  "fullname": "Jane Doe", // Required, 1-100 chars
  "bio": "Experienced developer", // Optional, max 500 chars
  "location": "Jakarta", // Required, from predefined list
  "is_active": true, // Required, boolean
  "skills": ["Backend Developer"], // Optional, array of valid skills
  "avatar": "data:image/..." // Optional, base64 or URL
}
```

### Examples

```
POST /api/v1/admin/users
Content-Type: application/json

{
  "fullname": "Jane Doe",
  "bio": "Experienced developer passionate about AI and machine learning",
  "location": "Jakarta",
  "is_active": true,
  "skills": ["Backend Developer", "Data Scientist"],
  "avatar": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
}
```

### Response Schema

```jsonc
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "avatar": "https://example.com/avatars/generated_url.jpg",
    "fullname": "Jane Doe",
    "bio": "Experienced developer passionate about AI and machine learning",
    "location": "Jakarta",
    "is_active": true,
    "skills": ["Backend Developer", "Data Scientist"],
    "created_at": "2024-12-01T10:30:00Z",
    "updated_at": "2024-12-01T10:30:00Z"
  }
}
```

---

## PUT /api/v1/admin/users/{user_id}

### Purpose

Update an existing user's profile information.

### Authentication & Authorization

- Requires admin (backoffice) scope: e.g. `role=admin`

### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `user_id` | string | Yes      | User UUID   |

### Request Body Schema

```jsonc
{
  "fullname": "Jane Smith", // Optional, 1-100 chars
  "bio": "Senior developer", // Optional, max 500 chars, null to clear
  "location": "Bandung", // Optional, from predefined list
  "is_active": false, // Optional, boolean
  "skills": ["Full Stack Developer"], // Optional, array of valid skills
  "avatar": "data:image/..." // Optional, base64/URL, null to remove
}
```

### Examples

```
PUT /api/v1/admin/users/550e8400-e29b-41d4-a716-446655440000
Content-Type: application/json

{
  "fullname": "Jane Smith",
  "location": "Bandung",
  "is_active": false,
  "skills": ["Full Stack Developer", "Product Manager"]
}
```

### Response Schema

```jsonc
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "avatar": "https://example.com/avatars/user1.jpg",
    "fullname": "Jane Smith",
    "bio": "Experienced developer passionate about AI and machine learning",
    "location": "Bandung",
    "is_active": false,
    "skills": ["Full Stack Developer", "Product Manager"],
    "created_at": "2024-11-15T08:30:00Z",
    "updated_at": "2024-12-01T10:45:00Z"
  }
}
```

---

## DELETE /api/v1/admin/users/{user_id}

### Purpose

Permanently delete a user account from the hackathon system.

### Authentication & Authorization

- Requires admin (backoffice) scope: e.g. `role=admin`

### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `user_id` | string | Yes      | User UUID   |

### Examples

```
DELETE /api/v1/admin/users/550e8400-e29b-41d4-a716-446655440000
```

### Response Schema

```jsonc
{
  "data": {
    "message": "User successfully deleted",
    "deleted_user_id": "550e8400-e29b-41d4-a716-446655440000",
    "deleted_at": "2024-12-01T10:50:00Z"
  }
}
```

---

## Common Error Responses

### User Management Endpoints

| Status | Code                  | Message                          | Notes                        |
| ------ | --------------------- | -------------------------------- | ---------------------------- |
| 400    | `validation_error`    | `Invalid request data`           | Field validation failures    |
| 401    | `unauthorized`        | `Authentication required`        | Missing/invalid token        |
| 403    | `forbidden`           | `Insufficient permissions`       | Lacks required scope         |
| 404    | `user_not_found`      | `User not found`                 | Invalid user ID              |
| 409    | `user_already_exists` | `User with email already exists` | Duplicate user creation      |
| 413    | `payload_too_large`   | `Avatar file too large`          | Avatar exceeds size limit    |
| 422    | `invalid_skill`       | `Invalid skill specified`        | Skill not in allowed list    |
| 422    | `invalid_location`    | `Invalid location specified`     | Location not in allowed list |
| 429    | `rate_limited`        | `Too many requests`              | Rate limiting                |
| 500    | `internal_error`      | `Unexpected server error`        | Unhandled exception          |

### Validation Error Details

```jsonc
{
  "error": {
    "code": "validation_error",
    "message": "Invalid request data",
    "details": [
      {
        "field": "fullname",
        "code": "required",
        "message": "Full name is required"
      },
      {
        "field": "location",
        "code": "invalid_choice",
        "message": "Location must be one of: Jakarta, Bandung, Surabaya, Medan, Yogyakarta"
      }
    ]
  }
}
```

## Rate Limiting

- **Dashboard**: 30 requests / minute / admin user
- **User Management**: 100 requests / minute / admin user
- **File Upload**: 10 avatar uploads / minute / admin user
- Return 429 with `Retry-After` header

## Avatar Handling

- **Supported formats**: JPEG, PNG, WebP
- **Max file size**: 5MB
- **Recommended dimensions**: 400x400px
- **Storage**: Uploaded avatars are processed and stored with generated URLs
- **Base64 support**: Accept `data:image/*;base64,` format in requests
- **URL response**: Always return publicly accessible HTTPS URLs

---

**Revision History**

- v1.0.0 (2025-11-30): Initial contract drafted.
- v2.0.0 (2025-12-01): Added comprehensive user management endpoints with filtering, pagination, CRUD operations, and avatar handling.
