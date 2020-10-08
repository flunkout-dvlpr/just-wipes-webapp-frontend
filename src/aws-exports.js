import Amplify, { Auth } from 'aws-amplify'

// SOURCE: https://docs.amplify.aws/lib/auth/start/q/platform/js#re-use-existing-authentication-resource
Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: 'us-east-2',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-2_kN6yTWW3m',
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '6vb8gcg2agderklq8k8jhioubp',
    // OPTIONAL (Use Cognito triggers when set to CUSTOM_AUTH)
    authenticationFlowType: 'CUSTOM_AUTH'
  }
})

// You can get the current config object
const currentConfig = Auth.configure()
export default currentConfig
