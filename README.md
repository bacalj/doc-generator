# doc-generator

This is a utility for generating fake training documents and accompanying csv input file

1. Make a config.js file in the root of the project and add the following line, substituting the unique part of the bucket path for the xxx-xxx-xxx part.

```.env
export const bucketPathString = "gs://cloud-ai-platform-xxx-xxx-xxx";
```

2. Run this command to generate a new set of documents and csv file.

```bash
node docMaker.js
```

The input file and training documents will be written to their own directory, like this:

![files](./pic.png)