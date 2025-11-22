import { Box, Typography, Grid } from "@mui/material";
import { memo } from "react";

import colors from "../colors.module.scss";

const Card = ({
	children,
	title = "",
	className ="",
	titleExists = true,
	titleColor = "white.main",
	titleBackgroundColor = "primary",
	titleFontSize = "16px",
	footer = "",
	footerExists = true,
	footerColor = "white.main",
	footerBackgroundColor = "primary",
	backgroundColor = "white.main",
	footerFontSize = "16px",
	width = "100%",
	height = "auto",
}) => (
	<Box
		sx={{
			width,
			height,
			backgroundColor: colors?.[backgroundColor] || backgroundColor,
			borderRadius: "10px",
			border: "1px solid",
			borderColor: colors?.[titleBackgroundColor] || titleBackgroundColor,
		}}
		className = {`${className}`}
	>
		{titleExists && (
			<Grid
				width="100%"
				color={colors?.[titleColor] || titleColor}
				backgroundColor={colors?.[titleBackgroundColor] || titleBackgroundColor}
				padding="10px 20px"
				display="flex"
				flexDirection="row"
				justifyContent="center"
				alignItems="center"
				sx={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
			>
				{typeof title === "string" ? (
					<Typography variant="body" component="h2" fontSize={titleFontSize}>{title}</Typography>
				) : (
					title
				)}
			</Grid>
		)}
		<Grid width="100%" height="75%" padding="10px 20px" className = {`${className}_Grid`} >
			{children}
		</Grid>
		{footerExists && (
			<Grid
				width="100%"
				color={colors?.[footerColor] || footerColor}
				backgroundColor={colors?.[footerBackgroundColor] || footerBackgroundColor}
				display="flex"
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
				padding="0px 5px"
				sx={{ borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}
			>
				{typeof footer === "string" ? (
					<Typography variant="h6" component="h2" fontSize={footerFontSize}>{footer}</Typography>
				) : (
					footer
				)}
			</Grid>
		)}
	</Box>
);

export default memo(Card);
