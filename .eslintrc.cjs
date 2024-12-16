module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	settings: {
		react: {
			version: 'detect'
		}
	},
	extends: ['plugin:react/recommended', 'standard', 'prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react'],
	rules: {
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/strict-boolean-expressions': 0,
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/restrict-template-expressions': 0,
		'@typescript-eslint/no-confusing-void-expression': 0,
		'@typescript-eslint/prefer-nullish-coalescing': 0,
		'@typescript-eslint/no-misused-promises': 0
	}
}
