# Notes about this implementation
## It works!
A working example can be found by dialing the number provided to my recruiter contact.  I take a very hands on approach to coding and like to fully test end to end where I can.
I left this up and running for you to try if you'd like.

## Why I implemented the way I did
### Code
* The coding style in the Javascript code is based on what I do in my current job.  We prefer `let` and `const`, and use `async` and `await` generally.  Promises can be confusing and this looks more like a Java or C# style which we are mostly familar with.
* Code uses a `require` style of sharing code and files.  I much prefer object oriented like Java or C#, but this method is what I am used to
  in my current job's code base.  It was the most familar for speed and it works pretty well.
* Vanity numbers are generated from the passed in number by generating a vanity number using letters on a telephone keypad.
  I did this before I realized the requirement was to just generate a vanity number and that I could have used any vanity number.  However once I started this implementation I liked it and chose to stay with it. The numbers are mneumonic, ie 585-227-2277 can become 585-CAR-CARS or 585-BAR-BARS.
* I tried to minimize external dependencies. Again this was a personal preference for simplicity.  Generally speaking I would research up front if there were any external dependences that would make sense for a project like this.  Things like making the project easier to develop or solving already solved problems.
* I have the Lambda being invoked directly from the Contact Flow.  There are probably other implementations of this (like making the Vanity Number generator an API endpoint). But this one is a good MVP given the requirements.
* The code assumes a US or Canada based phone number, and English language.  Translation and global number handling would be possible on a real project if the requirements called for it.  They don't always call for that.  IE a large company only doing business in the US might be fine with this.
* I used a `master` branch on a new Github project for this.  Normally I would not do that and would use a feature branch. But this a new and relatively simple project.

### Infrastructure
* As a Terraform user in my current job, I had to learn CloudFormation for this project.  I chose that instead of CDK for speed for implmentation, since CF is the more mature, well used tool.  The project is also relatively small.
* I chose to use YAML for the templates.  I am not a Python coder, much more experienced in Java/JavaScript/C#.  So it was a little foreign to me.  However there were lots of good examples to follow.  And, it lets you do neat things like inlining code which was handy for the custom resource Lambda.
* Using Javascript for the Lambda was an easy choice for me. It's the language I am familar with and it was the easiest to use and deploy.
* In a "real world" scenario, working from scratch, for a client, I might choose a different language.  I imagine many times this would be dictated by the client.  A client with lots of C# would probably ask for things to be implemented in that language.
* I created shell scripts to manage common commands that would have to be run to do this.  I address those in the README.  This just makes it easier to perform operations quickly.  That is also easier to re-use in a CI/CD scenario.

### "Tricky" parts
* Creating the custom resource and figuring out what to do with it was the hardest part for me.  I tried a few things and resisted the urge to do a simple search and replace as the exercise asked for a custom resource. :)  But putting it in Dynamo made sense to me.  I could have also used S3 for that.  I tried, but was getting some odd behavior that I couldn't quite get my finger on and I was running short on time.
* I'm not as familar with YAML as I thought I was.
* Apparently, the `async`/`await` constructs do not work very well in custom resource creation when you are using `cfn-response`.   So I didn't use it in my custom resource creation Lambda.  I abandonded it after spending far too much time on it. In this case it was fine since it is really just syntactic sugar in such a small function.  But I'm a Java/C# trained engineer, and I like my `try/catch` blocks. :)

## Shortcuts I took
In general I didn't take too many. What I did do I find to be reasonable and explain them below.

* The two Lambda functions share a role. They should probably have their own.  Although you could make the case that functions that perform similar things should have similar roles.
* Custom resource code is inlined the Lambda's CF definition.  This COULD be its own file.  But ultimately it has to be bootstrapped SOMEHOW so I did it this way.
* The same applies to the contact flow JSON.
  * Ultimately, it has to be bootstrapped somewhere.  So it is inlined in the Lambda.
  * An S3 bucket might have been a better choice for this.  If this were my product, I would probably write a user story to have someone do that in the future.  But as an MVP solution, it works for now.
## With more time I would have....
* Implemented the web application portion.  There are some really cool things you can do with Amplify that I have been looking for an excuse to play with.
* In a real world scenario I would have spent some time making phone number mneumonics into actual words.  Maybe using a dictionary library or API.  However for this exercise, I chose to keep it simple and just use basic mneumonics.
* I would have also liked to change with the contact flow's speaking speed.  It seems to read really fast.  I'm sure it is configurable.
* I see there are recently released APIs for Connect.  I would have liked to use those to further automate this and AUTOMATE ALL THE THINGS.  However I had a time constraint so I skipped it.

## Other considerations
### Scalablity
* I would performance test this code to figure out how many units of read/write we'd need for Dynamo.  It can handle almost ANY volume that would be needed.   However it should still be optimized in order to manage cost correctly.
* I would do the same for the Lambda.  Even though it's "free" below a certain limit, it should still be tuned.  Once you're past a certain point you have to pay for executions, memory etc.
* A reference such as this would be good to consult for such considerations (https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html).

### Maintainablity
* An S3 bucket might have been a better choice for the contact flow JSON "input" from the Lambda.  Or storing it in Dynamo too.  Or..something else.  I would use the approach I did for an MVP and create a backlog item to do it in a more maintable way in the future.

### Security
* It would be a good idea to vet the IAM roles to make sure they are "airtight".
* I would probably put any sensitive information for this project, such as env vars if I had them, in Secrets Manager.