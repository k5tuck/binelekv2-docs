---
sidebar_position: 3
---

# Cybersecurity Scanner

Cybersecurity Scanner helps you monitor your business's security posture, track compliance, and protect against threats.

## Features

### Security Score
Get an instant overview of your security health with our 0-100 security score.

**Score Components:**
- Authentication security (MFA adoption)
- Access controls
- Data encryption
- Compliance status

### MFA Monitoring
Track which team members have multi-factor authentication enabled.

**Why it matters:**
- MFA blocks 99.9% of automated attacks
- Required for many compliance frameworks
- Protects against password breaches

### Issue Detection
Automatically detect and alert on security issues.

**Detected Issues:**
- Users without MFA
- Weak password policies
- Unusual login attempts
- Outdated integrations
- Exposed credentials

### Compliance Tracking
Track your progress on security compliance requirements.

**Supported Frameworks:**
- SOC 2
- GDPR
- PCI-DSS
- HIPAA (coming soon)

## Getting Started

### Understanding Your Security Score

Your security score is calculated based on:

| Factor | Weight | Description |
|--------|--------|-------------|
| MFA Adoption | 30% | % of users with MFA enabled |
| Access Controls | 25% | Proper role-based access |
| Data Security | 25% | Encryption and data handling |
| Compliance | 20% | Checklist completion |

### Enabling MFA for Your Team

1. Go to **Settings > Team**
2. Click on a team member
3. Select **Require MFA**
4. The user will receive setup instructions via email

### Resolving Security Issues

1. Go to **Cybersecurity Scanner**
2. Review the **Security Issues** section
3. Click on any issue to see details
4. Follow the recommended remediation steps
5. Mark as resolved when fixed

## Compliance Checklist

We help you track common security requirements:

### Authentication
- [ ] Password policy enforced (min 8 chars, complexity)
- [ ] MFA enabled for all admin users
- [ ] MFA enabled for all users
- [ ] Session timeout configured

### Access Control
- [ ] Role-based permissions defined
- [ ] Least privilege principle applied
- [ ] Regular access reviews scheduled
- [ ] Offboarding process documented

### Data Protection
- [ ] Data encrypted at rest
- [ ] Data encrypted in transit
- [ ] Backup policy configured
- [ ] Data retention policy defined

### Incident Response
- [ ] Incident response plan documented
- [ ] Contact list maintained
- [ ] Regular training conducted
- [ ] Post-incident review process

## Security Best Practices

1. **Enable MFA for everyone** - Make it mandatory, not optional
2. **Review access regularly** - Remove access for departed employees immediately
3. **Use strong passwords** - Require complex passwords and regular rotation
4. **Monitor for unusual activity** - Set up alerts for suspicious behavior
5. **Keep integrations updated** - Reconnect integrations when prompted

## Alerts and Notifications

Configure alerts for security events:

| Alert Type | Default | Customizable |
|------------|---------|--------------|
| New security issue | Email | Yes |
| MFA disabled | Email | Yes |
| Unusual login | Push | Yes |
| Compliance deadline | Email | Yes |

## Frequently Asked Questions

**Q: Is my data secure on the platform?**
A: Yes! We use AES-256 encryption, SOC 2 certified infrastructure, and never store your credentials in plain text.

**Q: Can I get notified immediately about security issues?**
A: Yes, enable push notifications in Settings > Notifications for real-time alerts.

**Q: What if I can't enable MFA for a specific user?**
A: You can grant exceptions, but they will negatively impact your security score.
