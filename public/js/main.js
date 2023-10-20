// Copyright (c) 2023 Algorealm, Inc.

function qs(tag) {
    return document.querySelector(tag);
}

function qsa(tag) {
    return document.querySelectorAll(tag);
}

function ce(tag) {
    return document.createElement(tag);
}


function appear(attr) {
    qs(attr).classList.remove("hidden");
}

function hide(attr) {
    if (!qs(attr).classList.contains("hidden"))
        qs(attr).classList.add("hidden");
}

function addClasses(element, classNamesToAdd) {
    // Check if the element exists and is valid
    if (element) {
        // Get the current class attribute and split it into an array of class names
        const currentClassList = element.classList;

        // Iterate through the class names to be added
        for (const className of classNamesToAdd) {
            // Check if the className is not already in the current class list
            if (!currentClassList.contains(className)) {
                // Add the className to the element's class list 
                element.classList.add(className);
            }
        }
    }
}

function removeClasses(element, classNamesToRemove) {
    if (element && element.classList && classNamesToRemove.length > 0) {
        // Remove each class name from the element's class list
        classNamesToRemove.forEach(className => {
            element.classList.remove(className);
        });
    }
}

// capture and react to all click actions
document.body.addEventListener(
    "click",
    (e) => {
        e = e.target;
        if (e.classList.contains("to-did-page")) {
            window.location = "/generate-did"
        } else if (e.classList.contains("generate_user_did")) {
            // make UI changes
            e.disabled = true;
            addClasses(e, ["cursor-wait", "bg-gray-600"]);
            removeClasses(e.firstElementChild, ["hidden"]);

            fetch("/generate-id", {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(async res => {
                    await res.json().then(res => {
                        // put did in local storage
                        localStorage.setItem("player_did", res.data.sam_did);

                        removeClasses(qs(".did-div"), ["hidden"]);
                        removeClasses(qs(".private-key-container"), ["hidden"]);
                        qs(".did-text").textContent = res.data.sam_did;
                        qs("#key_grid").innerHTML = "";

                        res.data.mnemonic.split(" ").forEach((word, _) => {
                            const wordElement = ce('div');
                            wordElement.className = 'bg-white p-2 border rounded-sm shadow-xs';
                            wordElement.innerHTML = `<p class="text-xs text-center">${word}</p>`;
                            qs("#key_grid").appendChild(wordElement);
                        });

                        e.disabled = false;
                        addClasses(e, ["bg-black", "hidden"]);
                        removeClasses(e, ["cursor-wait", "bg-gray-600"]);
                        addClasses(e.firstElementChild, ["hidden"]);
                        e.textContent = "Continue Demo";
                        removeClasses(qs(".move-to-2"), ["hidden"]);
                    });
                })
        } else if (e.classList.contains("play-game")) {
            // make sure the input areas are all filled
            let game_inputs = qsa(".game-input");
            let filled = true;
            game_inputs.forEach((element, _) => {
                if (!element.value) {
                    // alert user
                    addClasses(element, ["border-red-400", "placeholder:text-red-400"]);
                    filled = false;
                } else {
                    removeClasses(element, ["border-red-400", "placeholder:text-red-400"]);
                }
            });

            if (filled) {
                e.disabled = true;
                addClasses(e, ["cursor-wait", "bg-gray-600"]);
                removeClasses(e.firstElementChild, ["hidden"]);

                fetch("/save-player-details", {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "did": game_inputs[0].value,
                        "name": game_inputs[1].value,
                        "country": game_inputs[2].value
                    })
                })
                    .then(async res => {
                        await res.json().then(res => {
                            if (!res.error) {
                                window.location = "/game"
                            } else {
                                console.log(res.data.msg);
                            }
                        })
                    });
            }
        } else if (e.classList.contains("move-to-2")) {
            window.location = "/tiktak-auth"
        } else if (e.classList.contains("move-to-3")) {
            window.location = "/leaderboard"
        } else if (e.classList.contains("move-to-4")) {
            window.location = "/mutate"
        } else if (e.classList.contains("move-to-6")) {
            window.location = "/leaderboard2"
        } else if (e.classList.contains("move-to-7")) {
            window.location = "/mutate2"
        } else if (e.classList.contains("move-to-8")) {
            window.location = "/leaderboard3"
        } else if (e.classList.contains("move-to-end")) {
            window.location = "/thanks"
        } else if (e.classList.contains("mutate-btn")) {
            // make sure the input areas are all filled
            let form_inputs = qsa(".form-input");
            let filled = true;
            form_inputs.forEach((element, _) => {
                if (!element.value) {
                    // alert user
                    addClasses(element, ["border-red-400", "placeholder:text-red-400"]);
                    filled = false;
                } else {
                    removeClasses(element, ["border-red-400", "placeholder:text-red-400"]);
                }
            });

            if (filled) {
                e.disabled = true;
                addClasses(e, ["cursor-wait", "bg-gray-600"]);
                removeClasses(e.firstElementChild, ["hidden"]);

                fetch("/notify-network", {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "userDid": form_inputs[0].value,
                        "appDid": form_inputs[1].value,
                        "action": form_inputs[2].value,
                        "keys": form_inputs[3].value,
                    })
                })
                    .then(async res => {
                        await res.json().then(res => {
                            if (!res.error) {
                                setTimeout(() => {  // this is a short time for SamaritanDB to notice the change in the database
                                    // make UI change
                                    e.disabled = false;
                                    let pageData = qs(".important-data");
                                    let moveTo = `move-to-${pageData.dataset.next}`;
                                    addClasses(e, ["bg-black", "animate-bounce", moveTo]);
                                    removeClasses(e, ["cursor-wait", "bg-gray-600", "mutate-btn"]);
                                    addClasses(e.firstElementChild, ["hidden"]);
                                    e.innerHTML = `
                                    <span>Continue Demo</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        style="fill: #fff;">
                                        <path
                                            d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z">
                                        </path>
                                    </svg>`;
                                    e.nextElementSibling.textContent = pageData.dataset.hint;
                                }, 15000);
                            } else {
                                console.log(res.data.msg);
                            }
                        });
                    })

            }
        }
    },
    false);

