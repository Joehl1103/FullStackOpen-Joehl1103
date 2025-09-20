#!/bin/bash

source .env

case "$1" in
"run")
  echo "running the application..."
  APOLLO_KEY=$APOLLO_KEY \
    APOLLO_GRAPH_REF=$APOLLO_GRAPH_REF \
    rover dev --supergraph-config supergraph.yaml
  ;;
"publish")
  echo "publishing the application..."
  APOLLO_KEY=$APOLLO_KEY \
    rover subgraph publish $APOLLO_GRAPH_REF \
    --schema ./products.graphql \
    --name products \
    --no-url
  ;;
*)
  exit 1
  ;;
esac
