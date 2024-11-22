import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledButton = styled(Link)`
    background-color: #white;
    color: #6B4D35;
    display: block;
    border: 2px solid #6B4D35;
    margin: auto;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    font-size: 1em;
    width: 50%;
    padding: 0.4rem;
    border-radius: 0.25rem;
    transition: background-color 0.5s ease;

    &:hover {
        background-color: #6B4D35;
color: white;
    }
`;


function AddToCart({ handleClick }) {
    return (
        <StyledButton as="button" onClick={handleClick}>
            ADD TO CART
        </StyledButton>
    );
}

export default AddToCart;