document.addEventListener("DOMContentLoaded", function () {
    let url = document.URL;
    if (url.includes("tiktak-auth")) {
        // update form with the DID value in session
        qs(".did-input").value = localStorage.getItem("player_did") ?? "";
    } else if (url.includes("game")) {
        // clear old record
        localStorage["player_stat"] = "";
    } else if (url.includes("leaderboard")) {
        // fetch the scores of our player
        let player_did = localStorage.getItem("player_did") ?? "";
        if (player_did) {
            fetch("/load-player-score", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    player_did
                })
            })
                .then(async res => {
                    await res.json().then(res => {
                        if (!res.error) {
                            let player = res.data;
                            let [name, win, draw, loss, country] = [player.name, player.win, player.draw, player.loss, player.country];
                            let players = {
                                "Gabrielle Chanel": [3, 1, 1, "France"],
                                "David Ogilvy": [2, 3, 0, "UK"],
                                "Steve Jobs": [2, 2, 1, "USA"],
                            };

                            if (!url.includes("leaderboard2"))
                                players[name] = [win, draw, loss, country];

                            // Calculate total points for each player
                            for (const playerName in players) {
                                const [playerWins, playerDraws, playerLosses] = players[playerName];
                                const totalPoints = playerWins * 3 + playerDraws * 1 + playerLosses * 0;
                                players[playerName].push(totalPoints);
                            }

                            // Sort the players based on total points (descending order)
                            const sortedPlayers = Object.keys(players).sort((a, b) => players[b][4] - players[a][4]);

                            // Create rows for the sorted players
                            let rows = [];
                            let table = document.querySelector(".table-body"); // Use 'document' instead of 'qs'
                            table.innerHTML = "";
                            for (const playerName of sortedPlayers) {
                                const [playerWins, playerDraws, playerLosses, playerCountry, playerPoints] = players[playerName];

                                table.innerHTML += `
                    <tr class="${playerName === name ? "bg-gray-100 group" : ""} hover:bg-gray-200 border-b">
                        <td class="px-4 py-2">${playerName == name ? "You" : playerName}</td>
                        <td class="px-4 py-2">${playerCountry}</td>
                        <td class="px-4 py-2">${playerWins}</td>
                        <td class="px-4 py-2">${playerDraws}</td>
                        <td class="px-4 py-2">${playerLosses}</td>
                    </tr>`;
                            }
                        } else {
                            console.log(res.data.msg);
                        }
                    })
                });

        }
    } else if (url.includes("mutate")) {
        qs(".samaritan_did").value = localStorage.getItem("player_did") ?? "";
    }
},
    false);