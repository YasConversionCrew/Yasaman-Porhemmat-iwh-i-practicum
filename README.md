
# Yasaman's HubSpot I Practicum

## Overview

This is a Node.js app for the HubSpot Academy **Integrating With HubSpot I: Foundations** practicum. It connects to the HubSpot API to manage a custom object.

## Custom Object

**Name:** Pup  
**Properties:**
- name (string)
- bio (string)
- breed (string)

**Associations:** Each Pup record is associated with a Contact.

## List View of Custom Object

🔗 https://app.hubspot.com/contacts/141521529/objects/pup/views/all/list  

> Update the account ID if needed.

## Setup Instructions

1. Clone the repo  
2. Run `npm install`  
3. Create a `.env` file in the root:

    ```
    HUBSPOT_ACCESS_TOKEN=private-app-token
    PORT=3000
    ```

    > Replace `private-app-token` with the actual token from your “Yasaman’s Practicum Private App”.

4. Start the app: `node index.js`  
5. Visit: `http://localhost:3000`
