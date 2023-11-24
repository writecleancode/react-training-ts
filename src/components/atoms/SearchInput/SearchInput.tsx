import { ChangeEvent } from 'react';
import { SearchIcon } from 'src/assets/icons/SearchIcon';
import { IconBox, Input, Wrapper } from './SearchInput.styles';

type SearchInputProps = {
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
	return (
		<Wrapper>
			<Input name='search' id='search' placeholder='find car' value={value} onChange={onChange} />
			<IconBox>
				<SearchIcon />
			</IconBox>
		</Wrapper>
	);
};
