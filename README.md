# CSC468/568 Web and Undo/Redo

**DUE: Thursday March 26th, 8AM**

```
The purpose of this assignment is to give you practice with HTML, CSS, PHP files, and the
undo/redo pattern.
```
## Overview

You will be coding a prototype pixel art application in preparation for a nonogram application
(https://en.wikipedia.org/wiki/Nonogram). For the prototype, you will handle a 5 by 5 or 10 by 10 grid in
which each cell can be colored. You will also implement setting the color of a cell and the undo/redo
functionality for color selection. This must follow the undo/redo pattern and may be done in JavaScript
or PHP. You must also allow uploading, downloading, saving, and loading of a grid state. You may use a
flat text file or xml to save the grid. These tasks will give you only part of the required points. The
remaining points will be extensions that you will choose.

The prototype has three pages: 1) the main application page, 2) a file management page, and 3) a help
page which doubles as a grading aid page. Each page has a horizontal navigation bar and a content area
below it. There are additional formatting requirements listed in the Formatting section.

**This must work on Firefox and Chrome on the department’s dev server. Make sure you are on the dev server. Only dev supports the correct version of the server!**

**_Major tips:_**

- _Turn on showing errors on the school server!_
- _Upload and test in the school server for every ~1 hour of coding. I’ve seen many people code_
    _everything locally and then fail to get the assignment uploaded properly. File permissions were_
    _the most common culprit._
- _This assignment is LARGER than it looks. I’ve given you all the pieces, and now it is your turn to_
    _connect them. This is the harder part!_

```
Aside : This project allows for 6+ different methods to get the program working. I didn’t want to restrict
to any one particular version, but that does mean a fair bit of variance in the end result. Since I almost
opened up the project to any application that met the core criteria, I will still consider other applications
if they meet the same core requirements as this assignment (speak to me if you want more details).
```

Main Application Page

This page must provide the ability to

1. Choose the color to shade selected cells with a minimum of 3 colors (white, black, and green).
2. Set the cell to be the same color as the current color when the cell is clicked.
3. Change the grid size between 5x5 and 10x10, which also clears all cells and the selected colors.
4. Undo/redo.
5. Save to server.

You may handle a save by either asking for a name, or name the file grid_## where ## is its id. Saving
must keep the page on the same page after clicking the save button. The entire grid and current
selected color must always be shown. Undo/redo functionality is only implemented here. You must be
able to undo and redo for the following tasks:

```
1) Changing the selected color
2) Changing a cell color
3) Changing the grid size
```
This must be OOP based (as much as JavaScript/PHP allows). You also must support a stack of _at least 5_
undo/redo operations. The following is an example of what the interactions would cause:

1. Open fresh page →
    a. Main area shows a blank 5 by 5 grid
    b. Main area shows the selected color of black
2. Click the cell at index 0, 0 →
    a. Main area shows a 5 by 5 grid with a black cell at (0, 0) with the remaining being white
    b. Main area shows the selected color of black
3. Change the selected color to green →
    a. Main area shows a 5 by 5 grid with a black cell at (0, 0) with the remaining being white
    b. Main area shows the selected color of green
4. Click the cell at index 1, 2 →
    a. Main area shows a 5 by 5 grid with a black cell at (0, 0), a green cell at (1, 2) with the
       remaining being white
    b. Main area shows the selected color of green
5. Change the grid to 10 by 10 →
    a. Main area shows a blank 10 by 10 grid
    b. Main area shows the selected color of black
6. Click undo→ Main area shows the state at step 4
7. Click undo→ Main area shows the state at step 3
8. Click undo→ Main area shows the state at step 2
9. Click Redo→ Main area shows the state at step 3
10. Click Redo→ Main area shows the state at step 4

_Tip: this will likely require 2+ classes that implement the undo/redo interface along with the
managing/history class._


File Management Page

This page must allow you to see available grid files, upload a grid file, load a grid, and create a grid file
before making it available for download.

- You must permit a minimum of **one** grid file to be saved on the server.
- You only need to handle **one** user (I can only readily test for one user). You may overwrite or
    delete a grid if you go over your limit.
- For each available grid on the server, you must be able to load the grid, **automatically redirect**
    back to the main page, and replace the grid area with the file’s grid. I will **not** be testing for
    undo/redo cross loading a file unless you make that an extension.
- Each available grid on the server must be available for download.
- A grid that you created, and downloaded, must be able to be re-uploaded and loaded.
- An uploaded grid is added to the server list and is not immediately loaded.

