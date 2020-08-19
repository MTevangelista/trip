import React from 'react';
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.png'
import backIcon from '../../assets/images/icons/back.svg'

import './styles.css'

interface PageHeaderProps {
    title: string;
    pageTitle: string;
    totalPlaces: number;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar" />
                </Link>
                <strong>{props.pageTitle}</strong>
                <img src={logoImg} alt="Trip" />
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                <span>{props.totalPlaces} Lugares</span>
            </div>
        </header>
    )
}

export default PageHeader