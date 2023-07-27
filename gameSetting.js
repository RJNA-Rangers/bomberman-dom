export function browserHeight() {
    var screenHeight = window.screen.height;
    var windowTabHeight = window.outerHeight - window.innerHeight;
    var tabBarsHeight = window.innerHeight - document.documentElement.clientHeight;
    var searchBarHeight = 50; // Approximate value for the Google search bar height
    var scrollbarHeight = window.innerHeight < document.documentElement.clientHeight ? scrollbarWidth : 0;

    var maxHeight = screenHeight - windowTabHeight - tabBarsHeight - searchBarHeight - scrollbarHeight;
    return maxHeight
}

export const globalSettings = {
    gridColumn1: ((window.screen.width) * 0.17),
    gridColumn2: ((window.screen.width - 10) * 0.6),
    gridColumn3: ((window.screen.width - 20) * 0.2),
    gridFr: (browserHeight() - 60 - 60 - 15 - 20) / 2,
    gap: 10,
    gridRowGaps: 3,
    numOfRows: 13,
    numOfCols: 15,
    wallWidth: (((window.screen.width - 10 - 10) * 0.6) / 15),
    wallHeight: (browserHeight() - 60 - 60 - 15 - 15) / 13,
    wallTypes: {
        wall: '▉',
        softWall: 1,
        bomb: 2
    },
    wallSrc: {
        hard: "https://static.wikia.nocookie.net/portalworldsgame/images/d/da/Metal_Slant.png",
        soft: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg29a3iLWNtHgkbXIxB4ZDVbyhDFERN-9Reg&usqp=CAU",
        empty: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeThkNU3ROd7m46CEvF7zWVda9k3rSW18COWBIK1nSP9-N3DUIEBqpYiFhvTHkCy8msp4&usqp=CAU",
    },
    players: {
        width: (((window.screen.width - 10 - 10) * 0.6) / 15) * 0.8,
        height: ((browserHeight() - 60 - 60 - 15 - 15) / 13) * 0.8,
        lad: "https://art.ngfiles.com/images/1228000/1228660_sinlessshadow_character-walk-forward-animation.gif?f1586400389",
        ghost: "https://66.media.tumblr.com/536ff61c1beb4b95a8125dd3d9b61b2f/tumblr_mqq8rk5J7s1rfjowdo1_500.gif",
        one: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9dce1ca9-f016-4a03-807e-76b69302d637/dag02az-5437ed09-16d1-42c6-9d61-7d27dc0cd6ec.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlkY2UxY2E5LWYwMTYtNGEwMy04MDdlLTc2YjY5MzAyZDYzN1wvZGFnMDJhei01NDM3ZWQwOS0xNmQxLTQyYzYtOWQ2MS03ZDI3ZGMwY2Q2ZWMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.7LxXh3e1k8wTaBwPoQCkeh2oHKHxOzkuDwrT8H6k4sw",
        wario: "https://66.media.tumblr.com/a5dc6a16fe07f56389d959e9da5f599f/tumblr_mugvnijgKx1rfjowdo1_500.gif"
    },
    speed: {
        normal: 0.05,
        fast: 0.1,
    },
    flames: {
        normal: 1,
        pickUp1: 2,
        pickUp2: 3,
        pickUp3: 4,
    },
    bombs: {
        normal: 1,
        pickUp1: 2,
        pickUp2: 3,
        pickUp3: 4,
    },
    "power-ups": {
        width: ((window.screen.width - 10 - 10) * 0.6) / 15,
        height: (browserHeight() - 60 - 60 - 15 - 15) / 13,
        speed: "https://media1.giphy.com/media/3ohc19SFUdIJ0YQcLe/source.gif",
        flames: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7b674371-0178-47a7-bf86-e9960c61f200/d9t5ysy-3979d702-c657-4050-9278-681e2d41c3fa.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdiNjc0MzcxLTAxNzgtNDdhNy1iZjg2LWU5OTYwYzYxZjIwMFwvZDl0NXlzeS0zOTc5ZDcwMi1jNjU3LTQwNTAtOTI3OC02ODFlMmQ0MWMzZmEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.yvStuICT_LEcY0GH5O2WxP0LA4gYUbyKiQudA0w5Nns",
        bombs: "https://cdnb.artstation.com/p/assets/images/images/028/086/635/original/juanito-medina-1-up.gif?1593449374",
        types: {
            speed: '🏃‍♂️',
            flames: '🔥',
            bombs: '💣'
        }
    },
    "bomb": {
        width: ((window.screen.width - 10 - 10) * 0.6) / 15,
        height: (browserHeight() - 60 - 60 - 15 - 15) / 13,
        src: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/07c86608-ef70-47c9-8e03-a11d0aacb17a/dayapq8-3b25e31d-6a18-4430-83aa-c1237e7cdfde.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA3Yzg2NjA4LWVmNzAtNDdjOS04ZTAzLWExMWQwYWFjYjE3YVwvZGF5YXBxOC0zYjI1ZTMxZC02YTE4LTQ0MzAtODNhYS1jMTIzN2U3Y2RmZGUuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.12JSApNxz3-0njFUpo_BNqcp4ZhCDtrTOQdMN9_-Rok",
    },
    "explosion": {
        width: ((window.screen.width - 10 - 10) * 0.6) / 15,
        height: (browserHeight() - 60 - 60 - 15 - 15) / 13,
        src: "https://i.gifer.com/4xjg.gif"
    }
}

export function changeGameSettingValue(key, value) {
    globalSettings[key] = value
}