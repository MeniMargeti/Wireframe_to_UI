import { Tooltip as MUITooltip, Zoom, Typography, styled } from "@mui/material";

const PREFIX = "Tooltip";

const classes = {
    tooltip: `${PREFIX}-tooltip`
};

const StyledMUITooltip = styled(MUITooltip)({
	[`& .${classes.tooltip}`]: {
		whiteSpace: "normal",
		wordWrap: "break-word",
		textAlign: "center",
		zIndex: 2,
	},
});

const Tooltip = ({ children, title, titleVariant = "caption", placement = "top", ...rest }) => (
	<StyledMUITooltip
		arrow
		title={typeof title === "string" ? (<Typography variant={titleVariant} color="inherit">{title}</Typography>) : title || ""}
		placement={placement}
		TransitionComponent={Zoom}
		PopperProps={{ disablePortal: true }}
		classes={{ tooltip: classes.tooltip }}
		{...rest}
	>
		{children}
	</StyledMUITooltip>
);

export default Tooltip;
