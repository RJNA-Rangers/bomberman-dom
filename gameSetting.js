export const globalSettings = {
    gap: 10,
    gridRowGaps: 3,
    numOfRows: 13,
    numOfCols: 15,
    wallWidth: ((window.innerWidth - 10) * 0.6) / 15,
    wallHeight: (window.innerHeight - 60 - 60 - 15 - 30) / 13,
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
        lad: "https://art.ngfiles.com/images/1228000/1228660_sinlessshadow_character-walk-forward-animation.gif?f1586400389",
        ghost: "https://66.media.tumblr.com/536ff61c1beb4b95a8125dd3d9b61b2f/tumblr_mqq8rk5J7s1rfjowdo1_500.gif",
        vegeta: "https://e7.pngegg.com/pngimages/465/541/png-clipart-vegeta-goku-cell-dragon-ball-bead-pixel-gun-text-fictional-character-thumbnail.png",
        one: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9dce1ca9-f016-4a03-807e-76b69302d637/dag02az-5437ed09-16d1-42c6-9d61-7d27dc0cd6ec.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlkY2UxY2E5LWYwMTYtNGEwMy04MDdlLTc2YjY5MzAyZDYzN1wvZGFnMDJhei01NDM3ZWQwOS0xNmQxLTQyYzYtOWQ2MS03ZDI3ZGMwY2Q2ZWMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.7LxXh3e1k8wTaBwPoQCkeh2oHKHxOzkuDwrT8H6k4sw",
        two: "https://i.pinimg.com/originals/78/e0/32/78e03222bd68257f931e619b13496e7c.gif",
        three: "https://media1.giphy.com/media/Be0YVQAdVdm4E/giphy.gif?cid=6c09b952enzyy8l2ioi0x8fsjmicyf69uwn9xu10aaeqgjov&ep=v1_gifs_search&rid=giphy.gif&ct=s",
        four: "https://gifdb.com/images/thumbnail/chad-walking-pixel-art-5fmb40v2s3hc1ac1.gif",
        wario: "https://66.media.tumblr.com/a5dc6a16fe07f56389d959e9da5f599f/tumblr_mugvnijgKx1rfjowdo1_500.gif"
    }

}

export function changeGameSettingValue(key, value) {
    globalSettings[key] = value
}