type SelectOptions = {
	value: string;
	text: string;
}[];

export const selectOptions: SelectOptions = [
	{
		value: 'byAlphabet',
		text: 'A - Z',
	},
	{
		value: 'byAlphabetReverse',
		text: 'Z - A',
	},
	{
		value: 'byYear',
		text: 'Oldest - Newest',
	},
	{
		value: 'byYearReverse',
		text: 'Newest - Oldest',
	},
];
