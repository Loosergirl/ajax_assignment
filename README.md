# ajax_assignment
Maria Kilsved, JavaScript 2, fend16

#### Live project
https://loosergirl.github.io/ajax_assignment/

#### GitHub
https://github.com/Loosergirl/ajax_assignment

#### Purpose of project
To make it possible to quickly find gifs suitable as Slack emojis. For this reason, gifs are displayed as small as possible. In order to counteract slow browsing, only a limited amount of gifs are shown at a time. All other functionality of this project only has the purpose of fulfilling the demands of this assignment.

#### API used
Giphy
This API stores gifs and is available to the public. 
https://github.com/Giphy/GiphyAPI

#### Tools & frameworks used
* Brackets
* GitHub
* Jquery (ajax only)
* Bootstrap
* Grunt (not really, only for Bootstrap)
* Sass (only for file organization)

#### Work process
My work process has plenty of room for improvement. The issue being, I misjudged the time it would take to complete the assignment and ended up doing most of the work near the end. This was not due to bad planning; rather, I didn't follow the plan.

#### Remaining issues
Giphy apparently doesn't have a secure connection and GitHub refuses to connect to the API. If the website is stored locally this is not a problem.

Does this API really use JSON? `JSON.parse()` doesn't work and appears unnecessary. 

I wanted to use the 'random' endpoint of the API. This proved impossible due to an error:
>Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested source.

Later, I also wanted to use the gif by ID endpoint to show any uploaded gif. However, the gifs won't appear despite the correct code. Formatting the size of the image works, which becomes apparent as the container around it changes size, but the gif itself won't load. Using an iframe, as suggested by giphy, didn't work either.  I have tried changing the http:// into https:// but that didn't work either. Eventually I put in a link to the image instead, which apparently works.
