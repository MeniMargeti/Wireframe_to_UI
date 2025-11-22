import { TextField } from "@mui/material";

export const Input = ({
	id = "basic-form",
	label = "",
	className,
	required = false,
	helperText = "",
	error = false,
	multiline = false,
	minRows = 1,
	maxRows = 10,
	fullWidth = true,
	variant = "outlined",
	onChange = () => {},
	children = null,
	classes = {},
	...props
}) => (
	<TextField
		hiddenLabel={label === ""}
		id={id}
		label={label}
		className={className}
		required={required}
		helperText={helperText}
		error={error}
		multiline={multiline}
		minRows={minRows}
		maxRows={maxRows}
		fullWidth={fullWidth}
		variant={variant}
		classes={classes}
		size="small"
		onChange={onChange}
		{...props}
	>
		{children}
	</TextField>
);

export default Input;
