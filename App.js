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
            inputValue: 0,
            currentValue: "",
            selectedSymbol: null,
            isDecimal : null,
        };

        this.initialState = this.state;
    }

    
    render() {
        return (
          <View style={Style.rootContainer}>
          <View style={Style.displayContainer}>
              <Text style={Style.displayText}>{this.state.inputValue}</Text>
          </View>
          <View style={Style.inputContainer}>
              {this._renderInputButtons()}
          </View>
          </View>
        )
    }

    _renderInputButtons() {
        let views = [];

        for (var r = 0; r < inputButtons.length; r ++) {
            let row = inputButtons[r];

            let inputRow = [];
            for (var i = 0; i < row.length; i ++) {
                let input = row[i];

                inputRow.push(
                  <InputButton
                      value={input}
                      onPress={this._onInputButtonPressed.bind(this, input)}
                      key={r + "-" + i}/>
              );
            }

            views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
        }

        return views;


    }

    _handleNumberInput(num) {
        let inputValue = (this.state.inputValue * 10) + num;
        let isDecimal = this.state.isDecimal;
        
        // if(isDecimal) {
        // if(num > 0) {
        //     inputValue = eval(inputValue + num).toString();
        // } else {
        //     // inputValue = inputValue + num;
        //     inputValue = inputValue;
        // }
        // } 
        // else {
        // inputValue = inputValue;
        // }

        this.setState({
            inputValue: inputValue,
            isDecimal: isDecimal,
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



    // backspace = () => {
    //     this.setState({
    //         result: this.state.inputValue.slice(0, -1)
    //     })
    // }

    _handleStringInput(str) {
        switch (str) {
            case '/':
                this.setState({
                    selectedSymbol: str,
                    previousInputValue: this.state.inputValue,
                    inputValue: 0,
                    isDecimal : null,
                });
                 
                if (inputValue === 0) {
                    alert("Please don't divide by zero.");
                    return;
                } 
                
                break;

            case '*':
            case '+':
            case '-':
                this.setState({
                    selectedSymbol: str,
                    previousInputValue: this.state.inputValue,
                    inputValue: 0,
                    isDecimal : null,
                });
                break;


            case '=':
                let symbol = this.state.selectedSymbol,
                    inputValue = this.state.inputValue,
                    previousInputValue = this.state.previousInputValue;

                if (!symbol) {
                    return;
                }

                this.setState({
                    previousInputValue: 0,
                    inputValue: eval(previousInputValue + symbol + inputValue),
                    selectedSymbol: null,
                    isDecimal : null,
                });
                break;

            case 'CE':
                this.setState({
                    inputValue: 0,
                    isDecimal : null,
                })
                break;
    
            case 'C':
                this.setState({
                    inputValue : this.state.inputValue.toString().slice(0, -1),
                    isDecimal : null,
                })
                break;

            case '.':
                // let isDecimal = this.state.isDecimal;
                // if(isDecimal);
                // this.setState({
                //     isDecimal: true,
                //     selectedSymbol: str,
                //     previousInputvalue: this.state.inputValue
                //   });
                //   break;
                // let previousDecimal = previousInputValue.length;

                let isDecimal = this.state.isDecimal;
                if(isDecimal) break;
    
                this.setState({
                    // consolelog:(this.state.updated),
                    previousInputValue: 0,
                    isDecimal: true,
                    inputValue: this.state.inputValue + str,
                });

                // if ( previousDecimal == 0)     //no leading ".", use "0."
                //     { previousInputValue = "0.";
                //     } else {  
                //         if ( previousInputValue.indexOf(".") == -1)
                //                 { previousInputValue = previousInputValue + ".";};   
                //             };
    // document.Calculator.Display.value = Current;
   



                // if (!symbol) {
                //     return;
                // }

                // this.setState({
                //     inputValue: eval(previousInputValue + symbol + inputValue),
                // });
                // break;




                // this.setState({
                //     selectedSymbol: str,
                //     // previousInputValue: this.state.inputValue,
                //     yas: previousInputValue + '.' 
                // })



                break;
        }
    }

}

 
 export default ReactCalculator