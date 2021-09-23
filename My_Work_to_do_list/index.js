let date= new Date().getDate();
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
    var parent_ele=element.parentElement.parentElement;
    var task_name=parent_ele.querySelector("#task_name");
    task_name.classList.toggle("dashed");
}

var today_task_list=[];
var tomorrow_task_list=[];

// Local storage create
function local_storage_create() {
    if(localStorage.getItem("Today_Task_List")==null && localStorage.getItem("Tomorrow_Task_List")==null){
        console.log("I am in!!")
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
        console.log("Done!!:)");
        localStorage.setItem("Date",JSON.stringify(date));
        var todays_works=localStorage.getItem("Tomorrow_Task_List");
        localStorage.setItem("Today_Task_List",todays_works);
        localStorage.setItem("Tomorrow_Task_List",JSON.stringify([]))
        // show_task_added();
    }
}


function show_task_added(){
    var Tomorrow_tasks=JSON.parse(localStorage.getItem("Tomorrow_Task_List"));
    console.log(Tomorrow_tasks);
    var Today_tasks=JSON.parse(localStorage.getItem("Today_Task_List"));
    console.log(Today_tasks);
    var i;
    for(i in Today_tasks ){
        console.log(i);
        add_task("#todays_works",Today_tasks[i].task_name,Today_tasks[i].time_alloted);
    };
    for(i in Tomorrow_tasks){
        console.log(i);
        add_task("#tomorrows_works",Tomorrow_tasks[i].task_name,Tomorrow_tasks[i].time_alloted);  
    };
}

// Function for adding the task
function add_task(day,task,time) {
    
    var li_box=document.querySelector(`${day}`);
    li_box.innerHTML+=('beforeend','<li>\
    <span class="cheeck_container">\
        <input type="checkbox" name="task" id="task" value="done" onclick="new dash_the_task(this)"/>\
        <span class="done_checkmark"></span>\
    </span> \
    <label  id="task_name" class="">'+`${task}`+'</label>\
    <p><img src="https://img.icons8.com/ios-glyphs/30/000000/time--v2.png" width="20" height="20"/>~'+`${time}`+'</p>\
    <img src="https://img.icons8.com/color/48/000000/delete-forever.png" width="30" height="30"/>\
    </li>');
}


function show_task() {
    // var today_work_li=document.querySelector("#today_works");
    var User_En_Task=document.querySelector("#task_enter").value;
    var User_En_Time=document.querySelector("#time_").value;
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
        time_alloted:`${User_En_Time}`
    };
    if(User_En_Day=="#tomorrows_works"){
        console.log("I am in Tomorrow");
        tomorrow_task_list.push(task);
    }
    else{
        console.log("I am in Today");
        today_task_list.push(task);
    }
    console.log(today_task_list);
    console.log(tomorrow_task_list);
    localStorage.setItem("Today_Task_List",JSON.stringify(today_task_list));
    localStorage.setItem("Tomorrow_Task_List",JSON.stringify(tomorrow_task_list));

    if(User_En_Task=="" || User_En_Time=="" || User_En_Day==""){
        alert("Enter both the values");
    }
    else{
        // alert("You have entered task "+User_En_Task+" and the time is "+User_En_Time+" You have to complete task "+User_En_Day);
        // today_work_li.insertAdjacentHTML(3,task_li)
        add_task(User_En_Day,User_En_Task,User_En_Time);
    }
}


set_date_("#todays_date","#tomorrows_date");
local_storage_create();