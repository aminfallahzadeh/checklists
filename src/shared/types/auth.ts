export type RefreshDataType = {
    token: string;
    refreshToken: string;
};

export type UserInfo = {
    username: string;
    userId: number;
    token: string;
    refreshToken: string;
    role: string;
    zoneId: string;
    roleName: string;
} | null;
