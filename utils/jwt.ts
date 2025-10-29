import jwt, { type Secret } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-change-in-production';

type TimeUnit = 's' | 'm' | 'h' | 'd';
type StringDuration = `${number}${TimeUnit}`;
type ExpiresIn = number | StringDuration;

const JWT_EXPIRES_IN: ExpiresIn = (process.env.JWT_EXPIRES_IN as ExpiresIn) || '15m';
const JWT_REFRESH_EXPIRES_IN: ExpiresIn = (process.env.JWT_REFRESH_EXPIRES_IN as ExpiresIn) || '7d';

export interface JWTPayload {
    userId: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}

export interface JwtUserShape {
    id: string;
    email: string;
    role: string;
}

export const generateTokens = (user: JwtUserShape) => {
    const payload: JWTPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };

    // Generate access token
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });

    // Generate refresh token
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRES_IN,
    });

    // Calculate expiration time in seconds
    const expiresIn = getExpirationTime(JWT_EXPIRES_IN);

    return {
        token,
        refresh_token: refreshToken,
        expires_in: expiresIn,
        token_type: 'Bearer',
    };
};

export const verifyToken = (token: string): JWTPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
        return null;
    }
};

export const verifyRefreshToken = (refreshToken: string): JWTPayload | null => {
    try {
        return jwt.verify(refreshToken, JWT_REFRESH_SECRET) as JWTPayload;
    } catch (error) {
        return null;
    }
};

const getExpirationTime = (expiresIn: ExpiresIn): number => {
    if (typeof expiresIn === 'number') {
        return expiresIn; // assume already in seconds
    }

    const timeUnits: { [key in TimeUnit]: number } = {
        s: 1,
        m: 60,
        h: 3600,
        d: 86400,
    };

    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match) return 900; // Default 15 minutes

    const value = parseInt(match[1]);
    const unit = match[2] as TimeUnit;
    
    return value * timeUnits[unit];
};
