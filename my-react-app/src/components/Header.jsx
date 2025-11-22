import { useState, memo } from "react";
import { AppBar, Toolbar, Typography, Menu, MenuItem, IconButton, Button, Paper, Breadcrumbs, Box, styled } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Image } from "mui-image";
import {
	ExpandMore,
	MoreVert as MoreIcon,
} from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";



const PREFIX = "Header";

const classes = {
    grow: `${PREFIX}-grow`,
    root: `${PREFIX}-root`,
    icon: `${PREFIX}-icon`,
    expanded: `${PREFIX}-expanded`,
    innerSmallAvatar: `${PREFIX}-innerSmallAvatar`,
    anchorOriginBottomRightCircular: `${PREFIX}-anchorOriginBottomRightCircular`,
    avatar: `${PREFIX}-avatar`,
    iconButton: `${PREFIX}-iconButton`,
    menuItemButton: `${PREFIX}-menuItemButton`,
    grey: `${PREFIX}-grey`,
    svgIcon: `${PREFIX}-svgIcon`
};

const Root = styled("div")(({ theme }) => ({
    [`& .${classes.grow}`]: {
		flexGrow: 1,
		flexBasis: "auto",
		background: "white",
		zIndex: 1200,
		height: "70px",
	},
    [`& .${classes.root}`]: {
		height: "30px",
		padding: theme.spacing(0.5),
		borderRadius: "0px",
		background: theme.palette.grey.main,
	},
    [`& .${classes.icon}`]: {
		marginRight: 0.5,
		width: 20,
		height: 20,
	},
    [`& .${classes.expanded}`]: {
		background: "transparent",
	},
    [`& .${classes.innerSmallAvatar}`]: {
		color: theme.palette.common.black,
		fontSize: "inherit",
	},
    [`& .${classes.anchorOriginBottomRightCircular}`]: {
		".MuiBadge-anchorOriginBottomRightCircular": {
			right: 0,
			bottom: 0,
		},
	},
    [`& .${classes.avatar}`]: {
		width: "30px",
		height: "30px",
		background: theme.palette.primary.main,
	},
    [`& .${classes.iconButton}`]: {
		padding: "3px 6px",
	},
    [`& .${classes.menuItemButton}`]: {
		width: "100%",
		bgcolor: "grey.light",
		"&:hover": {
			bgcolor: "grey.dark",
		},
	},
    [`& .${classes.grey}`]: {
		color: "grey.500",
	},
    [`& .${classes.svgIcon}`]: {
		width: "100%",
		height: "100%",
		"& g": {
			"& path": {
				fill: theme.palette.primary.main,
			},
		},
	}
}));

const ButtonWithText = ({ text, icon, more, handler }) => (
	<Button sx={{ height: "100%", width: "100px", display: "flex", flexDirection: "column", py: 1, px: 1.5, mx: 1 }} onClick={(event) => handler(event)}>
		<div style={{ width: "100%", height: "100%" }}>
			{icon}
		</div>
		<Typography align="center" color="primary.main" fontSize="small" fontWeight="bold" display="flex" alignItems="center" sx={{ textTransform: "capitalize" }}>
			{text}
			{more && <ExpandMore />}
		</Typography>
	</Button>
);

