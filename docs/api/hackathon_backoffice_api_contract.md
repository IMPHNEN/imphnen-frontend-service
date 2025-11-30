# Hackathon Backoffice API Contract

## GET /api/v1/dashboard

### Purpose

Single endpoint delivering aggregated metrics for the IMPHNEN x Kolosal.ai Hackathon dashboard.

### Authentication & Authorization

- Requires admin (backoffice) scope: e.g. `role=admin`
- 401 if unauthenticated, 403 if authenticated but lacking required scope.

### Examples

```
GET /api/v1/hackathon/dashboard
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

## Rate Limiting

- Suggested: 30 requests / minute / admin user.
- Return 429 with `Retry-After` header.

---

**Revision History**

- v1.0.0 (2025-11-30): Initial contract drafted.
