const BASE_URL = 'http://localhost:3000/';

export const authEndPoints = {
    SIGNUP_API: BASE_URL + 'api/auth/signUp',
    SENDOTP_API: BASE_URL + 'api/auth/send-otp',
    VERIFY_OTP_API: BASE_URL + 'api/auth/otp'
};
