import { Checkbox as MUICheckbox } from "@mui/material";


const Checkbox = ({
	id = "custom-checkbox",
	className="",
	checked = false,
	onChange ,
	size = "medium",
	color = "secondary",
	icon,
	checkedIcon,
	disabled = false,
}) => (
	<MUICheckbox
		key={id}
		id={id}
		className={className}
		checked={checked}
		size={size}
		color={color}
		sx={{
			color: `${color}.main`,
			"&.Mui-checked": {
				color: `${color}.main`,
			},
		}}
		icon={icon}
		checkedIcon={checkedIcon}
		disabled={disabled}
		onChange={onChange}
	/>
);

export default Checkbox;
