angular.module("7minworkout").controller("workoutController",["$scope","$interval","$location",function($scope,$interval,$location)
{
  /*
  
  Please refer the below link for differences between service factory and providers
  
  http://stackoverflow.com/questions/15666048/angularjs-service-vs-provider-vs-factory
  
  Difference between $route and $routeProvider
  
  http://stackoverflow.com/questions/17895814/angularjs-difference-between-route-and-routerprovider
  
  
  
  $route is a service while $routeProvider is a provider
  
  
  */
  
  /*javascript does not have class ..so here we use construction function below
  the next two function are the constructor created using function
  
  -----------------------MODEL------------------------------ 
  
      Exercise and Workoutplan----these are the two models which are used 
      
        Exercise contains the various constraints which we require like exercise description ,
        exercise timer and various things that are needed to do exercise
        
        Workout plan uses the exercise model above and containes the array of exercises for any workout plan
        
        
  
  
  
  */
  
  //---------------------------------MODEL-----------------------------------------------
  
  function Exercise(args)
  {
    this.name=args.name;
    this.title=args.title;
    this.description=args.description;
    this.image=args.image;
    this.related={};
    this.related.videos=args.videos;
    this.nameSound=args.nameSound;
    this.procedure=args.procedure;
    
    
  }
  
  function WorkoutPlan(args)
  {
    
    
    this.exercises=[];
    this.name=args.name;
    this.title=args.title;
    this.restBetweenExercise=args.restBetweenExercise;
     this.totalWorkoutDuration=function()
    {
      if(this.exercises.length===0)
        return 0;
      var total=0;
      angular.forEach(this.exercises,function(exercise)
      {
        total+=exercise.duration;
        
        
      });
      
      return this.restBetweenExercise*(this.exercises.length-1)+total;
      
    };
    
  }
  
  var restExercise;
  var workoutPlan;
  //-----------------------------------FUNCTION TO START THE WORKOUT ----------------------
  /*
  
  
  these are anonymous function which carries out the app operation
  
  we start from startworkout which calls createWorkout function -----
  
  CreateWorkOUT ---it creates the workouts along with different exercises involved in it
  in simple words it put the data inside the model defined above
  
  
  restExercise is created inside the startworkout function that is used for showing rest message and
  timer between two exercise and duration 
  
  
  startExercise connects the view and model data using $scope DI 
  
  You should have as minimum number of variables bind with $scope in Angular JS
  
  Angular JS doesnt render HTML it just leaves it like this because of SCE --strict contextual escaping
  
  */
  var startWorkout=function()
  {
    
    workoutPlan=createWorkout();
     $scope.workoutTimeRemaining=workoutPlan.totalWorkoutDuration();
    
    //This is used to specify the rest period between 
    //two exercise
    restExercise={
      exercise:new Exercise({
      name:"rest",
      title:"Relax !",
      description:"Relax a bit !  Cool Down",
      image:"img/rest.png",
        
        
      }),
      duration:workoutPlan.restBetweenExercise
  };
  
   $interval(function()
          {
            $scope.workoutTimeRemaining=$scope.workoutTimeRemaining-1;
            
          },1000,$scope.workoutTimeRemaining);
          
    startExercise(workoutPlan.exercises.shift());
    
  };
  
  var createWorkout=function()
  {
    var workout=new WorkoutPlan({
      
      name:"7minworkout",
      title:"7 minute Workout",
      restBetweenExercise:10
      
    });
    workout.exercises.push({
              exercise: new Exercise({
                  name: "jumpingJacks",
                  title: "Jumping Jacks",
                  description: "A jumping jack or star jump, also called side-straddle hop is a physical jumping exercise.",
                  image: "img/JumpingJacks.png",
                  nameSound: "content/jumpingjacks.wav",
                  videos: ["https://www.youtube.com/embed/dmYwZH_BNd0", "https://www.youtube.com/embed/BABOdJ-2Z6o", "https://www.youtube.com/embed/c4DAnQ6DtF8"],
                  procedure: "Assume an erect position, with feet together and arms at your side.\
                            <br/>Slightly bend your knees, and propel yourself a few inches into the air.\
                            <br/>While in air, bring your legs out to the side about shoulder width or slightly wider.\
                            <br/>As you are moving your legs outward, you should raise your arms up over your head; arms should be slightly bent throughout the entire in-air movement.\
                            <br/>Your feet should land shoulder width or wider as your hands meet above your head with arms slightly bent"
              }),
              duration: 30
          });
          workout.exercises.push({
              exercise: new Exercise({
                  name: "wallSit",
                  title: "Wall Sit",
                  description: "A wall sit, also known as a Roman Chair, is an exercise done to strengthen the quadriceps muscles.",
                  image: "img/wallsit.png",
                  nameSound: "content/wallsit.wav",
                  videos: ["https://www.youtube.com/embed/y-wV4Venusw", "https://www.youtube.com/embed/MMV3v4ap4ro"],
                  procedure: "Place your back against a wall with your feet shoulder width apart and a little ways out from the wall.\
                              <br/>Then, keeping your back against the wall, lower your hips until your knees form right angles. "
              }),
              duration: 30
          });
          workout.exercises.push({
              exercise: new Exercise({
                  name: "pushUp",
                  title: "Push Up",
                  description: "A push-up is a common exercise performed in a prone position by raising and lowering the body using the arms",
                  image: "img/Pushup.png",
                  nameSound: "content/pushups.wav",
                  videos: ["https://www.youtube.com/embed/Eh00_rniF8E", "https://www.youtube.com/embed/ZWdBqFLNljc", "https://www.youtube.com/embed/UwRLWMcOdwI", "https://www.youtube.com/embed/ynPwl6qyUNM", "https://www.youtube.com/embed/OicNTT2xzMI"],
                  procedure: "Lie prone on the ground with hands placed as wide or slightly wider than shoulder width. \
                              Keeping the body straight, lower body to the ground by bending arms at the elbows. \
                              Raise body up off the ground by extending the arms."
              }),
              duration: 30
          });
          workout.exercises.push({
              exercise: new Exercise({
                  name: "crunches",
                  title: "Abdominal Crunches",
                  description: "The basic crunch is a abdominal exercise in a strength-training program.",
                  image: "img/crunches.png",
                  nameSound: "content/crunches.wav",
                  videos: ["https://www.youtube.com/embed/Xyd_fa5zoEU", "https://www.youtube.com/embed/MKmrqcoCZ-M"],
                  procedure: "Lie on your back with your knees bent and feet flat on the floor, hip-width apart.\
                              Place your hands behind your head so your thumbs are behind your ears.\
                              Hold your elbows out to the sides but rounded slightly in.\
                              Gently pull your abdominals inward.\
                              Curl up and forward so that your head, neck, and shoulder blades lift off the floor.\
                              Hold for a moment at the top of the movement and then lower slowly back down."
              }),
              duration: 30
          });
          workout.exercises.push({
              exercise: new Exercise({
                  name: "stepUpOntoChair",
                  title: "Step Up Onto Chair",
                  description: "Step exercises are ideal for building muscle in your lower body.",
                  image: "img/stepUpOntoChair.png",
                  nameSound: "content/stepup.wav",
                  videos: ["https://www.youtube.com/embed/aajhW7DD1EA"],
                  procedure: "Position your chair in front of you.\
                              Stand with your feet about hip width apart, arms at your sides.\
                              Step up onto the seat with one foot, pressing down while bringing your other foot up next to it. \
                              Step back with the leading foot and bring the trailing foot down to finish one step-up."
              }),
              duration: 30
          });
          workout.exercises.push({
              exercise: new Exercise({
                  name: "squat",
                  title: "Squat",
                  description: "The squat is a compound, full body exercise that trains primarily the muscles of the thighs, hips, buttocks and quads.",
                  image: "img/squat.png",
                  nameSound: "content/squats.wav",
                  videos: ["https://www.youtube.com/embed/QKKZ9AGYTi4", "https://www.youtube.com/embed/UXJrBgI2RxA"],
                  procedure: "Stand with your head facing forward and your chest held up and out.\
                              Place your feet shoulder-width apart or little wider. Extend your hands straight out in front of you.\
                              Sit back and down like you're sitting into a chair. Keep your head facing straight as your upper body bends forward a bit. Rather than allowing your back to round, let your lower back arch slightly as you go down.\
                              Lower down so your thighs are parallel to the floor, with your knees over your ankles. Press your weight back into your heels.\
                              Keep your body tight, and push through your heels to bring yourself back to the starting position."
              }),
              duration: 30
          });
          workout.exercises.push({
              exercise: new Exercise({
                  name: "tricepdips",
                  title: "Tricep Dips On Chair",
                  description: "A body weight exercise that targets triceps.",
                  image: "img/tricepdips.png",
                  nameSound: "content/tricepdips.wav",
                  videos: ["https://www.youtube.com/embed/tKjcgfu44sI", "https://www.youtube.com/embed/jox1rb5krQI"],
                  procedure: "Sit up on a chair. Your legs should be slightly extended, with your feet flat on the floor.\
                              Place your hands edges of the chair. Your palms should be down, fingertips pointing towards the floor.\
                              Without moving your legs, bring your glutes forward off the chair.\
                              Steadily lower yourself. When your elbows form 90 degrees angles, push yourself back up to starting position."
              }),
              duration: 30
          });
          workout.exercises.push({
              exercise: new Exercise({
                  name: "plank",
                  title: "Plank",
                  description: "The plank (also called a front hold, hover, or abdominal bridge) is an isometric core strength exercise that involves maintaining a difficult position for extended periods of time. ",
                  image: "img/Plank.png",
                  nameSound: "content/plank.wav",
                  videos: ["https://www.youtube.com/embed/pSHjTRCQxIw", "https://www.youtube.com/embed/TvxNkmjdhMM"],
                  procedure: "Get into pushup position on the floor.\
                              Bend your elbows 90 degrees and rest your weight on your forearms.\
                              Your elbows should be directly beneath your shoulders, and your body should form a straight line from head to feet.\
                              Hold this position."
              }),
              duration: 30
          });
          workout.exercises.push({
              exercise: new Exercise({
                  name: "highKnees",
                  title: "High Knees",
                  description: "A form exercise that develops strength and endurance of the hip flexors and quads and stretches the hip extensors.",
                  image: "img/highknees.png",
                  nameSound: "content/highknees.wav",
                  videos: ["https://www.youtube.com/embed/OAJ_J3EZkdY", "https://www.youtube.com/embed/8opcQdC-V-U"],
                  procedure: "Start standing with feet hip-width apart. \
                              Do inplace jog with your knees lifting as much as possible towards your chest."
              }),
              duration: 30
          });
          workout.exercises.push({
              exercise: new Exercise({
                  name: "lunges",
                  title: "Lunges",
                  description: "Lunges are a good exercise for strengthening, sculpting and building several muscles/muscle groups, including the quadriceps (or thighs), the gluteus maximus (or buttocks) as well as the hamstrings. ",
                  image: "img/lunges.png",
                  nameSound: "content/lunge.wav",
                  videos: ["https://www.youtube.com/embed/Z2n58m2i4jg"],
                  procedure: "Stand erect with your feet about one shoulder width apart.\
                              Put your hands on your hips, keep your back as straight as possible, relax your shoulders and keep your eyes facing directly ahead.\
                              Take a large step forward with one leg.\
                              As you step forward, lower your hips and bend your knees until they both form 90 degree angles.\
                              Return to starting position.\
                              Repeat with your alternate leg."
              }),
              duration: 30
          });
          workout.exercises.push({
             exercise: new Exercise({
                  name: "pushupNRotate",
                  title: "Pushup And Rotate",
                  description: "A variation of pushup that requires you to rotate.",
                  image: "img/pushupNRotate.png",
                  nameSound: "content/pushupandrotate.wav",
                  videos: ["https://www.youtube.com/embed/qHQ_E-f5278"],
                  procedure: "Assume the classic pushup position, but as you come up, rotate your body so your right arm lifts up and extends overhead.\
                              Return to the starting position, lower yourself, then push up and rotate till your left hand points toward the ceiling."
              }),
              duration: 30
          });
          workout.exercises.push({
              exercise: new Exercise({
                  name: "sidePlank",
                  title: "Side Plank",
                  description: "A variation to Plank done using one hand only",
                  image: "img/sideplank.png",
                  nameSound: "content/sideplank.wav",
                  videos: ["https://www.youtube.com/embed/wqzrb67Dwf8", "https://www.youtube.com/embed/_rdfjFSFKMY"],
                  procedure: "Lie on your side, in a straight line from head to feet, resting on your forearm.\
                              Your elbow should be directly under your shoulder.\
                              With your abdominals gently contracted, lift your hips off the floor, maintaining the line.\
                              Keep your hips square and your neck in line with your spine. Hold the position."
              }),
              duration: 30
          });
    return workout;
    
  };
  
  var startExercise=function(exercisePlan)
  {
    /*
    
    exercisePlan here is the model Exercise along with duration for which exercise has to be done
    
    */
    
    
    $scope.currentExercise=exercisePlan;
    $scope.currentExerciseDuration=0;
    $scope.workoutPlan=workoutPlan;
    
    // Here the $interval function runs from 0  to $scope.currentExercise.duration=30 with 1 second as 
    //the difference between 2  interval
    
    
    //Since $interval function returns a promise object so we can use this just after $interval gets executed
    $interval(function()
    {
      ++$scope.currentExerciseDuration;
      
    },1000,$scope.currentExercise.duration)
    .then(function()
    {
      var next=getNextExercise($scope.currentExercise);
      if(next)
      {
        startExercise(next);
      }
      else
      {
        $location.path("/finish");
      }
});
    
  };
  
  var getNextExercise=function(currentExercisePlan)
  {
    
    var nextExercise=null;
    if(currentExercisePlan===restExercise)
    {
      
      nextExercise=workoutPlan.exercises.shift();
      
    }
    else
    {
       if(workoutPlan.exercises.length!==0)
          {
        
        nextExercise=restExercise;
      }
    }
    return nextExercise;
    
  };
   
  
  //This $watch is not called in real time instead it is called after every digest cycle 
  //so for this reason we will wrap this code in $timeout that triggers digest cycle when time  lapese
  // $scope.$watch('currentExerciseDuration',
  // function(nVal)
  // {
  //   if(nVal==$scope.currentExercise.duration)
  //   {
  //     var next=getNextExercise($scope.currentExercise);
  //     if(next)
  //     {
  //       startExercise(next);
  //     }
  //     else
  //     {
  //       console.log("WorkOut Complete");
  //     }
  //   }
  
  //----We have used promise instead of using $watch because of optimization
    
  // });
  
  var init=function()
  {
    
    startWorkout();
  };
  init();
  
  
  
  
}]);