import React, {
    Component
} from 'react';

import Style from './src/Style';
import InputButton from './src/InputButton';
import {
    View,
    Text,
    AppRegistry
} from 'react-native';

// Define the input buttons that will be displayed in the calculator.
const inputButtons = [
    ['CE', 'C'],
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, '.', '=', '+']

];

class ReactCalculator extends Component {


    constructor(props) {
        super(props);

        this.state = {
            previousInputValue: 0,
            currentInputValue: 0,
            inputValue: 0,
            selectedSymbol: null,
            isDecimal: null,
            connectValue: null,
        };

        this.initialState = this.state;
    }


    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>
                        {this.state.connectValue ? this.state.connectValue : (this.state.displayedValue ? this.state.displayedValue : this.state.inputValue)}
                    </Text>
                </View>
                <View style={Style.inputContainer}>
                    {this._renderInputButtons()}
                </View>
            </View>
        )
    }

    _renderInputButtons() {
        let views = [];

        for (var r = 0; r < inputButtons.length; r++) {
            let row = inputButtons[r];

            let inputRow = [];
            for (var i = 0; i < row.length; i++) {
                let input = row[i];

                inputRow.push(
                    <InputButton
                        value={input}
                        onPress={this._onInputButtonPressed.bind(this, input)}
                        key={r + "-" + i} />
                );
            }

            views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
        }

        return views;


    }

    _handleNumberInput(num) {
        let inputValue = (this.state.inputValue * 10) + num;
        let isDecimal = this.state.isDecimal;

        if(isDecimal) {
        if(num > 0) {
            inputValue = eval(inputValue + num).toString();
        } else {
            inputValue = inputValue + num;
        }
        } else {
        inputValue = inputValue;
        }

        this.setState({
            inputValue: this.state.isDecimal ? eval(this.state.currentInputValue + this.state.selectedSymbol + num) : this.state.inputValue * 10 + num,
            currentInputValue: this.state.isDecimal ? 0 : this.state.inputValue * 10 + num,
            isDecimal: null,
            connectValue: null,
            displayedValue: null,

        })
    }

    _onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this._handleNumberInput(input)
            case 'string':
                return this._handleStringInput(input)
        }
    }

    _handleStringInput(str) {
        switch (str) {
            case '/':
                this.setState({
                    selectedSymbol: str,
                    previousInputValue: this.state.inputValue,
                    inputValue: 0,
                    isDecimal: null,
                    connectValue: str,

                });
                break;

            case '*':
            case '+':
            case '-':
                this.setState({
                    selectedSymbol: str,
                    previousInputValue: this.state.inputValue,
                    inputValue: 0,
                    isDecimal: null,
                    connectValue: str
                });
                break;


            case '=':
                let symbol = this.state.selectedSymbol,
                    inputValue = this.state.inputValue,
                    previousInputValue = this.state.previousInputValue;

                if (!symbol) {
                    return;
                }

                if (symbol == '/') {
                    if (inputValue == 0) {
                        alert("Please don't divide by zero.");
                        return;
                    }
                }


                this.setState({
                    previousInputValue: 0,
                    displayedValue: eval(previousInputValue + symbol + inputValue),
                    inputValue: 0,
                    selectedSymbol: null,
                    isDecimal: null,
                    connectValue: null,

                });
                break;

            case 'CE':
                this.setState({
                    inputValue: this.state.inputValue.toString().slice(0, -1),
                    isDecimal: this.initialState.isDecimal,
                })

                if (this.state.inputValue.length < 2) {

                    this.setState({
                        inputValue: 0,
                        isDecimal: null,
                    })
                    return;
                }

                if (this.state.inputValue == 0) {

                    this.setState({
                        inputValue: 0,
                        isDecimal: null,
                    })
                    return;
                }


                break;

            case 'C':
                this.setState({
                    inputValue: 0,
                    isDecimal: null,
                    displayedValue: null,
                    connectValue: null,
                })
                break;

            case '.':
                this.setState({
                    // previousInputValue: 0,
                    previousInputvalue: this.state.inputValue,
                    isDecimal: true,
                    selectedSymbol: str,
                    inputValue: this.state.inputValue + str,
                });
                break;
        }
    }

}


export default ReactCalculator