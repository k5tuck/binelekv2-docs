# Password Protection Setup for Internal Docs

This site requires authentication for access. **Vercel Deployment Protection** is the recommended method.

## Method 1: Vercel Deployment Protection (Recommended)

Vercel provides built-in deployment protection that doesn't require code changes.

### Setup Steps:

1. **Go to Vercel Project Settings**
   - Navigate to your project in Vercel dashboard
   - Go to Settings → Deployment Protection

2. **Enable Password Protection**
   - Select "Password Protection"
   - Set a strong password
   - Save settings

3. **Share Credentials**
   - Share the password with team members via secure channel (1Password, etc.)
   - Users will be prompted for password on first visit
   - Browser will remember authentication

### Advantages:
- No code changes needed
- Built into Vercel
- Supports multiple password levels (Preview/Production)
- Easy to rotate passwords
- Works with any static site

---

## Current Configuration

**Recommended:** Use Vercel Deployment Protection (Method 1)

**Status:** Pending deployment configuration

**URL:** https://internal.binelek.io

**Access:** Once configured, password will be shared via 1Password

---

## Testing Authentication

After setting up protection:

1. Open https://internal.binelek.io in incognito window
2. Verify password prompt appears
3. Test with correct password → should grant access
4. Test with wrong password → should deny access

---

## Rotating Passwords

### Vercel Deployment Protection:
1. Go to Settings → Deployment Protection
2. Click "Change Password"
3. Enter new password
4. Save and notify team

---

**Last Updated:** 2025-11-25
**Maintained By:** Binelek DevOps Team
