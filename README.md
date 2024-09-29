# Project Time test cases

# Navbar test cases
1. Clicking on Project Time resets filtered results **
2. Switch the browser language to your primary language and verify the navigation items show in secondary language when transaltion in primary language is not available.
3. Interchange primary and secondary languages prefrence order and verify the navigation items show in primary language when transaltion in secondary language is not available.
4. Switch the browser language to your primary language and verify the navigation couple of items shows in default (english) language when transaltion in primary language is not available.


# List Page test cases
1. Default list page has 5 records **
2. Filter for Employee- Rohit and check if total records are equal to 3 **
3. Filter for Employee- Padma Manda and should get message "No records found" **
4. Switch the browser language to your primary language and verify the list page shows in primary language.
5. Switch the browser language to your secondary language and verify the list page shows in secondary language.

# Details page test cases
1. click on the create button and verify the create page has popped up without any data and save and goto list buttons are only available. Submit the form without any information and check all formik/yup errors are shown on the UI.  **
2. Saving without changing any details on Edit page gives message "No Changes to make" **
3. click on the create button and verify the create page has popped up without any data. Fill the form and click save, and check whether you receive a new record id and successful message. **
4. Enter both 'time duration' and 'total time' and check for yup errors
5. To edit a record change the information in all the fields to make a successful update and verify the response for the changes. **
6. Edit a record and Fill the form to generate a duplicate message and click save, and check whether you receive a duplicate error message. **
7. Edit a record and Fill the form to generate a Time Overlap message and click save, and check whether you receive a Time overlap not allowed error message. **
8. Change all the information on the page and click on switch to view, verify all information is reset back to the original data. **
9. Click on the Delete button and make sure a prompt appears, click confirm, data removes from the list and control goes to list page **
10. Click on the Delete button and make sure a prompt appears, click cancel and verify the prompt closes. **
11. Switch the browser language to your primary language and verify the detail page shows in primary language.
12. Switch the browser language to your secondary language and verify the detail page shows in secondary language.





