
// Sorry, we lied, and a real React Element has a bunch more keys! Let's
// write a function that will create new React Elements for us

var assert = require('chai').assert;
var react  = require('react');

var reactMarker = _internals_only_marker();
var reactOwner  = _internals_only_owner();

var myCreateReactElement = testReactElement;
// var myCreateReactElement = react.createElement;

function testReactElement( type, config, children ) {
    const element = {};

    // TODO: Implement the internals of this to pass the tests, one at a time
    // START SOLUTION
    if ( (typeof config === 'undefined') || config == null ) {
        config = {};
    }

    if ( children == null ) {
        children = [];
    }

    element['props'] = {...config};
    element['props']['children'] = children;
    element['ref'] = config.hasOwnProperty('ref') ? config.ref : null;
    element['type']  = type;
    element['_store'] = {};
    element['_owner'] = reactOwner;
    element['$$typeof'] = reactMarker;

    if ( config.hasOwnProperty('key') ) {
        element['key'] = '' + config.key;
    } else {
        element['key'] = null;
    }
    // END SOLUTION

    return element;
}

// Start by adding type and props to your element. We've used the argument
// name of `config` above for props, as we'll be messing around with its keys
// a bit later. If config is undefined or null, set it to an empty dict
{
    let element1 = myCreateReactElement( 'Foo', { bar: 123 } );
    assert.equal( element1.type, 'Foo', "type has been set" );
    assert.equal( element1.props.bar, 123, "props has been set");

    let element2 = myCreateReactElement( 'Foo' );
    assert.equal( element2.type, 'Foo', "type has been set" );
    assert.equal( typeof element2.props, 'object', "props has been created");
};

// React Elements have a special key that identifies them as a React Element
// for security reasons. The key is '$$typeof', and you should set it to the
// value of `reactMarker` that we defined above
{
    let element = myCreateReactElement( 'Foo', { bar: 123 } );
    assert.equal(
        element['$$typeof'],
        reactMarker,
        "Security marker set"
    );
}

// React uniquely idenfities elements using a `key`. If `config` has a value
// under `key`, then stringify it, and set that as a top-level `props`. If
// one wasn't passed in, then set it to null
{
    let element1 = myCreateReactElement( 'Foo', { bar: 123 } );
    assert.equal( element1.key, null, "Null valued used for key");

    let element2 = myCreateReactElement( 'Foo', { bar: 123, key: 'hi' } );
    assert.equal( element2.key, 'hi', "Simple string key" );

    let element3 = myCreateReactElement( 'Foo', { bar: 123, key: true } );
    assert.equal( element3.key, 'true', "Key is stringified 1" );

    let element4 = myCreateReactElement( 'Foo', { bar: 123, key: {} } );
    assert.equal( element4.key, '[object Object]', "Key is stringified 2" );
}

// Our element creator accepts an argument of `children`. For now, we'll
// assume it has to be an array and we'll place it in `props`. React has
// some more complicated behaviour around `chilren`, but you'l get a chance
// to implement it later if you want
{
    let element1 = myCreateReactElement( 'Foo', {}, [] );
    assert.deepEqual( element1.props.children, [], "Children empty array" );

    let element2 = myCreateReactElement( 'Foo', {}, [4, 5, 6] );
    assert.deepEqual( element2.props.children, [4, 5, 6], "Children with values" );
}

// A React Element also can have a `ref`, which is a function that'll (and
// this is a huge simplification) be executed when we render the function.
// For now, pull it out of the config, and set it at the top level.
{
    let element1 = myCreateReactElement( 'Foo', {}, [] );
    assert( element1.hasOwnProperty('ref'), "Ref exists" );
    assert.equal( element1.ref, null, "Ref is null" );

    let ref = () => 5;

    let element2 = myCreateReactElement( 'Foo', { ref: ref }, [] );
    assert.equal( element2.ref, ref, "Ref is set" );
}

// React Elements know who their owner is, and they get this via access to
// a contextual variable called `ReactCurrentOwner.current`. You don't have
// access to that right now, so use the function we defined above called
// reactOwner() to get a suitable value, and stick it in `_owner`
{
    let element1 = myCreateReactElement( 'Foo', {}, [] );
    assert( element1.hasOwnProperty('_owner'), "Owner property set" );
    assert.equal( element1._owner, _internals_only_owner(), '_owner set' );
}

// Finally, in dev mode, the element we create should have an empty dict
// called `_store`, which we won't ever use, but we want for compatibility
{
    let element1 = myCreateReactElement( 'Foo', {}, [] );
    assert.deepEqual( element1._store, {}, "Store created" );
}

/*
 * Congrats! You've implemented your own Element creator! Your creator is
 * similar to, but not identical to React's own createElement() -- similar
 * enough that right at the top, you can point `myCreateReactElement` to
 * it and the tests should still pass.
 *
 */

// https://www.obfuscator.io/
function _internals_only_marker() { var _0x24fa=['createElement','$$typeof'];(function(_0xff7554,_0x24fa75){var _0x2ebefa=function(_0x399ca9){while(--_0x399ca9){_0xff7554['push'](_0xff7554['shift']());}};_0x2ebefa(++_0x24fa75);}(_0x24fa,0xa7));var _0x2ebe=function(_0xff7554,_0x24fa75){_0xff7554=_0xff7554-0x0;var _0x2ebefa=_0x24fa[_0xff7554];return _0x2ebefa;};return react[_0x2ebe('0x1')]('_')[_0x2ebe('0x0')]; }
function _internals_only_owner()  { return null; }