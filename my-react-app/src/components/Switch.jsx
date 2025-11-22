import { Switch as MUISwitch } from "@mui/material";

const Switch = ({
	id = "custom-switch",
	checked = false,
	onChange,
	className="",
	size = "medium",
	color = "secondary",
}) => (
	<MUISwitch
		key={id}
		className={className}
		color={color || "secondary"}
		checked={checked}
		size={size || "medium"} // small, medium
		onChange={onChange}
	/>
);

export default Switch;
