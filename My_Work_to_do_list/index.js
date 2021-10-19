
let date= new Date().getDate();
var today_task_list=[];
var tomorrow_task_list=[];

// For random Gif generator

var api="https://api.giphy.com/v1/gifs/random?";
var apikey="api_key=0UTRbFtkMxAplrohufYco5IY74U8hOes";
var tag="&tag=hurray&rating=pg-13";


function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

var url=api+apikey+tag;

function showCongratulation(ele) {
    var input_chk_box=ele.querySelector("#task");
    if(input_chk_box.disabled!=true){
        var data =JSON.parse(Get(url));
        document.querySelector("#congrats_greeter").style.display="block";
        var gif_url=data.data.images.original.url;    
        document.querySelector("#gif_show").style.background="url("+gif_url+") no-repeat center";
    } 
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
function dash_the_task(element){
    // let a=prompt("Are You serious ?");
    // var input_checkmark=element.id;
    // element.disabled=true;
    // document.getElementById().disabled = true;
    let li_select=element;
    // var parent_ele=element.parentElement.parentElement;
    var ul_id="#"+li_select.parentElement.id;
    console.log(ul_id);
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
    }
    
    // document.getElementById(li_select.id).style.opacity=0.4;
    // Get the index of the done task
    var index;
    for(var i=0;i<select_ul.length;i++){
        if(li_select==select_ul[i]){
            index=i;
        }
        else{
            continue;
        }
    }
    console.log(index);
    if (input_chk_box.checked==true){
        if(ul_id=="#tomorrows_works"){
            tomorrow_task_list=JSON.parse(localStorage.getItem("Tomorrow_Task_List"));
            tomorrow_task_list[index].task_done=1;
            console.log(tomorrow_task_list);
            localStorage.setItem("Tomorrow_Task_List",JSON.stringify(tomorrow_task_list));
        }
        else{
            today_task_list=JSON.parse(localStorage.getItem("Today_Task_List"));
            today_task_list[index].task_done=1;
            localStorage.setItem("Today_Task_List",JSON.stringify(today_task_list));
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
    var Tomorrow_tasks=JSON.parse(localStorage.getItem("Tomorrow_Task_List"));
    var Today_tasks=JSON.parse(localStorage.getItem("Today_Task_List"));

    console.log("Tommorrow_tasks are ",Tomorrow_tasks);
    console.log("Todays_tasks are ",Today_tasks);

    for(i in Today_tasks){
        console.log("The task no is ",i);
        if(Today_tasks[i].task_done==1){
            var li_list=document.querySelectorAll("#todays_works li");
            var input_box=li_list[i].querySelector("#task");
            tick_the_task(input_box);
            dash_the_task(li_list[i]);
        }
        else{
            var li_list=document.querySelectorAll("#todays_works li");
            var input_box=li_list[i].querySelector("#task");
            input_box.checked=false;
        }
    };

    for(i in Tomorrow_tasks){
        if(Tomorrow_tasks[i].task_done==1){
            var li_list=document.querySelectorAll("#tomorrows_works li");
            var input_box=li_list[i].querySelector("#task");
            tick_the_task(input_box);
            dash_the_task(li_list[i]);
        }
        else{
            var li_list=document.querySelectorAll("#tomorrows_works li");
            var input_box=li_list[i].querySelector("#task");
            input_box.checked=false;
        }
    }  ;  
}



function show_task_added(){
    var Tomorrow_tasks=JSON.parse(localStorage.getItem("Tomorrow_Task_List"));
    var Today_tasks=JSON.parse(localStorage.getItem("Today_Task_List"));
    var i;
    for(i in Today_tasks ){
        add_task("#todays_works",Today_tasks[i].task_name,Today_tasks[i].time_alloted);
    };
    for(i in Tomorrow_tasks){
        add_task("#tomorrows_works",Tomorrow_tasks[i].task_name,Tomorrow_tasks[i].time_alloted);          
    };
}

// Function for adding the task
function add_task(day,task) {
    var li_box=document.querySelector(`${day}`);
    li_box.innerHTML+=('beforeend','<li onclick="showCongratulation(this);dash_the_task(this);">\
    <span class="cheeck_container">\
        <input type="checkbox" name="task" id="task" value="done" "/>\
        <span class="done_checkmark"></span>\
    </span> \
    <label  id="task_name" class="">'+`${task}`+'</label>\
    <img src="https://img.icons8.com/color/48/000000/delete-forever.png" onclick="delete_task(this)" width="30" height="30"/>\
    </li>');
}


function show_task() {
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
    // document.getElementById().disabled = true;
    var parent_ele=element.parentElement;
    var ul_id="#"+parent_ele.parentElement.id;
    var select_ul=document.querySelectorAll(`${ul_id}`+" li");
    let li_select=parent_ele;
    // document.getElementById(li_select.id).style.opacity=0.4;
    // Get the index of the done task
    var index=0;
    
    document.getElementById("todays_works").innerHTML=" ";
    document.getElementById("tomorrows_works").innerHTML=" ";

    var temp_today=JSON.parse(localStorage.getItem("Today_Task_List"));
    var temp_tom=JSON.parse(localStorage.getItem("Tomorrow_Task_List"));

    var today_task_after_del=[];
    var tom_task_after_del=[];


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
        show_task_added();
    }
    else{
        for(var i=0;i<select_ul.length;i++){
            if(li_select==select_ul[i]){
                continue;
            }
            else{
                tom_task_after_del.push(temp_tom[i]);
            }

        } 
        localStorage.setItem("Tomorrow_Task_List",JSON.stringify(tom_task_after_del));       
        show_task_added();
    }
    Check_The_task_done();
    



    // if(ul_id=="#tomorrows_works"){
    //     var tomorrow_task_li=JSON.parse(localStorage.getItem("Tomorrow_Task_List"));
    //     if(index==0){
    //         tomorrow_task_li.shift();
    //     }
    //     else{
    //         tomorrow_task_li.splice(index,index);
    //         console.log(tomorrow_task_list);
    //     }
    //     localStorage.setItem("Tomorrow_Task_List",JSON.stringify(tomorrow_task_li));
    //     // show_task_added();
    // }
    // else{
    //     var today_task_li=JSON.parse(localStorage.getItem("Today_Task_List"));
    //     if(index==0){
    //         today_task_li.shift();
    //     }
    //     else{
    //         today_task_li.splice(index,index);
    //         console.log(today_task_li);
    //     }        
    //     localStorage.setItem("Today_Task_List",JSON.stringify(today_task_list));
    //     // show_task_added();
    // }
    
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


set_date_("#todays_date","#tomorrows_date");
local_storage_create();
Check_The_task_done();

