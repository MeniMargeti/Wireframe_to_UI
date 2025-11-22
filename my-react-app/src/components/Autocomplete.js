import { Autocomplete, Box, createFilterOptions, TextField, styled } from "@mui/material";

const PREFIX = "PrimaryBackgroundAutocomplete";

const classes = {
    primaryBackground: `${PREFIX}-primaryBackground`,
    primaryBorder: `${PREFIX}-primaryBorder`,
    whiteIcon: `${PREFIX}-whiteIcon`,
    primaryIcon: `${PREFIX}-primaryIcon`
};

const StyledTextField = styled(TextField)(({ theme }) => ({
    [`&.${classes.primaryBackground}`]: {
		color: "white!important",
		backgroundColor: theme.palette.primary.main,
		border: `2px solid ${theme.palette.primary.main}`,
		borderRadius: "10px",
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
    [`&.${classes.whiteIcon}`]: {
		color: "white",
	},
    [`&.${classes.primaryIcon}`]: {
		color: theme.palette.primary.main,
	}
}));

const filter = createFilterOptions();

export const PrimaryBackgroundAutocomplete = ({
	id = "primary-background-autocomplete",
	disabled = false,
	className = "",
    label = "Label",
	placeholder = "Placeholder",
	width = "200px",
	height = "40px",
    fontSize = "14px",
	options = [],
    allowCustomInput = true,
	value = "",
	onChange = () => {},
}) => (
    <Autocomplete
        key={id}
        id={id}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        style={{ ...(width && { width }), ...(height && { height }) }}
        options={options}
        renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
                <Box
                key={key}
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...optionProps}
                >
                {option}
                </Box>
            );
        }}
        renderInput={(params) => (<StyledTextField className={`${className} ${classes.primaryBackground}`} {...params} label={label} />)}
        filterOptions={(options, params) => {
            const filtered = filter(options, params);
            if (params.inputValue !== "" && allowCustomInput) {
                filtered.push(params.inputValue);
            }
            return filtered;
        }}
        sx={{
            ...(width && { width }),
            fontSize,
            "& .MuiInputBase-root": {
                height,
            },
            "& .MuiInputLabel-root": {
                transform: `translate(14px, ${Boolean(value) ? "-9" : "11"}px) scale(${Boolean(value) ? "0.75" : "1"})`,
            },
            "& .MuiInputLabel-root.Mui-focused": {
                transform: "translate(14px, -9px) scale(0.75)",
            },
            }}
        onChange={(_, newValue) => onChange(newValue)}
    />
);

export const PrimaryBorderAutocomplete = ({
	id = "primary-border-autocomplete",
	disabled = false,
	className = "",
    label = "Label",
	placeholder = "Placeholder",
	width = "200px",
	height = "40px",
    fontSize = "14px",
	options = [],
    allowCustomInput = true,
	value = "",
	onChange = () => {},
}) => (
    <Autocomplete
        key={id}
        id={id}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        style={{ ...(width && { width }), ...(height && { height }) }}
        options={options}
        renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
                <Box
                key={key}
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...optionProps}
                >
                {option}
                </Box>
            );
        }}
        renderInput={(params) => (<StyledTextField className={`${className} ${classes.primaryBorder}`} {...params} label={label} />)}
        filterOptions={(options, params) => {
            const filtered = filter(options, params);
            if (params.inputValue !== "" && allowCustomInput) {
                filtered.push(params.inputValue);
            }
            return filtered;
        }}
        sx={{
            ...(width && { width }),
            fontSize,
            "& .MuiInputBase-root": {
                height,
            },
            "& .MuiInputLabel-root": {
                transform: `translate(14px, ${Boolean(value) ? "-9" : "11"}px) scale(${Boolean(value) ? "0.75" : "1"})`,
            },
            "& .MuiInputLabel-root.Mui-focused": {
                transform: "translate(14px, -9px) scale(0.75)",
            },
            }}
        onChange={(_, newValue) => onChange(newValue)}
    />
);
