var log = require( 'npmlog' );
var zlib = require( 'zlib' );
var bytes = require( 'bytes' );
var UglifyJS = require("uglify-js");

function scaleData ( input, shouldUglify ) {
    var sizes = {
        untransformed: bytes( input.length )
    };
    var gzipped = zlib.gzipSync( input );
    sizes.gzipped = gzipped.length;


    if ( shouldUglify ) {
        var uglified = UglifyJS.minify(input, {fromString: true}).code;
        sizes.uglified = bytes( uglified.length );
        var uglifiedAndGzipped = zlib.gzipSync( uglified );
        sizes.uglifiedAndGzipped = uglifiedAndGzipped.length;
    }

    for ( var i in sizes ) {
        if ( sizes.hasOwnProperty( i ) ) {
            log.info( 'fyi', i + ' size: ' + sizes[ i ] );
        }
    }
}

module.exports = scaleData;
