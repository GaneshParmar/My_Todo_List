let date= new Date().getDate();
var today_task_list=[];
var tomorrow_task_list=[];
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
    var ul_id="#"+parent_ele.parentElement.id;
    var select_ul=document.querySelectorAll(`${ul_id}`+" li");
    let li_select=parent_ele;
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

    if (element.checked==true){
        console.log("The element is checked");
        if(ul_id=="#tomorrows_works"){
            tomorrow_task_list=JSON.parse(localStorage.getItem("Tomorrow_Task_List"));
            tomorrow_task_list[index].task_done=1;
            localStorage.setItem("Tomorrow_Task_List",JSON.stringify(tomorrow_task_list));
        }
        else{
            today_task_list=JSON.parse(localStorage.getItem("Today_Task_List"));
            today_task_list[index].task_done=1;
            localStorage.setItem("Today_Task_List",JSON.stringify(today_task_list));
        }
    }
    else{
        console.log("The element is not checked");
        if(ul_id=="#tomorrows_works"){
            tomorrow_task_list=JSON.parse(localStorage.getItem("Tomorrow_Task_List"));
            tomorrow_task_list[index].task_done=0;
            localStorage.setItem("Tomorrow_Task_List",JSON.stringify(tomorrow_task_list));
        }
        else{
            today_task_list=JSON.parse(localStorage.getItem("Today_Task_List"));
            today_task_list[index].task_done=0;
            localStorage.setItem("Today_Task_List",JSON.stringify(today_task_list));
        }
    }    
    var task_name=parent_ele.querySelector("#task_name");
    task_name.classList.toggle("dashed");
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
            dash_the_task(input_box);
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
            dash_the_task(input_box);
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
        time_alloted:`${User_En_Time}`,
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
Check_The_task_done();

// For random Gif generator

$(document).ready(function() {
	// Initiate gifLoop for set interval
	var refresh;
	// Duration count in seconds
	// const duration = 1000 * 10;
	// Giphy API defaults
	const giphy = {
		baseURL: "https://api.giphy.com/v1/gifs/",
		apiKey: "0UTRbFtkMxAplrohufYco5IY74U8hOes",
		tag: "congratulation",
		type: "random",
		rating: "pg-13"
	};
	// Target gif-wrap container
	const $gif_wrap = $("#gif_show");
	// Giphy API URL
	let giphyURL = encodeURI(
		giphy.baseURL +
			giphy.type +
			"?api_key=" +
			giphy.apiKey +
			"&tag=" +
			giphy.tag +
			"&rating=" +
			giphy.rating
	);

	// Call Giphy API and render data
	var newGif = () => $.getJSON(giphyURL, json => renderGif(json.data));

	// Display Gif in gif wrap container
	var renderGif = _giphy => {
        console.log("Hello");
		console.log(_giphy);
		// Set gif as bg image
        console.log($gif_wrap);
		$gif_wrap.css({
			"background-image": 'url("' + _giphy.image_original_url + '")'
		});

		// Start duration countdown
		// refreshRate();
	};

	// Call for new gif after duration
	// var refreshRate = () => {
	// 	// Reset set intervals
	// 	clearInterval(refresh);
	// 	refresh = setInterval(function() {
	// 		// Call Giphy API for new gif
	// 		newGif();
	// 	}, duration);
	// };

	// Call Giphy API for new gif
	newGif();
	
	
	// const newGifButton = $('#new-gif');
	
	// newGifButton.click(newGif)
});

