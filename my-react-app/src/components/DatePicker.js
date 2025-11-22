import { useEffect, useState } from "react";
import { TimePicker, DateTimePicker, DesktopDatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import { styled } from "@mui/material";

import Input from "./Input.js";

const PREFIX = "DatePicker";

const classes = {
    primaryBackground: `${PREFIX}-primaryBackground`,
    primaryBorder: `${PREFIX}-primaryBorder`,
};

const StyledPicker = styled("div")(({ theme }) => ({
	[`& .${classes.primaryBackground}`]: {
		color: "white",
		backgroundColor: theme.palette.primary.main,
		border: `2px solid ${theme.palette.primary.main}`,
		borderRadius: "10px",
		height: "40px!important",
		"&:hover": {
			color: "white",
			backgroundColor: theme.palette.primary.dark,
			border: `2px solid ${theme.palette.primary.dark}`,
		},
		"&:disabled": {
			color: "white",
			backgroundColor: theme.palette.grey.main,
			border: `2px solid ${theme.palette.grey.main}`,
		},
	},
	[`& .${classes.primaryBorder}`]: {
		color: theme.palette.primary.main,
		backgroundColor: "transparent",
		border: `2px solid ${theme.palette.primary.main}`,
		borderRadius: "10px",
		height: "40px!important",
		"&:hover": {
			color: theme.palette.primary.main,
			backgroundColor: theme.palette.grey.light,
			border: `2px solid ${theme.palette.primary.main}`,
		},
		"&:disabled": {
			color: "white",
			backgroundColor: theme.palette.grey.main,
			border: `2px solid ${theme.palette.grey.main}`,
		},
	},
	["& .MuiPickersOutlinedInput-notchedOutline"]: {
		border: "0px!important",
		"&:hover": {
			border: "0px!important",
		},
		"&.Mui-focused": {
			border: "0px!important",
		},
	},
}));

const calculateFormat = (views, type) => {
	switch (type) {
		case "desktop":
		case "mobile":
			if (views.includes("year") && views.includes("month") && views.includes("day")) return "DD/MM/YYYY";
			if (views.includes("year") && views.includes("month")) return "MM/YYYY";
			if (views.includes("month") && views.includes("day")) return "DD/MM";
			if (views.includes("year")) return "YYYY";
			if (views.includes("month")) return "MM";
			if (views.includes("day")) return "DD";
			break;
		case "time":
			if (views.includes("hours") && views.includes("minutes") && views.includes("seconds")) return "HH:mm:ss";
			if (views.includes("hours") && views.includes("minutes")) return "HH:mm";
			if (views.includes("minutes") && views.includes("seconds")) return "mm:ss";
			if (views.includes("hours")) return "HH";
			if (views.includes("minutes")) return "mm";
			if (views.includes("seconds")) return "ss";
			break;
		case "datetime":
			if (views.includes("seconds")) return "DD/MM/YYYY HH:mm:ss";
			return "DD/MM/YYYY HH:mm";
		default:
			return "DD/MM/YYYY";
	}
};

const PrimaryBackgroundDatePicker = ({
	id = "primary-background-date-picker",
	type = "desktop", // desktop, mobile, time, datetime
	value = null,
	onChange,
	disabled = false,
	label = "Date",
	views = (type === "time")
		? ["hours", "minutes"]
		: (type === "datetime")
			? ["day", "hours", "minutes"]
			: ["day"],
	displayViews = (type === "time")
		? ["hours", "minutes"]
		: (type === "datetime")
			? ["day", "month", "year", "hours", "minutes"]
			: ["day", "month", "year"],
	width = "200px",
}) => {
	const [customValue, setCustomValue] = useState(value);

	const handleChange = (newValue) => {
		if (onChange) onChange(newValue);
	};

	useEffect(() => {
		setCustomValue(value);
	}, [value]);

	return (
		<StyledPicker style={{ color: "white!important", border: "0px!important" }}>
			{type === "desktop" && (
				<DesktopDatePicker
					className={classes.primaryBackground}
					views={views}
					disabled={disabled}
					label={label}
					format={calculateFormat(displayViews, type)}
					value={customValue}
					textField={(params) => <Input {...params} />}
					slotProps={{ textField: { size: 'small' } }}
					sx={{
						...(width && { width }),
						fontSize: "12px",
						"& .MuiPickersInputBase-root": {
							color: "inherit",
						},
					  }}
					onChange={handleChange}
				/>
			)}
			{type === "mobile" && (
				<MobileDatePicker
					className={classes.primaryBackground}
					views={views}
					disabled={disabled}
					label={label}
					format={calculateFormat(displayViews, type)}
					value={customValue}
					textField={(params) => <Input {...params} />}
					slotProps={{ textField: { size: 'small' } }}
					sx={{
						...(width && { width }),
						fontSize: "12px",
						"& .MuiPickersInputBase-root": {
							color: "inherit",
						},
					}}
					onChange={handleChange}
				/>
			)}
			{type === "time" && (
				<TimePicker
					className={classes.primaryBackground}
					views={views}
					disabled={disabled}
					label={label}
					ampm={false}
					format={calculateFormat(displayViews, type)}
					value={customValue}
					textField={(params) => <Input {...params} />}
					slotProps={{ textField: { size: 'small' } }}
					sx={{
						...(width && { width }),
						fontSize: "12px",
						"& .MuiPickersInputBase-root": {
							color: "inherit",
						},
					}}
					onChange={handleChange}
				/>
			)}
			{type === "datetime" && (
				<DateTimePicker
					className={classes.primaryBackground}
					views={views}
					disabled={disabled}
					label={label}
					ampm={false}
					format={calculateFormat(displayViews, type)}
					value={customValue}
					textField={(params) => <Input {...params} />}
					slotProps={{ textField: { size: 'small' } }}
					sx={{
						...(width && { width }),
						fontSize: "12px",
						"& .MuiPickersInputBase-root": {
							color: "inherit",
						},
					}}
					onChange={handleChange}
				/>
			)}
		</StyledPicker>
	);
};

const PrimaryBorderDatePicker = ({
	id = "primary-border-date-picker",
	type = "desktop", // desktop, mobile, time, datetime
	value = null,
	onChange,
	disabled = false,
	label = "Date",
	views = (type === "time")
		? ["hours", "minutes"]
		: (type === "datetime")
			? ["day", "hours", "minutes"]
			: ["day"],
	displayViews = (type === "time")
		? ["hours", "minutes"]
		: (type === "datetime")
			? ["day", "month", "year", "hours", "minutes"]
			: ["day", "month", "year"],
	width = "200px",
}) => {
	const [customValue, setCustomValue] = useState(value);

	const handleChange = (newValue) => {
		if (onChange) onChange(newValue);
	};

	useEffect(() => {
		setCustomValue(value);
	}, [value]);

	return (
		<StyledPicker>
			{type === "desktop" && (
				<DesktopDatePicker
					className={classes.primaryBorder}
					views={views}
					disabled={disabled}
					label={label}
					format={calculateFormat(displayViews, type)}
					value={customValue}
					textField={(params) => <Input {...params} />}
					slotProps={{ textField: { size: 'small' } }}
					sx={{
						...(width && { width }),
						fontSize: "12px",
						"& .MuiPickersInputBase-root": {
							color: "inherit",
						},
					}}
					onChange={handleChange}
				/>
			)}
			{type === "mobile" && (
				<MobileDatePicker
					className={classes.primaryBorder}
					views={views}
					disabled={disabled}
					label={label}
					format={calculateFormat(displayViews, type)}
					value={customValue}
					textField={(params) => <Input {...params} />}
					slotProps={{ textField: { size: 'small' } }}
					sx={{
						...(width && { width }),
						fontSize: "12px",
						"& .MuiPickersInputBase-root": {
							color: "inherit",
						},
					}}
					onChange={handleChange}
				/>
			)}
			{type === "time" && (
				<TimePicker
					className={classes.primaryBorder}
					views={views}
					disabled={disabled}
					label={label}
					ampm={false}
					format={calculateFormat(displayViews, type)}
					value={customValue}
					textField={(params) => <Input {...params} />}
					slotProps={{ textField: { size: 'small' } }}
					sx={{
						...(width && { width }),
						fontSize: "12px",
						"& .MuiPickersInputBase-root": {
							color: "inherit",
						},
					}}
					onChange={handleChange}
				/>
			)}
			{type === "datetime" && (
				<DateTimePicker
					className={classes.primaryBorder}
					views={views}
					disabled={disabled}
					label={label}
					ampm={false}
					format={calculateFormat(displayViews, type)}
					value={customValue}
					textField={(params) => <Input {...params} />}
					slotProps={{ textField: { size: 'small' } }}
					sx={{
						...(width && { width }),
						fontSize: "12px",
						"& .MuiPickersInputBase-root": {
							color: "inherit",
						},
					}}
					onChange={handleChange}
				/>
			)}
		</StyledPicker>
	);
};

export { PrimaryBackgroundDatePicker, PrimaryBorderDatePicker };
