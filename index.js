#!/usr/bin/env node
var log = require( 'npmlog' );
var argv = require( 'minimist' )( process.argv.slice(2) );
var zlib = require( 'zlib' );
var fs = require( 'fs' );
var bytes = require( 'bytes' );
var compressor = require('node-minify');
var path = require( 'path' );
var UglifyJS = require("uglify-js");

var data = '';
var self;

function withPipe(data) {
    data = data.trim();
    processData(data);
}

var pipeDetected = !process.stdin.isTTY;

if ( pipeDetected ) {
    self.on( 'readable', function () {
        var chunk = this.read();

        if ( chunk !== null ) {
            data += chunk;
        }
    } );
    self.on( 'end', function () {
        withPipe( data );
    } );
} else {
    gatherFileData();
}

function gatherFileData () {
    if ( !argv._[ 0 ] ) {
        npm.error( '>:(', 'Must pass a proper file path' );
    }

    var file = fs.readFileSync( argv._[ 0 ], 'utf8' );
    processData( file );
}

function processData ( input ) {
    var sizes = {
        untransformed: bytes( input.length )
    };
    var gzipped = zlib.gzipSync( input );
    sizes.gzipped = gzipped.length;

    var shouldUglify =
        (argv.u === undefined && argv.uglify === undefined) || (argv.u || argv.uglify);

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
