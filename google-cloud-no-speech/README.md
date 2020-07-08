# oogle Cloud Function with No Input Example

## Instructions

### Intent Setup
1) In your Dialogflow Agent, create an Intent that includes all 3 Genesys No Input events: `GENESYS_INITIAL_NO_INPUT`, `GENESYS_NO_INPUT`, and `GENESYS_FINAL_NO_INPUT`.
2) Enable the Fulfillment Webhook for this Intent.
3) Do not mark this Intent as 'End of Conversation'.

### Google Cloud Function Setup
1) Create a new Google Cloud function as per these instructions:  https://cloud.google.com/functions/docs/quickstart-console.
2) Make sure to check the box to `Allow unauthenticated invocations`.

Note: The `./resources` folder has a [package.zip](./resources/package.zip) file that can be used to upload the Google Cloud function.  This ZIP file will need to be updated manually anytime a change is made to the code.

### Fulfillment URL Setup
In the Dialogflow Console, enable Fulfillment, and set the Webhook URL to the URL of the Google Cloud function you created.  The URL will look similar to this: https://us-central1-myproject-edigys.cloudfunctions.net/my-function-name, and can be found on the function details page.