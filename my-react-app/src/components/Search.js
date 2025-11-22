import { Input as MUIInput, InputAdornment, styled } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { memo, useEffect, useState } from "react";

const PREFIX = "Search";

const classes = {
    search: `${PREFIX}-search`
};

const StyledInput = styled(MUIInput)(({ theme }) => ({
    [`&.${classes.search}`]: {
		background: theme.palette.grey.main,
		borderRadius: "10px",
		position: "relative",
		padding: "5px 10px",
	}
}));

const Search = ({
	value: searchValue,
	width = "100%",
	height = "40px",
	onChange,
}) => {
	const [value, setValue] = useState(searchValue);

	useEffect(() => {
		setValue(searchValue);
	}, [searchValue]);

	return (
        <StyledInput
			disableUnderline
			type="search"
			placeholder="Search"
			value={value}
			name="search"
			className={classes.search}
			sx={{ width, height }}
			endAdornment={(
				<InputAdornment sx={{ display: value ? "none" : "flex" }}>
					<SearchIcon />
				</InputAdornment>
			)}
			onChange={onChange}
		/>
    );
};

export default memo(Search);
