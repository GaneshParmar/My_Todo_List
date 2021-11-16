// global variables
var reward_name=document.getElementById("reward_name");
// var reward_img=document.getElementById("img_address");
var reward_descp=document.getElementById("description");
var yt_reward=document.getElementById("youtube_sec");
var ot_reward=document.getElementById("other_sec");


// Video or other type
var video_id=document.getElementById("video_id");
var img_address=document.getElementById("img_address");

var pop_up=document.getElementById("pop_up");

// create localstorage
// function reward_localstorage(params) {
//     if(localStorage.getItem("rewards")==null){
//         localStorage.setItem("rewards","[]");
//     }
// }

localStorage.removeItem("rewards");


// Pop up 
function show_add_pop_up() {
    pop_up.style.opacity="1";
    setTimeout(() => {
        pop_up.style.opacity="0";
    },2000);
}


// Function for type selection
function reward_type(){
    var reward_type=document.querySelector("input[name='type']:checked").value;
    if(reward_type=="yt"){        
        yt_reward.classList.remove("hide");
        ot_reward.classList.add("hide");        
    }
    else{
            ot_reward.classList.remove("hide");
            yt_reward.classList.add("hide");
        }
    }

var reward_list=[];


// reward info store
function _reward(_type,_address) {
    var reward=
    {
        _name:reward_name.value,
        _desp:reward_descp.value,
        _type:_type,
        _img:_address
    }
    reward_list.push(reward);

}



// add reward function
function add_reward(params) {
    // console.log("helo");
    if (yt_reward.classList.contains('hide')) {
        // console.log("other is selected");
        _reward("other",img_address.value);
    }
    else{
        // console.log("yotube is selected");
        _reward("yt",video_id.value);
    }

    if(localStorage.getItem("reward_section")=='b'){
        // console.log("helo");
        if(localStorage.getItem("beginner_rewards")==null){
            localStorage.setItem("beginner_rewards",JSON.stringify(reward_list));
        }
        else{
            localStorage.setItem("beginner_rewards",JSON.stringify(reward_list));
        }
    }
    else if(localStorage.getItem("reward_section")=='m'){
        // console.log("helo");
        if(localStorage.getItem("master_rewards")==null){
            localStorage.setItem("master_rewards",JSON.stringify(reward_list));
        }
        else{
            localStorage.setItem("master_rewards",JSON.stringify(reward_list));
        }
    }

    else{
        // console.log("helo");
        if(localStorage.getItem("pro_rewards")==null){
            localStorage.setItem("pro_rewards",JSON.stringify(reward_list));
        }
        else{
            localStorage.setItem("pro_rewards",JSON.stringify(reward_list));
        }
        
    }
    reward_list=[];
    // Clear all inputs
    document.querySelectorAll("input").forEach(input => {
        input.value="";
    }); 
    location.href = '../today_reward.html';


    // if(reward_name.value=="" || reward_descp.value==""){
    //     alert("Enter both name and description");
    // }
    // else{
    //     var rewards=JSON.parse(localStorage.getItem("rewards"));
    //     var reward={
    //         _name:"",
    //         _img:"",
    //         _descp:"",
    //         _unlocked:"0"
    //     };
    //     reward._name=reward_name.value;
    //     reward._img=reward_img.value;
    //     reward._descp=reward_descp.value;
    //     rewards.push(reward);
    //     // Update local storage
    //     localStorage.setItem("rewards",JSON.stringify(rewards));
    //     show_add_pop_up();
    // }
}

// reward_localstorage();
// localStorage.removeItem("beginner_rewards");
// localStorage.removeItem("master_rewards");
// localStorage.removeItem("pro_rewards");