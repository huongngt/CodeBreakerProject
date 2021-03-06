let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value == "" || attempt.value == "" ){
        setHiddenFields()
    }

    var bestCurrent = getBestResult();
    setBestResult(bestCurrent);
    
    if(!validateInput(input.value)){
        return false;        
    }
    else{
        attempt.value ++;
    }

    if(getResults(input.value)){
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
        setBestResult(attempt.value);
    }
    else if(attempt.value >= 10 ){
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    }
    else{
        setMessage("Incorrect, try again.");
    }

}

//implement new functions here
function setHiddenFields(){
    attempt.value = 0;
    answer.value = Math.floor(Math.random()*10000);
    while(answer.value.length < 4){
        answer.value = 0 + answer.value.toString();
    }
}

function setMessage(para){
    document.getElementById("message").innerHTML = para;
}

function validateInput(para){
    if (para.length == 4 ){
        return true;
    }
    else {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}

function getResults(para){   
    var result="<div class=\"row\"><span class=\"col-md-6\">" + para + "</span><div class=\"col-md-6\">";       
    for(var i = 0; i < para.length; i ++){
        
        if (para.charAt(i) == answer.value.charAt(i)){
            result += "<span class=\"glyphicon glyphicon-ok\"></span>";
        }
        else if (answer.value.indexOf(para.charAt(i)) != -1){
            result += "<span class=\"glyphicon glyphicon-transfer\"></span>";
        }
        else{
            result += "<span class=\"glyphicon glyphicon-remove\"></span>";
        }
    }
    result += "</div>";
    document.getElementById("results").innerHTML += result;
    if (para == answer.value){
        return true;
    }
    else {
        return false;
    }
}

function showAnswer(para){
    document.getElementById("code").innerHTML = answer.value;

    if(para == true){
        document.getElementById("code").className += " success";
    }
    else{
        document.getElementById("code").className += " failure";
    }
}

function showReplay(){
    document.getElementById("guessing-div").style.display = "none";
    document.getElementById("replay-div").style.display = "block";
}

function setBestResult(para){
    var bestCurrent = getBestResult();
    if (para < bestCurrent){
        bestCurrent = para;
        localStorage.setItem("bestResult", para);
    }
    document.getElementById("bestResult").innerHTML=bestCurrent.toString();
}

function getBestResult(){
    var bestCurrent = localStorage.getItem("bestResult");
    if (bestCurrent == undefined)
    {
        return 10;
    }
    else return bestCurrent
}