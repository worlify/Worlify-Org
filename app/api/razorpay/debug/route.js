/**
 * GET /api/razorpay/debug
 * Shows what Razorpay credentials the server is reading from env vars.
 * Remove this file after debugging is complete.
 */
export async function GET() {
  const keyId =
    process.env.RAZORPAY_KEY_ID ||
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
    process.env.VITE_RAZORPAY_KEY_ID;

  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  return Response.json({
    key_id_found: !!keyId,
    key_id_value: keyId || 'NOT SET',
    key_id_mode: keyId
      ? keyId.startsWith('rzp_live_') ? 'LIVE' : keyId.startsWith('rzp_test_') ? 'TEST' : 'UNKNOWN'
      : 'N/A',
    secret_found: !!keySecret,
    secret_length: keySecret ? keySecret.length : 0,
    secret_first4: keySecret ? keySecret.slice(0, 4) + '****' : 'NOT SET',
    env_vars_checked: [
      'RAZORPAY_KEY_ID',
      'NEXT_PUBLIC_RAZORPAY_KEY_ID',
      'VITE_RAZORPAY_KEY_ID'
    ],
    raw_env: {
      RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || null,
      NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || null,
      VITE_RAZORPAY_KEY_ID: process.env.VITE_RAZORPAY_KEY_ID || null,
    }
  });
}
