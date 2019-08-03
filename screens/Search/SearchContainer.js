import React, { Component } from "react";
import SearchInput from "../../components/SearchInput";
import SearchPresenter from "./SearchPresenter";

class SearchContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <SearchInput
        value={navigation.getParam("term", "")}
        onChange={navigation.getParam("onChange", () => null)}
        onSubmit={navigation.getParam("onSubmit", () => null)}
        placeholder={`Search`}
      />
    )
  });

  constructor(props) {
    //constructor가 static 보다 먼저 호출되는 것을 이용해서 contructor에서 navigation에 value, onChange, onSubmit을 넣어주면 됨.
    // screen은 props로 navigation이 전달됨

    super(props);
    const { navigation } = props;

    this.state = {
      term: "",
      shoudReFetch: false
    };
    navigation.setParams({
      term: this.state.term,
      onChange: this.onChange,
      onSubmit: this.onSubmit
    });
  }

  onChange = text => {
    const { navigation } = this.props;
    this.setState({
      term: text,
      shouldReFetch: false
    });
    navigation.setParams({ term: text });
  };

  onSubmit = () => {
    this.setState({
      shouldReFetch: true
    });
  };
  render() {
    const { term, shouldReFetch } = this.state;
    return <SearchPresenter term={term} shouldReFetch={shouldReFetch} />;
  }
}

export default SearchContainer;
