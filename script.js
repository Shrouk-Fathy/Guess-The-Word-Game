// Setting Game Name

let gameName = "Guess The Word";
document.title = gameName;

document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created by Shrouk`;

let words = ["SHROUK" , "YOUSEF" , "AHMED" , "OMAR" , "ALI" , "MONA" , "SHIMAA" , "LION" , "CHETA" , "MAI" , "HAMS"
    ,"SUN" , "FOX" , "MARWAN" , "NADA" , "HODA" , "SAMIR" , "MOON" , "BIRD"
];
// for(let i = 0 ; i < words.length ; i++){
//     for(let j = 0 ; j < words[i].length ; j++){

//        words.at(i).at(j) = words.at(i).at(j).toUpperCase();
      
//     }  
// }
// console.log(words);

let wordIndex = Math.floor(Math.random()*words.length);

console.log(words[wordIndex]);
let n_of_Tries = words[wordIndex].length;
let n_of_letters = words[wordIndex].length;
let currentTry = 1;

const TriesContainer = document.querySelector(".Tries");
function generateInput(){
    
    for(let i = 1 ; i <= n_of_Tries ; i++){
        
        const tryDiv = document.createElement("div");
        tryDiv.style.marginTop = "20px";
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span> Try ${i} </span>`;
        //append
        
        for(let j = 1 ; j <= n_of_letters ; j++){
            
            const input = document.createElement("input");
            input.type = "text";
            
            input.id = `guess-${i}-letter-${j}`;
            // input.classList.add("input");
            input.setAttribute("maxLength" , "1");
            
            tryDiv.append(input);
        }
        // console.log(words);
        if(i !== 1) tryDiv.classList.add("disabled");
        
        TriesContainer.append(tryDiv);
    }
    TriesContainer.children[0].children[1].focus();
    const disabledInput = document.querySelectorAll(".disabled input");
    disabledInput.forEach((e) => (e.disabled = true));

    const inputs = document.querySelectorAll("input");


    inputs.forEach((input , index) => {
        input.addEventListener("keydown" , (e) => {
            
            // if (e.keyCode === 8 || e.keyCode === 46) {
            //     e.target.value = "";          
            //     inputs[index].focus();
            // }
            if(e.keyCode === 37){
                if(inputs[index - 1]) inputs[index - 1].focus();
            }
            else if(e.keyCode === 39)
                if(inputs[index + 1]) inputs[index + 1].focus();
        });
    });
}



function handleGuesses(){
    let success = 0;
    

    inputs = document.querySelectorAll("input");
    // const TriesDiv = document.querySelectorAll("div");


    inputs.forEach((input , index) => {

        input.addEventListener("input" , (e) => {
       
     
            e.target.value = e.target.value.toUpperCase();       // this.value = this.value.toUpperCase();


            if(words[wordIndex].includes(e.target.value)){

                if(words[wordIndex].at(index%n_of_letters) ==  e.target.value){
                    
                        e.target.classList.add("in-place");
                        success++;
                    }
                    else{
                        e.target.classList.add("not-in-place");
                    }
            }
            else{
                e.target.classList.add("not-exist");
            }

            console.log(success);

            if(success == n_of_letters){
                document.querySelector(".btns").style.display = "none";
                document.querySelector(".message").style.color = "green";
                document.querySelector(".message").textContent = "Congrates You Win 😍👏";
            }
            else if(index == n_of_Tries*n_of_Tries - 1){
                document.querySelector(".btns").style.display = "none";
                document.querySelector(".message").textContent = "OOH OOH , You Lose 😩💔";
            }
            
            if(!((index + 1) % n_of_letters)){
                success = 0;
                currentTry++;
                document.querySelector(`.try-${currentTry}`).classList.remove("disabled");
                const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
                // console.log(nextTry);
                nextTryInputs.forEach((input) => {
                    input.disabled = false;
                    // input.pointerEvents = false;
                });
            }

            

            e.target.style.pointerEvents = "none";
            const nextInput = inputs[index + 1];
            if(nextInput)nextInput.focus();



        });
    });
    
}



window.onload = function(){
    generateInput();
    handleGuesses();
}