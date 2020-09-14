# Just Wipes - Clean Code LLC

Built using Quasar Framework + Vue.js
Continuous Deployment and Hosting using AWS CodePipeline + S3

## Install the dependencies
```bash
npm install --save
```
### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```
## AWS Deployment Instructions
1. Create S3 Bucket
	* Name Bucket: www.company-domain.com
	* Turn off 'Block Public Access'
	* Set Bucket Policy to 'Public Read' 
	* Reference: https://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html
	```bash
	{
		"Version":"2012-10-17",
		"Statement":[
			{
				"Sid":"PublicRead",
				"Effect":"Allow",
				"Principal": "*",
				"Action":["s3:GetObject","s3:GetObjectVersion"],
				"Resource":["arn:aws:s3:::BUCKETNAME/*"]
			}
		]
	}
	```
	* Under Properties set up 'Bucket hosting'
		* Select 'Use this bucket to host a website'
		* Set 'Index document' to `index.html`
		* Save configuration 
2. Create/Configure Buildspec File
	* Create new file and save as buildspec.yaml
	* Following the buildspec file syntax:
	* Reference: https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec-ref-syntax
		* Set up commands for `install, pre-build, build` in the `phases` section
		* Configure 'files, discard-paths, base-directory' for `artifacts`
			* Run commands to install Node.js and NPM in `install`
			* Run command to install Quasar in `pre-build`
			* Run command to build Quasar project in `build`
			* Set `files` path to all using `**/*`, `discard-paths` set to no, and `base-directory` to `dist/spa` 
3. SetUp CodePipeline
	* Name pipeline 
	* Select 'New Service Role'
	* Set GitHub as Source Provider, select repo and branch, set detection options to GitHub webhooks
	* Set CodeBuild as Build Provider
	* Create Code Build Project
		* Name project
		* Set Ubuntu as Operating System, Standard as Runtime, and aws/codebuild/standard:4.0. as Image
		* Set Environment Type as Linux
		* Select 'New Service Role'
		* Set 'Use a buildspec file' as Build Specifications (this will use the file created in step 2)
		* Continue to CodePipeline
	* Select 'Single Build' as Build Type
	* Set Deploy Provider to S3
	* Set Bucket to the bucket created in step 1
	* Select 'Extract file before deploy'
	* Create Pipeline