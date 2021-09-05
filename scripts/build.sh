#!/bin/sh

microbundle \
  --jsx 'React.createElement' \
  --jsxImportSource react \
  --globals react/jsx-runtime=jsx \
  --format modern,cjs