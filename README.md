Environment Files:

Create and configure all required .env files in the respective folders.



Install Dependencies:

Run npm i in the following directories to install necessary packages:

tailwindcss4

final_project_modified

blockchain



Kafka Setup:

Use Aiven.io to create a Kafka service.

Update the Kafka topics and credentials in the respective Python programs (both producer and consumer).

For the generation engine, make sure to start the consumer before the producer.



Ganache Setup:

Launch a Ganache service.

Update keys 1 and 2 in your configuration accordingly.



Running the Application:


Start the backend with:

nodemon app.js


Launch the frontend using:

npm run dev
