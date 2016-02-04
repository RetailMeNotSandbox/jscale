# jscale

Super simple file-size checking utility that lets you check the file size of a given JavaScript file untransformed, gzipped, uglified, and uglified+gzipped.

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

Skip uglification with -u or --uglify false:

```
jscale index.js -u false
# or
cat index.js | jscale -u false
```
