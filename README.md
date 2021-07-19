Signup microservice

Endpoints:
•	Signup/
•	Signup/verify.
•	Signup/verify/resend.
•	Signup/setup
•	Signup/ping

Signup/
•	This endpoint accepts post request with a payload containing a 10 digit us phone number. 
•	The phone number is checked if it already exists in database.
•	Generate a 6 digits code and send using Twilio API.
•	If successful, the code is persisted in Temp_Users table together with the timestamp and response sent back.
Signup/verify.
•	This endpoint accepts a post request with a payload containing a 6 digits code and phone all numeric.
•	The code is checked in Temp_Users table and makes sure it corresponds to the phone number and the time difference is not more than 5mins.
•	If everything ok, verification was successful responds is sent back.

Signup/verify/resend.
•	This endpoint accepts a post request with a payload containing a phone number.
•	The number is checked in Temp_Users table.
•	If resend limit is already 2, request cannot be sent otherwise, Code is generated, send and the old value and timestamp updated.
Signup/setup
•	This endpoint accepts a post request with payload containing a first name, last name, email , phone, and password.
•	Payload is validated and password hashed.
•	First name, Last name, email, and password are stored in user’s table.
•	Phone and hashed password and stored in login table together with active status.
•	Token signed and sent back as cookie.
