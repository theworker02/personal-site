import "server-only";

export type ContactRecord = {
  name: string;
  email: string;
  intent: string;
  body: string;
  receivedAt: string;
  ip: string;
};

export function isSlackWebhook(url: string) {
  try {
    const host = new URL(url).hostname;
    return host === "hooks.slack.com";
  } catch {
    return false;
  }
}

/** Slack Incoming Webhooks expect text/blocks — not our raw contact JSON. */
export function toSlackIncomingWebhookPayload(record: ContactRecord) {
  const preview =
    record.body.length > 2800 ? `${record.body.slice(0, 2800)}…` : record.body;

  return {
    text: `New contact · ${record.intent} · ${record.name} <${record.email}>`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `Contact · ${record.intent}`,
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Name*\n${record.name}` },
          { type: "mrkdwn", text: `*Email*\n${record.email}` },
          { type: "mrkdwn", text: `*Intent*\n${record.intent}` },
          { type: "mrkdwn", text: `*When*\n${record.receivedAt}` },
        ],
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `*Message*\n${preview}` },
      },
      {
        type: "context",
        elements: [{ type: "mrkdwn", text: `IP \`${record.ip}\` · theworker02 contact form` }],
      },
    ],
  };
}

export function webhookPayload(url: string, record: ContactRecord): unknown {
  if (isSlackWebhook(url)) return toSlackIncomingWebhookPayload(record);
  return record;
}
