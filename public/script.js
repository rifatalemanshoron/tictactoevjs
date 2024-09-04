    document.getElementById("loading").style.display = "none";
    document.getElementById("bigCont").style.display = "none";
    document.getElementById("userCont").style.display = "none";
    document.getElementById("oppNameCont").style.display = "none";
    document.getElementById("valueCont").style.display = "none";
    document.getElementById("whosTurn").style.display = "none";

    const socket = io();
    let name;

    document.getElementById("find").addEventListener("click", function () {
      name = document.getElementById("name").value;

      document.getElementById("user").innerText = name;

      if (name == null || name == "") {
        alert("Enter Name");
      } else {
        socket.emit("find", { name });
        document.getElementById("loading").style.display = "block";
        document.getElementById("find").disabled = true;
      }
    });


    socket.on("find", (playerPair) => {
      if((playerPair.player1.id == socket.id) || (playerPair.player2.id == socket.id)){
        document.getElementById("userCont").style.display = "block";
        document.getElementById("oppNameCont").style.display = "block";
        document.getElementById("valueCont").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("name").style.display = "none";
        document.getElementById("find").style.display = "none";
        document.getElementById("enterName").style.display = "none";
        document.getElementById("bigCont").style.display = "block";
        document.getElementById("whosTurn").style.display = "block";
        document.getElementById("whosTurn").innerText = "X's Turn";
  
        let oppName;
        let value;
  
        playerPair.player1.playerName == `${name}`? (oppName = playerPair.player2.playerName) : (oppName = playerPair.player1.playerName);
        playerPair.player2.playerName == `${name}`? (value = playerPair.player2.symbol) : (value = playerPair.player1.symbol);
  
        document.getElementById("oppName").innerText = oppName;
        document.getElementById("value").innerText = value;
        blockInput(
          document.getElementById("value").innerText,
          document.getElementById("whosTurn").innerText
        );
      }
    });



    document.querySelectorAll(".btn").forEach((el) => {
      el.addEventListener("click", () => {
        let value = document.getElementById("value").innerText;
        el.innerText = value;
        socket.emit("playing", { value, id: el.id, name });
      });
    });

 


    socket.on("playing", (e) => {
      if((e.player1.id == socket.id) || (e.player2.id == socket.id)){
        p1id = e.player1.move;
        p2id = e.player2.move;
  
        if (e.sum % 2 == 0) {
          document.getElementById("whosTurn").innerText = "O's Turn";
        } else {
          document.getElementById("whosTurn").innerText = "X's Turn";
        }
  
        if (p1id != "") {
          document.getElementById(`${p1id}`).innerText = "X";
          document.getElementById(`${p1id}`).disabled = true;
          document.getElementById(`${p1id}`).style.color = "black";
        }
        if (p2id != "") {
          document.getElementById(`${p2id}`).innerText = "O";
          document.getElementById(`${p2id}`).disabled = true;
          document.getElementById(`${p2id}`).style.color = "black";
        }
          blockInput(
          document.getElementById("value").innerText,
          document.getElementById("whosTurn").innerText
        );
        check(name, e.sum);
      }

    });

    socket.on("disconnectedPlayerPair", (e) => {
      if((e.player1.id == socket.id) || (e.player2.id == socket.id)){
        alert("Opponent Got Disconnected! Please refresh the page for new game")
      }
    })


    //Custom Functions
    function check(name, sum) {
      let b = [];
      for (let i = 1; i < 10; i++) {
        document.getElementById(`btn${i}`).innerText == ""
          ? (b[i - 1] = i)
          : (b[i - 1] = document.getElementById(`btn${i}`).innerText);
      }

      if (
        (b[0] == b[1] && b[1] == b[2]) ||
        (b[3] == b[4] && b[4] == b[5]) ||
        (b[6] == b[7] && b[7] == b[8]) || //Row Check
        (b[0] == b[3] && b[3] == b[6]) ||
        (b[1] == b[4] && b[4] == b[7]) ||
        (b[2] == b[5] && b[5] == b[8]) || //Cloumn Check
        (b[0] == b[4] && b[4] == b[8]) ||
        (b[2] == b[4] && b[4] == b[6])
      ) {
        socket.emit("gameOver", { name });

        setTimeout(() => {
          sum % 2 == 0 ? alert(`X is Winner`) : alert(`O is Winner`);
          setTimeout(() => {
            location.reload();
          }, 2000);
        }, 100);
      } else if (sum == 10) {
        socket.emit("gameOver", { name });

        setTimeout(() => {
          alert("Game Draw");
          setTimeout(() => {
            location.reload();
          }, 2000);
        }, 100);
      }
    }

    function blockInput(value, whosTurn) {
      if (
        (value == "X" && whosTurn == "X's Turn") ||
        (value == "O" && whosTurn == "O's Turn")
      ) {
        for (let i = 1; i < 10; i++) {
          if (document.getElementById(`btn${i}`).innerText == "") {
            document.getElementById(`btn${i}`).disabled = false;
          }
        }
      } else {
        for (let i = 1; i < 10; i++) {
          if (document.getElementById(`btn${i}`).innerText == "") {
            document.getElementById(`btn${i}`).disabled = true;
          }
        }
      }
    }