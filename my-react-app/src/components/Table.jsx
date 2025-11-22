import { useCallback, memo } from "react";
import ReactTable from "react-table-6";
import { Button, FormControl, InputAdornment, Input, styled } from "@mui/material";
import { NavigateBefore, NavigateNext, Search } from "@mui/icons-material";
import clsx from "clsx";

import { isFuzzyMatch } from "../utils/index.js";
import { PrimaryBorderDropdown } from "./Dropdowns.jsx";
import theme from "../theme.js";

const PREFIX = "TCTT-Table";

const classes = {
    paginationButton: `${PREFIX}-paginationButton`,
    formControl: `${PREFIX}-formControl`,
    input: `${PREFIX}-input`
};

const StyledReactTable = styled(ReactTable)(({ customTheme }) => ({
    [`& .${classes.paginationButton}`]: {
		backgroundColor: customTheme?.palette?.primary?.main || theme?.palette?.primary?.main || "",
		borderRadius: 3 * (customTheme?.shape?.borderRadius || theme?.shape?.borderRadius || 5),
		color: "white!important",
		"&:hover": {
			backgroundColor: customTheme?.palette?.primary?.dark || theme?.palette?.primary?.dark || "",
		},
	},
    [`& .${classes.formControl}`]: {
		marginRight: customTheme?.spacing(0.5) || theme?.spacing(0.5) || "",
		minWidth: 70,
	},
    [`& .${classes.input}`]: {
		padding: `${customTheme?.spacing(0.5) || theme?.spacing(0.5) || ""} !important`,
		color: "black",
		border: `1px solid ${customTheme?.palette?.primary?.main || theme?.palette?.primary?.main || ""}`,
	}
}));

const defaultFilterMethod = ({ id, value }, row) => isFuzzyMatch(row[id], value);
const getTdPropsDefault = () => ({ style: { alignSelf: "center", textAlign: "center" } });

const Table = ({
	data = [],
	columns,
	noDataText = "No data available!",
	defaultSorted = [{ id: "updatedAt", desc: true }],
	className,
	customPageSize,
	showPageSizeOptions = true,
	getTdProps = getTdPropsDefault,
    customTheme,
    defaultPageSize,
    setDefaultPageSize,
	titleBackgroundColor = "primary",
	borderRadiusMultiplier = 2.5,
	...otherProps
}) => {
	const FilterComponent = useCallback(({ filter = { value: "" }, onChange }) => (
		<Input
			disableUnderline
			type="search"
			value={filter.value}
			name="search"
			sx={{ width: "100%", position: "relative", ">.MuiInput-input": { height: "100%" }, px: 1, py: 0.5 }}
			startAdornment={<InputAdornment sx={{ position: "absolute" }} position="end"><Search sx={{ display: filter?.value ? "none" : "block" }} /></InputAdornment>}
			onChange={(event) => onChange(event.target.value)}
		/>
	), []);

	const PreviousComponent = useCallback((prps) => (
		<Button variant="outlined" size="small" {...prps} className={classes.paginationButton}>
			<NavigateBefore />
		</Button>
	), [classes.paginationButton]);

	const NextComponent = useCallback((prps) => (
		<Button variant="outlined" size="small" {...prps} className={classes.paginationButton}>
			<NavigateNext />
		</Button>
	), [classes.paginationButton]);

	const getTheadTrProps = useCallback(() => ({
		style: {
			backgroundColor: customTheme?.palette?.[titleBackgroundColor]?.main || theme?.palette?.[titleBackgroundColor]?.main || customTheme?.palette?.primary?.main || theme?.palette?.primary?.main || "",
			color: customTheme?.palette?.common?.white || theme?.palette?.common?.white || "",
		},
	}), [customTheme, theme]);

	const getTableProps = useCallback(() => ({
		style: {
			border: `${customTheme?.spacing(0) || theme.spacing(0)} solid ${customTheme?.palette?.primary?.main || theme?.palette?.primary?.main || ""}`,
			boxShadow: "0px 0px 15px 5px rgba(0,0,0,0.22)",
			borderRadius: borderRadiusMultiplier * (customTheme?.shape?.borderRadius || theme?.shape?.borderRadius || 5),
			marginBottom: "20px",
		},
	}), [customTheme, theme]);

	const getPaginationProps = useCallback(() => ({
		style: { margin: customTheme?.spacing(2, 5) || theme?.spacing(2, 5) || "", backgroundColor: "transparent", border: "none", boxShadow: "none", color: "black" },
	}), [customTheme, theme]);

	const renderPageSizeOptions = useCallback(({ pageSize, onPageSizeChange, pageSizeOptions, rowsText }) => (
		<FormControl className={classes.formControl}>
			<PrimaryBorderDropdown
				id="example-dropdown"
				items={pageSizeOptions.map((option) => ({ value: option, text: `${option} ${rowsText}` }))}
				value={pageSize}
				size="medium"
				width="auto"
				filled={false}
				background="primary"
				onChange={(e) => { setDefaultPageSize(Number(e.target.value)); onPageSizeChange(Number(e.target.value)); }}
			/>
		</FormControl>
	), [classes.formControl, classes.input, setDefaultPageSize]);

	return (
		<StyledReactTable
			showPageSizeOptions={showPageSizeOptions}
			showPaginationBottom={showPageSizeOptions}
			data={data}
			noDataText={noDataText}
			columns={columns}
			defaultSorted={defaultSorted}
			defaultFilterMethod={defaultFilterMethod}
			defaultPageSize={customPageSize || defaultPageSize}
			FilterComponent={FilterComponent}
			minRows={5}
			className={clsx("-striped -highlight -noborder", className)}
			getTdProps={getTdProps}
			getTheadTrProps={getTheadTrProps}
			getTableProps={getTableProps}
			getPaginationProps={getPaginationProps}
			PreviousComponent={PreviousComponent}
			showPageJump={false}
			NextComponent={NextComponent}
			renderPageSizeOptions={renderPageSizeOptions}
			{...otherProps}
		/>
	);
};

export default memo(Table);