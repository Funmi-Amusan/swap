# Email Setup with Resend

## Overview

SWAPPED now uses Resend to send confirmation emails to users when they complete the trade-in swap process.

## Setup Instructions

### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (3,000 emails/month free)
3. Verify your email address

### 2. Get Your API Key

1. Log in to your Resend dashboard
2. Go to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "SWAPPED Production")
5. Copy the API key (starts with `re_`)

### 3. Add API Key to Environment

Add your Resend API key to `.env.local`:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
```

### 4. Configure Sending Domain (Optional but Recommended)

For production, you should verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `swapped.com`)
4. Add the DNS records to your domain provider
5. Wait for verification

Once verified, update the email sender in `/app/lib/email.ts`:

```typescript
from: "SWAPPED <noreply@yourdomain.com>";
```

## Email Features

### What Gets Sent

When a user completes their swap quote, they receive an email containing:

- **Swap Quote Summary** with estimated amount to pay
- **Trade-In Device Details** and value
- **New Device Details** and price
- **Next Steps** based on swap method (online vs in-store)
- **Contact Information** for support

### Email Template

The email template is located in `/app/lib/email.ts` and includes:

- Responsive HTML design
- Clean, professional styling
- Brand colors and logo
- Clear call-to-action
- Mobile-friendly layout

## Testing

### Test in Development

1. Make sure your `.env.local` has the RESEND_API_KEY set
2. Go to `/tradein` on your local server
3. Complete the swap flow with a real email address
4. Check the email inbox for the confirmation

### Test Email Sending

You can test the email function directly:

```typescript
import { sendSwapConfirmationEmail } from "@/app/lib/email";

await sendSwapConfirmationEmail({
  to: "test@example.com",
  swapDetails: {
    tradeInPhone: { model: "iPhone 13 Pro 256GB" },
    newPhone: {
      model: "iPhone 15 Pro",
      storage: "256GB",
      category: "Used Premium Grade A",
    },
    tradeInValue: 600000,
    newPhonePrice: 1200000,
    amountToPay: 600000,
    swapMethod: "online",
  },
});
```

## Cost & Limits

### Free Tier

- **3,000 emails per month**
- **100 emails per day**
- Perfect for starting out

### Paid Plans

- **$20/month**: 50,000 emails
- **$0.40 per 1,000** additional emails
- Only pay when you scale beyond free tier

### Monitoring Usage

Check your email usage in the Resend dashboard:

1. Log in to [resend.com](https://resend.com)
2. View dashboard for daily/monthly stats
3. Set up usage alerts (recommended)

## Troubleshooting

### Emails Not Sending

1. **Check API Key**: Verify `RESEND_API_KEY` is set correctly in `.env.local`
2. **Restart Server**: After adding the API key, restart your Next.js dev server
3. **Check Logs**: Look for errors in terminal output
4. **Verify Domain**: In production, ensure your domain is verified

### Emails Going to Spam

1. Verify your sending domain in Resend
2. Add SPF, DKIM, and DMARC records
3. Use a professional sending address (not @gmail.com)
4. Test with mail-tester.com

### Rate Limits

- Free tier: 100 emails/day
- If you hit limits, consider upgrading or batching emails
- Implement retry logic for failed sends

## Support

- **Resend Documentation**: [https://resend.com/docs](https://resend.com/docs)
- **Resend Support**: support@resend.com
- **Status Page**: [https://status.resend.com](https://status.resend.com)

## Next Steps

Consider adding:

1. **Email Templates** for different scenarios (confirmation, reminder, completion)
2. **Email Preferences** - let users opt-in/out
3. **Transactional Emails** for order updates
4. **Email Analytics** - track open rates, clicks
