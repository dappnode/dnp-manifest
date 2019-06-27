#!/bin/bash
export MANIFEST_PATH=src/manifest.schema.json
# Run the schema to markdown tool customized for the DAppNode docs repo
# -x - : supresses the output of the validated schema
# : the .md is outputed at the default 
npx git://github.com/dapplion/jsonschema2md.git -d $MANIFEST_PATH -x -