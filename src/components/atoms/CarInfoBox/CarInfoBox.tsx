import { StyledInfo, StyledTitle, Wrapper } from './CarInfoBox.styles';

type CarInfoBoxProps = {
	title: string;
	info: string;
};

export const CarInfoBox = ({ title, info }: CarInfoBoxProps) => (
	<Wrapper>
		<StyledTitle>{title}</StyledTitle>
		<StyledInfo>{info}</StyledInfo>
	</Wrapper>
);
