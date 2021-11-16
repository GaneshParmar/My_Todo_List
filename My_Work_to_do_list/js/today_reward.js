// // global variables
// Reward container
// Beginner
var beginner_reward=document.getElementById("beginner");
var master_reward=document.getElementById("master");
var pro_reward=document.getElementById("pro");


// var del_popup=document.getElementById("delete_popup");

// if(localStorage.getItem("rewards")==null){
//     var rewards=[];
// }
// else{
//     // Rewards stored in local storage
//     var rewards=JSON.parse(localStorage.getItem("rewards"));
// }

// Function for storing which section is editing
function edit_section(section_name) {
    if(localStorage.getItem("reward_section")==null){
        localStorage.setItem("reward_section",section_name);
    }
    else{
        localStorage.setItem("reward_section",section_name);
    }
}


// Show reward
function show_reward(box,rwrd,type) {
    // 
    // This will check the type of reward youtube or other
    // 
    if(type=="yt"){
        box.innerHTML=`       
               <div>
                    <div class="lock">
                            <img src="./assests/lock.png" alt="" srcset="" width="200"/>
                    </div>
                </div>
                <a href="reward.html" class="edit" onclick="edit_section('b')"><img src="https://img.icons8.com/material-rounded/24/000000/edit.png" width="30"/></a>
                <iframe width="" height="300" src="https://www.youtube.com/embed/${rwrd[0]._img}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div class="reward_detail">
                    <div class="reward_name">
                        ${rwrd[0]._name}
                    </div>
                    <p class="description">
                        ${rwrd[0]._desp}
                    </p>
                </div> ` 
    }
    else{
        box.innerHTML=`
        <div>
        <div class="lock ">
                <img src="./assests/lock.png" alt="" srcset="" width="200"/>
        </div>
    </div>
    <a href="reward.html" class="edit" onclick="edit_section('b')"><img src="https://img.icons8.com/material-rounded/24/000000/edit.png" width="30"/></a>
    <img src="${rwrd[0]._img}" alt="">
    <div class="reward_detail">
        <div class="reward_name">
            ${rwrd[0]._name}
        </div>
        <p class="description">
            ${rwrd[0]._desp}
        </p>
    </div> `;
    }
}

// // Dynamically display the reward 

function display_rewards() {
    // Rewards stored in local storage
    // Displaying reward in beginner ,master,pro section respectively
    // beginner
    if(localStorage.getItem("beginner_rewards")!=null){
        var b_reward_data=JSON.parse(localStorage.getItem("beginner_rewards"));
        show_reward(beginner_reward,b_reward_data,b_reward_data[0]._type);
    }
    // master
    if(localStorage.getItem("master_rewards")!=null){
        var m_reward_data=JSON.parse(localStorage.getItem("master_rewards"));
        show_reward(master_reward,m_reward_data,m_reward_data[0]._type);
    }
    // pro
    if(localStorage.getItem("pro_rewards")!=null){
        var p_reward_data=JSON.parse(localStorage.getItem("pro_rewards"));
        show_reward(pro_reward,p_reward_data,p_reward_data[0]._type);
    }

    
}

// function show_delete_pop_up() {
//     del_popup.style.opacity="1";
//     setTimeout(() => {
//         del_popup.style.opacity="0";
//     }, 500);
// }


// function remove_this(btn_ele){
//     var updated_rewards=rewards;
//     rewards=[];
//     var remove_btns=document.getElementsByClassName("remove_btn");
//     for(var i=0;i<remove_btns.length;i++){
//         if(btn_ele==remove_btns[i]){
//             continue;
//         }
//         else{
//             rewards.push(updated_rewards[i]);
//         }
//     }
//     // Update local storage 
//     localStorage.setItem("rewards",JSON.stringify(rewards));

//     // Calling the display rewards function
//     // localStorage.removeItem("rewards");

//     // Show delete popup
//     show_delete_pop_up();

//     display_rewards();
// }

// function to see task completed to unlock reward
function unlock_reward(params) {
    if(localStorage.getItem("task_completed")!=null){
        var no_of_task_completed=JSON.parse(localStorage.getItem("task_completed"));
        if(no_of_task_completed>=5){
            document.getElementsByClassName("lock")[0].classList.add("hide");
            if(no_of_task_completed>=8){
                document.getElementsByClassName("lock")[1].classList.add("hide");
                if(no_of_task_completed>=12){
                    document.getElementsByClassName("lock")[2].classList.add("hide")
                }
            }
        }
        
    }
}



display_rewards();
unlock_reward();