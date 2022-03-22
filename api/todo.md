# Todo's (by importance)

## Severe

- Whenever a user adds a friend, or sends a message, we must update BOTH user objects. As of now, we ae only updating the user making the requests.

### Semi-Severe

- Before adding a friend, make sure the friends isn't already added in the users friend array.
- Update method of storing JWT token client-side.

#### Important

- Data validation and sanitation for all user endpoints that send data in.
- Split messages endpoints into its own controller file.
- Clean up un used schema files that I merged into the user schemas.
