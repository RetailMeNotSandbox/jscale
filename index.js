var log = require( 'npmlog' );
var zlib = require( 'zlib' );
var UglifyJS = require("uglify-js");

function scaleData ( input, shouldUglify ) {
    var sizes = {
        untransformed: input.length
    };
    var gzipped = zlib.gzipSync( input );
    sizes.gzipped = gzipped.length;


    if ( shouldUglify ) {
        try {
            var uglified = UglifyJS.minify(input, {fromString: true}).code;
            sizes.uglified = uglified.length;
            var uglifiedAndGzipped = zlib.gzipSync( uglified );
            sizes.uglifiedAndGzipped = uglifiedAndGzipped.length;
        } catch ( e ) {
            log.error(
                'err',
                'UglifyJS choked on this file. Are you sure it\'s a JavaScript file? ' +
                'You cannot uglify a non-JS file.'
            );
            log.error( 'err', e.message );
            log.error( 'err', e.stack );
        }
    }

    return sizes;
}

module.exports = scaleData;
