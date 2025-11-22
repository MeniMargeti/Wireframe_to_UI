import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import { styled } from "@mui/material";

import { jwt } from "../utils/index.js";

import Sidebar from "./Sidebar.js";

const PREFIX = "Protected";

const classes = {
    main: `${PREFIX}-main`,
    mainBox: `${PREFIX}-mainBox`
};

const StyledNavigateDiv = styled("div")(({ theme }) => ({
    [`&.${classes.main}`]: {
		width: "100%",
		height: "calc(100% - 160px)",
		backgroundColor: theme.palette.white.main,
		position: "fixed",
	},

    [`& .${classes.mainBox}`]: {
		padding: "10px 20px",
		overflowY: "auto",
		position: "absolute",
		display: "flex",
		height: "100%",
		maxHeight: "100%",
		flexWrap: "wrap",
	}
}));

const maybeSetToken = (Component) => (props) => {
	const { search } = useLocation();
	const { token } = queryString.parse(search);
	if (token) jwt.setToken(token);
	return <Component {...props} />;
};

const Protected = ({ c }) => {
	const [isSmall, setIsSmall] = useState(window.innerWidth < 900);
	const location = useLocation();

	useEffect(() => {
		const onResize = () => setIsSmall(window.innerWidth < 900);
		window.addEventListener("resize", onResize);

		return () => window.removeEventListener("resize", onResize);
	}, []);

	return jwt.isAuthenticated()
		? (
			<StyledNavigateDiv className={classes.main}>
				<Sidebar isSmall={isSmall} />
				<div className={classes.mainBox} style={{ width: (isSmall) ? "calc(100% - 50px)" : "calc(100% - 200px)", marginLeft: (isSmall) ? "50px" : "200px", overflowY: "auto" }}>
					<div className="header-container">
						{c}
					</div>
				</div>
			</StyledNavigateDiv>
		)
		: <Navigate replace to="/" state={{ from: location }} />;
};

export default maybeSetToken(Protected);

