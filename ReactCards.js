class ShuffledCardSet {
    /*
     This is a "plain" Javascript class (NOT a React component)
     You don't need to do anything with it other than use it to generate random
     card values by calling it's removeCard() method:
       let cardSet = new ShuffledCardSet();
       let obj = cardSet.removeCard();
     obj will now be a Javascript object with three properties:
      rank: The rank of the card, 2 through A
      suit: The suit of the card, one of the four standard suits
      red: A boolean value indicating whether the card has a red suit (hearts or diamonds)
    */
    constructor() {
        const suits = "♣♥♠♦".split("");
        const ranks = Array(...Array(9).keys()).map((x) => x+2).concat(["J", "Q", "K", "A"]);
        this._contents = [];
        suits.forEach((s) => {
            ranks.forEach((r) => {
                this._contents.push({suit:s, rank:r});
            });
        });
        for(let i = this._contents.length-1; i > 0; i--) {
            let k = Math.floor(Math.random() * i);
            let temp = this._contents[i];
            this._contents[i] = this._contents[k];
            this._contents[k] = temp;
        }
    } // constructor
    removeCard() {
        return this._contents.pop();
    }
}
// Stage 5 - Game
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.addCard = this.addCard.bind(this);
        this.state = {
            handCards: [],
            score: 0
        };
    }

    addCard() {
        this.setState(function (oldState, props) {
            let card = cardSet.removeCard();
            let oldScore = this.state.score;
            return {
                handCards: this.state.handCards.concat(card),
                score: "JQK".includes(card.rank) ? oldScore + 10 :
                    card.rank === "A" ? oldScore + 11 : oldScore + Number(card.rank)
            };
        });
    }

    render() {
        return (
            <div>
                <div className="deckArea"><Deck onCardUpdate={this.addCard} /></div>
                <div className="handArea"><Hand handCards={this.state.handCards} /></div>
                <div className="pointsArea">Points: {this.state.score}</div>
            </div>
        )
    }
}

// Stage 5 - Simplify Hand
// Stage 4 - Hand
class Hand extends React.Component {

    render() {
        let cards = this.props.handCards.map((card) =>
            <Card suit={card.suit} rank={card.rank} />
        );

        return (
            <div>
                {cards}
            </div>
        )
    }
}

// Stage 2 - Card
class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            faceUp: Boolean(true)
        };
    }

    render() {
        return (
            <div className={this.state.faceUp ? "card" : "card back" } onClick={() => this.toggleFace()}>
                <div className={this.props.suit === "♥" || this.props.suit === "♦" ? "red" : ""}>{this.props.rank}</div>
                <div className={this.props.suit === "♥" || this.props.suit === "♦" ? "red" : ""}>{this.props.suit}</div>
            </div>
        )
    }

    toggleFace() {
        //console.log("toggled face");
        this.setState(function (oldState, props) {
            return {faceUp: !oldState.faceUp};
        });
    }
}

// Stage 1
class Deck extends React.Component {
    render() {
        return <div className="deck" onClick={() => this.props.onCardUpdate()}></div>;
    }
}

// Stage 4 - Generated objects no longer needed
// Stage 3 - Generate props for Hand
let cardSet = new ShuffledCardSet();

// Stage 3, 4 - Render Hand
// Stage 1 - Render Deck
ReactDOM.render(<Game />,document.getElementById('game'));

