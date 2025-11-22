import { Accordion as MUIAccordion, AccordionSummary, AccordionDetails, Typography, styled } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { memo } from "react";

import colors from "../colors.module.scss";

const PREFIX = "Accordion";

const classes = {
    accordion: `${PREFIX}-accordion`,
    accordionExpanded: `${PREFIX}-accordionExpanded`,
    accordionHeader: `${PREFIX}-accordionHeader`,
    accordionHeaderExpanded: `${PREFIX}-accordionHeaderExpanded`,
    accordionContentGutters: `${PREFIX}-accordionContentGutters`,
    accordionSubtitle: `${PREFIX}-accordionSubtitle`,
    accordionMain: `${PREFIX}-accordionMain`
};

const StyledMUIAccordion = styled(MUIAccordion)(({
	titleColor,
	titleBackground,
	subtitleColor,
	subtitleBackground,
}) => ({
    [`&.${classes.accordion}`]: {
		width: "100%!important",
		minHeight: "auto",
		borderRadius: "10px!important",
		borderColor: colors[titleBackground] || titleBackground,
		border: "1px solid",
		backgroundColor: "transparent",
		boxShadow: "none",
	},
    [`&.${classes.accordionExpanded}`]: {
		minHeight: "auto",
		margin: "0px!important",
		borderRadius: "10px!important",
		borderColor: colors[titleBackground] || titleBackground,
		border: "1px solid",
	},
    [`& .${classes.accordionHeader}`]: {
		color: colors[titleColor] || titleColor,
		backgroundColor: colors[titleBackground] || titleBackground,
		margin: "0px!important",
		borderRadius: "10px 10px 10px 10px!important",
	},
    [`& .${classes.accordionHeaderExpanded}`]: {
		borderRadius: "10px 10px 0px 0px!important",
		minHeight: "auto!important",
	},
    [`& .${classes.accordionContentGutters}`]: {
		margin: "12px 0px!important",
	},
    [`& .${classes.accordionSubtitle}`]: {
		color: colors[subtitleColor] || subtitleColor,
		backgroundColor: colors[subtitleBackground] || subtitleBackground,
		padding: "8px 40px 8px 16px",
	},
    [`& .${classes.accordionMain}`]: {
		backgroundColor: "transparent",
		color: "black",
		padding: "8px 40px 16px 16px",
	}
}));

const Accordion = ({
	title,
	className,
	titleColor = "white",
	titleBackground = "primary",
	subtitle,
	subtitleColor = "black",
	subtitleBackground = "grey",
	expandIconColor = "grey",
	content,
	alwaysExpanded = false,
}) => (
	<StyledMUIAccordion
		classes={{
			rounded: classes.accordion,
			expanded: classes.accordionExpanded,
		}}
		className={className}
		expanded={alwaysExpanded || undefined}
		titleColor={titleColor}
		titleBackground={titleBackground}
		subtitleColor={subtitleColor}
		subtitleBackground={subtitleBackground}
	>
		<AccordionSummary
			expandIcon={alwaysExpanded ? null : <ExpandMore color={expandIconColor} />}
			classes={{
				root: classes.accordionHeader,
				expanded: classes.accordionHeaderExpanded,
				contentGutters: classes.accordionContentGutters,
			}}
			sx={{
				...(alwaysExpanded && { cursor: "default!important" }),
			}}
		>
			{typeof title === "string"
				? <Typography>{title}</Typography>
				: title}
		</AccordionSummary>
		{subtitle
		&& (
			<AccordionDetails
				classes={{
					root: classes.accordionSubtitle,
				}}
			>
				{typeof subtitle === "string"
					? <Typography>{subtitle}</Typography>
					: subtitle}
			</AccordionDetails>
		)}
		<AccordionDetails
			classes={{
				root: classes.accordionMain,
			}}
			style={{
				padding: (subtitle) ? "8px 40px 16px 16px" : "5px",
			}}
		>
			{typeof content === "string"
				? <Typography>{content}</Typography>
				: content}
		</AccordionDetails>
	</StyledMUIAccordion>
);

export default memo(Accordion);
