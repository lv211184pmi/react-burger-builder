import React from 'react';

import Aux from '../../../hoc/Auxer';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(objKey => {
            return (
                <li key={objKey}>
                    <span style={{textTransform: 'capitalize'}}>{objKey}</span>: {props.ingredients[objKey]}
                </li>
            );
        });

    return (
        <Aux>
            <h3>Your order </h3>
            <p>A super burger with following ingredients: </p>
            <ul>{ingredientSummary}</ul>
            <p><strong>Total price: {props.price}</strong></p>
            <p>Continue to Checkout ?</p>
            <Button btnType="Danger" clicked={props.cancelOrder}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continueOrder}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;