const Header = ({ isAuthenticated }) => {
	const { logout } = useAuth0();

	const location = useLocation();
	const navigate = useNavigate();
	const [anchorElExamples, setAnchorElExamples] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	const isMenuOpenExamples = Boolean(anchorElExamples);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleExamplesMenuOpen = (event) => setAnchorElExamples(event.currentTarget);
	const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
	const handleExamplesMenuClose = () => { setAnchorElExamples(null); handleMobileMenuClose(); };
	const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);
	const closeAll = () => {
		handleExamplesMenuClose();
		handleMobileMenuClose();
	};

	const CrumpLink = styled(Link)(({ theme }) => ({ display: "flex", color: theme.palette.primary.main, textDecorationLine: "none" }));

	const buttons = [
		{
			icon: <ExamplesIcon className={classes.svgIcon} />,
			text: "Examples",
			handler: (event) => {
				closeAll();
				handleExamplesMenuOpen(event);
			},
			more: examples(),
		},
		{
			icon: <ProfileIcon className={classes.svgIcon} />,
			text: "Profile",
			handler: (event) => {
				event.preventDefault();
				closeAll();
				navigate("/profile");
			},
		},
		{
			icon: <LogoutIcon className={classes.svgIcon} />,
			text: "Logout",
			handler: (event) => {
				event.preventDefault();
				closeAll();
				jwt.destroyToken();
				logout({ logoutParams: { returnTo: window.location.origin }, clientId: process.env.REACT_APP_AUTH0_CLIENT_ID });
			},
		},
	];

	const renderMobileMenu = (
		<Menu
			keepMounted
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{buttons.map((button) => (
				<MenuItem key={button.text} onClick={button.handler}>
					<div style={{ width: "25px", height: "25px" }}>
						{button.icon}
					</div>
					<p style={{ marginBlockStart: "0px", marginBlockEnd: "0px", marginLeft: "5px" }}>{button.text}</p>
					{button.more && <ExpandMore />}
				</MenuItem>
			))}
		</Menu>
	);

	const renderExamplesMenu = (
		<Menu
			keepMounted
			anchorEl={anchorElExamples}
			anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
			transformOrigin={{ vertical: "bottom", horizontal: "left" }}
			open={isMenuOpenExamples}
			onClose={handleExamplesMenuClose}
		>
			{buttons.find((el) => el.text === "Examples").more?.map((moreButton) => (
				<MenuItem key={moreButton.text} onClick={() => { closeAll(); navigate(moreButton.path); }}>
					{moreButton.icon}
					<p style={{ marginBlockStart: "0px", marginBlockEnd: "0px", marginLeft: "5px" }}>{moreButton.text}</p>
				</MenuItem>
			))}
		</Menu>
	);

	const pathnames = location.pathname.split("/").filter(Boolean);
	const crumps = [];
	crumps.push(<CrumpLink to="/">{"Home"}</CrumpLink>);
	for (const [ind, path] of pathnames.entries()) {
		let text = capitalize(path);
		switch (path) {
			case "home": {
				text = "";
				break;
			}

			case "file-upload": {
				text = "File Upload";
				break;
			}

			default:
		}

		if (text) {
			crumps.push(<CrumpLink to={`/${pathnames.slice(0, ind + 1).join("/")}`}>{text}</CrumpLink>);
		}
	}

	return (
        <Root>
            <AppBar id="header" position="static" className={classes.grow}>
				<Toolbar className="header-container">
					<Box component={Link} to="/">
						<Image src={logo} alt="Logo" sx={{ p: 0, my: 0, height: "100%", maxWidth: "200px" }} />
					</Box>
					<Box className={classes.grow} style={{ height: "100%" }} />
					{isAuthenticated
					&& (
						<>
							<Box sx={{ display: { xs: "none", sm: "none", md: "flex" }, height: "100%", py: 1 }}>
								{buttons.map((button) => (
									<ButtonWithText
										key={button.text}
										icon={button.icon}
										text={button.text}
										handler={button.handler}
										more={button.more}
									/>
								))}
							</Box>
							<Box sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}>
								<IconButton color="primary" onClick={handleMobileMenuOpen}><MoreIcon color="primary" /></IconButton>
							</Box>
						</>
					)}
				</Toolbar>
			</AppBar>
            {isAuthenticated
			&& (
				<Paper elevation={0} className={classes.root}>
					<Breadcrumbs className="header-container">{crumps.map((e, ind) => <div key={`crump_${ind}`}>{e}</div>)}</Breadcrumbs>
				</Paper>
			)}
            {isAuthenticated
			&& (
				<>
					{renderMobileMenu}
					{renderExamplesMenu}
				</>
			)}
        </Root>
    );
};

export default memo(Header);
