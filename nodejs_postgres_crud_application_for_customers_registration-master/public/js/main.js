function addUser() {

  window.location.href = '/customers/add';
}

function cancelAdd() {

  window.location.href = '/customers';
}

// function showReport() {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       console.log(this.responseText);
//       //showResponse(this.responseText);
//       showintable(this.responseText);
//     }
//   };
//   xhttp.open("GET", "http://localhost:4000/getJson", true);
//   xhttp.send();
// }

// function showResponse(user) {
//   var obj = JSON.parse(user);
//   console.log(obj)
//   var d1 = document.createElement('div');
//   d1.innerHTML = obj.id;
//   var d2 = document.createElement('div');
//   d2.innerHTML = obj.name;

//   document.getElementById("show-report").appendChild(d1);
//   document.getElementById("show-report").appendChild(d2);
// }
// function showintable(user) {
//   var obj = JSON.parse(user);
//   console.log(obj);
//   var table = document.createElement("TABLE");
//   table.setAttribute("id", "TABLE");
//   table.setAttribute("border", "2");

//   var tr = document.createElement("TR");
//   tr.setAttribute("id", "TR");

//   var td = document.createElement("TD");
//   var c = document.createTextNode("cell");
//   c.data = obj.id;
//   td.appendChild(c);
//   //td.nodeValue = obj.id;

//   var td1 = document.createElement("TD");
//   //td1.nodeValue = obj.name;
//   var c1 = document.createTextNode("cell");
//   c1.data = obj.name;
//   td1.appendChild(c1);

//   tr.appendChild(td);
//   tr.appendChild(td1);

//   table.appendChild(tr);
//   document.getElementById("show-report").appendChild(table);

// }