import React from 'react';
import { AiOutlineHome, AiOutlineApartment, AiOutlineCoffee, AiOutlineFilter, AiOutlineRocket, AiOutlineEnvironment, AiOutlineFire, AiOutlineSetting } from 'react-icons/ai';
import '../assets/components/CategoryBar.css';

const categories = [
    { icon: <AiOutlineRocket />, label: 'Maisons perchées' },
    { icon: <AiOutlineEnvironment />, label: 'Maisons cycladiques' },
    { icon: <AiOutlineHome />, label: 'Tiny houses' },
    { icon: <AiOutlineApartment />, label: 'Fermes' },
    { icon: <AiOutlineFire />, label: 'Moulins à vent' },
    { icon: <AiOutlineRocket />, label: 'Au pied des pistes' },
    { icon: <AiOutlineEnvironment />, label: 'Maisons organiques' },
    { icon: <AiOutlineEnvironment />, label: 'Sous les tropiques' },
    { icon: <AiOutlineSetting />, label: 'Espaces de jeu' },
    { icon: <AiOutlineCoffee />, label: "Chambres d'hôtes" }
];

const CategoryBar = () => {
    return (
        <div className="category-bar-wrapper">
            <div className="category-bar-container">
                <button className="scroll-button">&lt;</button>
                <div className="category-items">
                    {categories.map((category, index) => (
                        <div key={index} className="category-item">
                            <span className="icon">{category.icon}</span>
                            <span className="label">{category.label}</span>
                        </div>
                    ))}
                </div>
                <button className="scroll-button">&gt;</button>
                <button className="filter-button">
                    <AiOutlineFilter />
                    <span>Filtres</span>
                </button>
            </div>
        </div>
    );
};

export default CategoryBar;
