# Sam Switch
## Sam Watch and Theme store

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
---
## Overview of Stack

- Node.js
- TypeScript
- [YUP validation](https://www.npmjs.com/package/yup)
- [AWS S3](https://aws.amazon.com/s3/) to host website in serverless
- [AWS RDS](https://aws.amazon.com/rds/) to store data in db.
---
### Installation

Requires:-

- [Node.js](https://nodejs.org/) v16+ to run.
- [TypeScript](https://www.typescriptlang.org/) to execute tsc for build
- [AWS Sdk](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/installing-jssdk.html) to run the code locally

---

#### Node.js Installation

To install Node.js follow below steps:-

- #### Node installation on Ubuntu/Linux

First, we will install the PPA in order to get access to its packages. From your home directory, use curl to retrieve the installation script for your preferred version, making sure to replace 16.x with your preferred version string.

- Download Node.js sorce package

    ```sh
    cd ~
    curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
    ```

- Inspect the contents of the downloaded script with nano (or your preferred text editor):

    ```sh
    nano /tmp/nodesource_setup.sh
    ```

- When you are satisfied that the script is safe to run, exit your editor, then run the script with sudo:

    ```sh
    sudo bash /tmp/nodesource_setup.sh
    ```

- The PPA will be added to your configuration and your local package cache will be updated automatically. You can now install the Node.js package in the same way you did in the previous section:

    ```sh
    sudo apt install nodejs
    ```

- Verify that you’ve installed the new version by running node with the -v version flag:

    ```sh
    node -v
    ```

- Output

    ```sh
    v16.6.1
    ```

 To install in windows follow steps :- [Node.js Windows install](https://www.geeksforgeeks.org/installation-of-node-js-on-windows/)

#### Aws-cli Installation

If you have sudo permissions, you can install the AWS CLI for all users on the computer. We provide the steps in one easy to copy and paste group. See the descriptions of each line in the following steps.

- Download the file using the curl command. The -o option specifies the file name that the downloaded package is written to. In this example, the file is written to AWSCLIV2.pkg in the current folder.

    ```sh
    curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
    ```

- Run the standard macOS installer program, specifying the downloaded .pkg file as the source. Use the -pkg parameter to specify the name of the package to install, and the -target / parameter for which drive to install the package to. The files are installed to /usr/local/aws-cli, and a symlink is automatically created in /usr/local/bin. You must include sudo on the command to grant write permissions to those folders.

    ```sh
    sudo installer -pkg AWSCLIV2.pkg -target /
    ```

- To verify that the shell can find and run the aws command in your $PATH, use the following commands.

    ```bash
        $ which aws
        /usr/local/bin/aws 
        $ aws --version
        aws-cli/2.4.5 Python/3.8.8 Darwin/18.7.0 botocore/2.4.5
    ```

 If the aws command cannot be found, you might need to restart your terminal or follow the troubleshooting in [Troubleshooting AWS CLI errors](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-troubleshooting.html).

 To install in windows follow steps :- [Aws Cli Windows](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
 
---
### Development

To run the code locally, make sure all steps are performed as per above steps

1. cd inside the folder
2. Install the dependencies and devDependencies

    ```sh
    npm i
    ```

3. Open your favorite Terminal and run these commands.

    ```sh
    npm start
    ```

React will start at `http://localhost:3000/` and you will be redirected to chrome/modzila

---

## Deployment

### 1. Domain Name provider
- In your domain name's DNS Zone settings, delete all A records.
- In DNS Zone settings, add www to subdomain and the S3 endpoint in hostname for `CNAME` records.

### 2. Create an S3 bucket
- Create an S3 bucket to host your files for your website
- First you need to create a bucket for your website. The name for your bucket must be the same as your domain name. Let's say we bought the domain name www.clarkngo.net. Then my S3 bucket's name should be www.clarkngo.net as well.
    After configuration, my endpoint should look similar to this:
    `http://<bucket-name>.s3-website-us-west-2.amazonaws.com`
- Go to your AWS console and login. Choose S3.
-- Click Buckets
-- Click Create bucket
-  Add your domain name in the bucket name
- You may choose any Region

### 3. Creating the S3 bucket and general configuration

Follow the checkboxes below and click Create Bucket.
Only tick the following:
    --- Block public access to bucket and objects granted through new access control lists (ACLs)
    --- Block public access to bucket and objects granted through any access control lists (ACLs)
### 4.Uploading files to the S3 Bucket
- Click Overview and Upload.
- Upload your website files in Select Files
- For Set permissions, hit Next.
- For Set properties, hit Next. (The default is Standard S3.)
- For Review, hit Upload.
- Click Permissions, then Bucket Policy.
- Add the policy. (Note: For your website you'll change `arn:aws::s3:::<bucket-name>/*`)

         {
            "Version": "2012-10-17",
            "Id": "Policy1548223592786",
            "Statement": [
        {
            "Sid": "Stmt1548223591553",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::www.clarkngo.net/*"
        }
            ]
        }
        
### 5. Add the S3 Endpoint to your Domain
- Login to your domain provider.
- Choose Name Servers/DNS, then Modify DNS Zone (or the equivalent).
-  Remove all A records in your domain. Usually it will have a default IP address for a 404 Not Found page.
- Add a CNAME to point to the S3 Bucket:
    - Add `www` for the Subdomain.
    - Add `<bucket-name>.s3-website-us-west-2.amazonaws.com` (the S3 Endpoint) to the Hostname.
