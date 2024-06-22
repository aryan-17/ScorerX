const BASE_URL = 'http://localhost:3000/';

export const authEndPoints = {
    SIGNUP_API: BASE_URL + 'api/auth/signIn',
    SENDOTP_API: BASE_URL + 'api/auth/otp',
    VERIFY_OTP_API: BASE_URL + 'api/auth/otp/verification'
};

export const userEndPoints = {
    USER_DETAILS: BASE_URL + 'api/user'
}

export const teamEndPoints = {
    TEAM_DETAILS: BASE_URL + 'api/team'
}

export const playerEndPoints = {
    PLAYER_API: BASE_URL + 'api/team/player'
}

export const matchEndPoints = {
    MATCH_API: BASE_URL + 'api/game'
}

export const liveEndPoints = {
    LIVE_API: BASE_URL + 'api/game/live'
}

export const scoreEndPoints = {
    SCORE_API: BASE_URL + 'api/game/score'
}