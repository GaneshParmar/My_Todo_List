
let date= new Date().getDate();
var today_task_list=[];
var tomorrow_task_list=[{task_name: 'Get Up Early', task_done: 0},{task_name: 'Do Yoga', task_done: 0}];
var del_popup=document.getElementById("delete_popup");
var reward_options=document.querySelector("#rewards_list");
// Loading the audio
const done_audio=new Audio('./audio/done.wav');

// Selecting p tag to show no of task completed
var tasks_p=document.getElementById("tasks_done");

if(localStorage.getItem("rewards")!=null){
    var reward_stored=JSON.parse(localStorage.getItem("rewards"));
}


// For random Gif generator

var api="https://api.giphy.com/v1/gifs/random?";
var apikey="api_key=0UTRbFtkMxAplrohufYco5IY74U8hOes";
var tag="&tag=fails&rating=pg-13";


function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

var url=api+apikey+tag;

function showCongratulation(ele) {
    // var input_chk_box=ele.querySelector("#task");
    var data =JSON.parse(Get(url));
    document.querySelector("#congrats_greeter").style.display="block";
    var gif_url=data.data.images.original.url;    
    document.querySelector("#gif_show").style.background="url("+gif_url+") no-repeat center";
    
}
function close_Congrats() {
    document.querySelector("#congrats_greeter").style.display="none";
}


function set_date_(today_id,tom_id) {
    let date= new Date();

    // Options for setting the date format in mm/dd/year etc
    const options={weekday:"long",month:"short",day:"numeric"};

    let today_date=date.toLocaleString('en',options);
    document.querySelector(today_id).innerHTML=today_date;
    // for getting tomorrow's date I used the getTime function to get time after that added 24 hours converted it into miliseconds //
    var tom_date = new Date(date.getTime() + (24 * 60 * 60 *1000 ));
    var tom_date=tom_date.toLocaleString('en',options);
    document.querySelector(tom_id).innerHTML=tom_date;
}
// let  temp=0;
function dash_the_task(element,show_congratuation=true){
    // console.log('in dash');
    // let a=prompt("Are You serious ?");
    // var input_checkmark=element.id;
    // element.disabled=true;
    // document.getElementById().disabled = true;
    let li_select=element;
    // var parent_ele=element.parentElement.parentElement;
    var ul_id="#todays_works";
    // console.log(ul_id);
    var select_ul=document.querySelectorAll(`${ul_id}`+" li");
    
    // Disable the checkbox
    var input_chk_box=li_select.querySelector("#task");
    if(input_chk_box.disabled!=true){
        input_chk_box.checked=true;
        input_chk_box.disabled=true;
        var task_name=li_select.querySelector("#task_name");
        // task_name.style.color="rgba(0, 0, 0, 0.2) !important";
        task_name.classList.toggle("dashed");
        li_select.classList+="animation";
        li_select.querySelector("#show_done").classList+="task_done";
         
        no_of_task_done(); 
        show_task_no_cmplted();
        if(show_congratuation){
            setTimeout(() => {
                done_audio.play();
                showCongratulation(element);     
            }, 500);
        }
    }
    
    // document.getElementById(li_select.id).style.opacity=0.4;
    // Get the index of the done task
    var index=null;
    for(var i=0;i<select_ul.length;i++){
        if(li_select==select_ul[i]){
            index=i;
        }
        else{
            continue;
        }
    }
    // console.log(index);
    if (input_chk_box.checked==true){
        if(ul_id=="#tomorrows_works"){
            tomorrow_task_list=JSON.parse(localStorage.getItem("Tomorrow_Task_List"));
            tomorrow_task_list[index].task_done=1;
            localStorage.setItem("Tomorrow_Task_List",JSON.stringify(tomorrow_task_list));
        }
        else{
            if(index!=null){
                today_task_list=JSON.parse(localStorage.getItem("Today_Task_List"));
                // console.log(today_task_list);
                today_task_list[index].task_done=1;
                localStorage.setItem("Today_Task_List",JSON.stringify(today_task_list));
                
            }           
        }
    }  
    

}



// Local storage create
function local_storage_create() {
    // This is for the localstorage not set yet
    if(localStorage.getItem("Today_Task_List")==null && localStorage.getItem("Tomorrow_Task_List")==null){
        localStorage.setItem("Today_Task_List",JSON.stringify(today_task_list));
        localStorage.setItem("Tomorrow_Task_List",JSON.stringify(tomorrow_task_list));
    }
    else{
        if(localStorage.getItem("Date")==null){
            localStorage.setItem("Date",JSON.stringify(date));
        }
        else{
            check_date_change();
        }
        show_task_added();
    }
}


