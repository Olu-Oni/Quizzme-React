App plans

```mermaid
stateDiagram
    User --> Login
    User --> Register

    Login --> Dashboard
    Register --> Dashboard

    state Dashboard {
        [*] --> QuizManagement
        [*] --> PerformanceTracking
        [*] --> UserProfile

        state QuizManagement {
        
        [*] --> ViewQuiz
        
        state ViewQuiz{
        [*] --> CreateQuiz
        [*] --> EditQuiz
        [*] --> DeleteQuiz
        
        CreateQuiz --> AddQuestions
        AddQuestions --> SaveQuiz

        EditQuiz --> ModifyQuestions 
        ModifyQuestions --> SaveQuiz
        } 

        }

        PerformanceTracking --> ViewPerformance
       
        UserProfile --> ViewProfile
        UserProfile --> EditProfile
        UserProfile --> Logout
    }

    CreateQuiz --> Dashboard
    EditQuiz --> Dashboard
    DeleteQuiz --> Dashboard
    ViewQuiz --> Dashboard

    ViewProfile --> Dashboard
    EditProfile --> Dashboard
    Logout --> Login

    ViewPerformance --> Dashboard
    

````
