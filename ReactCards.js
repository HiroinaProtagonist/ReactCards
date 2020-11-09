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
        // this.handleChange = this.handleChange.bind(this);
        this.state = {
            handCards: [],
            score: 0
        };
    }

    // handleChange(e) {
    //     this.setState({handCards: e.target.value});
    // }

    render() {
        return (
            <div>
                <div className="deckArea"><Deck handCards={this.state.handCards} /></div>
                <div className="handArea"><Hand /></div>
                <div className="pointsArea">Points: {this.state.score}</div>
            </div>
        )
    }
}

// Stage 5 - Simplify Hand
// Stage 4 - Hand
class Hand extends React.Component {
    // key prop added to resolve an "Each child in a list should have a unique "key" prop." error
    render() {
        return (
            <div>
                {this.props.cards}
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
                <div className={this.props.suit == "♥" || this.props.suit == "♦" ? "red" : ""}>{this.props.rank}</div>
                <div className={this.props.suit == "♥" || this.props.suit == "♦" ? "red" : ""}>{this.props.suit}</div>
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
        return <div className="deck" onClick={() => this.addCard()}></div>;
    }

    addCard() {
        this.setState(function (oldState, props) {
            return {handCards: this.props.handCards.concat(cardSet.removeCard())};
        });
    }
}

// Stage 4 - Generated objects no longer needed
// Stage 3 - Generate props for Hand
let cardSet = new ShuffledCardSet();

// Stage 3, 4 - Render Hand
// Stage 1 - Render Deck
//ReactDOM.render(<Deck />, document.getElementById('deckArea'));
//ReactDOM.render(<Hand />,document.getElementById('handArea'));
ReactDOM.render(<Game />,document.getElementById('game'));

