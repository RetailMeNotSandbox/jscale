# jscale

Super simple file-size checking utility that lets you check the file size of a given JavaScript file untransformed, gzipped, uglified, and uglified+gzipped. Works on any file if you skip uglification. (Uglification is also quite slow on large files.)

## Installation

```
npm install -g @rmn/jscale
```

## Usage

On a file path:

```
jscale index.js
```

From a pipe:

```
cat index.js | jscale
```

Skip uglification with -u or --uglify false (you might do this if you're trying to check out non-JS files):

```
jscale index.js -u false
# or
cat index.js | jscale -u false
```

### Example

I created this because I wanted to quickly measure the weight of a potential third party dependency. Here's it working:

```
> jscale js-client-sdk-v2/dist/owen.js
info fyi untransformed size: 95.71kB
info fyi gzipped size: 29.31kB
info fyi uglified size: 94.27kB
info fyi uglifiedAndGzipped size: 28.46kB
```

### TODOs

Be able to pass custom uglify options to this, as the uglifier isn't super useful (but the gzipper is nice).
