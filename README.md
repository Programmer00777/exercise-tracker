![readme-exercise-tracker](https://user-images.githubusercontent.com/55809302/194625644-0261a590-2646-4aa3-a654-e0977b0556b6.png)
An Exercise Tracker allows you to create users and track their histories of exercises.

Data you can save:
- The descroption of an exercise
- Duration
- Date when an exercise was performed

## Endpoints
Basically, the app is running on port 3000 (if you don't specify another).
- **GET /** Home page
- **GET /api/users** Show all the users if there are any in the database. Otherwise, send an appropriate message.
- **POST /api/users** Save a new user to the databases on success. Otherwise, send an appropriate message.
- **POST /api/users/:_id/exercises** Add a new exercise record to the list of exercises of a particular user (by its ID).
- **GET /api/users/:_id/logs?[from][&to][&limit]** Show the list of logs of a particular user (by its ID) for the specified period of time (optionally). Also,
it's possible to limit the number of documents returned. Otherwise, return an appropriate message.

## Libraries used in the service
- **express** lightweight framework for Node.js.
- **dotenv** loads environment variables from .env file.
- **mongoose** Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
- **body-parser** Node.js body parsing middleware.

## Usage
1. Clone the repository with ```git clone https://github.com/Programmer00777/exercise-tracker.git``` into your working directory.
2. Launch the app with ```node server.js```
3. Go to ```http://localhost:3000/```. You should see the next HTML page:
<img width="1440" alt="Screen Shot 2022-10-07 at 9 45 07 PM" src="https://user-images.githubusercontent.com/55809302/194628034-d4e86ca7-c404-4806-8b9d-dcbbffd6cc8b.png">
4. First, add a user to be able to add a new exercise log (since adding exercises requires the input of user ID). Enter the username field and click "Submit".
<img width="1440" alt="Screen Shot 2022-10-07 at 9 47 17 PM" src="https://user-images.githubusercontent.com/55809302/194628844-355d8247-8bef-40fb-bc4b-b01022c3465d.png">
In the response, you will receive something like this:
<img width="1440" alt="Screen Shot 2022-10-07 at 9 48 07 PM" src="https://user-images.githubusercontent.com/55809302/194629158-1be50d1a-d326-4bd7-9a2a-8a0b876c0abd.png">
5. Now, let's add a new exercise. We need a user ID to be copied before it. Let it be "running" - John was running for 70 minutes on 07.10.2022.
<img width="1440" alt="Screen Shot 2022-10-07 at 9 51 21 PM" src="https://user-images.githubusercontent.com/55809302/194630882-c79c5a11-1635-4fc2-b56c-045755ee7476.png">
You will receive a JSON response similar to:
<img width="1440" alt="Screen Shot 2022-10-07 at 9 51 53 PM" src="https://user-images.githubusercontent.com/55809302/194631312-23ab2858-ea35-4930-9d78-fc93ec3f6102.png">
Let's add a couple more logs of exercises for this user.
6. Then, we can go to ```/api/users/:_id/logs``` and see all the logs of a user. (Replace *:_id* with the actual identifier of a user)
I receive this response:
<img width="1440" alt="Screen Shot 2022-10-07 at 9 54 54 PM" src="https://user-images.githubusercontent.com/55809302/194632696-21e4e30c-c3ce-4c44-8e82-d998a88d6b35.png">
Note, that there is a **count** property that stores the number of logs of a user.
7. Let's limit the number of records returned to 2. For this, I type ```/api/users/634074612dd09377ee0b17d4/logs?limit=2```:
<img width="1440" alt="Screen Shot 2022-10-07 at 9 57 03 PM" src="https://user-images.githubusercontent.com/55809302/194633944-547e4362-2497-44f6-904c-665ed615ff65.png">
Now, I receive only the first two records I added earlier. *By default, the limit number of records is set to 500.*
8. Suppose that I want to receive all the logs from the beginning of 2021 to the beginning of 2022. For this, I type ```/api/users/634074612dd09377ee0b17d4/logs?from=2021-01-01&to=2022-01-01```.
In this case, I will receive nothing in the **log** property, 'cause the user doesn't have any logs in this range of time:
<img width="1432" alt="Screen Shot 2022-10-07 at 10 01 00 PM" src="https://user-images.githubusercontent.com/55809302/194635403-fb98e4ab-4755-42b9-be19-97e8fd5b22ce.png">

So, that's it!

## License
MIT
