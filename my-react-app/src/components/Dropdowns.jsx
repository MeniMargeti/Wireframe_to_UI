import { MenuItem, Select, styled } from "@mui/material";

const PREFIX = "PrimaryBackgroundDropdown";

const classes = {
    primaryBackground: `${PREFIX}-primaryBackground`,
    primaryBorder: `${PREFIX}-primaryBorder`,
    whiteIcon: `${PREFIX}-whiteIcon`,
    primaryIcon: `${PREFIX}-primaryIcon`
};

const StyledSelect = styled(Select)(({ theme }) => ({
    [`&.${classes.primaryBackground}`]: {
		color: "white!important",
		backgroundColor: theme.palette.primary.main,
		border: `2px solid ${theme.palette.primary.main}`,
		borderRadius: "10px",
		"&:hover": {
			color: "white",
			backgroundColor: theme.palette.primary.dark,
			border: `2px solid ${theme.palette.primary.dark}`,
		},
		"&:disabled": {
			color: "white",
			backgroundColor: theme.palette.grey.main,
			border: `2px solid ${theme.palette.grey.main}`,
		},
	},
    [`&.${classes.primaryBorder}`]: {
		color: theme.palette.primary.main,
		backgroundColor: "transparent",
		border: `2px solid ${theme.palette.primary.main}`,
		borderRadius: "10px",
		"&:hover": {
			color: theme.palette.primary.main,
			backgroundColor: theme.palette.grey.light,
			border: `2px solid ${theme.palette.primary.main}`,
		},
		"&:disabled": {
			color: "white",
			backgroundColor: theme.palette.grey.main,
			border: `2px solid ${theme.palette.grey.main}`,
		},
	},
    [`& .${classes.whiteIcon}`]: {
		color: "white",
	},
    [`& .${classes.primaryIcon}`]: {
		color: theme.palette.primary.main,
	}
}));

export const PrimaryBackgroundDropdown = ({
	id = "primary-background-dropdown",
	disabled = false,
	className = "",
	placeholder = "Placeholder",
	showPlaceholder = true,
	width = "",
	height = "",
	items = [],
	value,
	onChange,
}) => (
	<StyledSelect
		key={id}
		id={id}
		value={value}
		disabled={disabled}
		displayEmpty={showPlaceholder}
		className={`${className} ${classes.primaryBackground}`}
		style={{ ...(width && { width }), ...(height && { height }) }}
		classes={{
			icon: classes.whiteIcon,
		}}
		autoWidth={!width}
		renderValue={(selected) => (selected || placeholder)}
		onChange={onChange}
	>
		{items.map((it) => (
			<MenuItem key={it.text} value={it.value}>{it.text}</MenuItem>
		))}
	</StyledSelect>
);

export const PrimaryBorderDropdown = ({
	id = "primary-border-dropdown",
	disabled = false,
	className = "",
	placeholder = "Placeholder",
	showPlaceholder = true,
	width = "",
	height = "",
	items = [],
	value,
	onChange,
}) => (
	<StyledSelect
		key={id}
		id={id}
		value={value}
		disabled={disabled}
		displayEmpty={showPlaceholder}
		className={`${className} ${classes.primaryBorder}`}
		style={{ ...(width && { width }), ...(height && { height }) }}
		classes={{
			icon: classes.primaryIcon,
		}}
		autoWidth={!width}
		renderValue={(selected) => (selected || placeholder)}
		onChange={onChange}
	>
		{items.map((it) => (
			<MenuItem key={it.text} value={it.value}>{it.text}</MenuItem>
		))}
	</StyledSelect>
);
