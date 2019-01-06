import React from "react";

import PropTypes from "prop-types";

import { ListaRamos } from "./ListaRamos.jsx";
import { SemestresNavPill, SemestreTab } from "./Semestres.jsx";
import { getSemestres } from "./utils.js";
import { Ramo } from "./Ramos.jsx";

function RamosSection(props) {
	const { user } = props;
	if (!user) {
		return null;
	}
	const semestres = getSemestres(user.notas);
	return (
		<SemestresNavPill scrollable scrollButtons="auto">
			{semestres.map(([ano, semestre]) => (
				<SemestreTab
					key={ano + semestre}
					semestre={ano + "-" + semestre}
				>
					<Semestre refs={user.notas[ano][semestre]} />
				</SemestreTab>
			))}
		</SemestresNavPill>
	);
}

RamosSection.propTypes = {
	user: PropTypes.object.isRequired
};

function Semestre(props) {
	const { refs } = props;
	return (
		<ListaRamos>
			{refs.map((ref, i) => {
				if (ref !== "null") {
					return <Ramo key={i} notasRef={ref} />;
				}
				return null;
			})}
		</ListaRamos>
	);
}

Semestre.propTypes = {
	refs: PropTypes.array.isRequired
};

export default RamosSection;
