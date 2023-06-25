# SpendingBot
Telegram + Google Sheets: make track of your spendings

The task:
There are roommates without credit/debit cards that pay by cash for the food, bills, rent etc and calculate balance by the end of the month: needed easy, fast and convenient way to track the spendings.

Th solution:
Telegram bot + google sheets to collect and store data about spendings.

How it works:
1. Roomates post to the telegram bot spendings + comments about what it was
2. The data, telegrams id, amount and comments (separetly) seved in Google Sheet
3. By the end of the month roommates check the pivot table in the file and got all the data and some analytics from it.

Preparations:
1. Get bot in telegram with API
2. Get Google Sheets to get Sheet ID
3. Run setWebhook() to get a Webhook

Some tricky part:
1. Each time you run setWebhook() the Webhook will change
2. Each time you change somthing in your code you have to run setWebhook()
3. Do tests and good luck!


The inspiration from this [video](https://www.youtube.com/watch?v=mKSXd_od4Lg)

A lot thanks goes to [Wim den Herder](https://www.linkedin.com/in/wimdenherder)!


