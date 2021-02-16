# Notes about this implementation

## It works!
A working example can be found by dialing 307-459-6535.  I take a very hands on approach to coding and like to fully test end to end where I can.
I left this up and running for you to try if you'd like.
## Code
* The coding style in the Javascript code is based on what I do in my current job.  We prefer `let` and `const`, and use `async` and `await` generally.  Promises can be confusing and this looks more like a Java or C# style which we are mostly familar with.
* Vanity numbers are generated from the passed in number by generating a vanity number using letters on a telephone keypad.
  I did this before I realized the requirement was to just generate a vanity number and that I could have used any vanity number.  However once I started this implementation I liked it and chose to stay with it. The numbers are mneumonic, ie 585-227-2277 can become 585-CAR-CARS or 585-BAR-BARS.
* In a real world scenario I would have spent some time making these mneumonics into actual words.  Maybe using a dictionary library or API.  		However for this exercise, I chose to keep it simple and just use basic mneumonics.
* Code uses a `require` style of sharing code and files.  I much prefer object oriented like Java or C#, but this method is what I am used to
  in my current job's code base.  It was the most familar for speed and it works pretty well.
* I tried to minimize external dependencies. Again this was a personal preference for simplicity.  Generally speaking I would research up front if there were any external dependences that would make sense for a project like this.  Things like making the project easier to develop or solving already solved problems.
* I have the Lambda being invoked directly from the Contact Flow.  There are probably other implementations of this (like making the Vanity Number generator an API endpoint). But this one is a good MVP given the requirements.
* The code assumes a US or Canada based phone number, and English language.  Translation and global number handling would be possible on a real project if the requirements called for it (they don't always).

## Infrastructure
* As a Terraform user in my current job, I had to learn CloudFormation for this project.  I chose that instead of CDK for speed for implmentation, since CF is the more mature, well used tool.
* I chose to use YAML for the templates.  I am not a Python coder, much more experienced in Java/JavaScript/C# so it was a little foreign to me.  However there were lots of good examples to follow.  And, it lets you do neat things like inlining code which was handy for the custom resource Lambda.
* Using Javascript for the Lambda was an easy choice for me. It's the language I am familar with and it was the easiest to use and deploy.  In a "real world" scenario, working from scratch, for a client, I might choose a different language.
* I created shell scripts to manage common commands that would have to be run to do this.  I address those in the README.  This just makes it easier to perform operations quickly.
### Security
* I made sure to limit permissions on the IAM role so that it follows the principle of least privilege.
* The function itself should be fairly safe from DoS and other attacks.  Again in a real world scenario, this would probably get more attention.
### Scalability
* Using Lambda and Dynamo ensures that this will scale up.  It also ensures that it won't cost much which is a nice side benefit. :)

## "Tricky" parts
* Creating the custom resource and figuring out what to do with it was the hardest part for me.  I tried a few things and resisted the urge to do a simple search and replace as the exercise asked for a custom resource. :)  But putting it in Dynamo made sense to me.  I could have also used S3 for that.  I tried, but was getting some odd behavior that I couldn't quite get my finger on and I was running short on time.
* I'm not as familar with YAML as I thought I was.