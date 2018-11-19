Archetype for the application
Using React, Axios, Express and MongoDB.

//TODO

Severity High
    Multiclick cause Multiple push into DB.
        Need to solve that in an elegantly.
        Also need to figure out if the ID should be an increment Database Side instead of FE side.
            Sounds better.
        Maybe locking the UI minimally un response from Back no completion
            Or stacking the actions a la batch mode.

Severity Medium
    Start Thinking on the scheme to be used.

Severity Low
    Create DB users for others
    Check how to reuse the dependencies from all the package.json
        Is this really a good idea?
    Shoudl add some value sanitization 