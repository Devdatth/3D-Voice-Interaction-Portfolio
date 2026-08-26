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
 * Uses Formspree / Webhook gateway configured for Rishiadik54@gmail.com with safe local throttling
 * to avoid spamming multiple emails on simple page refreshes within the same session.
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

    // Transmit to Formspree endpoint (or developer webhook)
    const response = await fetch('https://formspree.io/f/mqkvrvbw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        subject: `⚡ [PORTFOLIO ALERT] New Visitor Landed on ${DEVELOPER_INFO.name}'s Portfolio`,
        recipient: DEVELOPER_INFO.contacts.email,
        visitorData: payload,
        timestamp: new Date().toLocaleString(),
      }),
    });

    return response.ok;
  } catch (err) {
    // Fail gracefully without interrupting user experience
    console.debug('Telemetry dispatch notice:', err);
    return false;
  }
}
