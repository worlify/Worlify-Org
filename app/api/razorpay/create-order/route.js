/**
 * POST /api/razorpay/create-order
 * Creates a Razorpay Order on the server using the secret key.
 * This is required for Live Mode — Razorpay's live checkout needs a valid order_id.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR', receipt, notes } = body;

    // Validate amount
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return Response.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error('Razorpay keys not configured. KeyId present:', !!keyId, 'Secret present:', !!keySecret);
      return Response.json({ error: 'Payment gateway not configured' }, { status: 500 });
    }

    // Check if secret is still the placeholder
    if (keySecret === 'YOUR_ACTUAL_24_CHAR_SECRET_KEY' || keySecret.includes('YOUR_ACTUAL')) {
      return Response.json({ error: 'Razorpay secret key is not configured. Please set RAZORPAY_KEY_SECRET in Vercel environment variables.' }, { status: 500 });
    }

    const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const orderPayload = {
      amount: Math.round(Number(amount)), // amount in paise, must be integer
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || {},
    };

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
      console.error('Razorpay order creation failed:', data);
      return Response.json(
        { error: data?.error?.description || 'Failed to create payment order' },
        { status: response.status }
      );
    }

    // Return the order id and amount to the frontend
    return Response.json({
      id: data.id,
      amount: data.amount,
      currency: data.currency,
    });
  } catch (err) {
    console.error('Create order error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
