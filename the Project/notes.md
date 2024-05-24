## Notes while Learning the project 


# Apiresponse and Error handling:-

* To handle the error effieciently, standard practice is to define an error class.
* Node js applications have access to a special error class which can be modified as per app uses.

* generally four types of error may occur in node js applications:
    1. Standard Javascript error like `<EvalError>, <SyntaxError>, <RangeError>, <ReferenceError>, <TypeError>, and <URIError>`
    2. System errors due to unxpected access of resources.
    3. User-specified errros as denoted by statuscodes.
    4. AssertionErrors- special class of errors which are detected when exceptional logic violations occurs.

* These errors classess we can control further as per app need. So we can use inheritance property and define our own class ApiError based on Error class from nodejs. in this we can modify the constructors.
* generally we overwrite the constructors as follows:- 
```
class ApiError extends Error {
    constructor(
        statusCode,
        message= "Default wrong message from apiError class",
        errors= [],
        stack= ""
    ){
       super(message)
       
        this.statusCode= statusCode
        this.data= null
        this.success= false
        this.message= message
        this.errors= errors 

        if(stack){
            this.stack= stack
        }else{
            Error.captureStackTrace(this, this.constructor)

        }
    }
}

export {ApiError}
```