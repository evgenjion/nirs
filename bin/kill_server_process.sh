#!/usr/bin/env bash
set -e

#get first node script
kill "`ps xa | grep node | head -n 1 | sed \"s/\s\([0-9]*\)[^0-9].*/\1/g\"`"
