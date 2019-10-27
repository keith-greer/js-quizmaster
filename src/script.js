/* Questions and Answers */
var questions = [
  {
    q:"Which of the following will display a password field in a form?",
    o:[
      " < pwd name='password' >",
      " < input type='password' name='pwd' />",
      " < textarea >"
    ],
    a: 1
  },
  
  {
    q:"Assuming that orange.jpg cannot be found, what will be displayed when a page with this code is loaded in the browser? < img src='orange.jpg' alt='Orange' />",
    o:[
      " The text 'Orange'",
      " A warning message in an alert box",
      " A warning message on the page"
    ],
    a: 0
  },
  
  {
    q:"Which tag is the root tag in HTML?",
    o:[
      " <body>",
      " <html>",
      " <head>"
      
    ],
    a:1
  },
  
  {
    q:"DOM stands for..?",
    o:[
      " Document object method",
      " Document object model",
      " Document obligatory maker"
    ],
    a:1
  },
  
  {
    q:"Which of the following attribute triggers events when a form changes?",
    o:[
      " onchange",
      " onformchange",
      " onforminput"
    ],
    a:1
  },
];


/* [QUIZ ENGINE] */
var quiz = {
  draw: function(){
    var wrapper = document.getElementById('quiz-wrap');
    
    // Loop through all the questions and
    // create all the necessary inner HTML elements
    for (var index in questions) {
      var number = parseInt(index) +1;//The Current question number
      var qwrap = document.createElement("div");// A div wrapper to hold each question and options
      qwrap.classList.add("question");// CSS class, for cosmetic styles
      qwrap.classList.add("question-structure");
      //Question h1
      var question = document.createElement("h1");
      question.innerHTML = number + ") " + questions[index]['q'];
      qwrap.appendChild(question);
      
      // The options - <input> radio buttons and <label>
      for (var oindex in questions[index]['o']) {
        var label = document.createElement("label");
        qwrap.appendChild(label);
        
        // The <option> tag
        var option = document.createElement("input");
        option.type = "radio";
        option.value = oindex;
        option.required = true;
        option.classList.add("oquiz");//Explained later
        
        // Remember that a radio button group must share the same name
        option.name = "quiz-" + number;
        label.appendChild(option);
        
        //Add option text
        var otext = document.createTextNode(questions[index]['o'][oindex]);
        label.appendChild(otext);   
      }
      // Finally, add this question to the main HTML quiz wrapper
      wrapper.appendChild(qwrap);
     }
    // Attach submit button + event handler to the quiz wrapper
    var submitButton = document.createElement("button");
    submitButton.type = "submit";
    wrapper.appendChild(submitButton);
    wrapper.addEventListener("submit", quiz.submit);
    submitButton.innerHTML = "Submit";
  },
  
  submit : function(evt) {
    // quiz.submit() : Handle the calculations when the user submits to quiz
    // Stop the form from submitting
    evt.preventDefault();
    evt.stopPropagation();
    
    // Remember that we added an "oquiz" class to all the options?
    // We can easily get all the selected options this way
    var selected = document.querySelectorAll(".oquiz:checked");
    
    //Get the score
    var score = 0;
    for (var index in questions) {
      if (selected[index].value == questions[index]['a']){
        score++;
      }
    }
    
    // We can calculate the total score now
    var total = selected.length;
    var percent = score / total;
    
    //Update and show score using existing elements
    var html = "<h1>";
    if (percent>=0.7){
      html += "Your brain done good!!";  
    }else if (percent>=0.4){
      html += "Not Bad";
    }else{
      html+= "You're utterly worthless";
    }
    html += "<h1>";
    html += "<div>You scored " + score + " out of " + total + ".</div>";
    document.getElementById("quiz-wrap").innerHTML = html;
  }
};
/*Initialise*/
window.addEventListener("load", quiz.draw);