# Lab8_Starter

Dario Aburto Rodriguez
## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
  
 Within a Github action that runs whenever code is pushed 

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

No because we can not test how an individual component interacts with another feature which in this cause writing and sending a message to another user. 

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

Yes because it is a single component that just checks that the length of message is not more than 80 characters. 

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

It should run the tests with a browser UI.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/#settings');
    await page.waitForTimeout(500);
  });
