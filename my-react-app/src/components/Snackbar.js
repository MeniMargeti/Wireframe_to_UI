import { Alert, Slide, Snackbar as MaterialSnackbar, Typography } from "@mui/material";
import { useCallback } from "react";
import { useShallow } from "zustand/shallow";

import { snackStore } from "../utils/index.js";

const SnackBar = () => {
	const { severity, message, open, setOpen, autoHideDuration } = snackStore(useShallow(((e) => ({
		severity: e.severity,
		message: e.message,
		open: e.open,
		setOpen: e.setOpen,
		autoHideDuration: e.autoHideDuration,
	})), []));

	const handleClose = useCallback((_, reason) => {
		if (reason !== "clickaway") setOpen(false);
	}, [setOpen]);

	return (
		<MaterialSnackbar
			open={open}
			autoHideDuration={autoHideDuration}
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			TransitionComponent={Slide}
			TransitionProps={{ direction: "left" }}
			onClose={handleClose}
		>
			<Alert severity={severity} variant="filled" sx={{ alignItems: "center", color: "white!important" }} onClose={handleClose}>
				<Typography>{message}</Typography>
			</Alert>
		</MaterialSnackbar>
	);
};

export default SnackBar;
