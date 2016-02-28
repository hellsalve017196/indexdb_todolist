var server;


/*     events      */
var delete_table = function(w_id) {
	
	server.work.remove(w_id).then(function(key) {
		load_table();
	});

}

var Insert_data = function() {
	
	work_div = document.getElementById("work_name");
	time_div = document.getElementById("work_date");

	if(work_div.value != '' && time_div != '')
	{
		try {
			server.work.add(
			{
				'work_name' : work_div.value,
				'time' : time_div.value
			}
			).then(function(key) {
				work_div.value = "";
				time_div.value = "";


				load_table();
			});
		}
		catch(e) {
			console.log(e);
		}
	}
	else {
		alert("empty")
	}

}

var load_table = function() {
	server.work.query().
		all().
		desc().
		execute().
		then(function(res) {

			if(res.length > 0) {
				str = "<table border='1'>";

				str = str + "<tr><td>Work Id</td><td>Work Name</td><td>time</td><td>Delete</td></tr>";

				for(var i = 0; i < res.length ;i++) 
				{
					str = str + "<tr><td>"+res[i]["w_id"]+"</td> <td>"+res[i]["work_name"]+"</td> <td>"+res[i]["time"]+"</td> <td><button onclick='delete_table("+res[i]["w_id"]+")'>Delete</button></td></tr>";
				}

				str = str + "</table>";

				document.getElementById("res").innerHTML = str;
			}
			else {
				document.getElementById("res").innerHTML = "<h1>Empty Table</h1>";
			}

		});
}


document.getElementById("add").addEventListener("click",Insert_data,false);
/*     events      */


var setting_server = function(s) {
	server = s;

	load_table();
}


var loading_page = function(func) {

	db.open({
		server : "todoList-App",
		version : 1,
		schema : {
			work : {
				key : {
					keyPath : 'w_id',
					autoIncrement : true
				},
				indexes : {
					work_name : {},
					time : {unique : true}
				}
			}
		}
	}).then(function(s) {
			func(s);
	});

}


loading_page(setting_server);