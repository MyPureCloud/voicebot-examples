# AWS Lambda Dialogflow Fulfillment with the PureCloud Platform Client SDK

## Instructions

### 1. Deploy the Lambda in AWS.

- Create a deployment package following the instructions in the link below.
https://docs.aws.amazon.com/lambda/latest/dg/nodejs-package.html#nodejs-package-dependencies

- Upload the deployment package via AWS console and make sure that the Lambda is up and running.

### 2. Setup AWS API Gateway and integrate the Lambda.

- Create an API Gateway resource to map the Lambda you created in the step 1 above.

- Refer to the link below for the instructions to set up API Gateway with the Lambda.
  https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-getting-started-with-rest-apis.html

- Take a note of the invoke Url for the following step 5.

### 3. Configure an Oauth Client for Dialogflow and roles/permissions in PureCloud.

- Configure a Oauth Client for Dialogflow (Client Credentials grant type).
Please refer to the following url for more details.
https://help.mypurecloud.com/articles/configure-the-oauth-client-credential-for-google-dialogflow/

- Create a custom role that holds the following permissions to allow Public API V2 access.
 >       analytics:conversationDetail:view
 >       conversation:communication:view

 >  Refer to the links below to get more details on adding/configuring roles/permissions.
 >  https://help.mypurecloud.com/articles/add-roles/
 >  https://help.mypurecloud.com/articles/manage-roles-and-permissions-page/

- Verify the custom role enabled in the Roles tab of the Oauth Client in PureCloud.

### 4. Configure Nodejs Environment variables for Lambdas.

- Go into AWS console, add the following environment variables for Node runtime with the Oauth client id/secret you set up in the step 3 above.
 >  Example:
 >       CLIENT_ID             40b7bc90-9782-5771-add7-f3f1f0021120
 >       CLIENT_SECRET         KWQP8zmdQzLEc2xRk0p9M_Vu5saM-3DaB31X6OZhG0J
 >       ENVIRONMENT           us_east_1
 >       OPEN_WEATHER_APP_ID   k9dbd6738305hbe4614790d08e405r6n

 >  Please look at the link below for the instructions of adding environment variables.
 >  https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html

 >  Supported regions for the ENVIRONMENT variable are below.
 >  1. us_east_1 (Default)
 >  2. eu_west_1
 >  3. ap_southeast_2
 >  4. ap_northeast_1
 >  5. eu_central_1
 >  6. us_west_2
 >  7. ca_central_1
 >  8. ap_northeast_2
 >  9. eu_west_2

### 5. Import Example Agent and configure the Webhook endpoint.

- Download the example agent `Fulfillment.zip` located [here](./resources/Fulfillment.zip).

- Import the agent via the Dialogflow console.
Please refer to the following Url for more details on importing a zipped agent.
https://cloud.google.com/dialogflow/docs/agents-settings#export

- Make sure all fulfillment intents have been enabled for `Enable webhook call for this intent`.
Please refer to the following Url for the screenshot of the setting.
https://cloud.google.com/dialogflow/docs/tutorials/build-an-agent/create-fulfillment-using-webhook#create_a_webhook_with_the_inline_editor

- Make sure all fulfillment intents have been enabled for `Set this intent as end of conversation`.

- Go into the DialogFlow console and configure Webhook endpoint with the invoke Url created in the step 2 above.
Please refer to the following Url for the instructions.
https://cloud.google.com/dialogflow/docs/fulfillment-webhook#enable

### 6. Import Example flow in Architect.

- Download the example flow `Dialogflow-Fulfillment_v5-0.i3InboundFlow` located [here](./resources/Dialogflow-Fulfillment_v5-0.i3InboundFlow) folder.

- Import the flow into Architect following the instructions below.
https://help.mypurecloud.com/articles/import-export-call-flow/

### 7. Test
  Testing read/write participant information via `Calls` menu in PureCloud.

- Log in PureCloud.
- Make a call with `Dialogflow-Fulfillment@localhost` in the Dialpad UI.
- Press 1 at the main menu. You will hear "Good day! What can I do for you today?"
- Say "Read write participant information".
  You will hear "Reading writing participant information went successful." if the fulfillment is successful.