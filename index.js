let url = "https://643d0774f0ec48ce904fcb4e.mockapi.io/todo";

const readline = require("readline-sync");

//#region Options

const options = [
  "Get Todos",
  "Get No Completed Todos",
  "Complete Todo",
  "Add Todo",
  "Delete Todo",
];

//#endregion

Main();

//#region Main Function

async function Main() {
  let answer = readline.keyInSelect(options);
  answer++;
  switch (answer) {
    case 1:
      await GetTodos();
      break;
    case 2:
      await GetNotCompletedTodos();
      break;
    case 3:
      await PatchTodo();
      break;
    case 4:
      await PostTodo();
      break;
    case 5:
      await DeleteTodo();
      break;
    case 0:
      break;
    default:
      console.log("Select proper answer");
      break;
  }
  Main();
}

//#endregion

//#region Get Todos

async function GetTodos() {
  let response = await fetch(url);
  let data = await response.json();
  console.log("data", data);
}

//#endregion

//#region Get Not Complated Todos

async function GetNotCompletedTodos() {
  let response = await fetch(url);
  let data = await response.json();
  let filterData = data.filter((item) => !item.completed);
  console.log(filterData);
}

//#endregion

//#region Post Todo

async function PostTodo() {
  let title = readline.question("Title: ");
  let isCompleted = readline.question("Is Completed: ");

  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      completed: (isCompleted = false),
    }),
  });
  let data = await response.json();
  console.log(data, "data");
}

//#endregion

//#region Delete Todo

async function DeleteTodo() {
  let id = readline.question("Id: ");
  let response = await fetch(url + "/" + id, {
    method: "DELETE",
  });
  let data = await response.json();
  console.log(data, "data");
}

//#endregion

//#region Patch Todo

async function PatchTodo() {
  let id = readline.question("Id: ");
  let response = await fetch(url + "/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: true,
    }),
  });
  let data = await response.json();
  console.log(data, "data");
}

//#endregion
