const express = require("express")
const http = require("http")
const path = require("path")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const PORT = process.env.PORT || 8000

 
app.use(express.static(path.resolve("./public")))

let activePlayingPair = []
let playerQueue = []

io.on("connection", (socket) => {

    socket.on("find", (e) => {
        if(e.name != null){
            playerQueue.push({id: socket.id, playerName: e.name})
            if(playerQueue.length>=2){
                let player1 = {
                    id: playerQueue[0].id,
                    playerName: playerQueue[0].playerName,
                    symbol: "X",
                    move: ""
                }
                let player2 = {
                    id: playerQueue[1].id,
                    playerName: playerQueue[1].playerName,
                    symbol: "O",
                    move: ""
                }
                let playerPair = {player1, player2, sum:1}
                activePlayingPair.push(playerPair)
                playerQueue = []
                io.emit("find", activePlayingPair[activePlayingPair.length-1])
            }
        }
    })

    
    socket.on("playing", (e) => {
        let objToChange = activePlayingPair.find(playerPair => {
            return (playerPair.player1.id == socket.id || playerPair.player2.id == socket.id)
        })

        if(e.value == "X"){
            objToChange.player1.move = e.id
            objToChange.sum++
        }
        else if(e.value == "O"){
            objToChange.player2.move = e.id
            objToChange.sum++
        }
  
        io.emit("playing", objToChange)

    })

    socket.on("disconnect", ()=>{
        let disconnectedPlayerPair = activePlayingPair.find(playerPair => {
            return (playerPair.player1.id == socket.id || playerPair.player2.id == socket.id)
        })
        io.emit("disconnectedPlayerPair", disconnectedPlayerPair)
        activePlayingPair = activePlayingPair.filter(playerPair => {
            return (playerPair.player1.id != socket.id && playerPair.player2.id != socket.id)
        })
    })

    socket.on("gameOver", (e) => {
        activePlayingPair = activePlayingPair.filter(playerPair => {
            return (playerPair.player1.id != socket.id && playerPair.player2.id != socket.id)
        })
    })

})


app.get("/", (req, res) => {
    return res.sendFile("index.html");
})

server.listen(PORT, () => {
    console.log("Server connected at port ", PORT);
})
