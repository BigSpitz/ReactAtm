import React from "react";
import AtmButtons from "./Components/AtmButtons";
import AtmModal from "./Components/AtmModal";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.clearAmount = this.clearAmount.bind(this);
    this.formatAmount = this.formatAmount.bind(this);
    this.state = {
      amount: "0",
      buttonsArray: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "blank",
        "0",
        "delete"
      ],
      amountDetails: "",
      setModal: false
    };
  }

  changeAmount(value) {
    if (value === "delete") {
      this.setState({
        amount:
          this.state.amount.length > 1 ? this.state.amount.slice(0, -1) : "0"
      });
    } else {
      this.setState({
        amount: this.state.amount !== "0" ? this.state.amount + value : value
      });
    }
  }

  formatAmount(amount) {
    return "$" + amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }

  clearAmount() {
    this.setState({ amount: "0" });
  }

  render() {
    return (
      <div className="row atm h-100">
        <div className="col-sm-12 my-auto">
          <div className="card mx-auto shadow border-0">
            <div className="card-body">
              <h1 className="card-title text-right pt-3 pb-4">
                {this.formatAmount(this.state.amount)}
              </h1>
              <AtmButtons
                changeAmount={this.changeAmount.bind(this)}
                buttonsArray={this.state.buttonsArray}
              />
              <AtmModal
                amountAtm={this.state.amount}
                clearAmount={this.clearAmount}
                formatAmount={this.formatAmount}
                className="atm-modal"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
