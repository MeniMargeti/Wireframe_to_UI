import { memo, useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Grid, Typography, styled } from "@mui/material";
import { Formik } from "formik";

import { validations } from "../utils/index.js";

import InputComponent from "./Input.js";
import { PrimaryBackgroundButton, SecondaryBackgroundButton, ThirdBackgroundButton } from "./Buttons.js";
import { PrimaryBackgroundDropdown, PrimaryBorderDropdown } from "./Dropdowns.js";
import Checkbox from "./Checkbox.js";
import RadioButtons from "./RadioButtons.js";
import Slider from "./Slider.js";
import Switch from "./Switch.js";
import { PrimaryBorderDatePicker } from "./DatePicker.js";
import { PrimaryBackgroundAutocomplete, PrimaryBorderAutocomplete } from "./Autocomplete.js";
import { PrimaryBackgroundCheckboxesDropdown, PrimaryBorderCheckboxesDropdown } from "./CheckboxesDropdown.js";

const PREFIX = "Form";

const classes = {
    form: `${PREFIX}-form`,
    inputBox: `${PREFIX}-inputBox`,
    input: `${PREFIX}-input`,
    autocomplete: `${PREFIX}-autocomplete`,
    dropdown: `${PREFIX}-dropdown`,
    checkboxBox: `${PREFIX}-checkboxBox`,
    checkboxesDropdown: `${PREFIX}-checkboxesDropdown`,
    checkbox: `${PREFIX}-checkbox`,
    radioBox: `${PREFIX}-radioBox`,
    sliderBox: `${PREFIX}-sliderBox`,
    datepickerBox: `${PREFIX}-datepickerBox`,
    switchBox: `${PREFIX}-switchBox`,
    buttonTitle: `${PREFIX}-buttonTitle`,
    markLabel: `${PREFIX}-markLabel`,
    button: `${PREFIX}-button`
};

const StyledFormik = styled("form")(({ theme }) => ({
    [`&.${classes.form}`]: {
		width: "100%",
		display: "flex",
		justifyContent: "space-evenly",
		flexDirection: "column",
		alignItems: "center",
		textAlign: "center",
	},
    [`& .${classes.inputBox}`]: {
		width: "100%",
		marginBottom: "10px",
		display: "flex",
		flexDirection: "column",
		color: "black",
	},
    [`& .${classes.input}`]: {
		color: "black",
		width: "100%",
		backgroundColor: "white",
		opacity: 0.7,
		borderRadius: "4px",
		marginTop: "5px",
		marginBottom: "10px",
		"&:hover": {
			opacity: 0.8,
		},
	},
    [`& .${classes.autocomplete}`]: {
		color: "black",
		width: "100%",
		height: "40px",
		backgroundColor: "white",
		opacity: 0.7,
		borderRadius: "4px",
		border: `2px solid ${theme.palette.primary.main}`,
		marginTop: "5px",
		marginBottom: "10px",
		"&:hover": {
			opacity: 0.8,
		},
	},
    [`& .${classes.dropdown}`]: {
		width: "100%",
		marginBottom: "10px",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		color: "black",
	},
    [`& .${classes.checkboxBox}`]: {
		width: "100%",
		marginBottom: "10px",
		display: "flex",
	},
    [`& .${classes.checkboxesDropdown}`]: {
		width: "100%",
		marginBottom: "10px",
		display: "flex",
		flexDirection: "column",
	},
    [`& .${classes.checkbox}`]: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		color: "black",
	},
    [`& .${classes.radioBox}`]: {
		width: "100%",
		marginBottom: "10px",
		display: "flex",
		flexDirection: "column",
		color: "black",
	},
    [`& .${classes.sliderBox}`]: {
		width: "100%",
		marginBottom: "10px",
		display: "flex",
		flexDirection: "column",
		color: "black",
	},
    [`& .${classes.datepickerBox}`]: {
		width: "100%",
		marginBottom: "10px",
		display: "flex",
		flexDirection: "column",
		color: "black",
	},
    [`& .${classes.switchBox}`]: {
		width: "100%",
		marginTop: "10px",
		marginBottom: "10px",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		color: "black",
	},
    [`& .${classes.buttonTitle}`]: {
		color: "black",
		letterSpacing: theme.spacing(0.1),
	},
    [`& .${classes.markLabel}`]: {
		color: "black",
	},
    [`& .${classes.button}`]: {
		width: "100%",
	}
}));