Reminder: This must work on the school server, which supports PHP and XML. I cannot guarantee
anything else. Use other options at your own risk!

_Warning: the fact there is only_ **_a single_** _required file to upload and download should tell you that this is
typically a difficult task for many students!_

Help Page

This page should explain how to use your grid web application. You must divide the content with HTML
headings. The minimum sections are

1. Your name, last tier, and/or extensions. If something is only partially working, please explain
    how to test it on our end for partial credit.
       a. This overrides the standard checklist in the main file header requirement.
2. How your CSS modifications (templates, JavaScript effects if applicable, etc) are handled.
    a. You must list where the modifications are as well. **Not doing so is 0 points for that line**
       **item.**
3. How to use the application and the application limitations (e.g. make file size).

Formatting

The minimal layouts are roughly drawn for each layout to emphasize the flexibility of the appearance.
You are required to have a CSS formatted navigation bar in each page. The effect of the CSS on the
navigation bar must be obvious. The navigation bar must have all your available pages listed. The CSS on
the navigation bar must include any **obvious change** in the navigation bar’s background color/image.
There also must be an **obvious change** in the text style, such as font, size, etc. (must be marked with the
HTML comment, GRADING: CSS).

If you use a template, you must still personally override the CSS rules to meet this task.

_Warning: if you use a CSS template, it can decrease our ability to find the CSS changes. Keep this in mind
when you decide upon your CSS rules._ **_Spans_** _makes it much easier to check for text style changes._


Main application

The following is an intentionally rough outline of this page.

Requirements:

- The main interaction buttons should be under the navigation bar and should be primarily
    horizontal. Interaction buttons include color selection, color choice, grid resize, save, undo, and
    redo.
- The color selection method is up to you, as is how you display the current selected color.
- The grid is under the interaction buttons.
- How you make the grid is up to you. Buttons, tables, images, etc. are all fine. The grid does not
    need to be perfectly square, but the cells should the size of a button with a single character or
    larger.

File Management
The following is an intentionally rough outline of this page.

Requirements:

- There are two permissible ways to add file downloading: 1) add a text box to type in the file you
    want, and 2) add a download button/link next to each file.
- There must be a load button next to the file(s).


Help
The following is an intentionally rough outline of this page.

Requirements:

- The headings should be in the order presented. Any additional main heading must be added
    below the required headings.
- You must use the heading tags in this page to denote sections.

Additional restrictions

- This is a semi-public server. Make sure you are OK with _everyone on campus_ being able to view
    your page.
- Under no circumstances may you affect another student’s page. This is a severe violation of
    student conduct and is grounds for **automatic flunking** of this course.
- You MUST use PHP for the server file handling. Not doing so will be a 0 for these line items.
- You MUST use the undo/redo pattern in the OOP format as discussed in class. You may do this in
    JavaScript or PHP. No other “class” objects are required.
- Mark each undo/redo pattern components of the following with the given comments. **Not doing**
    **so, will result in 0 points for this line item.** Specifically,
       o The history manager class is marked with _GRADING: MANAGE_
       o The command/memento class(es) are marked with _GRADING: COMMAND_
       o Adding the undo/redo classes to the history manager is marked with _GRADING: ACTION_
- CSS and Javascript must be done in 2 + separate file sheets. onclick=someFun() is acceptable.
    There must be no styling inside the HTML/PHP files. D **oing so, will result in - 2 points each, on**
    **top of other deductions.**
- You must list the last tier passed and the extensions (and how to test them if applicable) in the
    help page. If you list only the extensions, I’ll assume all prior tiers were passed.
- Your website must work on the school server and on both Firefox and Chrome. Missing any one
    of these will be -1 letter grade.


Allowed Web extension

You may use the following web extensions if desired. You must ask for permission for others. If I don’t
have to install the extension, you will likely be permitted to use it.

- Jquery
- JQueryUI
- Canvas tag
- Webgl
- ALL HTML versions
- CSS broiler plates (you must note which one you used AND still adjust it to meet the
    assignment requirements)
- Bootstrap
- PixiJS
- Cookies (the $_SESSION variable is a bit more reliable on the school servers)

Warning: All students who have used Angular in the past have had trouble on the school server.
Therefore, it is forbidden.


Extensions

You may choose from the following list for extensions for the project, or you may ask for a different
extension, and I’ll decline or accept with a set point value. The point values are listed. You MUST list the
extensions up to the first extension that reaches 100% (no more!) in the main file header and how to
test for credit.

