import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Middleware to verify Google ID token
 * Extracts user info and attaches to request object
 */
export async function googleAuthMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Missing or invalid authorization header',
      });
    }

    const idToken = authHeader.substring(7); // Remove "Bearer " prefix

    // Verify the ID token with Google
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token payload',
      });
    }

    // Attach user info to request object
    req.user = {
      uid: payload.sub, // Google's unique user ID
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      emailVerified: payload.email_verified,
      googleToken: idToken,
    };

    next();
  } catch (error) {
    console.error('Google auth middleware error:', error.message);
    console.error('Expected Audience (Backend env):', process.env.GOOGLE_CLIENT_ID);
    
    // Attempt to decode without verifying to see what the token's aud claim is (for debugging)
    // Note: This is just for logging purposes; never trust unverified token data for auth.
    try {
        const parts = authHeader.substring(7).split('.');
        if (parts.length === 3) {
            const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
            console.error('Received Token Audience (from Frontend):', payload.aud);
            
            if (payload.aud !== process.env.GOOGLE_CLIENT_ID) {
                console.error('CRITICAL: AUDIENCE MISMATCH! Backend env GOOGLE_CLIENT_ID does not match Frontend token audience.');
            }
        }
    } catch (e) {
        console.error('Failed to decode token for debug info', e);
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message,
      // In production, we might not want to expose this, but for now we need it
      debug_hint: process.env.NODE_ENV === 'production' ? 'Check backend logs for audience match' : 'Check console logs'
    });
  }
}

/**
 * Middleware for error handling
 */
export function errorMiddleware(err, req, res, next) {
  console.error('Error:', err);

  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { error: err }),
  });
}
