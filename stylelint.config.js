module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-recommended'],
	rules: {
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['extend'],
			},
		],
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global'],
			},
		],
	},
};
