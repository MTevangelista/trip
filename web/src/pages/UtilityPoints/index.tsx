import React from "react";

import PageHeader from "../../components/PageHeader";

import './styles.css'

function UtilityPoints() {
    return (
        <div id="page-utility-points" className="container">
            <PageHeader pageTitle="Pontos de Utilidades" title="Lugares encontrados" totalPlaces={20} />
        </div>
    );
}

export default UtilityPoints;