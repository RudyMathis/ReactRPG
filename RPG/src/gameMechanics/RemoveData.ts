export const RemoveData = () => {
    localStorage.removeItem("currentTurn");
    localStorage.removeItem("characters");
    localStorage.removeItem("enemies");
    localStorage.removeItem("turnCount");
    localStorage.removeItem("Level");
    localStorage.removeItem("Round");
    localStorage.removeItem('selectedParty');
    localStorage.removeItem('currentEntityTurn');
    localStorage.removeItem('background');
};