import { StyleSheet } from 'react-native';


var Style = StyleSheet.create({
    rootContainer: {
        flex: 1
    },

    inputContainer: {
        flex: 8,
        backgroundColor: '#4ac6a5'
    },

    inputButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: '#4ac6a5',
    },

    inputButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    },

    inputRow: {
        flex: 1,
        flexDirection: 'row'
    },

    displayContainer: {
        flex: 2,
        backgroundColor: '#1e9475',
        justifyContent: 'center'
    },

    displayText: {
        color: 'white',
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: 20
    },

});

export default Style;