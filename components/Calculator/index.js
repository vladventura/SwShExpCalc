import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Required } from "../Required";
import problemText from "./problem";
import "./glpk.min.js";
import {
  glp_create_prob,
  glp_get_col_name,
  glp_get_num_cols,
  glp_intopt,
  glp_mip_col_val,
  glp_mip_obj_val,
  GLP_ON,
  glp_read_lp_from_string,
  glp_scale_prob,
  GLP_SF_AUTO,
  IOCP,
} from "./glpk.min.js";

const CANDY_SIZES = ["XS", "S", "M", "L", "XL"];

const toCamel = (str) =>
  str.toLowerCase().replace(/\s+([a-z])/g, (_, chr) => chr.toUpperCase());

const curves = {
  mediumSlow: (n) => {
    return Math.floor(
      (Math.pow(n, 3) * 6) / 5 - Math.pow(n, 2) * 15 + n * 100 - 140
    );
  },
  slow: (n) => {
    return Math.floor((Math.pow(n, 3) * 5) / 4);
  },
  mediumFast: (n) => {
    return Math.pow(n, 3);
  },
  fast: (n) => {
    return Math.floor((Math.pow(n, 3) * 4) / 5);
  },
  erratic: (n) => {
    if (n < 50) {
      return Math.floor((Math.pow(n, 3) * (100 - n)) / 50);
    } else if (50 <= n && n <= 68) {
      return Math.floor((Math.pow(n, 3) * (150 - n)) / 100);
    } else if (68 < n && n < 98) {
      return Math.floor((Math.pow(n, 3) * (1911 - n * 10)) / 1500);
    }
    return Math.floor((Math.pow(n, 3) * (160 - n)) / 100);
  },
  fluctuating: (n) => {
    if (n < 15) {
      return Math.floor((Math.pow(n, 3) * (73 + n)) / 150);
    } else if (50 <= n && n <= 68) {
      return Math.floor((Math.pow(n, 3) * (14 - n)) / 50);
    }
    return Math.floor((Math.pow(n, 3) * (64 + n)) / 100);
  },
};

export class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xs: 999,
      s: 999,
      m: 999,
      l: 999,
      xl: 999,
      ansxs: 0,
      anss: 0,
      ansm: 0,
      ansl: 0,
      ansxl: 0,
      solved: "initial",
    };
  }
  componentDidMount() {
    for (const prp in this.state) {
      this.props.onCandyChange(prp, this.state[prp]);
    }
  }
  setCandyValue(val, prp) {
    this.setState({
      [prp]: val,
    });
  }

  testTimeout(start) {
    let d,
      now = new Date();
    d = (now.getTime() - start.getTime()) / 1000;
    if (d > 60) throw new Error("timeout");
  }

  optimize(problem) {
    let lp, iocp, start, colname, colval, objval;
    start = new Date();
    lp = glp_create_prob();
    glp_read_lp_from_string(lp, null, problem);

    glp_scale_prob(lp, GLP_SF_AUTO);
    iocp = new IOCP({ presolve: GLP_ON });
    glp_intopt(lp, iocp);

    try {
      objval = glp_mip_obj_val(lp);
      this.testTimeout(start);
      for (let x = 1; x <= glp_get_num_cols(lp); x++) {
        colname = glp_get_col_name(lp, x);
        colval = glp_mip_col_val(lp, x);
        this.testTimeout(start);
        this.setState({
          ["ans" + colname]: colval,
        });
        console.log(colval);
        console.log(colname);
        console.log("ans" + colname);

        objval -= colval;
      }
      return objval;
    } catch (err) {
      console.log(err);
    }
  }

  calcExpToLvl(curve, n) {
    return n <= 1 ? 0 : curves[curve](n);
  }

  calcOptimal() {
    this.setState({ solved: "loading" });
    let error = this.props.onClickCalc();
    if (error) {
      alert(error);
    } else {
      let expDiff, expCurrent, expTarget, curve, problem;
      curve = toCamel(this.props.exp);
      console.log("From Calculator.calcOptimal(), Start: " + this.props.start);
      console.log("From Calculator.calcOptimal(), End: " + this.props.end);
      console.log("From Calculator.calcOptimal(), Curve: " + curve);
      expCurrent = this.calcExpToLvl(curve, this.props.start);
      console.log("From Calculator.calcOptimal(), Exp Curve: " + expCurrent);
      expTarget = this.calcExpToLvl(curve, this.props.end);
      console.log("From Calculator.calcOptimal(), Exp Target: " + expTarget);
      expDiff = expTarget - expCurrent;
      problem = problemText.replace(/{exp}/g, expDiff);

      for (let x = 0; x < 5; x++) {
        let size = CANDY_SIZES[x].toLowerCase();
        problem = problem.replace(RegExp("{" + size + "}"), this.state[size]);
      }
      expCurrent = this.optimize(problem);
      expDiff = expCurrent - expDiff;
      this.setState({ solved: "solved" });
    }
  }

  showRequired() {
    if (this.state.solved == "initial") {
      return;
    } else if (this.state.solved == "loading") {
      return <Text>Loading</Text>;
    } else if (this.state.solved == "solved") {
      return (
        <Required
          xs={this.state.ansxs}
          s={this.state.anss}
          m={this.state.ansm}
          l={this.state.ansl}
          xl={this.state.ansxl}
        />
      );
    }
  }

  render() {
    return (
      <View>
        <Text>Calculator goes here</Text>
        <View>
          <Text>XS Candy</Text>
          <TextInput
            keyboardType="numeric"
            value={this.state.xs.toString()}
            onChangeText={(val) => this.setCandyValue(val, "xs")}
          />
        </View>
        <View>
          <Text>S Candy</Text>
          <TextInput
            keyboardType="numeric"
            value={this.state.s.toString()}
            onChangeText={(val) => this.setCandyValue(val, "s")}
          />
        </View>
        <View>
          <Text>M Candy</Text>
          <TextInput
            keyboardType="numeric"
            value={this.state.m.toString()}
            onChangeText={(val) => this.setCandyValue(val, "m")}
          />
        </View>
        <View>
          <Text>L Candy</Text>
          <TextInput
            keyboardType="numeric"
            value={this.state.l.toString()}
            onChangeText={(val) => this.setCandyValue(val, "l")}
          />
        </View>
        <View>
          <Text>XL Candy</Text>
          <TextInput
            keyboardType="numeric"
            value={this.state.xl.toString()}
            onChangeText={(val) => this.setCandyValue(val, "xl")}
          />
        </View>
        <Button title="Calculate" onPress={() => this.calcOptimal()}></Button>
        {this.showRequired()}
      </View>
    );
  }
}
