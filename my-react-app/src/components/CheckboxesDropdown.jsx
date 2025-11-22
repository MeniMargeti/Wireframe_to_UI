import { ListItemText, MenuItem, OutlinedInput, Select, styled } from "@mui/material";

import Checkbox from "./Checkbox";
import { useEffect, useRef, useState } from "react";

const PREFIX = "PrimaryBackgroundCheckboxesDropdown";

const classes = {
    primaryBackground: `${PREFIX}-primaryBackground`,
    primaryBorder: `${PREFIX}-primaryBorder`,
    disabled: `${PREFIX}-disabled`,
    whiteIcon: `${PREFIX}-whiteIcon`,
    primaryIcon: `${PREFIX}-primaryIcon`
};

const StyledSelect = styled(Select)(({ fontSize, theme }) => ({
    [`&.${classes.primaryBackground}`]: {
		color: "white!important",
		backgroundColor: theme.palette.primary.main,
		border: `2px solid ${theme.palette.primary.main}`,
		borderRadius: "10px",
        fontSize: `${fontSize}!important`,
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
    [`&.${classes.primaryBorder}`]: {
		color: theme.palette.primary.main,
		backgroundColor: "transparent",
		border: `2px solid ${theme.palette.primary.main}`,
		borderRadius: "10px",
        fontSize: `${fontSize}!important`,
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
    [`&.${classes.disabled}`]: {
        color: "white",
        backgroundColor: theme.palette.grey.main,
        border: `2px solid ${theme.palette.grey.main}`,
		borderRadius: "10px",
        fontSize: (props) => `${props.fontSize}!important`,
        cursor: "not-allowed",
	},
    [`& .${classes.whiteIcon}`]: {
		color: "white",
	},
    [`& .${classes.primaryIcon}`]: {
		color: theme.palette.primary.main,
	}
}));

export const PrimaryBackgroundCheckboxesDropdown = ({
	id = "primary-background-checkboxes-dropdown",
	disabled = false,
	className = "",
    placeholder = "Placeholder",
    color = "primary",
	width = "300px",
	height = "40px",
    fontSize = "14px",
	options = [],
	value = [],
	onChange = () => {},
}) => {
    const [inputWidth, setInputWidth] = useState(width);
    const inputRef = useRef();

    useEffect(() => {
        if (inputRef.current) {
            setInputWidth(inputRef.current.offsetWidth);
        }
    }, [inputRef.current, inputRef.current?.offsetWidth]);

	return (
        <StyledSelect
            multiple
            displayEmpty
            key={id}
            id={id}
            labelId="multiple-checkbox-label"
            disabled={disabled}
            value={value}
            fontSize={fontSize}
            input={<OutlinedInput ref={inputRef} style={{ textAlign: "left" }} />}
            renderValue={(selected) => {
                if (selected.length === 0) {
                    return <em>{placeholder}</em>;
                }

                return selected.join(", ");
            }}
            className={`${className} ${disabled ? classes.disabled : classes.primaryBackground}`}
            MenuProps={{
                PaperProps: {
                    style: {
                        maxHeight: 250,
                        width: inputWidth,
                    },
                }
            }}
            classes={{
                icon: classes.whiteIcon,
            }}
            sx={{
                ...(width && { width }),
                ...(height && { height }),
            }}
            onChange={(event) => onChange(event.target.value)}
        >
            {placeholder && (
                <MenuItem disabled value="">
                    <em>{placeholder}</em>
                </MenuItem>
            )}
            {options.map((option) => (
                <MenuItem key={option} value={option}>
                    <Checkbox
                        checked={value && value.includes(option)}
                        size="small"
                        color={color}
                        sx={{
                            color: `${color}.main`,
                            "&.Mui-checked": {
                                color: `${color}.main`,
                            },
                        }}
                        disabled={disabled}
                    />
                    <ListItemText key={option} primary={option} />
                </MenuItem>
            ))}
        </StyledSelect>
    );
};

export const PrimaryBorderCheckboxesDropdown = ({
	id = "primary-border-checkboxes-dropdown",
	disabled = false,
	className = "",
    placeholder = "Placeholder",
    color = "primary",
	width = "300px",
	height = "40px",
    fontSize = "14px",
	options = [],
	value = [],
	onChange = () => {},
}) => {
    const [inputWidth, setInputWidth] = useState(width);
    const inputRef = useRef();

    useEffect(() => {
        if (inputRef.current) {
            setInputWidth(inputRef.current.offsetWidth);
        }
    }, [inputRef.current, inputRef.current?.offsetWidth]);

	return (
        <StyledSelect
            multiple
            displayEmpty
            key={id}
            id={id}
            labelId="multiple-checkbox-label"
            disabled={disabled}
            value={value}
            fontSize={fontSize}
            input={<OutlinedInput ref={inputRef} style={{ textAlign: "left" }} />}
            renderValue={(selected) => {
                if (selected.length === 0) {
                    return <em>{placeholder}</em>;
                }

                return selected.join(", ");
            }}
            className={`${className} ${disabled ? classes.disabled : classes.primaryBorder}`}
            MenuProps={{
                PaperProps: {
                    style: {
                        maxHeight: 250,
                        width: inputWidth,
                    },
                }
            }}
            classes={{
                icon: classes.primaryIcon,
            }}
            sx={{
                ...(width && { width }),
                ...(height && { height }),
            }}
            onChange={(event) => onChange(event.target.value)}
        >
            {placeholder && (
                <MenuItem disabled value="">
                    <em>{placeholder}</em>
                </MenuItem>
            )}
            {options.map((option) => (
                <MenuItem key={option} value={option}>
                    <Checkbox
                        checked={value && value.includes(option)}
                        size="small"
                        color={color}
                        sx={{
                            color: `${color}.main`,
                            "&.Mui-checked": {
                                color: `${color}.main`,
                            },
                        }}
                        disabled={disabled}
                    />
                    <ListItemText key={option} primary={option} />
                </MenuItem>
            ))}
        </StyledSelect>
    );
};
