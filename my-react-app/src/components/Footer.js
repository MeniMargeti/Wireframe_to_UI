import { memo } from "react";
import { AppBar, Box, Link, Toolbar, Typography, styled } from "@mui/material";
import { Image } from "mui-image";

import logo from "../assets/isselLogo.png";

const PREFIX = "Footer";

const classes = {
    grow: `${PREFIX}-grow`,
    box: `${PREFIX}-box`,
    image: `${PREFIX}-image`
};

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    [`&.${classes.grow}`]: {
		flexGrow: 1,
		flexBasis: "auto",
		background: theme.palette.primary.dark,
		zIndex: 1200,
		height: "60px",
	},
    [`& .${classes.box}`]: {
		height: "100%",
		width: "fit-content",
		padding: "10px 0px",
	},
    [`& .${classes.image}`]: {
		width: "auto!important",
		height: "100%!important",
		objectFit: "contain!important",
	}
}));

const Footer = () => (
	<StyledAppBar id="footer" position="static" className={classes.grow}>
		<Toolbar className="header-container">
			<Box className={classes.box} component={Link} target="_blank" href="https://issel.ee.auth.gr" rel="noreferrer">
				<Image src={logo} alt="Logo" className={classes.image} />
			</Box>
			<Box style={{ height: "100%", flexGrow: 1 }} />
			<Box display="flex" style={{ height: "100%", justifyContent: "flex-end", alignItems: "center" }}>
				<Typography fontSize="small">{`@${(new Date()).getFullYear()} ISSEL | All Rights Reserved`}</Typography>
			</Box>
		</Toolbar>
	</StyledAppBar>
);

export default memo(Footer);
