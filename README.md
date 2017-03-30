# ajax_assignment
Maria Kilsved, JavaScript 2, fend16

#### Live project
https://loosergirl.github.io/ajax_assignment/

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
The largest issue is, does this API really use JSON? `JSON.parse()` doesn't work and appears unnecessary. 

The website could also use more functionality. This is due to me not putting in enough effort. However, the upside is the project has already fulfilled its purpose.

I wanted to use the 'random' endpoint of the API. This proved impossible due to an error:
>Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested source.