- [] 1. Improve the appearance
    - [] a. 5pt Style the buttons
    - [] b. 5pt Add a colored/image header (<header>) and/or footer (<footer>) area
    - [] c. 5pt Add a border around the grid
    - [] d. 5pt Make a fancy page background (this must be more than a solid color or a single image)
    - [] e. 10pt allow the user to set the grid size (rectangular is optional)
- [] 2. Improve the color
    - [] a. 5 pt Add 4+ more colors
    - [] b. 10pt Add swappable color sets (e.g. grayscale, all primary, etc.)
    - [] c. 10pt Use pictures to fill the cells (the pictures do not need to be a flat color)
- [] 3. Improve interaction
    - [] a. 5pt Add hot-keys to pick the color
    - [] b. 10 pt Allow drag and drop to upload to the file management area
    - [] c. 5pt Allow more than 1 file
    - [] d. 10 pt Move the file page to a collapsible overlay on the main page
    - [] e. 5pt Enable and disable the undo and redo button when applicable
    - [] f. 10pt Add another undo/redo functionality (you must list how to test this in the help page)
- [] 4. Nonogram (one problem, and you **must put the solution in the help page** )
    - [] a. 5 pt Display the number of consecutive colored cells in each row/column
       - [] i. Colored versus uncolored only
- [] ii. Since there is only one problem, this can be hard coded
    - [] b. 5 pt Adding an indicator with a row/column is correct
    - [] c. 5 pt Adding an indicator for when the game is complete
    - [] d. 5pt Add an “unused” option to the color list that marks a cell, but does not count as being colored
    - [] e. 10pt Add an indicator when a set of colored cells is complete

Submission instructions

1. Check the coding conventions before submission.
2. Zip your ENTIRE PROJECT into ONE zip folder. The file hierarchy is critical this
    time.
       - While I’ll primarily be grading this via your actual posted website, I need the files
          for long term storage and plagiarism checks.
3. Submit to D2L. The dropbox will be under the associated topic's content page.
    - LIST YOUR HOMEPAGE FOR THIS APP IN THE
       COMMENT BOX. Failing to do so is letter grade
       deduction.
4. Check that your submission uploaded properly. No receipt, no submission.

You may upload as many times as you please, but only the last submission will be graded and stored

```
If you have any trouble with D2L, please email me (with your submission if necessary).
```

## Rubric

```
Grading Tiers
These tiers start with the simplest tasks, and go to the most involved. Please refer to the rubric for the
tiers. You must “reasonably” complete the lower tiers before gaining points for the later tiers. By
“reasonably,” I can reasonably assume you honestly thought it was complete. Treat the rubric as a
checklist!
```
g. Loaded grid file properly displays with any file (must be given with

   - [] Undo/redo pattern (tier-less) Item Points
   - [] Undo/redo OOP followed (-3 if no undo/redo completed in order to test)
   - [] Able to undo/redo color selection
   - [] Able to undo/redo coloring a cell
   - [] Able to undo/redo changing the grid size
   - [] 1. Tier: All Pages HTML and CSS
      - [] a. All 3 pages present (if extension doesn’t override)
      - [] b. All basic content added to Main page (static is OK at this point)
      - [] c. Properly displays a grid in Main page (static is OK at this point)
      - [] d. All basic content added to File page (static is OK at this point)
      - [] e. All basic content added to Help page (static is OK at this point)
      - [] f. Navigation bar CSS done
      - [] g. Text CSS done
      - [] h. Navigation bar links work
      - [] i. Help page has all sections with correct tags
      - [] j. Help page has all sections completed
   - [] 2. Tier: Main page
      - [] a. Able to change selected color
      - [] b. Able to change cell color by clicking on the cell at all
      - [] c. Able to change cell color by clicking it to the selected color
      - [] d. Able to resize grid both ways (2pt each)
      - [] e. Resize clears grid and selected color (2pt each)
   - [] 3. Tier: Files
      - [] a. Able to save the current grid (must show in file page)
      - [] b. Stay on the main page with a save
      - [] c. Able to download at least one grid file (default is ok)
      - [] d. Able to download an application generated file
      - [] e. Able to upload a file
      - [] f. Loading a grid file redirects back to the main page
      - [] g Loaded grid file properly displays with any file (must be given with submission, if the app generated does not work)
      - [] h. Loaded grid file properly displays with app generated file
    - [] 4. Tier: extensions


