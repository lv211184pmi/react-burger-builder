import React, { Component } from 'react';

import Aux from '../../hoc/Auxer';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    bacon: 0.7,
    meat: 1.4,
    cheese: 0.6,
    salad: 0.3
};

export class BurgerBuilder extends Component {
    state = {
        ingredients: {
            bacon: 0,
            meat: 0,
            cheese: 0,
            salad: 0
        },
        totalPrice: 4,
        purchaseble: false,
        purchasing: false
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(objKeys => {
                return ingredients[objKeys];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchaseble: sum > 0});
    }

    addIngredientHendler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHendler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) return null;
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDediction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceDediction;
        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({purchasing: false});
    }

    render() {
        const disabledStatus = { ...this.state.ingredients };

        for(let key in disabledStatus) {
            disabledStatus[key] = disabledStatus[key] <= 0;
        }

        return(
            <Aux>
                <Modal 
                    show={this.state.purchasing} 
                    hide={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        cancelOrder={this.purchaseCancelHandler}
                        continueOrder={this.purchaseContinueHandler} 
                        price={this.state.totalPrice.toFixed(2)}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHendler} 
                    ingredientDeleted={this.removeIngredientHendler}
                    disabled={disabledStatus}
                    purchasable={this.state.purchaseble}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;