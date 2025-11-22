import { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";

import { isFuzzyMatch } from "../utils/index.js";
import firstMedal from "../assets/firstMedal.png";
import secondMedal from "../assets/secondMedal.png";
import thirdMedal from "../assets/thirdMedal.png";

const PREFIX = "Leaderboard";

const classes = {
    leaderboardContainer: `${PREFIX}-leaderboardContainer`,
    table: `${PREFIX}-table`,
    primaryTableHeader: `${PREFIX}-primaryTableHeader`,
    tableRow: `${PREFIX}-tableRow`,
    tableCell: `${PREFIX}-tableCell`
};

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    [`&.${classes.leaderboardContainer}`]: {
		marginTop: theme.spacing(1),
		overflowY: "auto",
		overflowX: "hidden",
		width: "100%",
	},
    [`& .${classes.table}`]: {
		width: "min(80vw, 1000px)",
	},
    [`& .${classes.primaryTableHeader}`]: {
		fontWeight: "bold",
		fontSize: "18px",
		textAlign: "center",
		backgroundColor: theme.palette.primary.main,
		color: "#fff",
	},
    [`& .${classes.tableRow}`]: {
		height: "70px",
		borderBottom: "2px solid #f2f2f2",
	},
    [`& .${classes.tableCell}`]: {
		height: "100%",
		fontSize: "16px",
		color: "inherit",
		textAlign: "center",
		border: "0px",
	}
}));

const getRowStyle = (index) => {
	if (index === 0) return { textAlign: "center", backgroundColor: "#D2AC47", color: "white", borderBottom: "2px solid #fff" }; // Gold for 1st place
	if (index === 1) return { textAlign: "center", backgroundColor: "#B5B7BB", color: "white", borderBottom: "2px solid #fff" }; // Silver for 2nd place
	if (index === 2) return { textAlign: "center", backgroundColor: "#CD7F32", color: "white", borderBottom: "2px solid #fff" }; // Bronze for 3rd place
	return { textAlign: "center" }; // Default for other rows
};

const isInFilteredLeaderboard = (entry, filteredLeaderboard) => {
	if (!filteredLeaderboard) return true;
	return filteredLeaderboard.some((filteredEntry) => filteredEntry.team === entry.team);
};

const Leaderboard = ({ leaderboard, search = null }) => {
	const [searchTerm, setSearchTerm] = useState(search);
	const [filteredLeaderboard, setFilteredLeaderboard] = useState(leaderboard);

	useEffect(() => {
		setSearchTerm(search);
	}, [search]);

	useEffect(() => {
		if (!searchTerm) {
			setFilteredLeaderboard(leaderboard);
			return;
		}

		const filtered = leaderboard.filter((entry) => isFuzzyMatch(entry.team, searchTerm));
		setFilteredLeaderboard(filtered);
	}, [searchTerm, leaderboard]);

	return (
        <StyledTableContainer component={Paper} className={classes.leaderboardContainer}>
            <Table className={classes.table}>
				<TableHead>
					<TableRow className={classes.tableRow} style={{ textAlign: "center" }}>
						<TableCell className={classes.primaryTableHeader}>{""}</TableCell>
						<TableCell className={classes.primaryTableHeader} style={{ textAlign: "left" }}>{"Team"}</TableCell>
						<TableCell className={classes.primaryTableHeader}>{"Score"}</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{leaderboard.sort((entry1, entry2) => entry1.score < entry2.score).map((entry, index) => (
						isInFilteredLeaderboard(entry, filteredLeaderboard) && (
							<TableRow key={index} className={classes.tableRow} style={getRowStyle(index)}>
								<TableCell className={classes.tableCell} style={{ width: "50px", height: "100%" }}>
									{index === 0 && <img src={firstMedal} alt="1st" style={{ width: "30px" }} />}
									{index === 1 && <img src={secondMedal} alt="1st" style={{ width: "30px" }} />}
									{index === 2 && <img src={thirdMedal} alt="1st" style={{ width: "30px" }} />}
									{index > 2 && index + 1}
								</TableCell>
								<TableCell className={classes.tableCell} sx={{ textAlign: "left!important" }}>
									{entry?.team ?? "-"}
								</TableCell>
								<TableCell className={classes.tableCell}>
									{(entry?.score ?? "-")}
								</TableCell>
							</TableRow>
						)
					))}
					{filteredLeaderboard.length === 0 && (
						<TableRow className={classes.tableRow}>
							<TableCell colSpan={3} className={classes.tableCell} style={{ textAlign: "center" }}>
								{"No results found"}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
        </StyledTableContainer>
    );
};

export default Leaderboard;