const Form = forwardRef(({ width = "100%", disabled: dsb, content, validationSchema, onSubmit, onSubmitProps, toResetForm = false }, ref) => {

	const [formContent, setFormContent] = useState(content);
	const [disabled, setDisabled] = useState(dsb);
	const formRef = useRef();

	useEffect(() => {
		setFormContent(content);
	}, [content]);

	useEffect(() => {
		setDisabled(dsb);
	}, [dsb]);

	useImperativeHandle(ref, () => ({
		getFormValues() {
			return formRef.current.values;
		},
	}));

	useImperativeHandle(ref, () => ({
		setFieldValue(field, value) {
			formRef.current.setFieldValue(field, value);
		},
	}));

	return (
        <Formik
			innerRef={formRef}
			initialValues={formContent.reduce((a, v) => (
				(v.customType === "input")
					? { ...a, [v.id]: v.value || "" }
					: (v.customType === "autocomplete"
					|| v.customType === "dropdown"
					|| v.customType === "checkbox"
					|| v.customType === "radio"
					|| v.customType === "slider"
					|| v.customType === "switch"
						? { ...a, [v.id]: v.defaultValue }
						: (v.customType === "date-picker"
							? { ...a, [v.id]: v.value || null }
							: (v.customType === "checkboxes-dropdown"
								? { ...a, [v.id]: v.value || [] }
								: a
							)
						)
					)
			), {})}
			validationSchema={validations?.[validationSchema] || null}
			validateOnChange={false}
			onSubmit={(...formikArgs) => {
				onSubmit(...formikArgs, onSubmitProps);
				const [, { resetForm, setSubmitting }] = formikArgs;
				if (toResetForm) resetForm();
				setSubmitting(false);
			}}
		>
            {(formikProps) => (
				<StyledFormik className={classes.form} style={{ ...(width && { width })}} onSubmit={formikProps.handleSubmit}>
					{formContent.map((comp) => (
						<div
							key={comp.id}
							style={{ width: "100%", display: "flex", justifyContent: "center" }}
						>
							{comp.customType === "input"
							&& (
								<Grid key={comp.id} container className={classes.inputBox}>
									<Typography textAlign="left">{comp.label}</Typography>
									<InputComponent
										key={comp.id}
										id={comp.id}
										type={comp.type}
										multiline={comp.multiline}
										minRows={comp.minRows}
										maxRows={comp.maxRows}
										className={classes.input}
										placeholder={comp.placeholder}
										variant="filled"
										color="third"
										InputProps={comp.inputProps}
										value={formikProps.values[comp.id]}
										error={Boolean(formikProps.errors[comp.id])}
										helperText={formikProps.errors[comp.id]}
										disabled={disabled || comp.disabled}
										onChange={(event) => {
											formikProps.handleChange(event);
											if (comp.onChange) {
												comp.onChange(event);
											}
										}}
									/>
								</Grid>
							)}
							{comp.customType === "autocomplete"
							&& (
								<Grid container className={classes.checkboxBox}>
									{comp.filled && (
										<PrimaryBackgroundAutocomplete
											key={comp.id}
											id={comp.id}
											disabled={disabled || comp.disabled}
											placeholder={comp.placeholder}
											width="100%"
											allowCustomInput={comp.allowCustomInput}
											options={comp.options}
											label={comp.label}
											value={formikProps.values[comp.id]}
											onChange={(value) => {
												formikProps.handleChange({
													target: {
														name: comp.id,
														value,
													},
												});
												if (comp.onChange) {
													comp.onChange(value);
												}
											}}
										/>			
									)}
									{!comp.filled && (
										<PrimaryBorderAutocomplete
											key={comp.id}
											id={comp.id}
											disabled={disabled || comp.disabled}
											placeholder={comp.placeholder}
											width="100%"
											allowCustomInput={comp.allowCustomInput}
											options={comp.options}
											label={comp.label}
											value={formikProps.values[comp.id]}
											onChange={(value) => {
												formikProps.handleChange({
													target: {
														name: comp.id,
														value,
													},
												});
												if (comp.onChange) {
													comp.onChange(value);
												}
											}}
										/>			
									)}
									{Boolean(formikProps.errors[comp.id])
									&& (
										<Typography color="error" fontSize="small">{formikProps.errors[comp.id]}</Typography>
									)}
								</Grid>
							)}
							{comp.customType === "dropdown"
							&& (
								<Grid className={classes.dropdown}>
									<Typography>{comp.label}</Typography>
									{comp.filled && (
										<PrimaryBackgroundDropdown
											id={comp.id}
											items={comp.items}
											value={formikProps.values[comp.id]}
											disabled={disabled || comp.disabled}
											size={comp?.size || "medium"}
											width={comp?.width || width || "200px"}
											onChange={(event) => {
												formikProps.handleChange({
													target: {
														name: comp.id,
														value: event.target.value,
													},
												});
												if (comp.onChange) {
													comp.onChange(event);
												}
											}}
										/>
									)}
									{!comp.filled && (
										<PrimaryBorderDropdown
											id={comp.id}
											items={comp.items}
											value={formikProps.values[comp.id]}
											disabled={disabled || comp.disabled}
											size={comp?.size || "medium"}
											width={comp?.width || width || "200px"}
											onChange={(event) => {
												formikProps.handleChange({
													target: {
														name: comp.id,
														value: event.target.value,
													},
												});
												if (comp.onChange) {
													comp.onChange(event);
												}
											}}
										/>
									)}
								</Grid>
							)}
							{comp.customType === "checkboxes-dropdown"
							&& (
								<Grid className={classes.checkboxesDropdown}>
									<Typography align="left">{comp.label}</Typography>
									{comp.filled && (
										<PrimaryBackgroundCheckboxesDropdown
											id={comp.id}
											options={comp.options}
											value={formikProps.values[comp.id]}
											placeholder={comp.label}
											width={comp?.width || width || "200px"}
											disabled={disabled || comp.disabled}
											onChange={(value) => {
												formikProps.handleChange({
													target: {
														name: comp.id,
														value,
													},
												});
												if (comp.onChange) {
													comp.onChange(value);
												}
											}}
										/>
									)}
									{!comp.filled && (
										<PrimaryBorderCheckboxesDropdown
											id={comp.id}
											options={comp.options}
											value={formikProps.values[comp.id]}
											placeholder={comp.label}
											width={comp?.width || width || "200px"}
											disabled={disabled || comp.disabled}
											onChange={(value) => {
												formikProps.handleChange({
													target: {
														name: comp.id,
														value,
													},
												});
												if (comp.onChange) {
													comp.onChange(value);
												}
											}}
										/>
									)}
								</Grid>
							)}
							{comp.customType === "checkbox"
							&& (
								<Grid container className={classes.checkboxBox}>
									<Grid className={classes.checkbox}>
										<Typography>{comp.label}</Typography>
										<Checkbox
											key={comp.id}
											id={comp.id}
											checked={formikProps.values[comp.id]}
											size={comp.size}
											color={comp.color || "primary"}
											sx={{
												color: `${comp.color || "primary"}.main`,
												"&.Mui-checked": {
													color: `${comp.color || "primary"}.main`,
												},
											}}
											icon={comp.icon}
											checkedIcon={comp.checkedIcon}
											disabled={disabled || comp.disabled}
											onChange={(event) => {
												formikProps.handleChange({
													target: {
														name: comp.id,
														value: !formikProps.values[comp.id],
													},
												});
												if (comp.onChange) {
													comp.onChange(event);
												}
											}}
										/>
									</Grid>
									{Boolean(formikProps.errors[comp.id])
									&& (
										<Typography color="error" fontSize="small">{formikProps.errors[comp.id]}</Typography>
									)}
								</Grid>
							)}
							{comp.customType === "radio"
							&& (
								<Grid key={comp.id} container className={classes.radioBox}>
									<Typography textAlign="left">{comp.label}</Typography>
									<RadioButtons
										id={comp.label}
										value={formikProps.values[comp.id]}
										row={comp.row}
										color={comp.color || "primary"}
										labelPlacement={comp.labelPlacement}
										disabled={disabled || comp.disabled}
										items={comp.items}
										onChange={(event) => {
											formikProps.handleChange({
												target: {
													name: comp.id,
													value: event.target.value,
												},
											});
											if (comp.onChange) {
												comp.onChange(event);
											}
										}}
									/>
									{Boolean(formikProps.errors[comp.id])
									&& (
										<Typography textAlign="left" color="error" fontSize="small">{formikProps.errors[comp.id]}</Typography>
									)}
								</Grid>
							)}
							{comp.customType === "slider"
							&& (
								<Grid key={comp.id} container className={classes.sliderBox}>
									<Typography textAlign="left">{comp.label}</Typography>
									<Slider
										iconBefore={comp.iconBefore}
										iconAfter={comp.iconAfter}
										color={comp.color || "primary"}
										value={formikProps.values[comp.id]}
										min={comp.min}
										max={comp.max}
										marks={comp.marks}
										step={comp.step}
										size={comp.size}
										track={comp.track}
										valueLabelDisplay={comp.displayLabel}
										disabled={disabled || comp.disabled}
										onChange={(event) => {
											formikProps.handleChange({
												target: {
													name: comp.id,
													value: event.target.value,
												},
											});
											if (comp.onChange) {
												comp.onChange(event);
											}
										}}
									/>
									{Boolean(formikProps.errors[comp.id])
									&& (
										<Typography textAlign="left" color="error" fontSize="small">{formikProps.errors[comp.id]}</Typography>
									)}
								</Grid>
							)}
							{comp.customType === "switch"
							&& (
								<Grid key={comp.id} container className={classes.switchBox}>
									<Typography textAlign="left">{comp.label}</Typography>
									<Switch
										color={comp.color || "primary"}
										checked={formikProps.values[comp.id]}
										size={comp.size}
										disabled={disabled || comp.disabled}
										onChange={(event) => {
											formikProps.handleChange({
												target: {
													name: comp.id,
													value: !formikProps.values[comp.id],
												},
											});
											if (comp.onChange) {
												comp.onChange(event);
											}
										}}
									/>
									{Boolean(formikProps.errors[comp.id])
									&& (
										<Typography textAlign="left" color="error" fontSize="small">{formikProps.errors[comp.id]}</Typography>
									)}
								</Grid>
							)}
							{comp.customType === "date-picker"
							&& (
								<Grid key={comp.id} container className={classes.datepickerBox}>
									<Typography textAlign="left">{comp.label}</Typography>
									<PrimaryBorderDatePicker
										type={comp.type || "desktop"} // desktop, mobile, time, datetime
										value={formikProps.values[comp.id]}
										disabled={disabled || comp.disabled}
										label={comp.sublabel || ""}
										views={comp.views || ["day", "month", "year"]}
										width={comp.width || width || "200px"}
										onChange={(value) => {
											formikProps.handleChange({
												target: {
													name: comp.id,
													value,
												},
											});
											if (comp.onChange) {
												comp.onChange(event);
											}
										}}
									/>
									{Boolean(formikProps.errors[comp.id])
									&& (
										<Typography textAlign="left" color="error" fontSize="small">{formikProps.errors[comp.id]}</Typography>
									)}
								</Grid>
							)}
							{comp.customType === "button"
							&& (
								comp.color === "third"
									? (
										<ThirdBackgroundButton
											id={comp.id}
											type={comp.type}
											width={comp.width || width || "200px"}
											disabled={formikProps.isSubmitting || disabled}
											className={classes.button}
											title={comp.text}
										/>
									)
									: (comp.color === "secondary"
										? (
											<SecondaryBackgroundButton
												id={comp.id}
												type={comp.type}
												width={comp.width || width || "200px"}
												disabled={formikProps.isSubmitting || disabled}
												className={classes.button}
												title={comp.text}
											/>
										)
										: (
											<PrimaryBackgroundButton
												id={comp.id}
												type={comp.type}
												width={comp.width || width || "200px"}
												disabled={formikProps.isSubmitting || disabled}
												className={classes.button}
												title={comp.text}
											/>
										)
									)
							)}
						</div>
					))}
				</StyledFormik>
			)}
        </Formik>
    );
});

export default memo(Form);
