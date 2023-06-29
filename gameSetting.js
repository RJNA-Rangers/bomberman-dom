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
        width: ((window.screen.width - 10 - 10) * 0.6) / 15,
        height: ((browserHeight() - 60 - 60 - 15 - 15) / 13),
        lad: "https://art.ngfiles.com/images/1228000/1228660_sinlessshadow_character-walk-forward-animation.gif?f1586400389",
        ghost: "https://66.media.tumblr.com/536ff61c1beb4b95a8125dd3d9b61b2f/tumblr_mqq8rk5J7s1rfjowdo1_500.gif",
        one: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9dce1ca9-f016-4a03-807e-76b69302d637/dag02az-5437ed09-16d1-42c6-9d61-7d27dc0cd6ec.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlkY2UxY2E5LWYwMTYtNGEwMy04MDdlLTc2YjY5MzAyZDYzN1wvZGFnMDJhei01NDM3ZWQwOS0xNmQxLTQyYzYtOWQ2MS03ZDI3ZGMwY2Q2ZWMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.7LxXh3e1k8wTaBwPoQCkeh2oHKHxOzkuDwrT8H6k4sw",
        wario: "https://66.media.tumblr.com/a5dc6a16fe07f56389d959e9da5f599f/tumblr_mugvnijgKx1rfjowdo1_500.gif"
    },
    speed: {
        x: (((window.screen.width - 10 - 10) * 0.6) / 15),
        y: ((browserHeight() - 60 - 60 - 15 - 15) / 13),

    },


}

export function changeGameSettingValue(key, value) {
    globalSettings[key] = value
}