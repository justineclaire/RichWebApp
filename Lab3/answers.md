# Question 1
**Explain what is meant by the stream abstraction. What is the relationship between streams and the observer pattern? What are streams useful for modeling and when might you use them in Rich Web development?**
A stream is data that is created, processed, and consumed in an incremental fashion. It is an abstraction for some data which may or may not be present now or may or may not arrive in the future. The data reaches the client piece by piece e.g. streaming videos on Youtube. 
Streams (also called observables) have relationship with 'observers'. These observers 'subscribe' to the stream and can be used to do something with the data passing through the stream. They take and nanipulate the data.
Streams are useful for modeling because they help you model asynchronous operations in an easier to manage way and you may use them when dealing with asynchronous events and we want to increase performance as the client wont need to wait for a whole file to download in order to have access to it. 
# Question 2
**Assume that you are building an interface to an API in your Rich Web App. Describe in detail how you could use the RxJS library to handle asynchronous network responses to API requests. In your opinion, what are the benefits to using a streams library for networking over, say, promises? And what do you think are the downsides?**

You could use rxjs to handle asynchronous network responses by letting the responses be observables. Then it won't matter how fast the responses come in as they will be processed as they arrive. 
The benefits are that streams are suited to asynchronous events as data can be processed as it comes in. This will speed up the app as the user won't have to wait for every response to return before they can do something with it.
The downsides would be debugging becomes harder as streams provide abstraction that makes it hard to trace the flow of data coming in. 

# Question 3
**Consider three asynchronous tasks, A,B & C. What are the consequences of these functions sharing global state? What is a good practice to alleviate any problems associated with this?**

You cannot control which task will be completed first if the tasks are asynchronous and by having them share a state it could lead to unexpected behaviour like race condition problems if the tasks start working concurrently.
A good practice to alleviate any problems associated with this is to avoid tasks sharing a global state and to use concurrency control like semaphores or locks.