// For swapping the tasks
function check_date_change() {
    if(JSON.parse(localStorage.getItem("Date"))!=date){
        localStorage.setItem("Date",JSON.stringify(date));
        var todays_works=localStorage.getItem("Tomorrow_Task_List");
        localStorage.setItem("Today_Task_List",todays_works);
        localStorage.setItem("Tomorrow_Task_List",JSON.stringify([]))
        // show_task_added();
    }
}

// Function for ticking the input
function tick_the_task(input_box) {
    input_box.checked=true;
}




function Check_The_task_done() {
    // var Tomorrow_tasks=JSON.parse(localStorage.getItem("Tomorrow_Task_List"));
    var Today_tasks=JSON.parse(localStorage.getItem("Today_Task_List"));

    // console.log("Tommorrow_tasks are ",Tomorrow_tasks);
    // console.log("Todays_tasks are ",Today_tasks);

    for(var i=0;i<Today_tasks.length;i++){
        // console.log("The task no is ",i);
        if(Today_tasks[i].task_done==1){
            var li_list=document.querySelectorAll("#todays_works li");
            var input_box=li_list[i].querySelector("#task");
            tick_the_task(input_box);
            dash_the_task(li_list[i],false);
        }
        else{
            var li_list=document.querySelectorAll("#todays_works li");
            var input_box=li_list[i].querySelector("#task");
            input_box.checked=false;
        }
    };

    // for(i in Tomorrow_tasks){
    //     if(Tomorrow_tasks[i].task_done==1){
    //         var li_list=document.querySelectorAll("#tomorrows_works li");
    //         var input_box=li_list[i].querySelector("#task");
    //         tick_the_task(input_box);
    //         dash_the_task(li_list[i],false);
    //     }
    //     else{
    //         var li_list=document.querySelectorAll("#tomorrows_works li");
    //         var input_box=li_list[i].querySelector("#task");
    //         input_box.checked=false;
    //     }
    // }  ;  
}


function show_task_added(del=false){
    var Tomorrow_tasks=JSON.parse(localStorage.getItem("Tomorrow_Task_List"));
    var Today_tasks=JSON.parse(localStorage.getItem("Today_Task_List"));
    // console.log(Today_tasks);
    if(del){
        document.querySelector("#tomorrows_works").innerHTML="<div class='lock'>\
        <img src='./assests/lock.png' alt='' srcset='' width='200'/>\
        <h5>Unlock Tommorrow</h5>\
    </div>";
    }    
    document.querySelector("#todays_works").innerHTML="";
    var i=0;
    for(i in Today_tasks ){
        add_task("#todays_works",Today_tasks[i].task_name,Today_tasks[i].time_alloted);
    };
    // console.log(i);
    i=0
    for(i in Tomorrow_tasks){
        add_task("#tomorrows_works",Tomorrow_tasks[i].task_name,Tomorrow_tasks[i].time_alloted);          
    };
}

// Function for adding the task
function add_task(day,task) {
    var li_box=document.querySelector(`${day}`);
    li_box.innerHTML+=('beforeend','<li onclick="dash_the_task(this);">\
    <div id="show_done" class="">Done!</div>\
    <span class="cheeck_container">\
        <input type="checkbox" name="task" id="task" value="done" "/>\
        <span class="done_checkmark"></span>\
    </span> \
    <label  id="task_name" class="">'+`${task}`+'</label>\
    <img src="https://img.icons8.com/color/48/000000/delete-forever.png" onclick="delete_task(this);" width="30" height="30"/>\
    </li>');
}


