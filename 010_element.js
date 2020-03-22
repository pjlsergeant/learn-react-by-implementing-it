
var assert = require('chai').assert;

// An "Element" in React is a plain dictionary with keys `type`, a string,
// and `props`, a dictionary. It's used by the React renderer to decide which
// DOM components to create.

const myElement = {
// TODO: Modify this empty dictionary to be a React element by adding to it
// until it passes the tests below
    type: 'MyType', // SOLUTION
    props: {},      // SOLUTION
};

assert.equal(
    myElement.type,
    'MyType',
    "myElement has a type of MyType"
);

assert.deepEqual(
    myElement.props,
    {},
    "myElement has an empty dict of `props`"
);
