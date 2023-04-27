### AWS AppSync Service created Using Serverless Framework.

Live Project. you could checkout [here](https://debarshimondal.vercel.app).

#### Follow these steps for deployment to your AWS.

##### Step1:
Clone the Repo with,
```
  git clone https://github.com/DebarshiMondal-06/SLS_AppSync_WatchCart.git
```

##### Step2(optional):
If you haven't install serverless framework make sure to install it,
```
  npm install -g serverless
```


##### Step3:
Install the serverless framework plugins,
```
  npm install
```

##### Step4:
Deploy the resources defined on serverless.yml with,
```
  sls deploy

  or

  sls deploy --aws-profile <profile_name>
```
<small style="color:orange">
  Make Sure you configure your aws credentails on your local.
</small>


#### Follow these steps run to the Frontend (Reactjs).
##### Step1:
Navigate to Frontend Folder and Install all the packages,
```
 cd Frontend & npm install
```

##### Step2:
  <div>
    Replace your GraphQL API and Key. Navigate to src/APP_SYNC_SITE/App.js
    <br>
    <small style="color:skyblue">
      You can find your GraphQL cred. from AWS AppSync console after deployment successfull. 
  </small>
  </div>

##### Step3:
Run to Start the application on your local.
  ```
    npm run start
  ```

<br>

##### Technology Used:
- Serverless Framework
- GraphQL
- AWS AppSync
- DynamoDB
- Lambda
- Nodejs
