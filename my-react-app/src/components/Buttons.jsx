import { Typography, Button, styled } from "@mui/material";

const PREFIX = "Buttons";

const classes = {
    primaryBackground: `${PREFIX}-primaryBackground`,
    primaryBorder: `${PREFIX}-primaryBorder`,
    secondaryBackground: `${PREFIX}-secondaryBackground`,
    thirdBackground: `${PREFIX}-thirdBackground`
};

const StyledButton = styled(Button)(({ theme }) => ({
    [`&.${classes.primaryBackground}`]: {
		color: "white",
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
		"&:active:not(:disabled)": {
			transform: "scale(0.98)",
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
		"&:active:not(:disabled)": {
			transform: "scale(0.98)",
		},
	},
    [`&.${classes.secondaryBackground}`]: {
		color: "white",
		backgroundColor: theme.palette.secondary.main,
		border: `2px solid ${theme.palette.secondary.main}`,
		borderRadius: "10px",
		"&:hover": {
			color: "white",
			backgroundColor: theme.palette.secondary.dark,
			border: `2px solid ${theme.palette.secondary.dark}`,
		},
		"&:disabled": {
			color: "white",
			backgroundColor: theme.palette.grey.main,
			border: `2px solid ${theme.palette.grey.main}`,
		},
		"&:active:not(:disabled)": {
			transform: "scale(0.98)",
		},
	},
    [`&.${classes.thirdBackground}`]: {
		color: "white",
		backgroundColor: theme.palette.third.main,
		border: `2px solid ${theme.palette.third.main}`,
		borderRadius: "10px",
		"&:hover": {
			color: "white",
			backgroundColor: theme.palette.third.dark,
			border: `2px solid ${theme.palette.third.dark}`,
		},
		"&:disabled": {
			color: "white",
			backgroundColor: theme.palette.grey.main,
			border: `2px solid ${theme.palette.grey.main}`,
		},
		"&:active:not(:disabled)": {
			transform: "scale(0.98)",
		},
	}
}));

export const PrimaryBackgroundButton = ({
	id = "primary-background-button",
	type = "button",
	disabled = false,
	className = "",
	titleClassName = "",
	size = "",
	width = "",
	height = "",
	title = "Button",
	startIcon = null,
	onClick,
}) => (
	<StyledButton
		key={id}
		id={id}
		type={type}
		disabled={disabled}
		className={`${className} ${classes.primaryBackground}`}
		size={(size || "")}
		style={{ ...(width && { width }), ...(height && { height }) }}
		startIcon={startIcon}
		onClick={onClick}
	>
		<Typography className={titleClassName} style={{ textTransform: "none" }}>
			<b>
				{title}
			</b>
		</Typography>
	</StyledButton>
);

export const PrimaryBorderButton = ({
	id = "primary-border-button",
	type = "button",
	disabled = false,
	className = "",
	titleClassName = "",
	size = "",
	width = "",
	height = "",
	title = "Button",
	startIcon = null,
	onClick,
}) => (
	<StyledButton
		key={id}
		id={id}
		type={type}
		disabled={disabled}
		className={`${className} ${classes.primaryBorder}`}
		size={(size || "")}
		style={{ ...(width && { width }), ...(height && { height }) }}
		startIcon={startIcon}
		onClick={onClick}
	>
		<Typography className={titleClassName} style={{ textTransform: "none" }}>
			<b>
				{title}
			</b>
		</Typography>
	</StyledButton>
);

export const SecondaryBackgroundButton = ({
	id = "secondary-background-button",
	type = "button",
	disabled = false,
	className = "",
	titleClassName = "",
	size = "",
	width = "150px",
	height = "40px",
	title = "Button",
	startIcon = null,
	onClick,
}) => (
	<StyledButton
		key={id}
		id={id}
		type={type}
		disabled={disabled}
		className={`${className} ${classes.secondaryBackground}`}
		size={(size || "")}
		style={{ ...(width && { width }), ...(height && { height }) }}
		startIcon={startIcon}
		onClick={onClick}
	>
		<Typography className={titleClassName} style={{ textTransform: "none" }}>
			<b>
				{title}
			</b>
		</Typography>
	</StyledButton>
);

export const ThirdBackgroundButton = ({
	id = "third-background-button",
	type = "button",
	disabled = false,
	className = "",
	titleClassName = "",
	size = "",
	width = "150px",
	height = "40px",
	title = "Button",
	startIcon = null,
	onClick,
}) => (
	<StyledButton
		key={id}
		id={id}
		type={type}
		disabled={disabled}
		className={`${className} ${classes.thirdBackground}`}
		size={(size || "")}
		style={{ ...(width && { width }), ...(height && { height }) }}
		startIcon={startIcon}
		onClick={onClick}
	>
		<Typography className={titleClassName} style={{ textTransform: "none" }}>
			<b>
				{title}
			</b>
		</Typography>
	</StyledButton>
);