function show_task() {
    // console.log(document.querySelector("#task_enter").value);
    // var today_work_li=document.querySelector("#today_works");
    var User_En_Task=document.querySelector("#task_enter").value;
    // var User_En_Time=document.querySelector("#time_").value;
    var User_En_Day=document.querySelector("input[name='day_select']:checked").value;
    if(localStorage.getItem("Today_Task_List")==null && localStorage.getItem("Tomorrow_Task_List"==null)){
        localStorage.setItem("Today_Task_List",JSON.stringify(today_task_list));
        localStorage.setItem("Tomorrow_Task_List",JSON.stringify(tomorrow_task_list));
    }
    else{
        tomorrow_task_list=JSON.parse(localStorage.getItem("Tomorrow_Task_List"));
        today_task_list=JSON.parse(localStorage.getItem("Today_Task_List"));
    }
    var task = {
        task_name:`${User_En_Task}`,
        // time_alloted:`${User_En_Time}`,
        task_done:0
    };
    if(User_En_Day=="#tomorrows_works"){
        tomorrow_task_list.push(task);
    }
    else{
        today_task_list.push(task);
    }
    localStorage.setItem("Today_Task_List",JSON.stringify(today_task_list));
    localStorage.setItem("Tomorrow_Task_List",JSON.stringify(tomorrow_task_list));

    if(User_En_Task==""|| User_En_Day==""){
        alert("Enter both the values");
    }
    else{
        // alert("You have entered task "+User_En_Task+" and the time is "+User_En_Time+" You have to complete task "+User_En_Day);
        // today_work_li.insertAdjacentHTML(3,task_li)
        add_task(User_En_Day,User_En_Task);
    }
    location.reload();
}


function delete_task(element){
    show_delete_pop_up();

    // document.getElementById().disabled = true;
    var parent_ele=element.parentElement;
    var ul_id="#"+parent_ele.parentElement.id;
    var select_ul=document.querySelectorAll(`${ul_id}`+" li");
    let li_select=parent_ele;
    li_select.querySelector("input").disabled=true;
    // document.getElementById(li_select.id).style.opacity=0.4;
    // Get the index of the done task
    var index=0;
    
    // document.getElementById("todays_works").innerHTML=" ";

    var temp_today=JSON.parse(localStorage.getItem("Today_Task_List"));
    // var temp_tom=JSON.parse(localStorage.getItem("Tomorrow_Task_List"));

    var today_task_after_del=[];


    if(ul_id=="#todays_works"){
        for(var i=0;i<select_ul.length;i++){
            if(li_select==select_ul[i]){
                continue;
            }
            else{
                today_task_after_del.push(temp_today[i]);
            }
        }
        localStorage.setItem("Today_Task_List",JSON.stringify(today_task_after_del));
        show_task_added(true);
    }
    Check_The_task_done();
    
}


function show_form(btn,text,ele) {
    var add_task_form=document.getElementById(ele);
    add_task_form.classList.toggle('hide');
    var text_box=document.getElementById(text);
    if(add_task_form.className!="hide")
    {
        text_box.style.transform="rotateZ(45deg)";
        btn.style.background="#ff412f";
        document.getElementById("blurr_bg").style.display="block";
        // btn.style.color="red";
    }
    else{
        text_box.style.transform="rotateZ(0deg)";
        btn.style.background="#5fa9e0";
        document.getElementById("blurr_bg").style.display="none";
        // btn.style.color="white";
    }
}
var menu=document.getElementById("nav_items");

function show_menu(params) {
     // Move the nav right by 0%
     menu.style.display="flex";
     window.onscroll = () => { window.scroll(0, 0); };
     setTimeout(() => {
         menu.style.right="0%";
        }, 100);
    
       
}
function close_menu(params) {
    // Move the nav right by 0%
    menu.style.right="-100%";
    window.onscroll = () => { };
    setTimeout(() => {
        menu.style.display="none";
    }, 200);
}

// Update 1.2
// Updated selection of award while adding task

function update_task_completed(params) {
    var no_of_task_completed=document.querySelectorAll("input[type='checkbox']:checked").length;
    localStorage.setItem("task_completed",JSON.stringify(no_of_task_completed));
}


function no_of_task_done() {
    if(localStorage.getItem("task_completed")==null){
        update_task_completed();
    }
    else{
        update_task_completed();
    }
}

function show_task_no_cmplted() {
    tasks_p.innerText=JSON.parse(localStorage.getItem("task_completed"));
}

function show_delete_pop_up() {
    del_popup.style.opacity="1";
    setTimeout(() => {
        del_popup.style.opacity="0";
    }, 500);
}


// End

// localStorage.removeItem("Today_Task_List");
// localStorage.removeItem("Tomorrow_Task_List");
local_storage_create();
set_date_("#todays_date","#tomorrows_date");
Check_The_task_done();
no_of_task_done();
show_task_no_cmplted();
// delete_task(document.querySelector("li"));
// show_rewards_option();
