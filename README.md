# doc-generator

utility for generating fake training documents and accompanying csv file

1. add a directory called `files` to the root of the project

2. add a file called `gc.js` to the root of the project

3. in `gc.js` add the following code

```javascript
export const bucketPathStr = "gs://cloud-ai-platform-{{your-bucket-path-here}}";
```

4. run this command to generate a new set of documents and csv file

```bash
node docMaker.js
```

it will put each new batch in a new folder so you can tweak around if you need to
