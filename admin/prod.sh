#!/bin/bash

git pull
NODE_ENV=development npm install .
NODE_ENV=production gulp build
#NODE_ENV=production npm rebuild
pm2 restart app
