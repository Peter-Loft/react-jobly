import React from "react";
import './CompanyCard.css';

/**
 * Single company card, displays company details
 * 
 * Props - { company }
 * 
 * State - None
 * 
 * CompanyList --> CompanyCard
 */

function CompanyCard({ company }) {
    return (
        <div className="CompanyCard">
            <h3>
                {company.name}
            </h3>
            {company.logoUrl &&
                <img src={company.logoUrl} alt={company.name} />}
            <p>{company.description}</p>
        </div>
    );
}

export default CompanyCard;