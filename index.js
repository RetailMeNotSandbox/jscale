var log = require( 'npmlog' );
var zlib = require( 'zlib' );
var bytes = require( 'bytes' );
var UglifyJS = require("uglify-js");

function scaleData ( input, shouldUglify ) {
    var sizes = {
        untransformed: bytes( input.length, { units: null } )
    };
    var gzipped = zlib.gzipSync( input );
    sizes.gzipped = bytes( gzipped.length, { units: null } );


    if ( shouldUglify ) {
        var uglified = UglifyJS.minify(input, {fromString: true}).code;
        sizes.uglified = bytes( uglified.length, { units: null } );
        var uglifiedAndGzipped = zlib.gzipSync( uglified );
        sizes.uglifiedAndGzipped = bytes( uglifiedAndGzipped.length, { units: null } );
    }

    for ( var i in sizes ) {
        if ( sizes.hasOwnProperty( i ) ) {
            log.info( 'fyi', i + ' size: ' + sizes[ i ] );
        }
    }
}

module.exports = scaleData;
