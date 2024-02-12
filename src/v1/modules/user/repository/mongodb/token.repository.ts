const tokens = [];

export const tokenRepository = {
	createTokenLoggedOut: (token) => {
		tokens.push(token);
	},

	findOneTokenLoggedOut: (token) => {
		const tokenLoggedOut = tokens.find(
			(tokenLoggedOut) => tokenLoggedOut === token,
		);
		if (tokenLoggedOut) {
			return {
				_id: "b0db5071-8a11-4fbc-a965-ff274d714eb8",
				token: tokenLoggedOut,
			};
		}
	},
};
