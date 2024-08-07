export async function createTokenWithCode(code: string) {
    const url = `https://github.com/login/oauth/access_token`+
    `?client_id=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`+
    `&client_secret=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET}`+
    `&code=${code}`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    });

    return await response.json();
}

export const convertFirestoreTimestampToDate = (timestamp: { seconds: number, nanoseconds: number }) => {
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    return new Date(milliseconds);
  };


