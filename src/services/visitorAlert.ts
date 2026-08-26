import { DEVELOPER_INFO } from '../data/systemInfo';

export interface VisitorPayload {
  timestamp: string;
  url: string;
  referrer: string;
  userAgent: string;
  language: string;
  screenResolution: string;
  timeZone: string;
  platform: string;
}

/**
 * Dispatches automated visitor telemetry to the developer's registered notification receiver.
 * Directly targeted to rishiadik54@gmail.com via FormSubmit AJAX service with session throttling.
 */
export async function trackVisitorTelemetry(): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  // Session debounce: only trigger once per browser session
  const SESSION_KEY = 'portfolio_session_alert_sent';
  if (sessionStorage.getItem(SESSION_KEY)) {
    return false;
  }

  const payload: VisitorPayload = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    referrer: document.referrer || 'Direct Visit / Bookmark',
    userAgent: navigator.userAgent,
    language: navigator.language || 'en-US',
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    platform: navigator.platform || 'Unknown',
  };

  try {
    sessionStorage.setItem(SESSION_KEY, 'true');

    // Direct transmission to developer's verified email address: rishiadik54@gmail.com
    const targetEmail = DEVELOPER_INFO.contacts.email || 'rishiadik54@gmail.com';
    const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `⚡ [PORTFOLIO ALERT] New Visitor Landed on ${DEVELOPER_INFO.name}'s Portfolio`,
        _template: 'table',
        _captcha: 'false',
        name: 'Portfolio Visitor Telemetry',
        email: targetEmail,
        timestamp: new Date().toLocaleString(),
        url: payload.url,
        referrer: payload.referrer,
        timeZone: payload.timeZone,
        screen: payload.screenResolution,
        platform: payload.platform,
      }),
    });

    return response.ok;
  } catch (err) {
    console.debug('Telemetry dispatch notice:', err);
    return false;
  }
}
