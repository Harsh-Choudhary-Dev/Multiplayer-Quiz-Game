const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const question_count = 3;
let game_code
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const server = http.createServer(app);
const io = new Server(server);
let questions = {};
const mysql = require("mysql2");
const { resolve } = require("url");
const { Console } = require("console");
function DB_connections(db_name) {
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "harsh",
    database: db_name,
  });
  return con;
}

function get_questionCount() {
  const con = DB_connections("neet");

  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) {
        reject(err);
        return; // Exit the function early in case of error
      }

      console.log("Connected!");
      con.query(
        "SELECT COUNT(image_id) FROM image_questions;",
        (err, result, fields) => {
          con.end();

          if (err) {
            reject(err);
            return;
          }

          console.log("table data");
          console.log(result[0]["COUNT(image_id)"]);
          const total_questions = result[0]["COUNT(image_id)"];
          resolve(total_questions);
        }
      );
    });
  });
}

function inserPlayerName(player_name, db_code) {
  const con = DB_connections("temp_db");
  return new Promise((resolve) => {
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      con.query(
        `INSERT into user_list(username,db_code) values("${player_name}",${db_code})`,
        (err, result, fields) => {
          // console.log("data inserted")
          resolve("done");
          if (err) throw err;
        }
      );
    });
  });
}
function getPlayerName(db_code) {
  const con = DB_connections("temp_db");
  return new Promise((resolve) => {
    con.connect(function (err) {
      if (err) throw err;
      // console.log("Connected!");
      con.query(
        `select username from user_list where db_code=${db_code}`,
        (err, result, fields) => {
          resolve(result);
          if (err) throw err;
        }
      );
    });
  });
}
function getPlayerResult(db_code) {
  const con = DB_connections("temp_db");
  return new Promise((resolve) => {
    con.connect(function (err) {
      if (err) throw err;
      // console.log("Connected!");
      con.query(
        `select * from result where game_code=${db_code}`,
        (err, result, fields) => {
          resolve(result);
          if (err) throw err;
        }
      );
    });
  });
}

function insertData(table_name, ques_id) {
  const con = DB_connections("temp_db");
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(
      `insert into ${table_name}(image_id) values(${ques_id})`,
      (err, result, fields) => {
        console.log("table created");
        // console.log(result);
        if (err) throw err;
      }
    );
  });
}

function insertPlayerResult(playerResult) {
  const con = DB_connections("temp_db");
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(
      `insert into result (username,game_code,wrong_count,correct_count) values("${playerResult["player_name"]}",${playerResult["game_code"]},${playerResult["wrong_ans"]},${playerResult["correct_ans"]})`,
      (err, result, fields) => {
        console.log("table created");
        console.log(result);
        if (err) throw err;
      }
    );
  });
}

function get_quesIDs(table_name) {
  const con = DB_connections("temp_db");
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(`select * from ${table_name}`, (err, result, fields) => {
      console.log("table created");
      console.log(result);
      if (err) throw err;
    });
  });
}

function get_question_ids(ques_no) {
  const con = DB_connections("neet");
  let image_data;
  return new Promise((resolve) => {
    con.connect(function (err) {
      if (err) throw err;
      // console.log("Connected!");
      con.query(
        `select question_image,ans_id from image_questions where image_id=${ques_no}`,
        (err, result, fields) => {
          con.end();
          if (err) throw err;
          image_data = result[0];
          resolve(image_data);
        }
      );
    });
  });
}

function createQuesJSON() {
  let image_questions = new Object();
  let i = 0;
  return new Promise((resolve) => {
    feed_question_array().then((items) => {
      items.forEach((item) => {
        get_question_ids(item).then((image_data) => {
          image_questions[(i += 1)] = image_data;
          // console.log(image_questions)
          if (Object.keys(image_questions).length === question_count) {
            // console.log(image_questions)
            resolve(image_questions);
          }
        });
      });
    });
  });
}

io.on("connection", (socket) => {
  socket.on("player-name", (message) => {
    // console.log(message)
    inserPlayerName(message["player_name"], message["db_code"]).then(() => {
      getPlayerName(message["db_code"]).then((player_list) => {
        // console.log(player_list)
        io.emit("player-name", player_list);
      });
    });
  });
  socket.on("gameStatus", (message) => {
    console.log(message["gameStatus"]);
    if (message["gameStatus"] === "started") {
      console.log("started");
      io.emit("gameStatus", { gameStatus: "started" });
    }
  });
});

function feed_question_array() {
  const ques_no = new Set();
  return new Promise((resolve) => {
    get_questionCount().then((count) => {
      // console.log(count)
      while (!(ques_no.size === question_count)) {
        let rand = Math.floor(Math.random() * count) + 1;
        ques_no.add(rand);
      }

      resolve(ques_no);
    });
  });
}


createQuesJSON().then((result) => {
  app.get("/questions", (req, res) => res.json(result));
});

app.get("/result", (req, res) => {
  insertPlayerResult(req.query)
  game_code = (req.query.game_code)
});


app.use(express.static("public"));


app.get("/getResult", (req, res) =>{
  console.log(req.query)
      game_code = (req.query.game_code)
      console.log(game_code)
      getPlayerResult(game_code).then(result => res.json(result))

    });



server.listen(3000, () => {
  console.log("localhost:3000");
});
