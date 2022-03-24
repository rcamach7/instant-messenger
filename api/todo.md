# Todo's (by importance)

## Severe

- When users log in and we return their token and user details - exclude the hashed password from being included. It is a security risk.

### Semi-Severe

- Before adding a friend, make sure the friends isn't already added in the users friend array.
- Update method of storing JWT token client-side.
- Implement Socket connection for adding a new friend
- Return errors on sign in or sign up to indicate what failed.

#### Important

- Data validation and sanitation for all user endpoints that send data in.
- Split messages endpoints into its own controller file.
- Clean up un used schema files that I merged into the user schemas.
