import RJNA from "./rjna/engine.js"

//    --- create the hearts (the remaining lives) for players  --- //
export const hearts = (livesRemaining) => {
    const heartImgSrc = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a4792595-9766-49a4-b00f-c6c2b9662c16/dcq5pnb-849537f2-40a3-47e2-81cf-19b4b6678096.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2E0NzkyNTk1LTk3NjYtNDlhNC1iMDBmLWM2YzJiOTY2MmMxNlwvZGNxNXBuYi04NDk1MzdmMi00MGEzLTQ3ZTItODFjZi0xOWI0YjY2NzgwOTYuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dxlfWUx2yyMqFWvTOg7g4P062O5fpo6ZqhonUbd1UKg";
    const heartImgObj = RJNA.tag.img(
        {
            class: "lives-hearts"
        },
        {},
        {
            src: heartImgSrc
        });

    const livesContainer = RJNA.tag.div(
        { class: "lives-container" },
        {},
        {},
        "LIVES: "
    );

    const livesImages = RJNA.tag.div(
        { class: "lives-heart-container" },
        {},
        {}
    );
    for (let i = 0; i < Number(livesRemaining); i++) {
        livesImages.setChild(heartImgObj);
    }
    livesContainer.setChild(livesImages);
    return livesContainer;
}
// -- //

// -- number of players is based on the number of websockets -- //
export const otherLivesContainer = (numberOfPlayers) => {
    const otherLivesContainer = RJNA.tag.div(
        { class: "other-lives-container" },
        {},
        {},
        RJNA.tag.h2(
            {
                class: "other-lives-title",
            },
            {},
            {},
            "ENEMIES:"),
    )
    for (let i = 0; i < numberOfPlayers; i++) {
        let otherLives = hearts(3)
        //id will depend on the player's socket's id(the player's number will depend on who connected first e.g. player 1 is first connector)
        otherLives.children[0] = `Player ${i + 2}:`
        otherLives.setAttr("id", `${i + 2}`);
        otherLives.removeAttr("class", "lives-container", "other-lives");
        otherLivesContainer.setChild(otherLives)
    }
    return otherLivesContainer
}
// -- //
