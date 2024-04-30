# Whoosh, send confidently.

Whoosh is an AI-powered Gmail add-on that streamlines employee-to-client communication by generating tailored email responses.

## In a nutshell

**Our mission:** Empowering professionals by removing the mundane task of replying to emails. Because time is valuable.

**Target Audience:** (B2B) 1,500 mid-sized companies in Austin, TX. For client-facing professionals in sales, IT, customer support, etc.

**How:** 
- **(Email Upload)** When invited users visit our webpage, they can select which of their own emails they want to upload. These are stored directly into our knowledge base. 
- **(Gmail Add-on)** Users can simply click on any Gmail message, click on the Whoosh icon, and click generate to get an auto-generated tailored response that's ready to edit and send to clients. This response will load directly into a new email draft within Gmail, without need for external navigation.

**Tech:** We use the RAG (Retrieval-Augmented Generation) methodology to implement our product. This optimizes the output of our LLM (gpt-3.5-turbo) by visiting a knowledge base (Llama Index vector database) of the uploaded data. In the context of our product, when the user clicks the add-on's generate button below an email, we send a request to our Llama Index database to retrieve responses to past emails most similar to the one the user is currently replying to. We augment these responses as context for the GPT LLM to generate a tailored response.

## data

### converted_conversation.jsonl

We restructured the Data E-Commerce Customer Support Conversations (source: https://huggingface.co/datasets/NebulaByte/E-Commerce_Customer_Support_Conversations) for our purposes. This involved using only the 'conversation' column to obtain back-and-forth conversations between agent and customer then splitting the conversations based on role. This was stored as a JSON Lines file.

## flask_app

### knowledge_base.py

Utilized Llama Index to implement the RAG technique. Uses 'converted_conversations.jsonl' as the data stored in the vector database. This file has 2 main purposes:
1. generate response
2. update knowledge base

### App.js

Set up navigation routes to allow users to visit and intereact with our website.

### Home.js

Landing page, gives basic overview of project and allows navigation to login page

### Login.js

Utilizes Gmail authorization to link to the authorized user's Gmail account (via Google's sign-in interface) and retrieve emails from their inbox.

### UserUpload.js

Visualizes the user's real-time Gmail inbox and allows them to select/deselect emails to use as context for the response generation.

### app.py

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Contact
- Tech Team: Caleb Wolf, Isobel Bodefeld, Jasmine Ball, Kavan Mehta
- Product Team: Ishita Jain, Nishika Mudda
- Design Team: Allison Cheng, Briona Dommert
