/******************************************************************************
 *                          Fetch and display counts
 ******************************************************************************/

displayVotes();


function displayVotes() {
    Http.Get('/api/votes/all')
        .then(response => response.json())
        .then((response) => {
            /*
            {
                "good": 1,
                "indifferent": 1,
                "bad": 0
            }
            */
            var votesAnchor = document.getElementById('votesAnchor');
            votesAnchor.innerHTML = `Good: ${response.good} Indifferent: ${response.indifferent} Bad: ${response.bad}`
        });
};

/******************************************************************************
 *                        Add Votes
 ******************************************************************************/

document.addEventListener('click', function (event) {
    event.preventDefault();
    var ele = event.target;
    if (ele.matches('#good')) {
        addVote("good");
    } else if (ele.matches('#indifferent')) {
        addVote("indifferent")
    } else if (ele.matches('#bad')) {
        addVote("bad")
    }
}, false)

function addVote(typeOfVote) {
    let data = {
        vote: typeOfVote
    }
    Http.Post('/api/votes', data)
        .then(() => {
            displayVotes()
        })
}
