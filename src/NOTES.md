# Notes about this implementation

## Code
* The coding style in the Javascript code is based on what I do in my current job.  We prefer `let` and `const`, and use `async` and `await` generally.  Promises can be confusing and this looks more like a Java or C# style which we are mostly familar with.
* Vanity numbers are generated from the passed in number by generating a vanity number using letters on a telephone keypad.
  I did this before I realized the requirement was to just generate a vanity number and that I could have used any vanity number.  However once I started this implementation I liked it and chose to stay with it. The numbers are mneumonic, ie 585-227-2277 can become 585-CAR-CARS or 585-BAR-BARS.
* In a real world scenario I would have spent some time making these mneumonics into actual words.  Maybe using a dictionary library or API.  		However for this exercise, I chose to keep it simple and just use basic mneumonics.
* Code uses a `require` style of sharing code and files.  I much prefer object oriented like Java or C#, but this method is what I am used to
  in my current job's code base.  It was the most familar for speed and it works pretty well.
* I tried to minimize external dependencies. Again this was a personal preference for simplicity.  Generally speaking I would research up front if there were any external dependences that would make sense for a project like this.  Things like making the project easier to develop or solving already solved problems.


## Infrastructure
* As a Terraform user in my current job, I had to learn CloudFormation for this project.  I chose that instead of CDK for speed for implmentation, since CF is the more mature, well used tool.  Just a personal preference.
*