// Auth check for Binelek Internal Docs
// Redirects to login page if user is not authenticated

(function() {
  'use strict';

  // Don't check auth on the login page itself
  if (window.location.pathname === '/auth.html') {
    return;
  }

  // Check if user is authenticated
  const isAuthenticated = sessionStorage.getItem('binelek-internal-auth') === 'true';
  const authTime = parseInt(sessionStorage.getItem('binelek-internal-auth-time'), 10);
  const now = Date.now();

  // Session timeout: 8 hours (in milliseconds)
  const SESSION_TIMEOUT = 8 * 60 * 60 * 1000;

  // Check if auth is valid and not expired
  if (!isAuthenticated || !authTime || (now - authTime) > SESSION_TIMEOUT) {
    // Clear expired auth
    sessionStorage.removeItem('binelek-internal-auth');
    sessionStorage.removeItem('binelek-internal-auth-time');

    // Redirect to login
    window.location.href = '/auth.html';
  }
})();
