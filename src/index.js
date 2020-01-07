import React from 'react';
//import render from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";

const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
});

const currencyInQuestion = "USD";

const EXCHANGE_RATES = gql`
    {
        rates(currency: "${currencyInQuestion}") {
            currency,
            rate,
            name
        }
    }
`;

function ExchangeRates() {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: </p>;

    return data.rates.map(({ currency, rate, name }) => (
        <div key={currency}>
            <p>
                 {currency} ({name}): {rate}
            </p>
        </div>
    ));
}


const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h2>My first Apollo app <span role="img" aria-label="A rocket">🚀</span></h2>
            <ExchangeRates />
        </div>
    </ApolloProvider>
);  

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
