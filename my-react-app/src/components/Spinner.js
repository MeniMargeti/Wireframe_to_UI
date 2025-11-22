import { forwardRef, memo } from "react";
import { CircularProgress, Slide, Dialog, styled } from "@mui/material";

const PREFIX = "Spinner";

const classes = {
    root: `${PREFIX}-root`
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
    [`& .${classes.root}`]: {
		background: "transparent",
		color: theme.palette.secondary.main,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	}
}));

const Transition = forwardRef((props, ref) => <Slide ref={ref} direction="up" {...props} />);

const Spinner = ({ open }) => (
	<StyledDialog
		fullScreen
		open={open}
		TransitionComponent={Transition}
		maxWidth={false}
		classes={{
			paper: classes.root,
		}}
	>
		<CircularProgress color="inherit" size={60} />
	</StyledDialog>
);

export default memo(Spinner);
