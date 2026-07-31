/**
 * POST /api/razorpay/create-order
 * Creates a Razorpay Order on the server using the secret key.
 * Required for Live Mode — Razorpay's live checkout needs a valid order_id.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR', receipt, notes } = body;

    // Validate amount
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return Response.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Pick up key_id from any of the env var names the user may have set
    const keyId =
      process.env.RAZORPAY_KEY_ID ||
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      process.env.VITE_RAZORPAY_KEY_ID;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Log config state (never log the actual secret value)
    console.log('[Razorpay] Key ID used:', keyId ? `${keyId.slice(0, 12)}...` : 'MISSING');
    console.log('[Razorpay] Key Secret set:', !!keySecret, keySecret ? `(length: ${keySecret.length})` : '');

    if (!keyId) {
      return Response.json({
        error: 'Razorpay Key ID is missing. Set RAZORPAY_KEY_ID (or VITE_RAZORPAY_KEY_ID) in Vercel Environment Variables.'
      }, { status: 500 });
    }

    if (!keySecret) {
      return Response.json({
        error: 'Razorpay Key Secret is missing. Set RAZORPAY_KEY_SECRET in Vercel Environment Variables.'
      }, { status: 500 });
    }

    // Check if secret is still a placeholder
    if (keySecret.includes('YOUR_ACTUAL') || keySecret === 'YOUR_KEY_SECRET') {
      return Response.json({
        error: 'Razorpay Key Secret is a placeholder. Replace RAZORPAY_KEY_SECRET with your actual live secret key.'
      }, { status: 500 });
    }

    // Validate key mode consistency — key_id and key_secret must both be live or both test
    const isLiveKey = keyId.startsWith('rzp_live_');
    console.log('[Razorpay] Mode:', isLiveKey ? 'LIVE' : 'TEST');

    const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const orderPayload = {
      amount: Math.round(Number(amount)), // in paise, must be integer
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || {},
    };

    console.log('[Razorpay] Creating order for amount (paise):', orderPayload.amount);

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`,
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Razorpay] Order creation failed. Status:', response.status, 'Error:', data?.error);

      // Give a clear human-readable error
      let errorMsg = data?.error?.description || 'Failed to create payment order';
      if (response.status === 401 || data?.error?.code === 'BAD_REQUEST_ERROR') {
        errorMsg = 'Authentication Failed: Your Razorpay Key ID and Key Secret do not match, or are from different modes (test vs live). Please verify both keys in your Razorpay Dashboard under Settings → API Keys → Live Mode.';
      }

      return Response.json({ error: errorMsg }, { status: response.status });
    }

    console.log('[Razorpay] Order created successfully:', data.id);

    return Response.json({
      id: data.id,
      amount: data.amount,
      currency: data.currency,
    });
  } catch (err) {
    console.error('[Razorpay] Create order exception:', err);
    return Response.json({ error: 'Internal server error: ' + err.message }, { status: 500 });
  }
}
