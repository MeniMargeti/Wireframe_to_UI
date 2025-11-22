import { Grid, Typography } from "@mui/material";
import { ArrowBack, Refresh } from "@mui/icons-material";
import { Image } from "mui-image";

import { PrimaryBorderButton } from "./Buttons.js";
import logo from "../assets/logo.png";

const ErrorFallback = ({ message = "Something went wrong! Please try again!", refetch = () => window.location.reload() }) => (
	<Grid
		container
		direction="column"
		alignItems="center"
		sx={{
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
		}}
	>
		<Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center" }}>
			<Image src={logo} alt="TCTT Logo" width="250px" />
		</Grid>
		<Grid size={{ xs: 12 }} mt={2}>
			<Grid container direction="column" spacing={6}>
				<Grid size={{ xs: 12 }}>
					<Typography align="center" variant="h6">{message}</Typography>
				</Grid>
				<Grid size={{ xs: 12 }}>
					<Grid container spacing={2} justifyContent="center">
						<Grid>
							<PrimaryBorderButton
								title={"Go Back"}
								startIcon={<ArrowBack />}
								onClick={() => { window.location.href = "/"; }}
							/>
						</Grid>
						{refetch && (
							<Grid>
								<PrimaryBorderButton
									title={"Try Again"}
									startIcon={<Refresh />}
									onClick={refetch}
								/>
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	</Grid>
);

export default ErrorFallback;
