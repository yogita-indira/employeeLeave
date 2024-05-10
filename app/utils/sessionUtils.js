// path/to/sessionUtils.js

import { setCookie, destroyCookie } from 'nookies';

export function setSession(token) {
  setCookie(null, 'token', token, {
    httpOnly: true,
    maxAge: 3600, // 1 hour expiry
    sameSite: 'lax',
    path: '/',
  });
}

export function getSession() {
  const cookies = parseCookies();
  return cookies.token || null;
}

export function clearSession() {
  destroyCookie(null, 'token');
}
