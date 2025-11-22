import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, styled } from "@mui/material";

import Tooltip from "./Tooltip.js";
import examples from "../examples/index.js";

const PREFIX = "Sidebar";

const classes = {
    sidebar: `${PREFIX}-sidebar`
};

const Root = styled("div")(({ theme }) => ({
    [`&.${classes.sidebar}`]: {
		height: "100%",
		position: "absolute",
		backgroundColor: theme.palette.primary.main,
		color: "white",
		overflowY: "auto",
	}
}));

const ButtonWithText = ({ text, icon, handler }) => (
	<span key={text}>
		<Button key={text} sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", padding: "8px 40px 8px 16px" }} onClick={(event) => handler(event)}>
			{icon}
			{/* <icon color="white" style={{ width: "25px", height: "25px" }} /> */}
			<Typography align="center" color="white.main" fontSize="medium" ml={1} display="flex" alignItems="center" sx={{ textTransform: "capitalize" }}>
				{text}
			</Typography>
		</Button>
	</span>
);

const ButtonSimple = ({ text, icon, handler, ind }) => (
	<Tooltip title={text}>
		<Button key={text} sx={{ minWidth: "30px!important", padding: "0px", marginTop: (ind === 0) ? "0px" : "10px" }} onClick={(event) => handler(event)}>
			{icon}
			{/* <Image src={icon} alt={text} fit="contain" width="30px" /> */}
		</Button>
	</Tooltip>
);

const Sidebar = ({ isSmall: sidebarIsSmall }) => {
	const [isSmall, setIsSmall] = useState(false);
	const navigate = useNavigate();

	useEffect(() => setIsSmall(sidebarIsSmall), [sidebarIsSmall]);

	const buttons = examples("white");

	return (
        <Root className={classes.sidebar} style={{ width: (isSmall) ? "50px" : "200px", padding: (isSmall) ? "20px 5px" : "20px 5px", textAlign: "center" }}>
            {!isSmall && buttons.map((button) => (
				<ButtonWithText
					key={button.text}
					text={button.text}
					icon={button.icon}
					handler={() => navigate(button.path)}
				/>
			))}
            {isSmall && buttons.map((button, ind) => (
				<ButtonSimple
					key={button.text}
					text={button.text}
					icon={button.icon}
					handler={() => navigate(button.path)}
					ind={ind}
				/>
			))}
        </Root>
    );
};

export default Sidebar;
