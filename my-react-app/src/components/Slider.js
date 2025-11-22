import { Slider as MUISlider, Stack, styled } from "@mui/material";

const PREFIX = "Slider";

const classes = {
    markLabel: `${PREFIX}-markLabel`
};

const StyledStack = styled(Stack)(() => ({
    [`& .${classes.markLabel}`]: {
		color: "white",
	}
}));

const Slider = ({
	id = "custom-slider",
	value,
	onChange,
	min = 0,
	max = 100,
	marks,
	step,
	size = "medium",
	track,
	color = "secondary",
	displayLabel,
	iconBefore,
	iconAfter,
}) => (
	<StyledStack key={id} spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
		{iconBefore}
		<MUISlider
			color={color || "secondary"}
			value={value}
			min={min}
			max={max}
			marks={marks}
			step={step === null ? null : step || 1}
			size={size || "medium"} // small, medium
			track={track} // normal, false, inverted
			valueLabelDisplay={displayLabel || "auto"} // on, off, auto
			classes={{
				markLabel: classes.markLabel,
			}}
			onChange={onChange}
		/>
		{iconAfter}
	</StyledStack>
);

export default Slider;
