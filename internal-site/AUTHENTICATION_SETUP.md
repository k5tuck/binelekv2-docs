# Password Protection Setup for Internal Docs

This site uses custom client-side password protection via sessionStorage.

## How It Works

1. **Auth Check Script** (`static/js/auth-check.js`)
   - Runs on every page load before content renders
   - Checks sessionStorage for valid authentication
   - Redirects to `/auth.html` if not authenticated
   - Sessions expire after 8 hours

2. **Login Page** (`static/auth.html`)
   - User enters password
   - Password is checked against base64-encoded hash
   - On success, sets sessionStorage and redirects to home

## Files

- `static/auth.html` - Login page with password form
- `static/js/auth-check.js` - Auth verification script
- `docusaurus.config.js` - Includes auth-check.js in scripts

## Current Password

**Default Password:** `binelek-internal-2025`

To generate a new password hash:
```javascript
// In browser console
btoa('your-new-password')
```

## Changing the Password

1. Generate new hash: `btoa('new-password')`
2. Edit `static/auth.html`
3. Update `HASHED_PASSWORD` constant
4. Redeploy the site
5. Notify team of new password

```javascript
// In static/auth.html
const HASHED_PASSWORD = 'bmV3LXBhc3N3b3Jk'; // btoa('new-password')
```

## Session Configuration

The session timeout is configured in `static/js/auth-check.js`:

```javascript
// Session timeout: 8 hours (in milliseconds)
const SESSION_TIMEOUT = 8 * 60 * 60 * 1000;
```

To change timeout, modify this value and redeploy.

## Testing Authentication

1. Open https://internal.binelek.io in incognito window
2. Verify login page appears
3. Test with correct password → should redirect to docs
4. Test with wrong password → should show error
5. Close browser, reopen → should require login again

## Security Notes

- This is client-side protection suitable for internal docs
- Password is base64 encoded (obfuscation, not encryption)
- For highly sensitive content, use server-side authentication
- Sessions are stored in sessionStorage (cleared on browser close)
- Do not use for PII or highly confidential data

## Troubleshooting

### Login page appears repeatedly
- Clear sessionStorage: `sessionStorage.clear()`
- Check browser allows sessionStorage

### Password not working
- Verify password is exactly correct (case-sensitive)
- Check HASHED_PASSWORD matches `btoa('password')`

### Auth not redirecting
- Check `/js/auth-check.js` loads in Network tab
- Verify script is included in docusaurus.config.js

---

**Last Updated:** 2025-11-25
**Maintained By:** Binelek DevOps Team
