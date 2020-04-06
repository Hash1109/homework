// // Assignment/Homework 3 - Java Script Code // //


// All Variables For Java Script Code:

var input;
var selectNumber;
var selectCharacter;
var selectLowercase;
var selectUppercase;
var options;
var generateBtn = document.querySelector("#generate");


// Password Characters, Numbers & Letters (Upper Case & Lower Case): 

// Array of Special Characters:
Characters = ["=", ">", "?", "@", "[", "]", "_", "{", "|", "}", "~", "!", "#", "$", "%", "&", "(", ")", "*", "+", ",", "-", ".", "<"];

// Array of Numbers:
Numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Array of Alphabetical Letters Upper Case:
Uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// Array of Alphabetical Letters Lower Case:
Lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


// Event Listener for Button Pressed to Generate Password:
generateBtn.addEventListener("click", generatePassword);


// Start Function to Generate Password:
function generatePassword() {
  // Asks for User Input:
  input = parseInt(prompt("Password Length - Choose Between 8 & 128"));

  // First If Statement for User Validation:
  if (!input || input < 8 || input > 128) {
    alert("Value MUST be Between 8 and 128")
    input = parseInt(prompt("Password Length?= - Choose Between 8 & 128"));
  };

  // Second If Statement - If Condition Met Return Nothing:
  if (input < 8 || input > 128) {
    return;
  };

  // If Statement - If This Condition Met Then Proceed:
  if (input > 8 || input < 128) {

    selectLowercase = confirm("Do You Want Your Password To Have Lower Case Letters?");
    selectUppercase = confirm("Do You Want Your Password To Have Upper Case Letters?");
    selectNumber = confirm("Do You Want Your Password To Have Numbers?");
    selectCharacter = confirm("Do You Want Your Password To Have Special Characters?");
  };


  // Else If & if StatementS that Uses User Input Prompts to Determine Options:

  // If Statement for All False Response:
  if (!selectCharacter && !selectNumber && !selectUppercase && !selectLowercase) {
    alert("Please Follow Instructions!");
    return;
  }

  // Else If for 4 Positive Options:
  else if (selectCharacter && selectNumber && selectUppercase && selectLowercase) {
    options = Characters.concat(Numbers, Lowercase, Uppercase);
  }

  // Else if For 3 Positive Options:
  else if (selectCharacter && selectNumber && selectUppercase) {
    options = Characters.concat(Numbers, Uppercase);
  }
  else if (selectCharacter && selectNumber && selectLowercase) {
    options = Characters.concat(Numbers, Lowercase);
  }
  else if (selectCharacter && selectLowercase && selectUppercase) {
    options = Characters.concat(Lowercase, Uppercase);
  }
  else if (selectNumber && selectLowercase && selectUppercase) {
    options = Numbers.concat(Lowercase, Uppercase);
  }

  // Else If For 2 Positive Options:
  else if (selectCharacter && selectNumber) {
    options = Characters.concat(Numbers);
  }
  else if (selectCharacter && selectLowercase) {
    options = Characters.concat(Lowercase);
  }
  else if (selectCharacter && selectUppercase) {
    options = Characters.concat(Uppercase);
  }
  else if (selectLowercase && selectNumber) {
    options = Lowercase.concat(Numbers);
  }
  else if (selectLowercase && selectUppercase) {
    options = Lowercase.concat(Uppercase);
  }
  else if (selectNumber && selectUppercase) {
    options = Numbers.concat(Uppercase); S
  }

  // Else if for 1 Positive Option:
  else if (selectCharacter) {
    options = Characters;
  }
  else if (selectNumber) {
    options = Numbers;
  }
  else if (selectLowercase) {
    options = Lowercase;
  }
  else if (selectUppercase) {
    options = Uppercase;
  };


  // Password Variable is an Array Placeholder for User Generated Amount of Length:
  var password = [];


  // A For Loop to Select Random Variables: 
  for (var i = 0; i < input; i++) {
    var preferences = options[Math.floor(Math.random() * options.length)];
    password.push(preferences);
  }


  // This Joins the Password Array and Converts it to a String:
  var passwordText = password.join("");
  UserInput(passwordText);
  return passwordText;
}


// This function Puts the Password Outcome into the Textbox, Textcontent is Replaced with the Function Input:
function UserInput(passwordText) {
  document.getElementById("password").textContent = passwordText;
}


// END OF CODE //