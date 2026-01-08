#!/bin/bash

if [ $# -eq 0 ]; then 
    echo "needs a commit message"
    exit 1
fi

message="$1"

git add . && git commit -m "$message"

echo "Committed with message: $message"